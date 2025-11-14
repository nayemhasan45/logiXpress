const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
}));
app.use(express.json());

// MongoDB client
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

let parcelCollection;

// Connect to DB
async function connectDB() {
  try {
    await client.connect();
    const db = client.db("logiXpress");
    parcelCollection = db.collection("parcels");
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
connectDB();

// Test route
app.get("/", (req, res) => res.send("✅ Server running"));

// GET all parcels (optional filter by userEmail)
app.get("/parcels", async (req, res) => {
  try {
    const { userEmail } = req.query;
    const filter = userEmail ? { userEmail } : {};
    const parcels = await parcelCollection.find(filter)
      .sort({ creation_date: -1 })
      .toArray();
    res.status(200).json(parcels);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET single parcel by ID (for edit)
app.get("/parcels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid parcel ID" });

    const parcel = await parcelCollection.findOne({ _id: new ObjectId(id) });
    if (!parcel) return res.status(404).json({ message: "Parcel not found" });

    res.status(200).json(parcel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// CREATE new parcel
app.post("/parcels", async (req, res) => {
  try {
    const data = req.body;

    if (!data.title || !data.senderName || !data.receiverName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const now = new Date();
    const parcelData = {
      ...data,
      creation_date: now.toISOString(),
      creation_date_local: now.toLocaleDateString(),
      creation_time_local: now.toLocaleTimeString(),
      lastUpdated: now.toISOString(),
      delivery_fee_status: "Pending",
      history: [{ status: "Pending", timestamp: now.toISOString() }],
      delivery_cost: data.delivery_cost || 0,
    };

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

// PATCH parcel (edit)
app.patch("/parcels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid parcel ID" });

    // Do not overwrite creation fields
    delete data.creation_date;
    delete data.creation_date_local;
    delete data.creation_time_local;

    data.lastUpdated = new Date().toISOString();

    const result = await parcelCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );

    if (result.matchedCount === 0) return res.status(404).json({ message: "Parcel not found" });

    res.status(200).json({ message: "Parcel updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE parcel
app.delete("/parcels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid parcel ID" });

    const result = await parcelCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: "Parcel not found" });

    res.status(200).json({ message: "Parcel deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
