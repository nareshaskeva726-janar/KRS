import React from "react";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send,
} from "lucide-react";

import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Contact", path: "/contact" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#050505] text-gray-300 border-t border-white/10">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-red-600/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-500/10 blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* BRAND SECTION */}
          <div className="space-y-6">
            <Link
              to="/"
              className="flex items-center gap-3 w-fit"
            >
              <img
                src={assets.logoTwo}
                alt="KRS Lifeline"
                className="w-16 h-16 object-contain"
              />

              <div>
                <h1 className="text-xl font-bold tracking-[3px] text-white">
                  KRS{" "}
                  <span className="text-red-500">
                    LIFELINE
                  </span>
                </h1>

                <p className="text-[11px] tracking-[4px] text-gray-500 mt-1">
                  ECOMMERCE
                </p>
              </div>
            </Link>

            <p className="text-sm leading-7 text-gray-4=300 max-w-sm">
              Your trusted destination for premium
              appliances, trending products, and daily
              essentials with quality service and affordable
              pricing.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/krs_lifeline/"
                target="_blank"
                rel="noreferrer"
                className="group w-11 h-11 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300"
              >
                <IoLogoInstagram
                  size={20}
                  className="group-hover:scale-110 transition"
                />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61589577443192"
                target="_blank"
                rel="noreferrer"
                className="group w-11 h-11 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300"
              >
                <FaFacebookF
                  size={17}
                  className="group-hover:scale-110 transition"
                />
              </a>

              <a
                href="https://www.youtube.com/@KRSLIFELINE"
                target="_blank"
                rel="noreferrer"
                className="group w-11 h-11 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300"
              >
                <CiYoutube
                  size={24}
                  className="group-hover:scale-110 transition"
                />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-7 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-[3px] rounded-full bg-red-600" />
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-3 text-sm hover:text-white transition"
                  >
                    <ArrowRight
                      size={16}
                      className="text-red-500 group-hover:translate-x-1 transition"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-7 relative inline-block">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-12 h-[3px] rounded-full bg-red-600" />
            </h3>

            <div className="space-y-5">
              {/* EMAIL */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                  <Mail
                    size={18}
                    className="text-red-500"
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[2px] text-gray-500 mb-1">
                    Email
                  </p>

                  <a
                    href="mailto:krslifeline.info@gmail.com"
                    className="text-sm text-gray-300 hover:text-white transition"
                  >
                    krslifeline.info@gmail.com
                  </a>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                  <Phone
                    size={18}
                    className="text-red-500"
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[2px] text-gray-500 mb-1">
                    Phone
                  </p>

                  <a
                    href="tel:8190000668"
                    className="block text-sm hover:text-white transition"
                  >
                    +91 8190000668
                  </a>

                  <a
                    href="tel:9944968789"
                    className="block text-sm hover:text-white transition"
                  >
                    +91 9944968789
                  </a>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin
                    size={18}
                    className="text-red-500"
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[2px] text-gray-500 mb-1">
                    Address
                  </p>

                  <p className="text-sm leading-6">
                    331/12, 3rd Street Extension,
                    <br />
                    Gandhipuram,
                    <br />
                    Coimbatore - 641012
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-7 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-12 h-[3px] rounded-full bg-red-600" />
            </h3>

            <p className="text-sm leading-7 text-gray-300">
              Subscribe to get updates about latest
              products, offers, and exclusive deals.
            </p>

            {/* INPUT */}
            <div className="mt-6">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-14 rounded-2xl bg-white/[0.04] border border-white/10 pl-5 pr-14 text-sm outline-none focus:border-red-600 transition"
                />

                <button className="absolute top-1/2 right-2 -translate-y-1/2 w-10 h-10 rounded-xl text-white bg-red-600 hover:bg-red-700 flex items-center justify-center transition">
                  <Send size={17} />
                </button>
              </div>
            </div>

            {/* CARD */}
            <div className="mt-6 p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl">
              <p className="text-sm leading-7 text-gray-300">
                ⭐ Trusted by customers for premium quality
                products and fast customer support across
                India.
              </p>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 mt-14 pt-6">
          <div className="flex flex-col  items-center justify-between gap-4 text-sm">
            <p className="text-gray-300 text-center">
              © {new Date().getFullYear()} KRS Lifeline.
              All rights reserved.
            </p>

            {/* <p className="text-gray-500 text-center md:text-right">
              Designed for modern shopping experience ✨
            </p> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;