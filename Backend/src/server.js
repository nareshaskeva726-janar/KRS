import express from "express"
import connectDB from "./config/Database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ProductRouter from "./routes/productRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cors from "cors"


dotenv.config();

// console.log("ENV CHECK:", {
//   name: process.env.CLOUDINARY_NAME,
//   key: process.env.CLOUDINARY_API_KEY,
//   secret: process.env.CLOUDINARY_API_SECRET,
// });

const app = express();
const PORT = process.env.PORT || 5000

connectDB();


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://krs-o77k.vercel.app"
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());


app.use("/api/auth", authRouter)
app.use("/api/product", ProductRouter);

app.get("/", (req, res) => res.status(200).send("KRS Lifeline"));

app.listen(PORT, () => console.log(`server is running in the http://localhost:${PORT}`));
