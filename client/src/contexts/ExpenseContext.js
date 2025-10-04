import React, { createContext, useState, useContext } from 'react';

const ExpenseContext = createContext();

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: 'Client Meeting Travel',
      amount: 150,
      currency: 'USD',
      category: 'Travel',
      date: '2024-12-15',
      status: 'approved',
      approvedBy: 'Sarah Manager',
      approvedDate: '2024-12-17',
      convertedAmount: 150,
      convertedCurrency: 'USD'
    },
    {
      id: 2,
      title: 'Team Lunch',
      amount: 89.50,
      currency: 'USD',
      category: 'Meals & Entertainment',
      date: '2024-12-14',
      status: 'pending',
      approvedBy: null,
      approvedDate: null,
      convertedAmount: 89.50,
      convertedCurrency: 'USD'
    },
    {
      id: 3,
      title: 'Software Subscription',
      amount: 299,
      currency: 'USD',
      category: 'Software & Tools',
      date: '2024-12-10',
      status: 'rejected',
      approvedBy: 'Sarah Manager',
      approvedDate: '2024-12-12',
      rejectionReason: 'Subscription not pre-approved',
      convertedAmount: 299,
      convertedCurrency: 'USD'
    }
  ]);

  const addExpense = async (expense) => {
    try {
      // Convert currency to USD (base currency)
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/USD`
      );
      const data = await response.json();
      
      const rate = data.rates[expense.currency] || 1;
      const convertedAmount = expense.amount / rate;

      const newExpense = {
        ...expense,
        id: Date.now(),
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        convertedAmount: parseFloat(convertedAmount.toFixed(2)),
        convertedCurrency: 'USD'
      };

      setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
      return newExpense;
    } catch (error) {
      console.error('Error converting currency:', error);
      // Fallback to original amount if conversion fails
      const newExpense = {
        ...expense,
        id: Date.now(),
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        convertedAmount: expense.amount,
        convertedCurrency: expense.currency
      };
      setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
      return newExpense;
    }
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
