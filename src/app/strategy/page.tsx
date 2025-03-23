"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiArrowLeft, FiBarChart2, FiTrendingUp, FiTarget, FiUsers, FiCheck, FiInfo, FiDollarSign } from 'react-icons/fi';

// Investment strategy data for famous investors
const investmentStrategies = [
  {
    id: 'buffett',
    name: 'Warren Buffett',
    title: 'Value Investing',
    description: 'Focus on undervalued companies with strong fundamentals and long-term growth potential.',
    principles: [
      'Invest in businesses you understand',
      'Look for companies with strong competitive advantages',
      'Focus on long-term value, not short-term price fluctuations',
      'Be fearful when others are greedy, and greedy when others are fearful'
    ],
    annualReturn: 20.1,
    timeHorizon: 'Long-term (10+ years)',
    riskLevel: 'Moderate',
    colorScheme: 'from-blue-500 to-blue-700',
    iconColor: 'text-blue-300'
  },
  {
    id: 'graham',
    name: 'Benjamin Graham',
    title: 'Defensive Investment',
    description: 'The father of value investing focused on companies trading below their intrinsic value with a margin of safety.',
    principles: [
      'Always invest with a margin of safety',
      'Price is what you pay, value is what you get',
      'The market is a voting machine in the short run, but a weighing machine in the long run',
      'Analyze stocks based on quantitative factors'
    ],
    annualReturn: 17.5,
    timeHorizon: 'Medium to Long-term (5-10+ years)',
    riskLevel: 'Low to Moderate',
    colorScheme: 'from-emerald-500 to-emerald-700',
    iconColor: 'text-emerald-300'
  },
  {
    id: 'lynch',
    name: 'Peter Lynch',
    title: 'Growth at Reasonable Price',
    description: 'Invest in companies you understand with strong growth potential at reasonable valuations.',
    principles: [
      'Invest in what you know and understand',
      'Look for companies with strong growth potential',
      'Consider P/E ratio relative to growth rate (PEG ratio)',
      'Pay attention to companies that insiders are buying'
    ],
    annualReturn: 29.2,
    timeHorizon: 'Medium to Long-term (3-10 years)',
    riskLevel: 'Moderate to High',
    colorScheme: 'from-purple-500 to-purple-700',
    iconColor: 'text-purple-300'
  },
  {
    id: 'dalio',
    name: 'Ray Dalio',
    title: 'All Weather Strategy',
    description: 'A balanced portfolio designed to perform well in any economic environment through diversification.',
    principles: [
      'Diversify across asset classes to balance risk',
      'Hold uncorrelated assets to protect against market downturns',
      'Focus on risk management rather than return maximization',
      'Understand the economic machine and how markets operate'
    ],
    annualReturn: 9.8,
    timeHorizon: 'Medium to Long-term (5-20 years)',
    riskLevel: 'Low to Moderate',
    colorScheme: 'from-amber-500 to-amber-700',
    iconColor: 'text-amber-300'
  }
];

// Market scenario data with insights from financial giants
const marketScenarios = [
  {
    id: 'bull',
    name: 'Bull Market',
    description: 'A financial market of a group of securities in which prices are rising or expected to rise.',
    duration: 'Average 4.5 years',
    averageReturn: '112%',
    indicators: [
      'Rising GDP growth',
      'Low unemployment',
      'High consumer confidence',
      'Increasing corporate earnings'
    ],
    experts: [
      {
        name: 'Goldman Sachs',
        advice: 'Focus on quality growth stocks and companies with strong earnings momentum.',
        prediction: 'Growth sectors like technology and consumer discretionary typically outperform.',
        strategyTips: [
          'Consider reducing bond allocation',
          'Focus on growth-oriented sectors',
          'Maintain diversification but tilt toward higher-beta assets'
        ]
      },
      {
        name: 'Morgan Stanley',
        advice: 'Look for companies with pricing power and ability to pass inflation to consumers.',
        prediction: 'Late-cycle bull markets often see commodities and energy outperform.',
        strategyTips: [
          'Balance between value and growth',
          'Consider cyclical stocks',
          'Watch for signs of market exuberance'
        ]
      },
      {
        name: 'JP Morgan',
        advice: 'Gradually increase risk exposure but maintain quality core holdings.',
        prediction: 'Small and mid-cap stocks often outperform in strong bull markets.',
        strategyTips: [
          "Don't try to time market peaks",
          'Use dollar-cost averaging',
          'Consider taking some profits as markets reach new highs'
        ]
      }
    ],
    colorScheme: 'from-green-500 to-green-700',
    iconColor: 'text-green-500',
    historicalData: [
      { year: '2009-2020', duration: '11 years', gain: '400%' },
      { year: '2003-2007', duration: '5 years', gain: '101%' },
      { year: '1991-2000', duration: '9 years', gain: '418%' }
    ]
  },
  {
    id: 'bear',
    name: 'Bear Market',
    description: 'A market condition in which prices fall 20% or more from recent highs amid widespread pessimism.',
    duration: 'Average 1.3 years',
    averageReturn: '-36%',
    indicators: [
      'Economic recession',
      'Rising unemployment',
      'Falling corporate profits',
      'Negative investor sentiment'
    ],
    experts: [
      {
        name: 'BlackRock',
        advice: 'Defensive positioning with focus on quality and resilience.',
        prediction: 'Markets typically bottom before economic data improves.',
        strategyTips: [
          'Increase allocation to quality bonds',
          'Focus on companies with strong balance sheets',
          'Consider defensive sectors like healthcare and utilities'
        ]
      },
      {
        name: 'Vanguard',
        advice: 'Maintain long-term strategic asset allocation without panic selling.',
        prediction: 'Market timing is nearly impossible; consistent investing wins long-term.',
        strategyTips: [
          'Continue regular investments (dollar-cost averaging)',
          'Rebalance portfolio according to long-term plan',
          'Consider tax-loss harvesting opportunities'
        ]
      },
      {
        name: 'Fidelity',
        advice: 'Look for quality companies trading at discounts to fair value.',
        prediction: 'Bear markets create opportunities to buy great businesses at reasonable prices.',
        strategyTips: [
          'Maintain adequate emergency fund',
          'Gradually deploy cash reserves as markets decline',
          'Focus on dividend-paying stocks with history of increasing payouts'
        ]
      }
    ],
    colorScheme: 'from-red-500 to-red-700',
    iconColor: 'text-red-500',
    historicalData: [
      { year: '2007-2009', duration: '1.4 years', gain: '-57%' },
      { year: '2000-2002', duration: '2.1 years', gain: '-49%' },
      { year: '1987', duration: '0.3 years', gain: '-33%' }
    ]
  },
  {
    id: 'neutral',
    name: 'Neutral/Sideways Market',
    description: 'A market phase characterized by price movement in a relatively tight range with no clear direction.',
    duration: 'Average 1.8 years',
    averageReturn: '5-10%',
    indicators: [
      'Slowing but positive GDP growth',
      'Mixed economic indicators',
      'Transition period between bull and bear',
      'Sector rotation'
    ],
    experts: [
      {
        name: 'HSBC',
        advice: 'Focus on income-generating investments and relative value opportunities.',
        prediction: 'Market returns likely to be driven by dividends rather than capital appreciation.',
        strategyTips: [
          'Emphasize dividend-paying stocks',
          'Consider covered call strategies',
          'Look for sector rotation opportunities'
        ]
      },
      {
        name: 'UBS',
        advice: 'Quality companies with sustainable competitive advantages outperform.',
        prediction: 'Market breadth narrows with leadership from fewer sectors and stocks.',
        strategyTips: [
          'Focus on companies with pricing power',
          'Consider barbell strategy of defensive and quality cyclical stocks',
          'Maintain balanced asset allocation'
        ]
      },
      {
        name: 'Credit Suisse',
        advice: 'Active management likely to outperform passive in range-bound markets.',
        prediction: 'Volatility creates tactical opportunities for skilled investors.',
        strategyTips: [
          'Consider alternative investments',
          'Look for mean-reversion opportunities',
          'Focus on total return rather than just price appreciation'
        ]
      }
    ],
    colorScheme: 'from-yellow-500 to-yellow-700',
    iconColor: 'text-yellow-500',
    historicalData: [
      { year: '2015-2016', duration: '1.5 years', gain: '8%' },
      { year: '2011-2012', duration: '1.3 years', gain: '6%' },
      { year: '1994-1995', duration: '1.8 years', gain: '11%' }
    ]
  },
  {
    id: 'recession',
    name: 'Recession',
    description: 'A significant decline in economic activity spread across the economy, lasting more than a few months.',
    duration: 'Average 11-18 months',
    averageReturn: '-25% to -45%',
    indicators: [
      'GDP decline for two or more consecutive quarters',
      'Rising unemployment rates',
      'Decreased consumer spending',
      'Central bank emergency measures',
      'Credit market freeze'
    ],
    experts: [
      {
        name: 'Goldman Sachs Research',
        advice: 'Focus on quality assets with strong balance sheets and low debt levels.',
        prediction: 'Markets typically bottom 3-6 months before economic recovery begins.',
        strategyTips: [
          'Increase allocation to government bonds',
          'Look for companies with recession-resistant business models',
          'Build cash reserves for eventual market bottom opportunities'
        ]
      },
      {
        name: 'Bank of America',
        advice: 'Prioritize defensive sectors with stable cash flows and lower cyclical exposure.',
        prediction: 'Recovery patterns tend to be K-shaped, with winners and losers clearly defined by sector.',
        strategyTips: [
          'Focus on consumer staples, utilities, and healthcare',
          'Avoid highly leveraged companies',
          'Consider gold and other traditional safe havens'
        ]
      },
      {
        name: 'McKinsey Global Institute',
        advice: 'Use recession as opportunity to accelerate digital transformation investments.',
        prediction: 'Companies that invest through downturns outperform peers by 10-30% in recovery.',
        strategyTips: [
          'Look for disruptive innovators with strong cash positions',
          'Assess supply chain resilience when evaluating companies',
          'Consider dollar-cost averaging into quality names throughout decline'
        ]
      }
    ],
    colorScheme: 'from-indigo-500 to-indigo-800',
    iconColor: 'text-indigo-500',
    historicalData: [
      { year: '2020 (COVID-19)', duration: '2 months', gain: '-34%' },
      { year: '2007-2009 (Financial Crisis)', duration: '18 months', gain: '-57%' },
      { year: '2001-2002 (Dot-com Bubble)', duration: '8 months', gain: '-49%' },
      { year: '1980-1982 (Volcker Recession)', duration: '16 months', gain: '-28%' }
    ]
  }
];

const StrategyPage = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(investmentStrategies[0]);
  const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);
  const [selectedMarketScenario, setSelectedMarketScenario] = useState(marketScenarios[0]);
  const [isMarketSectionVisible, setIsMarketSectionVisible] = useState(false);
  
  // Calculator state
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(10000);
  const [years, setYears] = useState<number>(10);
  const [calculatedResult, setCalculatedResult] = useState<any>(null);
  
  // Calculate investment growth based on selected strategy
  const calculateInvestment = () => {
    const monthlyRate = selectedStrategy.annualReturn / 12 / 100;
    const months = years * 12;
    
    let futureValue = initialInvestment;
    let yearlyData = [{
      year: 0,
      value: initialInvestment,
      growth: 0
    }];
    
    for (let i = 1; i <= months; i++) {
      futureValue = (futureValue + monthlyContribution) * (1 + monthlyRate);
      
      if (i % 12 === 0) {
        const yearIndex = i / 12;
        yearlyData.push({
          year: yearIndex,
          value: futureValue,
          growth: futureValue - (yearlyData[yearIndex-1].value)
        });
      }
    }
    
    const totalInvested = initialInvestment + (monthlyContribution * months);
    const totalGrowth = futureValue - totalInvested;
    const growthPercentage = (totalGrowth / totalInvested) * 100;
    
    setCalculatedResult({
      futureValue,
      totalInvested,
      totalGrowth,
      growthPercentage,
      yearlyData
    });
    
    setIsCalculatorVisible(true);
  };

  // Calculate investment performance under different market scenarios
  const calculateMarketImpact = () => {
    const initialValue = 100000; // ₹1 lakh base investment
    const years = 5; // 5-year projection
    
    // Calculate performance for each market scenario
    const marketPerformance = marketScenarios.map(scenario => {
      // Extract average return from percentage string and convert to decimal
      const avgReturnStr = scenario.averageReturn.replace('%', '');
      const avgReturn = parseFloat(avgReturnStr) / 100;
      
      // Adjust return based on scenario duration
      const annualizedReturn = scenario.id === 'bull' 
        ? avgReturn / 4.5 // Average bull market lasts 4.5 years
        : scenario.id === 'bear' 
          ? avgReturn / 1.3 // Average bear market lasts 1.3 years
          : avgReturn / 5; // Neutral market, assuming 5-year period
        
      // Calculate compound growth
      const finalValue = initialValue * Math.pow((1 + annualizedReturn), years);
      
      // Calculate monthly values for chart
      const monthlyData = [];
      let currentValue = initialValue;
      
      for (let month = 0; month <= years * 12; month++) {
        // Apply monthly return (with some randomness for realistic chart)
        const monthlyReturn = (annualizedReturn / 12) * (1 + (Math.random() * 0.4 - 0.2));
        currentValue = currentValue * (1 + monthlyReturn);
        
        if (month % 3 === 0) { // Quarterly data points for cleaner chart
          monthlyData.push({
            month,
            value: currentValue,
            scenario: scenario.name
          });
        }
      }
      
      return {
        scenario: scenario.name,
        id: scenario.id,
        initialValue,
        finalValue,
        totalReturn: (finalValue - initialValue) / initialValue * 100,
        annualizedReturn: (Math.pow(finalValue / initialValue, 1/years) - 1) * 100,
        colorScheme: scenario.colorScheme,
        monthlyData
      };
    });
    
    return marketPerformance;
  };
  
  // Generate market performance data
  const marketPerformance = calculateMarketImpact();

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
          
          <h1 className="text-3xl font-bold mb-2">Investment Strategies</h1>
          <p className="text-gray-600 mb-8">Learn from the world's most successful investors and apply their strategies to your investments.</p>
          
          {/* Strategy Tabs */}
          <div className="flex flex-wrap gap-3 mb-8">
            {investmentStrategies.map((strategy) => (
              <button
                key={strategy.id}
                onClick={() => setSelectedStrategy(strategy)}
                className={`px-4 py-2 rounded-md transition-all ${
                  selectedStrategy.id === strategy.id 
                    ? `bg-gradient-to-r ${strategy.colorScheme} text-white`
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {strategy.name}
              </button>
            ))}
          </div>
          
          {/* Main Content - Strategy Details and Growth Visualization */}
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
                  <h2 className="text-2xl font-bold mb-1">{selectedStrategy.name}</h2>
                  <p className="text-white text-opacity-90">{selectedStrategy.title}</p>
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
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Annual Return</p>
                      <p className="font-semibold text-primary flex items-center">
                        <FiTrendingUp className="mr-1" />
                        {selectedStrategy.annualReturn}%
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Time Horizon</p>
                      <p className="font-semibold text-gray-700">{selectedStrategy.timeHorizon}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Risk Level</p>
                      <p className="font-semibold text-gray-700">{selectedStrategy.riskLevel}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <FiInfo className="mr-2 text-primary" />
                      Calculate Your Potential Returns
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Initial Investment (₹)</label>
                        <input
                          type="number"
                          value={initialInvestment}
                          onChange={(e) => setInitialInvestment(Number(e.target.value))}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Monthly Contribution (₹)</label>
                        <input
                          type="number"
                          value={monthlyContribution}
                          onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Investment Period (Years)</label>
                        <input
                          type="number"
                          value={years}
                          onChange={(e) => setYears(Number(e.target.value))}
                          className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>
                      <button
                        onClick={calculateInvestment}
                        className={`bg-gradient-to-r ${selectedStrategy.colorScheme} text-white py-2 px-4 rounded hover:bg-opacity-90 w-full`}
                      >
                        Calculate Potential Growth
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Right Column - Growth Visualization */}
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
                      <FiBarChart2 className="mr-2 text-primary" />
                      Investment Growth Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Future Value</p>
                        <p className="text-xl font-bold text-primary">₹{formatIndianNumber(Math.round(calculatedResult.futureValue))}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Total Invested</p>
                        <p className="text-lg font-semibold">₹{formatIndianNumber(Math.round(calculatedResult.totalInvested))}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Investment Growth</p>
                        <p className="text-lg font-semibold text-green-600">₹{formatIndianNumber(Math.round(calculatedResult.totalGrowth))}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">Growth Percentage</p>
                        <p className="text-lg font-semibold text-green-600">{Math.round(calculatedResult.growthPercentage)}%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Strategy Return Rate</p>
                      <p className="text-sm font-medium text-primary">{selectedStrategy.annualReturn}% Annual</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${selectedStrategy.colorScheme}`} 
                          style={{ width: `${Math.min(selectedStrategy.annualReturn * 3, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 italic">
                      Note: These projections are based on historical performance of {selectedStrategy.name}'s strategy and are not guaranteed future results.
                    </p>
                  </div>
                  
                  {/* 3D Growth Chart */}
                  <motion.div 
                    className={`bg-gradient-to-br ${selectedStrategy.colorScheme} text-white rounded-lg shadow-lg p-6 h-80 overflow-hidden relative`}
                    style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <h3 className="font-semibold mb-2">Investment Growth Visualization</h3>
                    <p className="text-sm opacity-80 mb-4">See how your investment grows over time with {selectedStrategy.name}'s strategy</p>
                    
                    <div className="relative h-48">
                      {/* 3D Bar Chart */}
                      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around h-full">
                        {calculatedResult.yearlyData.map((yearData: any, index: number) => {
                          const heightPercentage = (yearData.value / calculatedResult.futureValue) * 100;
                          return (
                            <motion.div
                              key={index}
                              className={`bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-t-md ${index === 0 ? 'w-4' : 'w-8'} mx-1`}
                              style={{ 
                                height: `${Math.max(heightPercentage, 5)}%`,
                                transformStyle: "preserve-3d",
                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                              }}
                              initial={{ height: 0 }}
                              animate={{ height: `${Math.max(heightPercentage, 5)}%` }}
                              transition={{ delay: index * 0.1, duration: 0.7, ease: "easeOut" }}
                              whileHover={{ 
                                z: 20,
                                backgroundColor: "rgba(255, 255, 255, 0.5)"
                              }}
                            >
                              {index > 0 && (
                                <motion.div 
                                  className="absolute -top-6 left-0 w-full text-center text-xs font-bold hidden md:block"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.7 + index * 0.1 }}
                                >
                                  ₹{(yearData.value / 100000).toFixed(1)}L
                                </motion.div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                      
                      {/* X Axis */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white bg-opacity-50"></div>
                      
                      {/* Year Labels */}
                      <div className="absolute -bottom-5 left-0 right-0 flex justify-around">
                        {calculatedResult.yearlyData.map((yearData: any, index: number) => (
                          <div key={index} className="text-xs opacity-90">Y{yearData.year}</div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Contribution vs Growth */}
                  <motion.div 
                    className="bg-white rounded-lg shadow-md p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <h3 className="font-semibold mb-4">Contribution vs. Growth</h3>
                    
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-xs font-semibold inline-block text-blue-600">
                            Your Contribution
                          </span>
                        </div>
                        <div>
                          <span className="text-xs font-semibold inline-block text-blue-600">
                            {Math.round((calculatedResult.totalInvested / calculatedResult.futureValue) * 100)}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                        <div style={{ width: `${(calculatedResult.totalInvested / calculatedResult.futureValue) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-xs font-semibold inline-block text-green-600">
                            Investment Growth
                          </span>
                        </div>
                        <div>
                          <span className="text-xs font-semibold inline-block text-green-600">
                            {Math.round((calculatedResult.totalGrowth / calculatedResult.futureValue) * 100)}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                        <div style={{ width: `${(calculatedResult.totalGrowth / calculatedResult.futureValue) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center mt-4">
                      <div className="flex items-center mr-4">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                        <span className="text-xs text-gray-600">Your Contribution: ₹{formatIndianNumber(Math.round(calculatedResult.totalInvested))}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                        <span className="text-xs text-gray-600">Growth: ₹{formatIndianNumber(Math.round(calculatedResult.totalGrowth))}</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* 3D Investment Icon */}
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
                        <h3 className="font-semibold mb-1">{selectedStrategy.name}'s Approach</h3>
                        <p className="text-sm opacity-80">Following this strategy with discipline can lead to significant wealth accumulation over time.</p>
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
                  <FiBarChart2 className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">See Your Investment Growth</h3>
                  <p className="text-gray-500 text-center mb-6">
                    Enter your investment details and calculate how your money would grow using {selectedStrategy.name}'s investment strategy.
                  </p>
                  <button
                    onClick={() => {
                      calculateInvestment();
                    }}
                    className={`bg-gradient-to-r ${selectedStrategy.colorScheme} text-white py-2 px-6 rounded-md hover:opacity-90`}
                  >
                    Calculate Now
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Market Scenarios Section */}
          <div className="mb-10">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-2">Market Scenario Analysis</h2>
              <p className="text-gray-600 mb-6">
                Understanding different market conditions is essential for successful investing. 
                Explore insights from world-famous financial institutions on bull, bear, and neutral markets.
              </p>
              
              {/* Market Scenario Tabs */}
              <div className="flex flex-wrap gap-3 mb-8">
                {marketScenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => {
                      setSelectedMarketScenario(scenario);
                      setIsMarketSectionVisible(true);
                    }}
                    className={`px-4 py-2 rounded-md transition-all ${
                      selectedMarketScenario.id === scenario.id 
                        ? `bg-gradient-to-r ${scenario.colorScheme} text-white`
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {scenario.name}
                  </button>
                ))}
              </div>
              
              {/* Market Scenario Content */}
              {isMarketSectionVisible && (
                <motion.div 
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  key={selectedMarketScenario.id}
                >
                  {/* Left Column - Scenario Details */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className={`bg-gradient-to-r ${selectedMarketScenario.colorScheme} p-6 text-white`}>
                      <h2 className="text-2xl font-bold mb-1">{selectedMarketScenario.name}</h2>
                      <p className="text-white text-opacity-90">{selectedMarketScenario.description}</p>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Typical Duration</p>
                          <p className="font-semibold text-gray-700">{selectedMarketScenario.duration}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Average Return</p>
                          <p className={`font-semibold ${selectedMarketScenario.iconColor}`}>
                            {selectedMarketScenario.averageReturn}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="font-semibold mb-2">Key Indicators</h3>
                        <ul className="space-y-2">
                          {selectedMarketScenario.indicators.map((indicator, index) => (
                            <li key={index} className="flex items-start">
                              <span className={`flex-shrink-0 ${selectedMarketScenario.iconColor} mr-2 mt-1`}>•</span>
                              <span className="text-gray-700">{indicator}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="font-semibold mb-3">Historical Examples</h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Performance</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {selectedMarketScenario.historicalData.map((period, index) => (
                                <tr key={index}>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{period.year}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{period.duration}</td>
                                  <td className={`px-3 py-2 whitespace-nowrap text-sm font-medium ${period.gain.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                                    {period.gain}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column - Expert Insights & Performance Visualization */}
                  <div className="space-y-6">
                    {/* 3D Market Performance Chart */}
                    <motion.div 
                      className={`bg-white rounded-lg shadow-md overflow-hidden`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="p-6">
                        <h3 className="font-semibold mb-4">Performance Comparison (5-Year Projection)</h3>
                        <div className="relative h-64">
                          {/* 3D Line Chart */}
                          <svg className="w-full h-full" viewBox="0 0 400 200">
                            {/* X and Y Axes */}
                            <line x1="40" y1="180" x2="380" y2="180" stroke="#ccc" strokeWidth="1" />
                            <line x1="40" y1="20" x2="40" y2="180" stroke="#ccc" strokeWidth="1" />
                            
                            {/* X-Axis Labels */}
                            <text x="40" y="195" className="text-xs text-gray-500">0</text>
                            <text x="125" y="195" className="text-xs text-gray-500">1yr</text>
                            <text x="210" y="195" className="text-xs text-gray-500">3yr</text>
                            <text x="295" y="195" className="text-xs text-gray-500">5yr</text>
                            
                            {/* Y-Axis Labels */}
                            <text x="25" y="180" className="text-xs text-gray-500">0</text>
                            <text x="15" y="140" className="text-xs text-gray-500">50k</text>
                            <text x="10" y="100" className="text-xs text-gray-500">100k</text>
                            <text x="10" y="60" className="text-xs text-gray-500">150k</text>
                            <text x="10" y="20" className="text-xs text-gray-500">200k</text>
                            
                            {/* Grid Lines */}
                            <line x1="40" y1="140" x2="380" y2="140" stroke="#eee" strokeWidth="1" />
                            <line x1="40" y1="100" x2="380" y2="100" stroke="#eee" strokeWidth="1" />
                            <line x1="40" y1="60" x2="380" y2="60" stroke="#eee" strokeWidth="1" />
                            <line x1="40" y1="20" x2="380" y2="20" stroke="#eee" strokeWidth="1" />
                            
                            {/* Performance Lines */}
                            {marketPerformance.map((scenario, index) => {
                              // Generate line path from monthly data
                              const pathData = scenario.monthlyData.map((point, i) => {
                                const x = 40 + (point.month / 60) * 340; // 60 months = 5 years
                                const y = 180 - (point.value / 200000) * 160; // Max 200k = full height
                                return (i === 0 ? 'M' : 'L') + x + ' ' + y;
                              }).join(' ');
                              
                              // Create gradient ID
                              const gradientId = `line-gradient-${scenario.id}`;
                              
                              return (
                                <g key={index}>
                                  {/* Define gradient */}
                                  <defs>
                                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                                      <stop offset="0%" className={scenario.colorScheme.replace('from-', 'stop-color:').replace(' to-', ';stop-opacity:0.8"')} />
                                      <stop offset="100%" className={scenario.colorScheme.split(' ')[1].replace('to-', 'stop-color:') + ';stop-opacity:0.8'} />
                                    </linearGradient>
                                  </defs>
                                  
                                  {/* Line */}
                                  <path
                                    d={pathData}
                                    fill="none"
                                    stroke={`url(#${gradientId})`}
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  
                                  {/* Final point with label */}
                                  {scenario.monthlyData.length > 0 && (
                                    <>
                                      <circle
                                        cx={40 + (scenario.monthlyData[scenario.monthlyData.length - 1].month / 60) * 340}
                                        cy={180 - (scenario.monthlyData[scenario.monthlyData.length - 1].value / 200000) * 160}
                                        r="4"
                                        className={scenario.colorScheme.replace('from-', 'fill-').split(' ')[0]}
                                      />
                                      <text
                                        x={40 + (scenario.monthlyData[scenario.monthlyData.length - 1].month / 60) * 340 + 5}
                                        y={180 - (scenario.monthlyData[scenario.monthlyData.length - 1].value / 200000) * 160 - 5}
                                        className={`text-xs ${scenario.colorScheme.replace('from-', 'fill-').split(' ')[0]}`}
                                      >
                                        ₹{formatIndianNumber(Math.round(scenario.finalValue))}
                                      </text>
                                    </>
                                  )}
                                </g>
                              );
                            })}
                          </svg>
                        </div>
                        <div className="flex items-center justify-center mt-2">
                          {marketPerformance.map((scenario, index) => (
                            <div key={index} className="flex items-center mx-3">
                              <div className={`w-3 h-3 rounded-full mr-1 ${scenario.colorScheme.replace('from-', 'bg-').split(' ')[0]}`}></div>
                              <span className="text-xs text-gray-600">{scenario.scenario}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Recession Impact Chart - Only shown for recession scenario */}
                    {selectedMarketScenario.id === 'recession' && (
                      <motion.div 
                        className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div className="p-6">
                          <h3 className="font-semibold mb-4">Recession Impact & Recovery Patterns</h3>
                          <div className="relative h-64 mb-4">
                            {/* Recovery Pattern Chart */}
                            <svg className="w-full h-full" viewBox="0 0 400 200">
                              {/* X and Y Axes */}
                              <line x1="40" y1="180" x2="380" y2="180" stroke="#ccc" strokeWidth="1" />
                              <line x1="40" y1="20" x2="40" y2="180" stroke="#ccc" strokeWidth="1" />
                              
                              {/* X-Axis Labels */}
                              <text x="40" y="195" className="text-xs text-gray-500">Onset</text>
                              <text x="120" y="195" className="text-xs text-gray-500">Bottom</text>
                              <text x="220" y="195" className="text-xs text-gray-500">Recovery</text>
                              <text x="320" y="195" className="text-xs text-gray-500">New Peak</text>
                              
                              {/* Recovery Patterns */}
                              {/* V-shaped recovery */}
                              <path 
                                d="M 60,100 L 120,160 L 220,60 L 340,60" 
                                fill="none" 
                                stroke="#4f46e5" 
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray="0"
                              />
                              <text x="350" y="60" className="text-xs text-indigo-600">V-shaped</text>
                              
                              {/* U-shaped recovery */}
                              <path 
                                d="M 60,100 L 120,160 L 160,160 L 220,100 L 340,80" 
                                fill="none" 
                                stroke="#8b5cf6" 
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray="0"
                              />
                              <text x="350" y="80" className="text-xs text-purple-600">U-shaped</text>
                              
                              {/* L-shaped recovery */}
                              <path 
                                d="M 60,100 L 120,160 L 220,150 L 340,140" 
                                fill="none" 
                                stroke="#a855f7" 
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray="0"
                              />
                              <text x="350" y="140" className="text-xs text-purple-800">L-shaped</text>
                              
                              {/* K-shaped recovery */}
                              <path 
                                d="M 60,100 L 120,160 L 220,60 L 340,40" 
                                fill="none" 
                                stroke="#3b82f6" 
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray="0"
                              />
                              <text x="350" y="40" className="text-xs text-blue-600">K-shaped (Winners)</text>
                              
                              <path 
                                d="M 60,100 L 120,160 L 220,180 L 340,160" 
                                fill="none" 
                                stroke="#60a5fa" 
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray="0"
                              />
                              <text x="350" y="160" className="text-xs text-blue-400">K-shaped (Losers)</text>
                              
                              {/* W-shaped recovery */}
                              <path 
                                d="M 60,100 L 100,140 L 140,100 L 180,160 L 260,60 L 340,100" 
                                fill="none" 
                                stroke="#6366f1" 
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray="4"
                              />
                              <text x="350" y="100" className="text-xs text-indigo-500">W-shaped</text>
                            </svg>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
                            <div className="bg-indigo-50 p-3 rounded-md">
                              <h4 className="text-sm font-medium text-indigo-800 mb-1">Asset Performance</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-600">Equities</span>
                                  <span className="text-xs font-semibold text-red-600">-30%</span>
                                </div>
                                <div className="w-full bg-gray-200 h-1.5 rounded-full">
                                  <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-600">Gov't Bonds</span>
                                  <span className="text-xs font-semibold text-green-600">+5%</span>
                                </div>
                                <div className="w-full bg-gray-200 h-1.5 rounded-full">
                                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '55%' }}></div>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-600">Gold</span>
                                  <span className="text-xs font-semibold text-green-600">+15%</span>
                                </div>
                                <div className="w-full bg-gray-200 h-1.5 rounded-full">
                                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-600">Cash</span>
                                  <span className="text-xs font-semibold text-green-600">+0.5%</span>
                                </div>
                                <div className="w-full bg-gray-200 h-1.5 rounded-full">
                                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '51%' }}></div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-indigo-50 p-3 rounded-md">
                              <h4 className="text-sm font-medium text-indigo-800 mb-1">Sector Impact</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-600">Technology</span>
                                  <span className="text-xs font-semibold text-red-600">-25%</span>
                                </div>
                                <div className="w-full bg-gray-200 h-1.5 rounded-full">
                                  <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-600">Financials</span>
                                  <span className="text-xs font-semibold text-red-600">-40%</span>
                                </div>
                                <div className="w-full bg-gray-200 h-1.5 rounded-full">
                                  <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-600">Healthcare</span>
                                  <span className="text-xs font-semibold text-red-600">-10%</span>
                                </div>
                                <div className="w-full bg-gray-200 h-1.5 rounded-full">
                                  <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '50%' }}></div>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-600">Utilities</span>
                                  <span className="text-xs font-semibold text-red-600">-15%</span>
                                </div>
                                <div className="w-full bg-gray-200 h-1.5 rounded-full">
                                  <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '55%' }}></div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-indigo-50 p-3 rounded-md">
                              <h4 className="text-sm font-medium text-indigo-800 mb-1">Recovery Timeframes</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-600">Average Duration</span>
                                  <span className="text-xs font-medium">14 months</span>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-600">Market Bottom</span>
                                  <span className="text-xs font-medium">6-8 months in</span>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-600">Full Recovery</span>
                                  <span className="text-xs font-medium">3-5 years</span>
                                </div>
                                
                                <div className="mt-3 pt-2 border-t border-indigo-100">
                                  <span className="text-xs font-medium text-indigo-800 block mb-1">Historical Recovery Pattern</span>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mr-1"></span>
                                      <span className="text-xs text-gray-600">V-shaped</span>
                                    </div>
                                    <span className="text-xs font-medium">20%</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-1"></span>
                                      <span className="text-xs text-gray-600">U-shaped</span>
                                    </div>
                                    <span className="text-xs font-medium">40%</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                                      <span className="text-xs text-gray-600">Other</span>
                                    </div>
                                    <span className="text-xs font-medium">40%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Expert Insights */}
                    <motion.div 
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="p-6">
                        <h3 className="font-semibold mb-4">Expert Insights for {selectedMarketScenario.name}</h3>
                        
                        <div className="space-y-6">
                          {selectedMarketScenario.experts.map((expert, index) => (
                            <motion.div 
                              key={index}
                              className="bg-gray-50 p-4 rounded-lg"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 * index }}
                            >
                              <h4 className={`font-medium mb-2 ${selectedMarketScenario.iconColor}`}>{expert.name}</h4>
                              <p className="text-gray-700 text-sm mb-3">{expert.advice}</p>
                              <p className="text-gray-700 text-sm italic mb-3">{expert.prediction}</p>
                              
                              <h5 className="text-xs text-gray-500 uppercase mb-2">Strategy Tips</h5>
                              <ul className="space-y-1">
                                {expert.strategyTips.map((tip, tipIndex) => (
                                  <li key={tipIndex} className="text-sm text-gray-700 flex items-start">
                                    <span className={`flex-shrink-0 ${selectedMarketScenario.iconColor} mr-2`}>•</span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* 3D Performance Comparison */}
                    <motion.div 
                      className={`bg-gradient-to-br ${selectedMarketScenario.colorScheme} text-white rounded-lg shadow-lg p-6`}
                      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <h3 className="font-semibold mb-4">Performance Impact</h3>
                      <p className="text-sm opacity-90 mb-4">
                        How a ₹1 lakh investment would perform over 5 years in a {selectedMarketScenario.name.toLowerCase()} scenario.
                      </p>
                      
                      {marketPerformance.map(scenario => {
                        if (scenario.id === selectedMarketScenario.id) {
                          return (
                            <div key={scenario.id} className="space-y-3">
                              <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-md p-3">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm">Initial Investment</span>
                                  <span className="font-semibold">₹{formatIndianNumber(scenario.initialValue)}</span>
                                </div>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-sm">Final Value</span>
                                  <span className="font-semibold">₹{formatIndianNumber(Math.round(scenario.finalValue))}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">Total Return</span>
                                  <span className="font-semibold">{scenario.totalReturn.toFixed(1)}%</span>
                                </div>
                              </div>
                              
                              <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-md p-3">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm">Annualized Return</span>
                                  <span className="font-semibold">{scenario.annualizedReturn.toFixed(1)}%</span>
                                </div>
                                <div className="w-full h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-white"
                                    style={{ width: `${Math.min(Math.abs(scenario.annualizedReturn) * 2, 100)}%`, 
                                            backgroundColor: scenario.annualizedReturn < 0 ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.8)' }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Compare with Other Investors */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4">Compare Investment Strategies</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investor</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strategy</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Return</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Horizon</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {investmentStrategies.map((strategy) => (
                    <tr key={strategy.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedStrategy(strategy)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{strategy.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-700">{strategy.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-primary font-medium">{strategy.annualReturn}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-700">{strategy.timeHorizon}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-700">{strategy.riskLevel}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Important Tips */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md mb-10">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiInfo className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Important to Remember</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Past performance is not indicative of future results</li>
                    <li>All investments carry risk and can lose value</li>
                    <li>Consider consulting with a financial advisor before making investment decisions</li>
                    <li>Diversification is key to managing investment risk</li>
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

export default StrategyPage; 