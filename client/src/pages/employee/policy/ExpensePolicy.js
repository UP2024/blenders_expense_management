import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Card, CardContent, Grid, Chip, Alert } from '@mui/material';
import { CheckCircle, Warning, Info, AttachMoney, Receipt, Schedule } from '@mui/icons-material';

const ExpensePolicy = () => {
  const policySections = [
    {
      title: 'Eligible Expenses',
      icon: <CheckCircle color="success" />,
      items: [
        'Business travel (flights, hotels, rental cars)',
        'Client meals and entertainment',
        'Office supplies and equipment',
        'Software subscriptions and tools',
        'Professional development and training',
        'Team building activities'
      ]
    },
    {
      title: 'Non-Eligible Expenses',
      icon: <Warning color="warning" />,
      items: [
        'Personal expenses and gifts',
        'Alcohol (unless with clients)',
        'Traffic fines and parking tickets',
        'Home office furniture over $500',
        'Political contributions',
        'Health and wellness expenses'
      ]
    },
    {
      title: 'Submission Guidelines',
      icon: <Info color="info" />,
      items: [
        'Submit expenses within 30 days of purchase',
        'Include detailed description and business purpose',
        'Attach original receipts for all expenses over $25',
        'Categorize expenses correctly',
        'Get pre-approval for expenses over $1000',
        'Use company-approved vendors when possible'
      ]
    }
  ];

  const limitsAndApprovals = [
    { category: 'Travel - Flights', limit: 'Economy class', approval: 'Manager', receipt: 'Required' },
    { category: 'Hotel Accommodation', limit: '$300/night', approval: 'Manager', receipt: 'Required' },
    { category: 'Meals - Business', limit: '$75/person', approval: 'Auto < $150', receipt: 'Required > $25' },
    { category: 'Meals - Team', limit: '$50/person', approval: 'Manager', receipt: 'Required' },
    { category: 'Office Supplies', limit: 'No limit', approval: 'Auto < $500', receipt: 'Required > $100' },
    { category: 'Software/Tools', limit: 'No limit', approval: 'IT Manager', receipt: 'Required' },
    { category: 'Training/Certification', limit: '$2000/year', approval: 'Director', receipt: 'Required' }
  ];

  const quickTips = [
    { icon: <Receipt />, title: 'Keep Receipts', description: 'Always get and keep itemized receipts for all business expenses.' },
    { icon: <Schedule />, title: 'Submit Early', description: 'Submit expenses within one week to ensure timely reimbursement.' },
    { icon: <AttachMoney />, title: 'Stay Within Limits', description: 'Check category limits before making purchases to avoid rejections.' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1e293b' }}>
        Expense Policy
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        Company guidelines and policies for expense submissions and reimbursements.
      </Typography>

      {/* Important Notice */}
      <Alert severity="info" sx={{ mb: 4, borderRadius: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          📢 Important: All expenses must comply with company policy. Non-compliant expenses will be rejected.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Policy Sections */}
        <Grid item xs={12} md={8}>
          {policySections.map((section, index) => (
            <Paper key={index} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {section.icon}
                <Typography variant="h6" sx={{ fontWeight: 'bold', ml: 1, color: '#1e293b' }}>
                  {section.title}
                </Typography>
              </Box>
              <List dense>
                {section.items.map((item, itemIndex) => (
                  <ListItem key={itemIndex} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle color="success" sx={{ fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          ))}
        </Grid>

        {/* Quick Tips Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#1e293b' }}>
              Quick Tips
            </Typography>
            {quickTips.map((tip, index) => (
              <Card key={index} sx={{ mb: 2, border: '1px solid #e2e8f0' }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ color: '#3b82f6', mr: 1 }}>
                      {tip.icon}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {tip.title}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    {tip.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Paper>

          {/* Contact Information */}
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1e293b' }}>
              Need Help?
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
              Contact the finance team for policy questions:
            </Typography>
            <List dense>
              <ListItem sx={{ px: 0 }}>
                <ListItemText 
                  primary="📧 Email" 
                  secondary="finance@company.com"
                  secondaryTypographyProps={{ sx: { color: '#3b82f6', fontWeight: '500' } }}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemText 
                  primary="📞 Phone" 
                  secondary="(555) 123-4567"
                  secondaryTypographyProps={{ sx: { color: '#3b82f6', fontWeight: '500' } }}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemText 
                  primary="🕒 Response Time" 
                  secondary="Within 24 hours"
                  secondaryTypographyProps={{ sx: { color: '#64748b' } }}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Limits and Approvals Table */}
      <Paper sx={{ p: 3, mt: 2, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, color: '#1e293b' }}>
          Expense Limits & Approval Matrix
        </Typography>
        <Grid container spacing={2}>
          {limitsAndApprovals.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', border: '1px solid #e2e8f0' }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#1e293b' }}>
                    {item.category}
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    <Chip label={`Limit: ${item.limit}`} size="small" color="primary" sx={{ mb: 0.5, mr: 0.5 }} />
                    <Chip label={`Approval: ${item.approval}`} size="small" color="secondary" sx={{ mb: 0.5, mr: 0.5 }} />
                  </Box>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    Receipt: {item.receipt}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Reimbursement Information */}
      <Paper sx={{ p: 3, mt: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1e293b' }}>
          Reimbursement Process
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#3b82f6', mb: 1 }}>
                1-3
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Business Days for Approval
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#10b981', mb: 1 }}>
                3-5
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Business Days for Payment
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f59e0b', mb: 1 }}>
                30
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Days to Submit Expenses
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ExpensePolicy;