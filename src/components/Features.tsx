"use client";

import { FiPieChart, FiTrendingUp, FiAlertOctagon, FiTarget, FiClock, FiShield } from 'react-icons/fi';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FiPieChart className="h-6 w-6 text-primary" />,
    title: 'Budget Planning',
    description: 'Create custom budgets by category. Set monthly limits and track your progress.'
  },
  {
    icon: <FiTrendingUp className="h-6 w-6 text-primary" />,
    title: 'Expense Tracking',
    description: 'Easily log and categorize expenses. Gain insights into your spending patterns.'
  },
  {
    icon: <FiAlertOctagon className="h-6 w-6 text-primary" />,
    title: 'Spending Alerts',
    description: 'Get notified when you\'re close to reaching your budget limits.'
  },
  {
    icon: <FiTarget className="h-6 w-6 text-primary" />,
    title: 'Financial Goals',
    description: 'Set savings targets and track your progress toward achieving them.'
  },
  {
    icon: <FiClock className="h-6 w-6 text-primary" />,
    title: 'Bill Reminders',
    description: 'Never miss a payment with automated bill reminders and payment tracking.'
  },
  {
    icon: <FiShield className="h-6 w-6 text-primary" />,
    title: 'Safe & Secure',
    description: 'Your financial data is protected with bank-level security and encryption.'
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-light">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Powerful Features For Your Financial Success
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Silent Money gives you all the tools you need to track, manage, and grow your finances
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="bg-primary bg-opacity-10 p-3 rounded-full w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 