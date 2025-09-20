
// Simple Node.js + Express starter (no auth) - requires: npm install express mongoose cors
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Replace with your MongoDB URI or use local MongoDB
const MONGO = process.env.MONGO || "mongodb://127.0.0.1:27017/ev-charging";
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });

const chargerSchema = new mongoose.Schema({
  name: String,
  status: { type: String, enum: ["available", "charging", "offline"], default: "available" },
  location: String,
  power: String
});
const Charger = mongoose.model("Charger", chargerSchema);

const sessionSchema = new mongoose.Schema({
  user: String,
  chargerId: mongoose.Schema.Types.ObjectId,
  startTime: Date,
  endTime: Date,
  energyUsed: Number,
  cost: Number
});
const Session = mongoose.model("Session", sessionSchema);

app.get("/chargers", async (req, res) => {
  const chargers = await Charger.find();
  res.json(chargers);
});

app.post("/chargers", async (req, res) => {
  const charger = new Charger(req.body);
  await charger.save();
  res.json(charger);
});

app.post("/sessions/start", async (req, res) => {
  const { user, chargerId } = req.body;
  const session = new Session({ user, chargerId, startTime: new Date() });
  await session.save();
  res.json(session);
});

app.post("/sessions/stop", async (req, res) => {
  const { sessionId, energyUsed } = req.body;
  const session = await Session.findById(sessionId);
  if(!session) return res.status(404).json({error:'not found'});
  session.endTime = new Date();
  session.energyUsed = energyUsed;
  session.cost = energyUsed * 7;
  await session.save();
  res.json(session);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
