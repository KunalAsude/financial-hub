import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

// Middleware & CORS
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes for auth bank and transactions
import authRoutes from "./routes/authRoutes.js";
import bankRoutes from "./routes/bankRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/banks", bankRoutes);
app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
