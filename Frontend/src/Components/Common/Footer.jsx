import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        
        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">KRS Lifeline</h2>
            <p className="text-gray-400 mt-3 text-sm leading-6">
              Your exclusive shopping destination for innovative, trending,
              and everyday useful products at affordable prices.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            
            <p className="text-gray-400 text-sm">
              📧 Business Email: krslifeline.info@gmail.com
            </p>

            <p className="text-gray-400 text-sm mt-2">
              📞 8190000668 | 9944968789
            </p>

            <p className="text-gray-400 text-sm mt-2">
              📍 331/12, 3rd Street Extension, Gandhipuram,
              Coimbatore - 641012
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>

            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <a
                href="https://www.instagram.com/krs_lifeline/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                Instagram
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61589577443192"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                Facebook
              </a>

              <a
                href="https://www.youtube.com/@KRSLIFELINE"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} KRS Lifeline. All rights reserved.</p>

          <p className="mt-2 md:mt-0">
            Built with ❤️ for better shopping experience
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;