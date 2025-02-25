import express from "express";
import Bank from "../models/Bank.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add a new bank account
router.post("/", authMiddleware, async (req, res) => {
  const { name, accountNumber, balance } = req.body;
  try {
    const bank = new Bank({ userId: req.userId, name, accountNumber, balance });
    await bank.save();
    res.status(201).json(bank);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all banks for a user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const banks = await Bank.find({ userId: req.userId });
    res.json(banks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
