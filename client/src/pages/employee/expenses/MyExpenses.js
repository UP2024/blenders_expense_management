import React, { useContext } from 'react';
import { Box, Paper, Typography, Chip, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../../../contexts/ExpenseContext';

const MyExpenses = () => {
  const { expenses } = useExpenses();
  const navigate = useNavigate();

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'draft': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Under Review';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      case 'draft': return 'Draft';
      default: return status;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1e293b' }}>
        My Expenses
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        Track the status of your submitted expenses and view history.
      </Typography>

      <Grid container spacing={3}>
        {expenses.map((expense) => (
          <Grid item xs={12} md={6} key={expense.id}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {expense.title}
                  </Typography>
                  <Chip 
                    label={getStatusText(expense.status)} 
                    color={getStatusColor(expense.status)}
                    size="small"
                  />
                </Box>

                <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                  {expense.category} • {new Date(expense.date).toLocaleDateString()}
                </Typography>

                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 2 }}>
                  {formatCurrency(expense.amount, expense.currency)}
                  {expense.currency !== 'USD' && (
                    <Typography variant="body2" color="text.secondary">
                      ≈ {formatCurrency(expense.convertedAmount || expense.amount, 'USD')}
                    </Typography>
                  )}
                </Typography>

                {expense.status === 'approved' && (
                  <Typography variant="caption" sx={{ color: '#10b981' }}>
                    ✓ Approved by {expense.approvedBy} on {new Date(expense.approvedDate).toLocaleDateString()}
                  </Typography>
                )}

                {expense.status === 'rejected' && (
                  <Box>
                    <Typography variant="caption" sx={{ color: '#ef4444', display: 'block' }}>
                      ✗ Rejected by {expense.approvedBy}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#ef4444' }}>
                      Reason: {expense.rejectionReason}
                    </Typography>
                  </Box>
                )}

                {expense.status === 'pending' && (
                  <Typography variant="caption" sx={{ color: '#f59e0b' }}>
                    ⏳ Waiting for manager approval
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Summary Stats */}
      <Paper sx={{ p: 3, mt: 4, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Expense Summary
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#3b82f6' }}>
                3
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Total Submitted
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#10b981' }}>
                1
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Approved
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f59e0b' }}>
                1
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Pending
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ef4444' }}>
                1
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Rejected
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default MyExpenses;