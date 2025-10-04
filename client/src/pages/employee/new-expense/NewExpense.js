import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, Button, Grid, MenuItem, Typography, Alert, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useExpenses } from '../../../contexts/ExpenseContext';
import { useNavigate } from 'react-router-dom';

const NewExpense = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addExpense } = useExpenses();
  const navigate = useNavigate();
  const [exchangeRates, setExchangeRates] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const categories = [
    'Travel',
    'Meals & Entertainment',
    'Office Supplies',
    'Software & Tools',
    'Client Meetings',
    'Training & Development',
    'Equipment',
    'Other'
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' }
  ];

  // Fetch exchange rates on component mount
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);

  // Handle currency conversion
  const handleCurrencyChange = (e, amount) => {
    const newCurrency = e.target.value;
    setSelectedCurrency(newCurrency);
    
    if (exchangeRates && amount) {
      const rate = exchangeRates[newCurrency] || 1;
      setConvertedAmount(amount / rate);
    }
  };

  // Handle amount change for conversion
  const handleAmountChange = (e, currency) => {
    const amount = parseFloat(e.target.value);
    if (exchangeRates && !isNaN(amount)) {
      const rate = exchangeRates[currency] || 1;
      setConvertedAmount(amount / rate);
    } else {
      setConvertedAmount(null);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const newExpense = {
        ...data,
        amount: parseFloat(data.amount),
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
      };

      await addExpense(newExpense);
      setSubmissionStatus('success');
      reset();
      setConvertedAmount(null);
      
      // Redirect to MyExpenses after 2 seconds
      setTimeout(() => {
        navigate('/employee/expenses');
      }, 2000);
    } catch (error) {
      console.error('Error submitting expense:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1e293b' }}>
        Submit New Expense
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        Fill out the form below to submit your expense for approval.
      </Typography>

      <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        {submissionStatus === 'success' && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Expense submitted successfully! It's now pending manager approval.
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Expense Title"
                {...register("title", { required: "Title is required" })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Category"
                {...register("category", { required: "Category is required" })}
                error={!!errors.category}
                helperText={errors.category?.message}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Amount"
                {...register("amount", { 
                  required: "Amount is required",
                  min: { value: 0.01, message: "Amount must be greater than 0" },
                  valueAsNumber: true
                })}
                onChange={(e) => handleAmountChange(e, selectedCurrency)}
                error={!!errors.amount}
                helperText={errors.amount?.message}
                InputProps={{
                  startAdornment: (
                    <Typography sx={{ mr: 1, color: 'text.secondary' }}>
                      {currencies.find(c => c.code === selectedCurrency)?.symbol || '$'}
                    </Typography>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Currency"
                {...register("currency", { 
                  required: "Currency is required",
                  onChange: (e) => handleCurrencyChange(e, parseFloat(document.getElementsByName('amount')[0]?.value) || 0)
                })}
                value={selectedCurrency}
                error={!!errors.currency}
                helperText={errors.currency?.message}
                defaultValue="USD"
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.name} ({currency.code} {currency.symbol})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                label="Expense Date"
                InputLabelProps={{ shrink: true }}
                {...register("date", { required: "Date is required" })}
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Vendor/Merchant"
                {...register("vendor", { required: "Vendor is required" })}
                error={!!errors.vendor}
                helperText={errors.vendor?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                {...register("description", { required: "Description is required" })}
                error={!!errors.description}
                helperText={errors.description?.message}
                placeholder="Please provide details about this expense..."
              />
            </Grid>

            {convertedAmount !== null && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" align="center">
                  ≈ ${convertedAmount.toFixed(2)} USD
                </Typography>
              </Grid>
            )}
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button 
                  type="button" 
                  variant="outlined" 
                  size="large"
                  onClick={() => navigate('/employee/expenses')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large"
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default NewExpense;