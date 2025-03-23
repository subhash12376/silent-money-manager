"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiArrowLeft, FiPieChart, FiTrendingDown, FiDollarSign, FiCheck, FiInfo, FiTarget, FiHome } from 'react-icons/fi';

// Budget strategy data from financial experts
const budgetingStrategies = [
  {
    id: 'fifty-thirty-twenty',
    name: 'Elizabeth Warren',
    title: '50/30/20 Rule',
    description: 'Allocate 50% of income to needs, 30% to wants, and 20% to savings and debt repayment.',
    principles: [
      'Needs: Housing, food, utilities, transport, insurance',
      'Wants: Entertainment, dining out, subscriptions, shopping',
      'Savings: Emergency fund, retirement, debt payments',
      'Adjust percentages based on your income level and goals'
    ],
    allocation: [
      { category: 'Needs', percentage: 50, color: 'bg-blue-500' },
      { category: 'Wants', percentage: 30, color: 'bg-purple-500' },
      { category: 'Savings', percentage: 20, color: 'bg-green-500' }
    ],
    colorScheme: 'from-blue-500 to-blue-700',
    iconColor: 'text-blue-300'
  },
  {
    id: 'zero-based',
    name: 'Dave Ramsey',
    title: 'Zero-Based Budgeting',
    description: 'Assign every rupee a job so income minus expenses equals zero. Pay yourself first by prioritizing savings.',
    principles: [
      'Give every rupee a purpose before the month begins',
      'Start with high-priority expenses (savings, bills, necessities)',
      'Allocate remaining income to variable expenses',
      'Track spending regularly and adjust as needed'
    ],
    allocation: [
      { category: 'Housing', percentage: 25, color: 'bg-emerald-500' },
      { category: 'Food', percentage: 15, color: 'bg-emerald-400' },
      { category: 'Transport', percentage: 10, color: 'bg-emerald-300' },
      { category: 'Utilities', percentage: 10, color: 'bg-teal-500' },
      { category: 'Entertainment', percentage: 10, color: 'bg-teal-400' },
      { category: 'Savings', percentage: 20, color: 'bg-teal-300' },
      { category: 'Miscellaneous', percentage: 10, color: 'bg-teal-200' }
    ],
    colorScheme: 'from-emerald-500 to-emerald-700',
    iconColor: 'text-emerald-300'
  },
  {
    id: 'value-based',
    name: 'Ramit Sethi',
    title: 'Value-Based Spending',
    description: 'Spend extravagantly on things you love, cut costs mercilessly on things you don\'t.',
    principles: [
      'Identify what you truly value and allocate more budget there',
      'Aggressively reduce spending in low-value areas',
      'Automate savings and bill payments',
      'Focus on increasing income alongside smart spending'
    ],
    allocation: [
      { category: 'Fixed Costs', percentage: 50, color: 'bg-purple-500' },
      { category: 'Value Spending', percentage: 30, color: 'bg-purple-400' },
      { category: 'Investments', percentage: 20, color: 'bg-purple-300' }
    ],
    colorScheme: 'from-purple-500 to-purple-700',
    iconColor: 'text-purple-300'
  },
  {
    id: 'kakeibo',
    name: 'Fumiko Chiba',
    title: 'Kakeibo (Household Finance)',
    description: 'Japanese budgeting system focused on mindfulness, reflection, and careful tracking of expenses.',
    principles: [
      'Plan monthly income and expenses at the beginning of each month',
      'Categorize spending into: needs, wants, culture, unexpected',
      'Record expenses daily and reflect weekly',
      'Set savings goals before allocating spending money'
    ],
    allocation: [
      { category: 'Survival', percentage: 45, color: 'bg-amber-500' },
      { category: 'Optional', percentage: 25, color: 'bg-amber-400' },
      { category: 'Culture', percentage: 15, color: 'bg-amber-300' },
      { category: 'Extra', percentage: 15, color: 'bg-amber-200' }
    ],
    colorScheme: 'from-amber-500 to-amber-700',
    iconColor: 'text-amber-300'
  }
];

// Sample expense categories
const expenseCategories = [
  { id: 'housing', name: 'Housing', icon: FiHome, defaultPercentage: 30 },
  { id: 'food', name: 'Food', icon: FiTarget, defaultPercentage: 15 },
  { id: 'transport', name: 'Transportation', icon: FiTarget, defaultPercentage: 10 },
  { id: 'utilities', name: 'Utilities', icon: FiTarget, defaultPercentage: 10 },
  { id: 'entertainment', name: 'Entertainment', icon: FiTarget, defaultPercentage: 10 },
  { id: 'shopping', name: 'Shopping', icon: FiTarget, defaultPercentage: 10 },
  { id: 'savings', name: 'Savings', icon: FiDollarSign, defaultPercentage: 15 }
];

const BudgetPage = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(budgetingStrategies[0]);
  const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);
  
  // Calculator state
  const [monthlyIncome, setMonthlyIncome] = useState<number>(50000);
  const [expenses, setExpenses] = useState<{[key: string]: number}>({
    housing: 15000,
    food: 7500,
    transport: 5000,
    utilities: 5000,
    entertainment: 5000,
    shopping: 5000,
    savings: 7500
  });
  
  const [calculatedResult, setCalculatedResult] = useState<any>(null);
  
  // Calculate budget based on selected strategy
  const calculateBudget = () => {
    let totalExpenses = 0;
    let categorizedExpenses: any = {};
    
    // Calculate total and categorize expenses
    Object.entries(expenses).forEach(([category, amount]) => {
      totalExpenses += amount;
      
      const foundCategory = expenseCategories.find(cat => cat.id === category);
      if (foundCategory) {
        categorizedExpenses[category] = {
          name: foundCategory.name,
          amount,
          percentage: (amount / monthlyIncome) * 100
        };
      }
    });
    
    // Calculate ideal allocations based on strategy
    const idealAllocations = selectedStrategy.allocation.map(allocation => {
      return {
        ...allocation,
        amount: (allocation.percentage / 100) * monthlyIncome
      };
    });
    
    // Calculate the difference between actual and ideal
    const surplus = monthlyIncome - totalExpenses;
    const savingsRate = (expenses.savings / monthlyIncome) * 100;
    
    // Calculate recommendations
    const recommendations = [];
    
    if (totalExpenses > monthlyIncome) {
      recommendations.push('Your expenses exceed your income. Consider reducing spending in non-essential categories.');
    }
    
    if (selectedStrategy.id === 'fifty-thirty-twenty') {
      const needs = (expenses.housing + expenses.food + expenses.utilities + expenses.transport) / monthlyIncome * 100;
      const wants = (expenses.entertainment + expenses.shopping) / monthlyIncome * 100;
      const savings = expenses.savings / monthlyIncome * 100;
      
      if (needs > 50) recommendations.push('Your essential expenses exceed 50% of income. Consider finding ways to reduce these costs.');
      if (wants > 30) recommendations.push('Your discretionary spending exceeds 30% of income. Try to cut back on non-essentials.');
      if (savings < 20) recommendations.push('Your savings rate is below 20%. Try to increase your savings allocation.');
    }
    
    setCalculatedResult({
      totalExpenses,
      categorizedExpenses,
      idealAllocations,
      surplus,
      savingsRate,
      recommendations
    });
    
    setIsCalculatorVisible(true);
  };

  // Format numbers with commas for Indian numbering system
  const formatIndianNumber = (num: number): string => {
    return num.toLocaleString('en-IN');
  };
  
  return (
    <main>
      <Navbar />
      
      <div className="bg-light py-12">
        <div className="container-custom">
          <div className="flex items-center mb-6">
            <Link href="/" className="flex items-center text-primary hover:text-opacity-80">
              <FiArrowLeft className="mr-2" />
              Back to Home
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Budget Management</h1>
          <p className="text-gray-600 mb-8">Learn from financial experts and apply their budget strategies to manage your expenses effectively.</p>
          
          {/* Strategy Tabs */}
          <div className="flex flex-wrap gap-3 mb-8">
            {budgetingStrategies.map((strategy) => (
              <button
                key={strategy.id}
                onClick={() => setSelectedStrategy(strategy)}
                className={`px-4 py-2 rounded-md transition-all ${
                  selectedStrategy.id === strategy.id 
                    ? `bg-gradient-to-r ${strategy.colorScheme} text-white`
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {strategy.title}
              </button>
            ))}
          </div>
          
          {/* Main Content - Budget Strategy Details and Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Left Column - Strategy Details */}
            <div>
              <motion.div 
                className={`bg-white rounded-lg shadow-md overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                key={selectedStrategy.id}
              >
                <div className={`bg-gradient-to-r ${selectedStrategy.colorScheme} p-6 text-white`}>
                  <h2 className="text-2xl font-bold mb-1">{selectedStrategy.title}</h2>
                  <p className="text-white text-opacity-90">By {selectedStrategy.name}</p>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{selectedStrategy.description}</p>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <FiTarget className="mr-2 text-primary" />
                      Key Principles
                    </h3>
                    <ul className="space-y-2">
                      {selectedStrategy.principles.map((principle, index) => (
                        <li key={index} className="flex items-start">
                          <span className={`flex-shrink-0 ${selectedStrategy.iconColor} mr-2 mt-1`}>
                            <FiCheck />
                          </span>
                          <span className="text-gray-700">{principle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Allocation Diagram */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Recommended Allocation</h3>
                    
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex w-full h-6 rounded-full overflow-hidden mb-3">
                        {selectedStrategy.allocation.map((item, index) => (
                          <div
                            key={index}
                            className={`${item.color} flex items-center justify-center text-xs text-white font-semibold`}
                            style={{ width: `${item.percentage}%` }}
                          >
                            {item.percentage}%
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {selectedStrategy.allocation.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${item.color} mr-1`}></div>
                            <span className="text-xs text-gray-700">{item.category}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <FiInfo className="mr-2 text-primary" />
                      Create Your Budget Plan
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Monthly Income (₹)</label>
                        <input
                          type="number"
                          value={monthlyIncome}
                          onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>
                      
                      <h4 className="font-medium text-sm">Monthly Expenses</h4>
                      
                      {expenseCategories.map((category) => (
                        <div key={category.id}>
                          <label className="text-sm text-gray-600 block mb-1">
                            {category.name} (₹)
                          </label>
                          <input
                            type="number"
                            value={expenses[category.id]}
                            onChange={(e) => setExpenses({...expenses, [category.id]: Number(e.target.value)})}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                          />
                        </div>
                      ))}
                      
                      <button
                        onClick={calculateBudget}
                        className={`bg-gradient-to-r ${selectedStrategy.colorScheme} text-white py-2 px-4 rounded hover:bg-opacity-90 w-full`}
                      >
                        Analyze My Budget
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Right Column - Budget Visualization */}
            <div>
              {isCalculatorVisible && calculatedResult ? (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {/* Results Summary */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-semibold mb-4 flex items-center">
                      <FiPieChart className="mr-2 text-primary" />
                      Budget Analysis
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Monthly Income</p>
                        <p className="text-xl font-bold text-primary">₹{formatIndianNumber(monthlyIncome)}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Total Expenses</p>
                        <p className="text-lg font-semibold">₹{formatIndianNumber(calculatedResult.totalExpenses)}</p>
                      </div>
                      <div className={`bg-gray-50 p-3 rounded-lg ${calculatedResult.surplus < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        <p className="text-xs text-gray-500 mb-1">Monthly Surplus</p>
                        <p className="text-lg font-semibold">₹{formatIndianNumber(calculatedResult.surplus)}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Savings Rate</p>
                        <p className="text-lg font-semibold">{Math.round(calculatedResult.savingsRate)}%</p>
                      </div>
                    </div>
                    
                    {calculatedResult.recommendations.length > 0 && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                        <h4 className="text-sm font-medium text-yellow-800 mb-2">Recommendations</h4>
                        <ul className="list-disc pl-5 text-sm text-yellow-700">
                          {calculatedResult.recommendations.map((rec: string, index: number) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {/* 3D Budget Visualization */}
                  <motion.div 
                    className={`bg-gradient-to-br ${selectedStrategy.colorScheme} text-white rounded-lg shadow-lg p-6 h-80 overflow-hidden relative`}
                    style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <h3 className="font-semibold mb-2">Budget Distribution</h3>
                    <p className="text-sm opacity-80 mb-6">See how your expenses compare to {selectedStrategy.title} recommendations</p>
                    
                    <div className="relative h-48">
                      {/* 3D Bar Chart */}
                      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around h-full">
                        {Object.entries(calculatedResult.categorizedExpenses).map(([id, data]: [string, any], index: number) => {
                          const category = expenseCategories.find(cat => cat.id === id);
                          const heightPercentage = Math.min((data.amount / monthlyIncome) * 100 * 1.5, 100);
                          
                          return (
                            <motion.div
                              key={id}
                              className="relative"
                            >
                              <motion.div
                                className="absolute bottom-0 w-14 mx-1 rounded-t-md"
                                style={{ 
                                  height: `${Math.max(heightPercentage, 5)}%`,
                                  backgroundColor: `rgba(255, 255, 255, 0.2)`,
                                  transformStyle: "preserve-3d",
                                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                                  transform: "translateZ(10px)"
                                }}
                                initial={{ height: 0 }}
                                animate={{ height: `${Math.max(heightPercentage, 5)}%` }}
                                transition={{ delay: index * 0.1, duration: 0.7, ease: "easeOut" }}
                                whileHover={{ 
                                  z: 20,
                                  backgroundColor: "rgba(255, 255, 255, 0.3)"
                                }}
                              >
                                <motion.div 
                                  className="absolute -top-6 left-0 w-full text-center text-xs font-bold"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.7 + index * 0.1 }}
                                >
                                  {Math.round(data.percentage)}%
                                </motion.div>
                              </motion.div>
                              
                              <div className="absolute bottom-[-20px] text-center w-full text-xs">
                                {category?.name.substring(0, 5)}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Actual vs Ideal Budget */}
                  <motion.div 
                    className="bg-white rounded-lg shadow-md p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <h3 className="font-semibold mb-4">Actual vs Ideal Budget</h3>
                    
                    <div className="space-y-4">
                      {selectedStrategy.allocation.map((allocation, index) => {
                        // Calculate the actual percentage for this category
                        let actualPercentage = 0;
                        
                        // For 50/30/20 rule
                        if (selectedStrategy.id === 'fifty-thirty-twenty') {
                          if (allocation.category === 'Needs') {
                            actualPercentage = (expenses.housing + expenses.food + expenses.utilities + expenses.transport) / monthlyIncome * 100;
                          } else if (allocation.category === 'Wants') {
                            actualPercentage = (expenses.entertainment + expenses.shopping) / monthlyIncome * 100;
                          } else if (allocation.category === 'Savings') {
                            actualPercentage = expenses.savings / monthlyIncome * 100;
                          }
                        } else {
                          // For other strategies, just use a simple mapping (this would need to be more sophisticated in a real app)
                          if (index === 0) actualPercentage = (expenses.housing + expenses.utilities) / monthlyIncome * 100;
                          else if (index === 1) actualPercentage = (expenses.food + expenses.transport) / monthlyIncome * 100;
                          else if (index === 2) actualPercentage = (expenses.entertainment + expenses.shopping) / monthlyIncome * 100;
                          else actualPercentage = expenses.savings / monthlyIncome * 100;
                        }
                        
                        const isOverBudget = actualPercentage > allocation.percentage;
                        
                        return (
                          <div key={index}>
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <span className="text-sm font-medium">{allocation.category}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-medium">Ideal: {allocation.percentage}%</span>
                                <span className="text-xs font-medium">Actual: {Math.round(actualPercentage)}%</span>
                              </div>
                            </div>
                            
                            <div className="relative pt-1">
                              <div className="flex mb-2 h-2 overflow-hidden rounded bg-gray-200">
                                <div 
                                  className={`${allocation.color}`} 
                                  style={{ width: `${allocation.percentage}%` }}
                                />
                              </div>
                              <div 
                                className={`h-1 -mt-3 rounded ${isOverBudget ? 'bg-red-500' : 'bg-green-500'}`} 
                                style={{ width: `${Math.min(actualPercentage, 100)}%` }}
                              />
                            </div>
                            
                            <p className="text-xs text-gray-500 mb-2">
                              {isOverBudget 
                                ? `You're spending ${Math.round(actualPercentage - allocation.percentage)}% more than recommended on ${allocation.category.toLowerCase()}.`
                                : `Good! You're spending within the recommended amount for ${allocation.category.toLowerCase()}.`
                              }
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                  
                  {/* 3D Budget Icon */}
                  <motion.div 
                    className={`bg-gradient-to-br ${selectedStrategy.colorScheme} text-white rounded-lg shadow-lg p-6 h-40 relative`}
                    style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                    whileHover={{ 
                      scale: 1.02,
                      rotateY: 5,
                      rotateX: -5
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="flex items-center h-full">
                      <div className="w-1/2">
                        <h3 className="font-semibold mb-1">{selectedStrategy.title} Approach</h3>
                        <p className="text-sm opacity-80">Following this budget strategy can help you manage expenses and build wealth over time.</p>
                      </div>
                      
                      <div className="w-1/2 flex justify-center items-center">
                        <motion.div 
                          className="relative flex items-center justify-center"
                          animate={{ 
                            rotateY: [0, 360], 
                          }}
                          transition={{ 
                            duration: 20,
                            ease: "linear",
                            repeat: Infinity,
                          }}
                        >
                          <FiDollarSign className="w-16 h-16 text-white" />
                          <motion.div 
                            className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <span className="text-sm font-bold text-blue-600">₹</span>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-10 h-full">
                  <FiPieChart className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Analyze Your Budget</h3>
                  <p className="text-gray-500 text-center mb-6">
                    Enter your income and expenses to see how they align with {selectedStrategy.title} budgeting strategy.
                  </p>
                  <button
                    onClick={() => {
                      calculateBudget();
                    }}
                    className={`bg-gradient-to-r ${selectedStrategy.colorScheme} text-white py-2 px-6 rounded-md hover:opacity-90`}
                  >
                    Analyze Now
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Compare Strategies */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4">Compare Budgeting Methods</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expert</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best For</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complexity</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedStrategy(budgetingStrategies[0])}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">50/30/20 Rule</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">Elizabeth Warren</td>
                    <td className="px-6 py-4 text-gray-700">Beginners, simple framework</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600">Low</td>
                  </tr>
                  <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedStrategy(budgetingStrategies[1])}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Zero-Based Budgeting</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">Dave Ramsey</td>
                    <td className="px-6 py-4 text-gray-700">Detailed planners, debt reduction</td>
                    <td className="px-6 py-4 whitespace-nowrap text-yellow-600">Medium</td>
                  </tr>
                  <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedStrategy(budgetingStrategies[2])}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Value-Based Spending</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">Ramit Sethi</td>
                    <td className="px-6 py-4 text-gray-700">Young professionals, lifestyle design</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600">Low</td>
                  </tr>
                  <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedStrategy(budgetingStrategies[3])}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Kakeibo</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">Fumiko Chiba</td>
                    <td className="px-6 py-4 text-gray-700">Mindful spenders, detail-oriented</td>
                    <td className="px-6 py-4 whitespace-nowrap text-red-600">High</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Tips Section */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md mb-10">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiInfo className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Budget Management Tips</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Track your expenses daily with a mobile app or spreadsheet</li>
                    <li>Review your budget monthly and adjust as needed</li>
                    <li>Build an emergency fund covering 3-6 months of expenses</li>
                    <li>Prioritize high-interest debt payments</li>
                    <li>Automate savings and bill payments to stay consistent</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default BudgetPage; 