import express from "express";
import {
    register,
    login,
    logout,
    getMe,
    forgotPassword,
    verifyOtp,
    resetPassword,
    contactForm,
    subscribeNewsletter
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
const authRouter = express.Router();

// AUTH
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", protect, getMe);
//new routes
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", resetPassword);

authRouter.post("/contact", contactForm);
authRouter.post("/subscribe", subscribeNewsletter);


export default authRouter;