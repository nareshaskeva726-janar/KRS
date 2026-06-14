import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Contact from "../models/contactModel.js";
import generateToken from "../lib/generateToken.js";
import sendEmail from "../lib/sendEmail.js";
import { contactEmailTemplate, newsletterTemplate, otpTemplate } from "../Templates/EmailTemplates.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: "Missing Details!" });
    }

    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "User created", user, token });


  } catch (err) {
    console.log("Error in the register controller", err)

    res.status(500).json({ success: false, message: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing Details!" })
    }

    const user = await User.findOne({ email });


    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, message: "Login success", user, token });

  } catch (err) {
    console.log("Error in the login controller", err)
    res.status(500).json({ success: false, message: err.message });
  }
};

//logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout controller:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//ME
export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json({
    user,
  });
};

//FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail(
      email,
      "Password Reset OTP",
      otpTemplate({ otp })
    );

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log("Forgot Password Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//VERIFY PASSWORD
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (
      !user ||
      user.resetOtp !== otp ||
      user.resetOtpExpire < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP verified",
    });
  } catch (error) {
    console.log("Verify OTP Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Missing details",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (
      user.resetOtp !== otp ||
      user.resetOtpExpire < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    user.resetOtp = null;
    user.resetOtpExpire = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log("Reset Password Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const contactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 1. Save in DB
    const contact = await Contact.create({
      name,
      email,
      message,
    });


    // SEND EMAIL (FIXED)
    await sendEmail(
      process.env.EMAIL_USER,
      "New Contact Message",
      contactEmailTemplate({ name, email, message })
    );


    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    });

  } catch (error) {
    console.log("error in the contact form", error)
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};



export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    await sendEmail(
      process.env.EMAIL_USER,
      "New Newsletter Subscription",
      newsletterTemplate({ email })
    );

    res.json({
      success: true,
      message: "Subscribed successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};



