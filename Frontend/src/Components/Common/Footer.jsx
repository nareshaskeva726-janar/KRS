import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";
import { assets } from "../../assets/assets";
import { useSubscribeNewsletterMutation } from "../../Store/APIS/krsApi"

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [subscribeNewsletter, { isLoading }] = useSubscribeNewsletterMutation();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email) return;

    try {
      await subscribeNewsletter({ email }).unwrap();
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    } catch (err) {
      // Handle error (e.g., duplicate email, server error)
      const message =
        err?.data?.message || "Subscription failed. Please try again.";
      setErrorMsg(message);
      setTimeout(() => setErrorMsg(""), 4000);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  const policyLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Refund Policy", path: "/refund" },
  ];

  const features = [
    { icon: "🚚", label: "Free Shipping", sub: "Orders above ₹499" },
    { icon: "🔄", label: "Easy Returns", sub: "7-day hassle-free" },
    { icon: "🔒", label: "Secure Payment", sub: "100% protected" },
    { icon: "💬", label: "24/7 Support", sub: "Always here for you" },
  ];

  return (
    <footer
      className="relative overflow-hidden text-gray-300"
      style={{ background: "linear-gradient(160deg, rgb(27 45 84) 0%, rgb(11 29 67) 50%, #040a17 100%)" }}
    >
      {/* ── Decorative background ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-red-700/10 blur-[120px]" />
        <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] rounded-full bg-red-600/8 blur-[100px]" />
        <div
          className="absolute top-0 right-0 w-px h-full opacity-10"
          style={{ background: "linear-gradient(180deg, transparent, #ef4444 40%, transparent)" }}
        />
      </div>

      {/* ── Main 4-column grid ── */}
      <div className="relative z-10 mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)_minmax(0,1.3fr)_minmax(0,1.1fr)] gap-10 xl:gap-12">

          {/* ── COL 1 · Brand ── */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3 w-fit group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#EDF3F8]/100 rounded-sm" />
                <img
                  src={assets.newKrs}
                  alt="KRS Lifeline"
                  className="relative w-30 h-14 object-contain"
                />
              </div>
            </Link>

            <p className="text-sm leading-[1.9] text-gray-400">
              Your trusted destination for premium appliances, trending products,
              and daily essentials — quality service at affordable pricing.
            </p>

            <div>
              <p className="text-[10px] uppercase tracking-[3px] text-gray-600 mb-3 font-semibold">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {[
                  { href: "https://www.instagram.com/krs_lifeline/", icon: <IoLogoInstagram size={18} />, label: "Instagram" },
                  { href: "https://www.facebook.com/profile.php?id=61589577443192", icon: <FaFacebookF size={15} />, label: "Facebook" },
                  { href: "https://www.youtube.com/@KRSLIFELINE", icon: <CiYoutube size={22} />, label: "YouTube" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="group relative w-11 h-11 rounded-xl flex items-center justify-center border border-white/[0.08] bg-white/[0.03] overflow-hidden transition-all duration-300 hover:border-red-500/50 hover:scale-105"
                  >
                    <span className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 group-hover:scale-110 transition-transform duration-200 text-gray-300 group-hover:text-white">
                      {s.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── COL 2 · Navigation ── */}
          <div className="flex flex-col gap-10">
            <div>
              <SectionHeading>Quick Links</SectionHeading>
              <ul className="mt-7 space-y-0 divide-y divide-white/[0.04]">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="group flex items-center justify-between py-3.5 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600/50 group-hover:bg-red-500 transition-colors" />
                        {link.name}
                      </span>
                      <ArrowUpRight
                        size={13}
                        className="opacity-0 group-hover:opacity-50 transition-opacity -translate-x-1 group-hover:translate-x-0 transition-transform duration-200"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── COL 3 · Contact ── */}
          <div>
            <SectionHeading>Contact Us</SectionHeading>
            <div className="mt-7 flex flex-col gap-0 divide-y divide-white/[0.05]">
              <ContactRow icon={<Mail size={17} />} label="Email">
                <a
                  href="mailto:krslifeline.info@gmail.com"
                  className="text-sm text-gray-400 hover:text-white transition break-all"
                >
                  krslifeline.info@gmail.com
                </a>
              </ContactRow>

              <ContactRow icon={<Phone size={17} />} label="Phone">
                <a href="tel:8190000668" className="block text-sm text-gray-400 hover:text-white transition">
                  +91 8190000668
                </a>
                <a href="tel:9944589789" className="block text-sm text-gray-400 hover:text-white transition mt-1">
                  +91 9944589789
                </a>
              </ContactRow>

              <ContactRow icon={<MapPin size={17} />} label="Address">
                <p className="text-sm text-gray-400 leading-[1.9]">
                  331/12, 3rd Street Extension,<br />
                  Gandhipuram,<br />
                  Coimbatore – 641012
                </p>
              </ContactRow>
            </div>
          </div>

          {/* ── COL 4 · Newsletter ── */}
          <div className="flex flex-col gap-5">
            <SectionHeading>Stay Updated</SectionHeading>
            <p className="text-sm leading-[1.9] text-gray-400 mt-2">
              Subscribe for exclusive deals, new arrivals, and offers delivered
              straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={isLoading}
                className="w-full h-[52px] rounded-2xl bg-white/[0.04] border border-white/[0.08] pl-5 pr-14 text-sm text-white placeholder-gray-600 outline-none focus:border-red-600/60 focus:bg-white/[0.06] transition-all duration-300 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute top-1/2 right-2 -translate-y-1/2 w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg shadow-red-900/40 disabled:opacity-60 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <Send size={15} className="text-white" />
                )}
              </button>
            </form>

            {/* Success message */}
            {subscribed && (
              <p className="text-xs text-green-400 animate-fadeIn">
                ✓ You're subscribed! Thanks.
              </p>
            )}

            {/* Error message */}
            {errorMsg && (
              <p className="text-xs text-red-400 animate-fadeIn">
                ⚠ {errorMsg}
              </p>
            )}

            {/* Trust badge */}
            <div className="p-4 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-red-900/10 to-transparent relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-red-600/10 blur-2xl" />
              <div className="relative flex items-start gap-3">
                <span className="text-xl mt-0.5">⭐</span>
                <p className="text-xs leading-[1.8] text-gray-400">
                  <span className="text-white font-semibold">Trusted across India.</span>{" "}
                  Premium quality products with lightning-fast support you can count on.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-14 pt-6 border-t border-white/[0.06]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()}{" "}
              <span className="text-gray-400 font-medium">KRS Lifeline</span>. All rights reserved.
            </p>
            <div className="hidden md:block h-px flex-1 mx-8 bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ── Helpers ── */

const SectionHeading = ({ children }) => (
  <h3 className="relative inline-block text-white text-[14px] font-bold tracking-widest uppercase">
    {children}
    <span className="absolute -bottom-2 left-0 w-8 h-[3px] rounded-full bg-gradient-to-r from-red-500 to-red-700" />
  </h3>
);

const ContactRow = ({ icon, label, children }) => (
  <div className="flex items-start gap-4 py-5 first:pt-0 last:pb-0">
    <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center shrink-0 text-red-500 hover:bg-red-600/10 transition mt-0.5">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] uppercase tracking-[2.5px] text-gray-600 mb-1.5 font-semibold">
        {label}
      </p>
      {children}
    </div>
  </div>
);

export default Footer;