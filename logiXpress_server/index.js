const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173" // replace with your frontend URL
}));
app.use(express.json());

// MongoDB URI from .env
const uri = process.env.MONGO_URI;

// Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let parcelCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("logiXpress"); // Database name
    parcelCollection = db.collection("parcels"); // Collection name
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("✅ Server is running successfully!");
});

// GET parcels — all or filtered by userEmail
app.get("/parcels", async (req, res) => {
  try {
    const { email } = req.query; // optional query parameter
    const filter = email ? { userEmail: email } : {}; 

    const parcels = await parcelCollection
      .find(filter)
      .sort({ createdAt: -1 }) // newest first
      .toArray();

    res.status(200).json(parcels);
  } catch (err) {
    console.error("❌ Error fetching parcels:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//  save parcel to db
app.post("/parcels", async (req, res) => {
  try {
    const parcelData = req.body;

    // Basic validation (you can expand this)
    if (!parcelData.title || !parcelData.senderName || !parcelData.receiverName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Insert parcel into MongoDB
    const result = await parcelCollection.insertOne(parcelData);

    res.status(201).json({
      message: "Parcel created successfully!",
      parcelId: result.insertedId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE parcel by ID
app.delete("/parcels/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid parcel ID" });
    }

    // Delete parcel from MongoDB
    const result = await parcelCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Parcel not found" });
    }

    res.status(200).json({ message: "Parcel deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting parcel:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
