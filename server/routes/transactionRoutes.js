import express from "express";
import Transaction from "../models/Transaction.js";
import Bank from "../models/Bank.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a transaction (deposit, withdrawal, transfer)
router.post("/", authMiddleware, async (req, res) => {
  const { bankId, type, amount, recipientAccount } = req.body;
  try {
    const bank = await Bank.findById(bankId);
    if (!bank || bank.userId.toString() !== req.userId) {
      return res.status(404).json({ message: "Bank account not found" });
    }

    if (type === "withdrawal" && bank.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const transaction = new Transaction({ userId: req.userId, bankId, type, amount, recipientAccount });
    await transaction.save();

    if (type === "deposit") {
      bank.balance += amount;
    } else if (type === "withdrawal") {
      bank.balance -= amount;
    }
    await bank.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get transactions for a user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
