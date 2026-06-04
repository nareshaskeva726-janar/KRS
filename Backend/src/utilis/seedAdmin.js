import dotenv from "dotenv";
import connectDB from "../config/Database.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const name = process.env.SUPERADMIN_NAME || "Super Admin";
    const email = process.env.SUPERADMIN_EMAIL || "krslifeline@gmail.com";
    const password = process.env.SUPERADMIN_PASSWORD || "krs@123";

    const exists = await User.findOne({ email });

    if (exists) {
      console.log("⚠️ Superadmin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "superadmin",
    });

    console.log("✅ Superadmin created successfully");
    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

seedAdmin();