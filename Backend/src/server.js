import express from "express"
import connectDB from "./config/Database.js";
import dotenv from "dotenv";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

connectDB();

app.get("/", (req, res) => res.status(200).send("KRS Lifeline"));

app.listen(PORT, () => console.log(`server is running in the http://localhost:${PORT}`));
