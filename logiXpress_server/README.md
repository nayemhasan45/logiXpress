# logiXpress Server

## Overview
logiXpress_server is the Express API for the parcel delivery platform. It exposes RESTful endpoints that allow the React client to create, read, update, and delete parcel documents stored in MongoDB. The service is intentionally lean (single index.js) so deployment on Railway, Render, or a plain Node host stays simple.

## Tech Stack
- Node.js 18+ (CommonJS modules)
- Express 5 with JSON body parsing and async handlers
- MongoDB Node driver 7 talking to the logiXpress database and the parcels collection
- CORS locked to the local client origin (http://localhost:5173) via the cors package
- dotenv for configuration management

## Requirements
- Node.js 18 or later
- npm 10+
- Access to a MongoDB deployment (Atlas cluster or local instance)

## Installation
    cd logiXpress_server
    npm install

## Environment Variables
Create a .env file inside logiXpress_server.
    MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
    PORT=3000
MONGO_URI is required. PORT defaults to 3000 when omitted.

## Running Locally
    npm install
    node index.js
The server connects to MongoDB on startup (connectDB) and begins listening after the connection completes. You can also install nodemon globally and run nodemon index.js during development.

## Project Structure
    logiXpress_server/
      index.js        Express app, routes, and MongoDB client
      package.json    Dependencies and npm scripts
      .env            Local environment variables (ignored by git)

## API Reference
| Method | Path | Description |
| --- | --- | --- |
| GET | / | Health check endpoint that returns Server running. |
| GET | /parcels | Returns all parcels. Supports optional userEmail query string filter. |
| GET | /parcels/:id | Returns a single parcel document by ObjectId. |
| POST | /parcels | Creates a parcel. Requires title, senderName, and receiverName. |
| PATCH | /parcels/:id | Updates mutable fields on a parcel and refreshes lastUpdated. |
| DELETE | /parcels/:id | Removes a parcel document. |

### Request Details
- POST /parcels expects JSON describing sender, receiver, addresses, cost, and related metadata. The handler fills audit fields such as creation_date, history, delivery_fee_status, and timestamps.
- PATCH /parcels/:id ignores creation_date fields to prevent accidental overwrites and stamps a new ISO8601 lastUpdated value.
- DELETE /parcels/:id and GET endpoints validate ids with ObjectId.isValid before touching the database.
- All routes return 400 for invalid ids, 404 when a parcel is not found, and 500 on unexpected errors.

### Data Model
Each document stored in the parcels collection resembles:
- User entered fields (title, parcel type, sender and receiver data, pickup and dropoff info, delivery_cost, etc.)
- creation_date, creation_date_local, and creation_time_local strings seeded at creation
- lastUpdated ISO timestamp
- delivery_fee_status set to Pending by default
- history array containing status events { status, timestamp }
You may extend the schema freely; MongoDB does not enforce a rigid structure.

## CORS and Security
index.js enables CORS for http://localhost:5173. Update the origin array before deploying to production domains. Requests use Express.json for payload parsing; add authentication middleware if the API is exposed publicly.

## Deployment Tips
- Verify the process can reach MongoDB before binding the public port; failed connections are logged to the console.
- Configure environment variables through your hosting provider so that secrets never live in source control.
- When hosting behind a service such as Render or Railway, consider using process managers (PM2, Docker, etc.) for restart handling.

## Testing
The repo includes a placeholder npm test script. Add integration tests with a tool such as Vitest, Supertest, or Jest when the API grows. For now you can manually exercise endpoints with Thunder Client, Postman, or curl.
