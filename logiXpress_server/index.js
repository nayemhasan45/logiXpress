const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const crypto = require("crypto");


dotenv.config();
crypto.randomUUID();
const stripe = require("stripe")(process.env.STRIPE_KEY);


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
    const email = req.query.email || req.query.userEmail;
    const filter = email ? { userEmail: email } : {};

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

// CREATE new parcel (with full required structure)
app.post("/parcels", async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.title || !data.senderName || !data.receiverName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Dates
    const now = new Date();

    // Generate tracking number
    const trackingNumber = crypto.randomUUID(); 

    // Construct full parcel data
    const parcelData = {
      ...data,

      // User identity (from frontend)
      userEmail: data.userEmail,
      userId: data.userId || "guest",

      // System-generated fields
      trackingNumber,

      creation_date: now.toISOString(),
      creation_date_local: now.toLocaleDateString(),
      creation_time_local: now.toLocaleTimeString(),
      lastUpdated: now.toISOString(),

      // Payment fields
      delivery_fee_status: "Pending",
      status: "Pending",

      // Cost fallback
      delivery_cost: data.delivery_cost || 0,

      // History array
      history: [
        {
          status: "Pending",
          timestamp: now.toISOString(),
        },
      ],
    };

    // Insert into DB
    const result = await parcelCollection.insertOne(parcelData);

    res.status(201).json({
      message: "Parcel created successfully!",
      parcelId: result.insertedId,
      trackingNumber: trackingNumber,
    });

  } catch (err) {
    console.error("Create parcel error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// PATCH parcel (edit)
app.patch("/parcels/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid parcel ID" });
    }

    const now = new Date();

    // PROTECT system fields
    const protectedFields = [
      "trackingNumber",
      "creation_date",
      "creation_date_local",
      "creation_time_local",
      "delivery_fee_status",
      "status",
      "history",
      "userEmail",
      "userId",
      "lastUpdated"
    ];

    // Remove protected fields from incoming payload
    protectedFields.forEach(field => delete data[field]);

    // Update structure
    const updateDocument = {
      $set: {
        ...data,
        lastUpdated: now.toISOString(),
      },
      $push: {
        history: {
          status: "Edited",
          timestamp: now.toISOString(),
        },
      },
    };

    const result = await parcelCollection.updateOne(
      { _id: new ObjectId(id) },
      updateDocument
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Parcel not found" });
    }

    res.status(200).json({ message: "Parcel updated successfully" });

  } catch (err) {
    console.error("Update parcel error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// DELETE parcel
// DELETE parcel (PREVENT deleting paid parcels)
app.delete("/parcels/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid parcel ID" });
    }

    // Find parcel
    const parcel = await parcelCollection.findOne({ _id: new ObjectId(id) });

    if (!parcel) {
      return res.status(404).json({ message: "Parcel not found" });
    }

    // BLOCK deletion if already paid
    if (parcel.delivery_fee_status === "Paid") {
      return res.status(400).json({ 
        message: "Cannot delete parcel because payment is already completed." 
      });
    }

    // Delete parcel (only if unpaid)
    const result = await parcelCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Parcel not found" });
    }

    res.status(200).json({ message: "Parcel deleted successfully" });

  } catch (err) {
    console.error("Delete parcel error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// stripe payment related apis ----------------
app.post('/create-checkout-session', async (req, res) => {
  const { parcelId, amount, currency, description } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency || 'eur',
            unit_amount: amount, // IN SMALLEST CURRENCY UNIT (e.g. cents)
            product_data: {
              name: description || `Parcel #${parcelId}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        parcelId,
      },
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancelled`,
    });

    return res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error('Stripe checkout session error:', err);
    return res.status(500).json({ error: 'Unable to create checkout session' });
  }
});

// payment confirm
app.post("/payments/confirm", async (req, res) => {
  try {
    const { session_id } = req.body;

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      const parcelId = session.metadata.parcelId;

      const updateResult = await parcelCollection.updateOne(
        { _id: new ObjectId(parcelId) },
        { 
          $set: { 
            delivery_fee_status: "Paid",
            status: "Paid",
            lastUpdated: new Date().toISOString()
          } 
        }
      );

      if (updateResult.matchedCount === 0) {
        console.log("Parcel not found in DB for update");
        return res.json({ success: false, message: "Parcel not found" });
      }

      return res.json({ success: true, message: "Parcel marked as paid" });
    }

    return res.json({ success: false, message: "Payment not completed" });
  } catch (err) {
    console.error("Error confirming payment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
