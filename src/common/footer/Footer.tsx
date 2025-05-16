import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-5 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold">Fashion Store</h2>
          <p className="text-gray-400 mt-2">
            Discover the latest fashion trends with us. Quality, comfort, and
            style in one place!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-orange-500 pb-1 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white transition">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-orange-500 pb-1 mb-3">
            Customer Service
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="/faqs" className="hover:text-white transition">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-white transition">
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-white transition">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-orange-500 pb-1 mb-3">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <Link href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-blue-500 text-xl">
              <FaFacebookF />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-blue-500 text-xl">
              <FaTwitter />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-blue-500 text-xl">
              <FaInstagram />
            </Link>
            <Link href="https://youtube.com" target="_blank" className="text-gray-400 hover:text-blue-500 text-xl">
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Fashion Store. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
