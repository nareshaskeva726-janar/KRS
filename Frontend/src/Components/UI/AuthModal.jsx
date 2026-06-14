import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { assets } from "../../assets/assets";
import {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} from "../../Store/APIS/krsApi";

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // ---------- UI FLOW STATE ----------
  const [flow, setFlow] = useState("login"); // login | register | forgotEmail | forgotOtp | forgotReset

  // ---------- LOGIN STATE ----------
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // ---------- REGISTER STATE ----------
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirm, setShowRegConfirm] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ---------- FORGOT PASSWORD STATE ----------
  const [forgotEmail, setForgotEmail] = useState("");
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const otpRefs = useRef([]);

  // ---------- API HOOKS ----------
  const [loginUser, { isLoading: loginLoading }] = useLoginMutation();
  const [registerUser, { isLoading: registerLoading }] = useRegisterMutation();
  const [forgotPassword, { isLoading: forgotLoading }] = useForgotPasswordMutation();
  const [verifyOtp, { isLoading: verifyLoading }] = useVerifyOtpMutation();
  const [resetPassword, { isLoading: resetLoading }] = useResetPasswordMutation();

  // ---------- RESET MODAL ON CLOSE ----------
  useEffect(() => {
    if (isOpen) {
      setFlow("login");
      setLoginData({ email: "", password: "" });
      setRegisterData({ name: "", email: "", password: "", confirmPassword: "" });
      setForgotEmail("");
      setOtpValues(Array(6).fill(""));
      setNewPassword("");
      setShowPassword(false);
      setShowRegPassword(false);
      setShowRegConfirm(false);
      setShowNewPassword(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ---------- LOGIN HANDLER ----------
  const handleLoginChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(loginData).unwrap();
      toast.success(res?.message || "Login successful");
      onClose();
      setTimeout(() => navigate("/admin/dashboard"), 300);
    } catch (error) {
      toast.error(error?.data?.message || error?.error || "Login failed");
    }
  };

  // ---------- REGISTER HANDLER ----------
  const handleRegisterChange = (e) => {
    setRegisterData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await registerUser({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
      }).unwrap();
      toast.success(res?.message || "Registration successful! Please login.");
      setFlow("login");
      setLoginData({ email: registerData.email, password: "" });
    } catch (error) {
      toast.error(error?.data?.message || error?.error || "Registration failed");
    }
  };

  // ---------- FORGOT PASSWORD – SEND OTP ----------
  const handleSendOtp = async () => {
    if (!forgotEmail.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgotEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      await forgotPassword({ email: forgotEmail }).unwrap();
      toast.success(`OTP sent to ${forgotEmail}`);
      setFlow("forgotOtp");
      setOtpValues(Array(6).fill(""));
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to send OTP");
    }
  };

  // ---------- FORGOT PASSWORD – VERIFY OTP ----------
  const handleVerifyOtp = async () => {
    const otpComplete = otpValues.every((digit) => digit.length === 1);
    if (!otpComplete) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }
    const otpCode = otpValues.join("");
    try {
      await verifyOtp({ email: forgotEmail, otp: otpCode }).unwrap();
      toast.success("OTP verified! Please set your new password.");
      setFlow("forgotReset");
    } catch (error) {
      toast.error(error?.data?.message || "Invalid OTP");
    }
  };

  const handleResendOtp = async () => {
    try {
      await forgotPassword({ email: forgotEmail }).unwrap();
      toast.success(`New OTP sent to ${forgotEmail}`);
      setOtpValues(Array(6).fill(""));
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to resend OTP");
    }
  };

  // ---------- FORGOT PASSWORD – RESET PASSWORD ----------
  const handleResetPassword = async () => {
    if (!newPassword.trim()) {
      toast.error("Please enter a new password");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    try {
      await resetPassword({
        email: forgotEmail,
        otp: otpValues.join(""),
        newPassword,
      }).unwrap();
      toast.success("Password reset successfully! Please login.");
      setFlow("login");
      setLoginData({ email: forgotEmail, password: "" });
      setForgotEmail("");
      setNewPassword("");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to reset password");
    }
  };

  // OTP input handlers
  const handleOtpChange = (index, value) => {
    const newValue = value.replace(/[^0-9]/g, "");
    if (newValue.length > 1) return;
    const newOtp = [...otpValues];
    newOtp[index] = newValue;
    setOtpValues(newOtp);
    if (newValue.length === 1 && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    const digits = pastedData.replace(/[^0-9]/g, "").slice(0, 6);
    const newOtp = [...otpValues];
    for (let i = 0; i < digits.length; i++) newOtp[i] = digits[i];
    setOtpValues(newOtp);
    const lastFilledIndex = Math.min(digits.length, 5);
    if (lastFilledIndex < 6) otpRefs.current[lastFilledIndex]?.focus();
    else otpRefs.current[5]?.blur();
  };

  // ---------- RENDER LOGIN ----------
  const renderLogin = () => (
    <>
      <h2 className="text-3xl font-extrabold text-center text-gray-900">Welcome Back</h2>
      <p className="text-sm text-gray-500 text-center mt-2">Login to continue shopping</p>

      <form onSubmit={handleLoginSubmit} className="space-y-4 mt-6">
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleLoginChange}
          placeholder="Email Address"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition"
          required
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
            placeholder="Password"
            className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        <p
          onClick={() => setFlow("forgotEmail")}
          className="mt-3 text-end text-[#C6181E] font-semibold cursor-pointer hover:underline"
        >
          Forgot password?
        </p>

        <button
          type="submit"
          disabled={loginLoading}
          className="w-full py-3 rounded-xl bg-[#C6181E] hover:bg-red-700 text-white font-semibold transition disabled:opacity-60"
        >
          {loginLoading ? "Please wait..." : "Login"}
        </button>

        <div className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => setFlow("register")}
            className="text-[#C6181E] font-semibold hover:underline"
          >
            Register
          </button>
        </div>
      </form>
    </>
  );

  // ---------- RENDER REGISTER ----------
  const renderRegister = () => (
    <>
      <h2 className="text-3xl font-extrabold text-center text-gray-900">Create Account</h2>
      <p className="text-sm text-gray-500 text-center mt-2">Sign up to get started</p>

      <form onSubmit={handleRegisterSubmit} className="space-y-4 mt-6">
        <input
          type="text"
          name="name"
          value={registerData.name}
          onChange={handleRegisterChange}
          placeholder="Full Name"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition"
          required
        />
        <input
          type="email"
          name="email"
          value={registerData.email}
          onChange={handleRegisterChange}
          placeholder="Email Address"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition"
          required
        />
        <div className="relative">
          <input
            type={showRegPassword ? "text" : "password"}
            name="password"
            value={registerData.password}
            onChange={handleRegisterChange}
            placeholder="Password"
            className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition"
            required
          />
          <button
            type="button"
            onClick={() => setShowRegPassword(!showRegPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showRegPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        <div className="relative">
          <input
            type={showRegConfirm ? "text" : "password"}
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={handleRegisterChange}
            placeholder="Confirm Password"
            className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition"
            required
          />
          <button
            type="button"
            onClick={() => setShowRegConfirm(!showRegConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showRegConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={registerLoading}
          className="w-full py-3 rounded-xl bg-[#C6181E] hover:bg-red-700 text-white font-semibold transition disabled:opacity-60"
        >
          {registerLoading ? "Creating account..." : "Register"}
        </button>

        <div className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setFlow("login")}
            className="text-[#C6181E] font-semibold hover:underline"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );

  // ---------- RENDER FORGOT EMAIL ----------
  const renderForgotEmail = () => (
    <>
      <button
        onClick={() => setFlow("login")}
        className="absolute left-4 top-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
        <ArrowLeft size={18} />
      </button>

      <h2 className="text-2xl font-bold text-center text-gray-900 mt-2">Forgot Password?</h2>
      <p className="text-sm text-gray-500 text-center mt-2">
        Enter your email address and we'll send you an OTP to reset your password.
      </p>

      <div className="mt-6 space-y-4">
        <input
          type="email"
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
          placeholder="Email Address"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition"
          autoFocus
        />
        <button
          onClick={handleSendOtp}
          disabled={forgotLoading}
          className="w-full py-3 rounded-xl bg-[#C6181E] hover:bg-red-700 text-white font-semibold transition disabled:opacity-60"
        >
          {forgotLoading ? "Sending..." : "Send OTP"}
        </button>
        <p className="text-center text-sm text-gray-500">
          Remember password?{" "}
          <button onClick={() => setFlow("login")} className="text-[#C6181E] font-semibold hover:underline">
            Back to Login
          </button>
        </p>
      </div>
    </>
  );

  // ---------- RENDER OTP VERIFICATION ----------
  const renderForgotOtp = () => (
    <>
      <button
        onClick={() => setFlow("forgotEmail")}
        className="absolute left-4 top-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
        <ArrowLeft size={18} />
      </button>

      <h2 className="text-2xl font-bold text-center text-gray-900 mt-2">Verify OTP</h2>
      <p className="text-sm text-gray-500 text-center mt-2">We've sent a 6-digit verification code to</p>
      <p className="text-sm font-medium text-center text-gray-700 bg-gray-100 py-1 px-3 rounded-full inline-block w-auto mx-auto mt-1">
        {forgotEmail}
      </p>

      <div className="mt-6">
        <div className="flex justify-center gap-3 flex-wrap" onPaste={handleOtpPaste}>
          {otpValues.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (otpRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(idx, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(idx, e)}
              className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition bg-white shadow-sm"
              autoFocus={idx === 0}
            />
          ))}
        </div>

        <div className="text-center mt-4">
          <button onClick={handleResendOtp} className="text-sm text-[#C6181E] font-medium hover:underline">
            Resend OTP
          </button>
        </div>

        <button
          onClick={handleVerifyOtp}
          disabled={verifyLoading}
          className="w-full mt-6 py-3 rounded-xl bg-[#C6181E] hover:bg-red-700 text-white font-semibold transition disabled:opacity-60"
        >
          {verifyLoading ? "Verifying..." : "Verify & Continue"}
        </button>
      </div>
    </>
  );

  // ---------- RENDER RESET PASSWORD ----------
  const renderForgotReset = () => (
    <>
      <button
        onClick={() => setFlow("forgotOtp")}
        className="absolute left-4 top-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
        <ArrowLeft size={18} />
      </button>

      <h2 className="text-2xl font-bold text-center text-gray-900 mt-2">Set New Password</h2>
      <p className="text-sm text-gray-500 text-center mt-2">Create a strong password for your account.</p>

      <div className="mt-6 space-y-4">
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none transition"
            required
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showNewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        <button
          onClick={handleResetPassword}
          disabled={resetLoading}
          className="w-full py-3 rounded-xl bg-[#C6181E] hover:bg-red-700 text-white font-semibold transition disabled:opacity-60"
        >
          {resetLoading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </>
  );

  // ---------- RENDER CURRENT FLOW ----------
  const renderContent = () => {
    switch (flow) {
      case "register":
        return renderRegister();
      case "forgotEmail":
        return renderForgotEmail();
      case "forgotOtp":
        return renderForgotOtp();
      case "forgotReset":
        return renderForgotReset();
      default:
        return renderLogin();
    }
  };

  // ---------- MODAL RETURN ----------
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-[92%] max-w-md rounded-3xl bg-white shadow-2xl p-8 z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center z-20"
          >
            <X size={18} />
          </button>

          <div className="flex justify-center mb-6">
            <img src={assets.newKrs} alt="Logo" className="h-20 w-auto object-contain" />
          </div>

          {renderContent()}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;