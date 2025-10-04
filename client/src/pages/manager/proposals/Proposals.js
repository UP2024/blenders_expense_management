import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const Proposals = () => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      employee: 'John Doe',
      amount: 150,
      currency: 'USD',
      category: 'Travel',
      date: '2024-06-15',
      description: 'Client meeting travel expenses - Uber and taxi fares',
      receipt: 'receipt_uber_0615.pdf',
      status: 'pending',
      submittedDate: '2024-06-16'
    },
    {
      id: 2,
      employee: 'Sarah Smith',
      amount: 89.50,
      currency: 'USD',
      category: 'Meals & Entertainment',
      date: '2024-06-14',
      description: 'Team lunch with clients at Italian restaurant',
      receipt: 'receipt_lunch_0614.jpg',
      status: 'pending',
      submittedDate: '2024-06-15'
    },
    {
      id: 3,
      employee: 'Mike Johnson',
      amount: 1200,
      currency: 'USD',
      category: 'Equipment',
      date: '2024-06-10',
      description: 'New monitor for home office setup',
      receipt: 'receipt_monitor_0610.pdf',
      status: 'pending',
      submittedDate: '2024-06-12'
    }
  ]);

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = (expenseId) => {
    setExpenses(expenses.map(expense => 
      expense.id === expenseId ? { ...expense, status: 'approved' } : expense
    ));
  };

  const handleReject = (expenseId) => {
    if (rejectionReason.trim()) {
      setExpenses(expenses.map(expense => 
        expense.id === expenseId ? { ...expense, status: 'rejected', rejectionReason } : expense
      ));
      setSelectedExpense(null);
      setRejectionReason('');
    }
  };

  const openRejectDialog = (expense) => {
    setSelectedExpense(expense);
  };

  const closeRejectDialog = () => {
    setSelectedExpense(null);
    setRejectionReason('');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const pendingExpenses = expenses.filter(expense => expense.status === 'pending');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1e293b' }}>
        Expense Approvals
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        {pendingExpenses.length} expenses waiting for your review and approval.
      </Typography>

      <Grid container spacing={3}>
        {pendingExpenses.map((expense) => (
          <Grid item xs={12} key={expense.id}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                      {expense.employee}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                      {expense.category} • {new Date(expense.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
                      Submitted: {new Date(expense.submittedDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                      ${expense.amount}
                    </Typography>
                    <Chip 
                      label={expense.status.toUpperCase()} 
                      color={getStatusColor(expense.status)}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ mb: 3, color: '#475569', lineHeight: 1.6 }}>
                  {expense.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => window.open(`/receipts/${expense.receipt}`, '_blank')}
                  >
                    📄 View Receipt
                  </Button>
                  
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                      variant="outlined" 
                      color="error"
                      onClick={() => openRejectDialog(expense)}
                    >
                      Reject
                    </Button>
                    <Button 
                      variant="contained" 
                      onClick={() => handleApprove(expense.id)}
                      sx={{ backgroundColor: '#10b981', '&:hover': { backgroundColor: '#059669' } }}
                    >
                      Approve
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {pendingExpenses.length === 0 && (
          <Grid item xs={12}>
            <Card sx={{ textAlign: 'center', p: 6, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ color: '#64748b', mb: 2 }}>
                🎉 All Caught Up!
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                No pending expenses to review. New submissions will appear here.
              </Typography>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Rejection Dialog */}
      <Dialog open={!!selectedExpense} onClose={closeRejectDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Reject Expense</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Please provide a reason for rejecting {selectedExpense?.employee}'s expense:
          </Typography>
          <TextField
            autoFocus
            fullWidth
            multiline
            rows={3}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Enter rejection reason..."
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRejectDialog}>Cancel</Button>
          <Button 
            onClick={() => handleReject(selectedExpense?.id)} 
            variant="contained" 
            color="error"
            disabled={!rejectionReason.trim()}
          >
            Reject Expense
          </Button>
        </DialogActions>
      </Dialog>

      {/* Approved/Rejected Section */}
      {expenses.filter(e => e.status !== 'pending').length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#1e293b' }}>
            Processed Expenses
          </Typography>
          <Grid container spacing={2}>
            {expenses.filter(e => e.status !== 'pending').map((expense) => (
              <Grid item xs={12} md={6} key={expense.id}>
                <Card sx={{ p: 2, borderLeft: `4px solid ${expense.status === 'approved' ? '#10b981' : '#ef4444'}` }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: '500' }}>
                        {expense.employee}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        ${expense.amount} • {expense.category}
                      </Typography>
                    </Box>
                    <Chip 
                      label={expense.status.toUpperCase()} 
                      color={getStatusColor(expense.status)}
                      size="small"
                    />
                  </Box>
                  {expense.rejectionReason && (
                    <Typography variant="caption" sx={{ color: '#ef4444', mt: 1, display: 'block' }}>
                      Reason: {expense.rejectionReason}
                    </Typography>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Proposals;