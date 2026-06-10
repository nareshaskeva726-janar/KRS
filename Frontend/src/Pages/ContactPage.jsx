import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

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
    <div className="bg-white min-h-screen overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative py-24 px-6">
        {/* Background Blur */}
        {/* <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-red-100 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-red-50 rounded-full blur-3xl opacity-80" /> */}

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center relative z-10">
          {/* LEFT CONTENT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#C6181E] text-xs font-bold tracking-widest uppercase">
              Contact Us
            </span>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mt-6 leading-tight text-[#003B93]"
            >
              Let's Build Something
              <span className="block text-[#c90202]">Amazing Together</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-gray-600 mt-6 leading-7 max-w-xl"
            >
              Have questions about products, orders, or services? Our team is
              always ready to help you with quick support and premium customer
              experience.
            </motion.p>

            {/* CONTACT INFO */}
            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <Mail className="text-red-600" />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">Email Us</h4>
                  <p className="text-gray-600">
                    krslifeline.info@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <Phone className="text-red-600" />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">Call Us</h4>
                  <p className="text-gray-600">
                    8190000668 | 9944589789
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <MapPin className="text-red-600" />
                </div>

                <div className="w-full">
                  <h4 className="font-semibold text-gray-900">Visit Us</h4>

                  <p className="text-gray-600 max-w-md mb-3">
                    331/12, 3rd Street Extension, Gandhipuram, Coimbatore - 641012
                  </p>

                  {/* GOOGLE MAP */}
                  <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md">
                    <iframe
                      title="KRS Lifeline Location"
                      src="https://www.google.com/maps?q=Gandhipuram,Coimbatore&output=embed"
                      className="w-full h-48"
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-10">
              <a
                href="https://www.instagram.com/krs_lifeline/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61589577443192"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                <FaFacebook size={20} />
              </a>

              <a
                href="https://www.youtube.com/@KRSLIFELINE"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 md:p-10"
          >
            <h2 className="text-3xl font-bold text-[#003B93]">
              Send <span className="text-[#C6181E]">Message</span>
            </h2>

            <p className="text-gray-600 mt-3">
              Fill out the form and our team will contact you shortly.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full h-12 mt-2 px-4 rounded-xl border border-gray-300 focus:border-red-600 outline-none transition"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full h-12 mt-2 px-4 rounded-xl border border-gray-300 focus:border-red-600 outline-none transition"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>

                <textarea
                  name="message"
                  rows="5"
                  placeholder="Write your message..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 focus:border-red-600 outline-none transition resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full h-12 rounded-xl bg-[#c90202] text-white font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition"
              >
                <Send size={18} />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;