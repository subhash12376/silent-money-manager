"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiEdit2, FiCheck, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Hero = () => {
  // State for editable values
  const [income, setIncome] = useState<number>(352000);
  const [expenses, setExpenses] = useState<number>(178000);
  const [balance, setBalance] = useState<number>(1058500.12);
  const [profitMargin, setProfitMargin] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // State for survey
  const [age, setAge] = useState<number>(30);
  const [yearlyEarning, setYearlyEarning] = useState<number>(600000);
  const [yearlySpending, setYearlySpending] = useState<number>(420000);
  const [yearlyInvestment, setYearlyInvestment] = useState<number>(120000);
  const [surveyComplete, setSurveyComplete] = useState<boolean>(false);
  
  // Format numbers with commas for Indian numbering system
  const formatIndianNumber = (num: number): string => {
    return num.toLocaleString('en-IN');
  };

  // Calculate profit margin when income or expenses change
  useEffect(() => {
    if (income > 0) {
      const margin = ((income - expenses) / income) * 100;
      setProfitMargin(Number(margin.toFixed(2)));
    } else {
      setProfitMargin(0);
    }
    
    // Update balance when income or expenses change
    setBalance(prevBalance => prevBalance + (income - expenses - prevBalance / 12));
  }, [income, expenses]);
  
  // Calculate gain/loss from survey
  const calculateSurveyResults = () => {
    setSurveyComplete(true);
    // Update yearly values based on survey inputs
    setIncome(yearlyEarning / 12);
    setExpenses(yearlySpending / 12);
  };
  
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="container-custom py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your Money, <br />
              <span className="text-accent">Managed Silently</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-lg">
              Take control of your finances with our intelligent money management platform. Track expenses, create budgets, and reach your financial goals.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link href="/dashboard" className="btn btn-accent bg-accent text-white hover:bg-opacity-90 text-center">
                Start Here
              </Link>
              <Link href="/learn-more" className="btn bg-white text-indigo-600 hover:bg-opacity-90 text-center">
                Learn More
              </Link>
            </div>
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />
                ))}
              </div>
              <p className="text-sm opacity-90">
                Join thousands of users exploring financial management
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-white bg-opacity-10 rounded-full filter blur-xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent bg-opacity-20 rounded-full filter blur-xl"></div>
              
              {/* Dashboard with 3D Effects */}
              <motion.div 
                className="relative bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl border border-white border-opacity-20 shadow-2xl p-8"
                initial={{ rotateX: 5, rotateY: -5 }}
                whileHover={{ rotateX: 0, rotateY: 0, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                <div className="flex justify-between items-center mb-6">
                  <motion.h3 
                    className="text-xl font-bold"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    Dashboard Overview
                  </motion.h3>
                  <div className="flex items-center space-x-2">
                    <motion.span 
                      className="text-xs bg-green-500 text-white px-2 py-1 rounded-full"
                      style={{ transform: "translateZ(15px)" }}
                    >
                      Demo
                    </motion.span>
                    <motion.button 
                      onClick={() => setIsEditing(!isEditing)} 
                      className="p-1 bg-white bg-opacity-20 rounded-full"
                      aria-label={isEditing ? "Save changes" : "Edit dashboard"}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ transform: "translateZ(25px)" }}
                    >
                      {isEditing ? (
                        <FiCheck className="h-4 w-4 text-white" />
                      ) : (
                        <FiEdit2 className="h-4 w-4 text-white" />
                      )}
                    </motion.button>
                  </div>
                </div>
                
                {/* Quick Survey with 3D Effect */}
                <motion.div 
                  className="bg-white bg-opacity-20 rounded-lg p-4 mb-4"
                  style={{ transform: "translateZ(10px)" }}
                >
                  <motion.h4 
                    className="font-semibold mb-2"
                    style={{ transform: "translateZ(5px)" }}
                  >
                    Quick Financial Survey
                  </motion.h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs opacity-70 block">1. Your Age</label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="bg-transparent text-sm border-b border-white border-opacity-30 focus:outline-none focus:border-white w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs opacity-70 block">2. Yearly Earnings (₹)</label>
                      <input
                        type="number"
                        value={yearlyEarning}
                        onChange={(e) => setYearlyEarning(Number(e.target.value))}
                        className="bg-transparent text-sm border-b border-white border-opacity-30 focus:outline-none focus:border-white w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs opacity-70 block">3. Yearly Spending (₹)</label>
                      <input
                        type="number"
                        value={yearlySpending}
                        onChange={(e) => setYearlySpending(Number(e.target.value))}
                        className="bg-transparent text-sm border-b border-white border-opacity-30 focus:outline-none focus:border-white w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs opacity-70 block">4. Yearly Investment (₹)</label>
                      <input
                        type="number"
                        value={yearlyInvestment}
                        onChange={(e) => setYearlyInvestment(Number(e.target.value))}
                        className="bg-transparent text-sm border-b border-white border-opacity-30 focus:outline-none focus:border-white w-full"
                      />
                    </div>
                    <motion.button
                      onClick={calculateSurveyResults}
                      className="bg-accent text-white text-sm py-2 px-4 rounded w-full hover:bg-opacity-90"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{ transform: "translateZ(15px)" }}
                    >
                      Calculate
                    </motion.button>
                    
                    {surveyComplete && (
                      <motion.div 
                        className="mt-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-2 gap-2">
                          <motion.div 
                            className="bg-white bg-opacity-10 p-2 rounded"
                            whileHover={{ scale: 1.05 }}
                            style={{ transform: "translateZ(20px)" }}
                          >
                            <p className="text-xs opacity-70">Net Savings</p>
                            <p className="font-semibold">₹{formatIndianNumber(yearlyEarning - yearlySpending)}</p>
                          </motion.div>
                          <motion.div 
                            className="bg-white bg-opacity-10 p-2 rounded"
                            whileHover={{ scale: 1.05 }}
                            style={{ transform: "translateZ(20px)" }}
                          >
                            <p className="text-xs opacity-70">Investment Ratio</p>
                            <p className="font-semibold">{((yearlyInvestment / yearlyEarning) * 100).toFixed(1)}%</p>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                <div className="space-y-4">
                  <motion.div 
                    className="bg-white bg-opacity-20 rounded-lg p-4"
                    style={{ transform: "translateZ(15px)" }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs opacity-70">Total Balance</p>
                        {isEditing ? (
                          <input
                            type="number"
                            value={balance}
                            onChange={(e) => setBalance(Number(e.target.value))}
                            className="bg-transparent text-lg font-bold focus:outline-none w-full"
                          />
                        ) : (
                          <p className="text-2xl font-bold">₹{formatIndianNumber(balance)}</p>
                        )}
                      </div>
                      <motion.div 
                        className="h-10 w-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ transform: "translateZ(25px)" }}
                      >
                        <span className="text-xl font-semibold">₹</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div 
                      className="bg-white bg-opacity-20 rounded-lg p-4"
                      style={{ transform: "translateZ(15px)" }}
                    >
                      <p className="text-xs opacity-70">Income</p>
                      {isEditing ? (
                        <input
                          type="number"
                          value={income}
                          onChange={(e) => setIncome(Number(e.target.value))}
                          className="bg-transparent font-bold focus:outline-none w-full"
                        />
                      ) : (
                        <p className="text-lg font-bold">₹{formatIndianNumber(income)}</p>
                      )}
                    </motion.div>
                    <motion.div 
                      className="bg-white bg-opacity-20 rounded-lg p-4"
                      style={{ transform: "translateZ(15px)" }}
                    >
                      <p className="text-xs opacity-70">Expenses</p>
                      {isEditing ? (
                        <input
                          type="number"
                          value={expenses}
                          onChange={(e) => setExpenses(Number(e.target.value))}
                          className="bg-transparent font-bold focus:outline-none w-full"
                        />
                      ) : (
                        <p className="text-lg font-bold">₹{formatIndianNumber(expenses)}</p>
                      )}
                    </motion.div>
                  </div>

                  <motion.div 
                    className="bg-white bg-opacity-20 rounded-lg p-4"
                    style={{ transform: "translateZ(15px)" }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs opacity-70">Profit Margin</p>
                      <p className="text-sm font-semibold">{profitMargin}%</p>
                    </div>
                    <div className="relative w-full h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                      <motion.div 
                        className={`absolute top-0 left-0 h-full rounded-full ${
                          profitMargin > 50 ? 'bg-green-400' : profitMargin > 20 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        initial={{ width: '0%' }}
                        animate={{ width: `${Math.max(0, Math.min(profitMargin, 100))}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="mt-4 text-center"
                    whileHover={{ scale: 1.05 }}
                    style={{ transform: "translateZ(10px)" }}
                  >
                    <Link href="/dashboard" className="text-xs opacity-80 hover:opacity-100 underline">
                      View Full Dashboard & Calculators
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 