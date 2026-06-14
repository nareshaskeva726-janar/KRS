import express from "express"
import connectDB from "./config/Database.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ProductRouter from "./routes/productRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cors from "cors"
import listEndpoints from "express-list-endpoints";



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


console.log("API ENDPOINTS!")
console.log("/api/auth")
console.log("/api/Product")

export const apiRoutes = {
  auth: [
    { method: "POST", path: "/api/auth/register" },
    { method: "POST", path: "/api/auth/login" },
    { method: "POST", path: "/api/auth/logout" },
    { method: "GET", path: "/api/auth/me" },
    { method: "POST", path: "/api/auth/forgot-password" },
    { method: "POST", path: "/api/auth/verify-otp" },
    { method: "POST", path: "/api/auth/reset-password" },
    { method: "POST", path: "/api/auth/contact" },
    { method: "POST", path: "/api/auth/subscribe" },
  ],

  product: [
    { method: "POST", path: "/api/product" },
    { method: "GET", path: "/api/product" },
    { method: "GET", path: "/api/product/:id" },
    { method: "PUT", path: "/api/product/:id" },
    { method: "DELETE", path: "/api/product/:id" },
  ],
};

app.get("/", (req, res) => res.status(200).send("KRS Lifeline"));


app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);



  console.log("🔐 AUTH ROUTES");
  console.table(apiRoutes.auth);

  console.log("\n📦 PRODUCT ROUTES");
  console.table(apiRoutes.product);
});