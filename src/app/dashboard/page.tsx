"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiBarChart2, FiPieChart, FiTrendingUp, FiInfo, FiDollarSign, FiHome, FiAward, FiTarget } from 'react-icons/fi';

const Dashboard = () => {
  // State for survey
  const [age, setAge] = useState<number>(30);
  const [yearlyEarning, setYearlyEarning] = useState<number>(600000);
  const [yearlySpending, setYearlySpending] = useState<number>(420000);
  const [yearlyInvestment, setYearlyInvestment] = useState<number>(120000);
  const [surveyComplete, setSurveyComplete] = useState<boolean>(false);
  
  // State for calculators
  const [sipAmount, setSipAmount] = useState<number>(5000);
  const [sipYears, setSipYears] = useState<number>(10);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipResult, setSipResult] = useState<number>(0);
  
  const [swpPrincipal, setSwpPrincipal] = useState<number>(1000000);
  const [swpWithdrawal, setSwpWithdrawal] = useState<number>(8000);
  const [swpYears, setSwpYears] = useState<number>(15);
  const [swpRate, setSwpRate] = useState<number>(8);
  const [swpResult, setSwpResult] = useState<number>(0);
  
  const [mfAmount, setMfAmount] = useState<number>(100000);
  const [mfYears, setMfYears] = useState<number>(5);
  const [mfRate, setMfRate] = useState<number>(14);
  const [mfResult, setMfResult] = useState<number>(0);
  
  const [fdAmount, setFdAmount] = useState<number>(100000);
  const [fdYears, setFdYears] = useState<number>(5);
  const [fdRate, setFdRate] = useState<number>(7);
  const [fdResult, setFdResult] = useState<number>(0);
  
  // Format numbers with commas for Indian numbering system
  const formatIndianNumber = (num: number): string => {
    return num.toLocaleString('en-IN');
  };
  
  // Calculate gain/loss from survey
  const calculateSurveyResults = () => {
    setSurveyComplete(true);
  };
  
  // SIP calculator
  const calculateSIP = () => {
    const monthlyRate = sipRate / 12 / 100;
    const months = sipYears * 12;
    const futureValue = sipAmount * ((Math.pow((1 + monthlyRate), months) - 1) / monthlyRate) * (1 + monthlyRate);
    setSipResult(futureValue);
  };
  
  // SWP calculator
  const calculateSWP = () => {
    const monthlyRate = swpRate / 12 / 100;
    const months = swpYears * 12;
    let principal = swpPrincipal;
    
    for (let i = 0; i < months; i++) {
      principal = (principal - swpWithdrawal) * (1 + monthlyRate);
    }
    
    setSwpResult(principal);
  };
  
  // Mutual Fund calculator
  const calculateMF = () => {
    const futureValue = mfAmount * Math.pow((1 + mfRate / 100), mfYears);
    setMfResult(futureValue);
  };
  
  // FD calculator
  const calculateFD = () => {
    const futureValue = fdAmount * Math.pow((1 + fdRate / 100), fdYears);
    setFdResult(futureValue);
  };

  return (
    <main>
      <Navbar />
      
      <div className="bg-light py-10">
        <div className="container-custom">
          <div className="flex items-center mb-6">
            <Link href="/" className="flex items-center text-primary hover:text-opacity-80">
              <FiArrowLeft className="mr-2" />
              Back to Home
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold mb-8">Financial Dashboard</h1>
          
          {/* Financial Survey */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiInfo className="mr-2 text-primary" />
              Financial Profile Survey
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">1. Your Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">2. Yearly Earnings (₹)</label>
                    <input
                      type="number"
                      value={yearlyEarning}
                      onChange={(e) => setYearlyEarning(Number(e.target.value))}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">3. Yearly Spending (₹)</label>
                    <input
                      type="number"
                      value={yearlySpending}
                      onChange={(e) => setYearlySpending(Number(e.target.value))}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">4. Yearly Investment (₹)</label>
                    <input
                      type="number"
                      value={yearlyInvestment}
                      onChange={(e) => setYearlyInvestment(Number(e.target.value))}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={calculateSurveyResults}
                    className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90 w-full"
                  >
                    Calculate Financial Profile
                  </button>
                </div>
              </div>
              
              <div>
                {surveyComplete ? (
                  <div className="bg-gray-50 p-6 rounded-lg h-full">
                    <h3 className="font-semibold mb-4">Your Financial Summary</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600">Net Annual Savings</p>
                        <p className="text-2xl font-bold text-primary">₹{formatIndianNumber(yearlyEarning - yearlySpending)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Monthly Savings</p>
                        <p className="text-xl font-bold">₹{formatIndianNumber(Math.round((yearlyEarning - yearlySpending) / 12))}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Investment Ratio</p>
                        <div className="flex items-center">
                          <div className="flex-grow bg-gray-200 rounded-full h-2.5 mr-2">
                            <div 
                              className="bg-primary h-2.5 rounded-full" 
                              style={{ width: `${Math.min(yearlyInvestment / yearlyEarning * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold">{((yearlyInvestment / yearlyEarning) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Spending Ratio</p>
                        <div className="flex items-center">
                          <div className="flex-grow bg-gray-200 rounded-full h-2.5 mr-2">
                            <div 
                              className="bg-accent h-2.5 rounded-full" 
                              style={{ width: `${Math.min(yearlySpending / yearlyEarning * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold">{((yearlySpending / yearlyEarning) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-500 text-center">Complete your financial profile to see your summary and personalized recommendations</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Calculators and 3D Models */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Left Column - Calculators */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-2">Financial Calculators</h2>
              
              {/* SIP Calculator */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <FiTrendingUp className="mr-2 text-primary" />
                  SIP Calculator
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Monthly Investment (₹)</label>
                    <input
                      type="number"
                      value={sipAmount}
                      onChange={(e) => setSipAmount(Number(e.target.value))}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Investment Period (Years)</label>
                    <input
                      type="number"
                      value={sipYears}
                      onChange={(e) => setSipYears(Number(e.target.value))}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Expected Annual Return (%)</label>
                    <input
                      type="number"
                      value={sipRate}
                      onChange={(e) => setSipRate(Number(e.target.value))}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={calculateSIP}
                    className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90 w-full"
                  >
                    Calculate
                  </button>
                  
                  {sipResult > 0 && (
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Total Investment</p>
                          <p className="text-lg font-semibold">₹{formatIndianNumber(sipAmount * sipYears * 12)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Estimated Returns</p>
                          <p className="text-lg font-semibold">₹{formatIndianNumber(Math.round(sipResult - (sipAmount * sipYears * 12)))}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-600">Future Value</p>
                        <p className="text-2xl font-bold text-primary">₹{formatIndianNumber(Math.round(sipResult))}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* FD Calculator */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <FiBarChart2 className="mr-2 text-primary" />
                  Fixed Deposit Calculator
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Principal Amount (₹)</label>
                    <input
                      type="number"
                      value={fdAmount}
                      onChange={(e) => setFdAmount(Number(e.target.value))}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Time Period (Years)</label>
                    <input
                      type="number"
                      value={fdYears}
                      onChange={(e) => setFdYears(Number(e.target.value))}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Interest Rate (%)</label>
                    <input
                      type="number"
                      value={fdRate}
                      onChange={(e) => setFdRate(Number(e.target.value))}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={calculateFD}
                    className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90 w-full"
                  >
                    Calculate
                  </button>
                  
                  {fdResult > 0 && (
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Principal Amount</p>
                          <p className="text-lg font-semibold">₹{formatIndianNumber(fdAmount)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Interest Earned</p>
                          <p className="text-lg font-semibold">₹{formatIndianNumber(Math.round(fdResult - fdAmount))}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-600">Maturity Value</p>
                        <p className="text-2xl font-bold text-primary">₹{formatIndianNumber(Math.round(fdResult))}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Mutual Fund Calculator */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <FiPieChart className="mr-2 text-primary" />
                  Mutual Fund Calculator
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Investment Amount (₹)</label>
                    <input
                      type="number"
                      value={mfAmount}
                      onChange={(e) => setMfAmount(Number(e.target.value))}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Investment Period (Years)</label>
                    <input
                      type="number"
                      value={mfYears}
                      onChange={(e) => setMfYears(Number(e.target.value))}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Expected Annual Return (%)</label>
                    <input
                      type="number"
                      value={mfRate}
                      onChange={(e) => setMfRate(Number(e.target.value))}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={calculateMF}
                    className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90 w-full"
                  >
                    Calculate
                  </button>
                  
                  {mfResult > 0 && (
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Principal Amount</p>
                          <p className="text-lg font-semibold">₹{formatIndianNumber(mfAmount)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Returns</p>
                          <p className="text-lg font-semibold">₹{formatIndianNumber(Math.round(mfResult - mfAmount))}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-600">Future Value</p>
                        <p className="text-2xl font-bold text-primary">₹{formatIndianNumber(Math.round(mfResult))}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* SWP Calculator */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <FiBarChart2 className="mr-2 text-primary" />
                  Systematic Withdrawal Plan (SWP)
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Principal Amount (₹)</label>
                    <input
                      type="number"
                      value={swpPrincipal}
                      onChange={(e) => setSwpPrincipal(Number(e.target.value))}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Monthly Withdrawal (₹)</label>
                    <input
                      type="number"
                      value={swpWithdrawal}
                      onChange={(e) => setSwpWithdrawal(Number(e.target.value))}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Time Period (Years)</label>
                    <input
                      type="number"
                      value={swpYears}
                      onChange={(e) => setSwpYears(Number(e.target.value))}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Expected Return (%)</label>
                    <input
                      type="number"
                      value={swpRate}
                      onChange={(e) => setSwpRate(Number(e.target.value))}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={calculateSWP}
                    className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90 w-full"
                  >
                    Calculate
                  </button>
                  
                  {swpResult > 0 && (
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Total Withdrawal</p>
                          <p className="text-lg font-semibold">₹{formatIndianNumber(swpWithdrawal * swpYears * 12)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Principal</p>
                          <p className="text-lg font-semibold">₹{formatIndianNumber(swpPrincipal)}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-600">Remaining Balance</p>
                        <p className="text-2xl font-bold text-primary">₹{formatIndianNumber(Math.round(swpResult))}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right Column - 3D Financial Models */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-2">Financial Success Models</h2>
              
              {/* 3D Money Growth Chart */}
              <motion.div 
                className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg p-6 h-80 overflow-hidden relative"
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <h3 className="font-semibold mb-2">Investment Growth</h3>
                <p className="text-sm opacity-80 mb-4">Visualize the growth of your investment over time</p>
                
                <div className="relative h-48">
                  {/* 3D Bar Chart */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around h-full">
                    {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                      <motion.div
                        key={index}
                        className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-t-md w-8 mx-1"
                        style={{ 
                          height: `${15 + index * 10}%`,
                          transformStyle: "preserve-3d",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                        }}
                        initial={{ height: 0 }}
                        animate={{ height: `${15 + index * 10}%` }}
                        transition={{ delay: index * 0.1, duration: 0.7, ease: "easeOut" }}
                        whileHover={{ 
                          z: 20,
                          backgroundColor: "rgba(255, 255, 255, 0.5)"
                        }}
                      >
                        <motion.div 
                          className="absolute -top-6 left-0 w-full text-center text-xs font-bold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                        >
                          ₹{(50000 * (index + 1)).toLocaleString('en-IN')}
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* X Axis */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white bg-opacity-50"></div>
                  
                  {/* Year Labels */}
                  <div className="absolute -bottom-5 left-0 right-0 flex justify-around">
                    {[1, 2, 3, 4, 5, 6, 7].map((year, index) => (
                      <div key={index} className="text-xs opacity-90">Y{year}</div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* 3D Coin Stack Model */}
              <motion.div 
                className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-lg p-6 h-64 relative"
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: -5
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <h3 className="font-semibold mb-2 text-white">Wealth Accumulation</h3>
                <p className="text-sm text-white opacity-80 mb-4">Watch your wealth grow with consistent saving</p>
                
                <div className="flex justify-center items-center h-36">
                  <div className="relative">
                    {/* Coin Stack */}
                    {[...Array(12)].map((_, index) => (
                      <motion.div
                        key={index}
                        className="absolute w-20 h-20 rounded-full bg-yellow-300 border-4 border-yellow-200 flex items-center justify-center"
                        style={{ 
                          top: `-${index * 6}px`, 
                          zIndex: 12 - index,
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                        }}
                        initial={{ opacity: 0, top: 0 }}
                        animate={{ opacity: 1, top: `-${index * 6}px` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <span className="text-xl font-bold text-yellow-700">₹</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <motion.div 
                  className="absolute bottom-6 right-6 bg-white bg-opacity-20 rounded-full p-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, 0] }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <FiDollarSign className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>
              
              {/* 3D Property Investment */}
              <motion.div 
                className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-lg shadow-lg p-6 h-64 relative"
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: -5,
                  rotateX: 5
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <h3 className="font-semibold mb-2">Property Investment</h3>
                <p className="text-sm opacity-80 mb-4">Secure your future with strategic real estate</p>
                
                <div className="flex justify-center items-center h-36">
                  {/* 3D House */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                  >
                    {/* Roof */}
                    <motion.div
                      className="w-0 h-0 border-l-[70px] border-r-[70px] border-b-[60px] border-l-transparent border-r-transparent border-b-emerald-300 relative z-20"
                      style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
                    />
                    
                    {/* House Body */}
                    <motion.div
                      className="w-[120px] h-[80px] bg-teal-300 relative z-10"
                      style={{ transformStyle: "preserve-3d", transform: "translateZ(10px)" }}
                    >
                      {/* Door */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[30px] h-[50px] bg-teal-800 rounded-t-md"></div>
                      
                      {/* Windows */}
                      <div className="absolute top-4 left-4 w-[20px] h-[20px] bg-white"></div>
                      <div className="absolute top-4 right-4 w-[20px] h-[20px] bg-white"></div>
                    </motion.div>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="absolute bottom-6 right-6 bg-white bg-opacity-20 rounded-full p-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <FiHome className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>
              
              {/* 3D Financial Achievement */}
              <motion.div 
                className="bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-lg shadow-lg p-6 h-64 relative"
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: -5
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <h3 className="font-semibold mb-2">Financial Freedom</h3>
                <p className="text-sm opacity-80 mb-4">Achieve your financial goals with discipline</p>
                
                <div className="flex justify-center items-center h-36">
                  {/* Trophy */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    {/* Trophy Cup */}
                    <motion.div className="w-[60px] h-[80px] mx-auto">
                      {/* Top of Cup */}
                      <div className="w-[60px] h-[12px] bg-yellow-300 rounded-t-full"></div>
                      
                      {/* Cup Body */}
                      <div className="w-[40px] h-[40px] mx-auto bg-yellow-400"></div>
                      
                      {/* Cup Base */}
                      <div className="w-[50px] h-[10px] mx-auto bg-yellow-300 rounded-b-full"></div>
                      
                      {/* Stand */}
                      <div className="w-[8px] h-[20px] mx-auto bg-yellow-400"></div>
                      
                      {/* Base */}
                      <div className="w-[40px] h-[8px] mx-auto bg-yellow-300 rounded-full"></div>
                    </motion.div>
                    
                    {/* Achievement Stars */}
                    <motion.div 
                      className="absolute -top-4 -left-6 text-2xl text-yellow-300"
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ delay: 0.3, duration: 0.7 }}
                    >
                      ✦
                    </motion.div>
                    <motion.div 
                      className="absolute -top-2 -right-4 text-xl text-yellow-200"
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ delay: 0.5, duration: 0.7 }}
                    >
                      ✦
                    </motion.div>
                    <motion.div 
                      className="absolute top-10 -right-8 text-3xl text-yellow-300"
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ delay: 0.7, duration: 0.7 }}
                    >
                      ✦
                    </motion.div>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="absolute bottom-6 right-6 bg-white bg-opacity-20 rounded-full p-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <FiAward className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default Dashboard; 