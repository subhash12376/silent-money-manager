"use client";

import Link from 'next/link';
import { FiGithub, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">Silent Money</h3>
            <p className="text-gray-300 mb-4">
              Visualize and understand your finances with our free money management tools
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent" aria-label="Twitter">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent" aria-label="Instagram">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent" aria-label="LinkedIn">
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent" aria-label="GitHub">
                <FiGithub size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/strategy" className="text-gray-300 hover:text-white">
                  Strategy
                </Link>
              </li>
              <li>
                <Link href="/budget" className="text-gray-300 hover:text-white">
                  Budget
                </Link>
              </li>
              <li>
                <Link href="/reports" className="text-gray-300 hover:text-white">
                  Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-gray-300 hover:text-white">
                  Financial Guides
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Silent Money. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 