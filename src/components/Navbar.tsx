"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiCreditCard, FiPieChart, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative h-8 w-8">
              <FiCreditCard className="h-8 w-8 text-primary" />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold">₹</span>
            </div>
            <span className="text-2xl font-bold text-dark">Silent Money</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-gray-700 hover:text-primary font-medium">
              Dashboard
            </Link>
            <Link href="/strategy" className="text-gray-700 hover:text-primary font-medium">
              Strategy
            </Link>
            <Link href="/budget" className="text-gray-700 hover:text-primary font-medium">
              Budget
            </Link>
            <Link href="/reports" className="text-gray-700 hover:text-primary font-medium">
              Reports
            </Link>
          </div>

          {/* Start Here Button */}
          <div className="hidden md:flex items-center">
            <Link href="/dashboard" className="btn btn-primary">
              Start Here
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/dashboard" 
                className="text-gray-700 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="/strategy" 
                className="text-gray-700 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Strategy
              </Link>
              <Link 
                href="/budget" 
                className="text-gray-700 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Budget
              </Link>
              <Link 
                href="/reports" 
                className="text-gray-700 hover:text-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Reports
              </Link>
              <Link 
                href="/dashboard" 
                className="btn btn-primary w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Start Here
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 