import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-[#0b0b0f] min-h-screen text-white">

      {/* HERO */}
      <div className="relative py-20 text-center overflow-hidden">

        {/* Glow */}
        <div className="absolute inset-0">
          <div className="absolute w-[400px] h-[400px] bg-red-600/30 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
          <div className="absolute w-[400px] h-[400px] bg-white/10 blur-[120px] rounded-full bottom-[-120px] right-[-120px]" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold relative"
        >
          Contact <span className="text-red-500">KRS Lifeline</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mt-3 relative"
        >
          We’d love to hear from you anytime
        </motion.p>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-10">

        {/* FORM */}
        <motion.form
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-[#14141a] border border-white/10 p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-semibold mb-6 text-red-500">
            Send Message
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full h-12 px-4 bg-black/40 border border-white/10 rounded-xl focus:border-red-500 outline-none"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full h-12 px-4 bg-black/40 border border-white/10 rounded-xl focus:border-red-500 outline-none"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-red-500 outline-none"
              required
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full h-12 bg-red-600 hover:bg-red-700 rounded-xl font-semibold"
            >
              Send Message
            </motion.button>
          </div>
        </motion.form>

        {/* INFO PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#14141a] to-black border border-white/10 p-8 rounded-2xl"
        >

          <h2 className="text-2xl font-semibold text-red-500 mb-6">
            Get in Touch
          </h2>

          <div className="space-y-6 text-gray-300 text-sm">

            <div className="flex items-start gap-3">
              <Mail className="text-red-500" />
              <span>krslifeline.info@gmail.com</span>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="text-red-500" />
              <span>8190000668 | 9944968789</span>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-red-500" />
              <span>
                331/12, 3rd Street Extension, Gandhipuram, Coimbatore - 641012
              </span>
            </div>
          </div>

          {/* SOCIAL */}
          <div className="mt-8">
            <h3 className="text-white font-semibold mb-3">Follow Us</h3>

            <div className="flex gap-4 text-xl">

              <a
                href="https://www.instagram.com/krs_lifeline/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram className="hover:text-red-500 transition" />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61589577443192"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook className="hover:text-red-500 transition" />
              </a>

              <a
                href="https://www.youtube.com/@KRSLIFELINE"
                target="_blank"
                rel="noreferrer"
              >
                <FaYoutube className="hover:text-red-500 transition" />
              </a>

            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;