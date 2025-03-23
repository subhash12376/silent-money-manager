"use client";

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import { FiBarChart2, FiCreditCard, FiUsers } from 'react-icons/fi';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      
      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Thousands</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience how thousands of users visualize and manage their finances with Silent Money
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <FiUsers className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Active Users</p>
            </div>
            
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <FiCreditCard className="h-12 w-12 text-primary" />
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-primary">₹</span>
                </div>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">₹4150Cr+</h3>
              <p className="text-gray-600">Finances Visualized</p>
            </div>
            
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <FiBarChart2 className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">95%</h3>
              <p className="text-gray-600">User Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-dark text-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-8 lg:mb-0 lg:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to visualize your finances?</h2>
              <p className="text-lg text-gray-300">
                Start using our free platform today and discover how Silent Money can help you understand your spending patterns.
              </p>
            </div>
            <div className="w-full lg:w-auto">
              <a href="/dashboard" className="btn bg-accent text-white hover:bg-opacity-90 block text-center w-full lg:w-auto">
                Start Here
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 