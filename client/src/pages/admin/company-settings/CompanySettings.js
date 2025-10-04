import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Switch,
  FormControlLabel,
  MenuItem,
  Alert,
  Tab,
  Tabs,
  Chip
} from '@mui/material';
import { Save, Business, Security, Notifications, Receipt } from '@mui/icons-material';

const CompanySettings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState({
    company: {
      name: 'TechCorp Inc.',
      email: 'admin@techcorp.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business Ave, San Francisco, CA 94105',
      baseCurrency: 'USD',
      fiscalYearStart: 'January',
      timezone: 'America/Los_Angeles'
    },
    expense: {
      receiptRequired: true,
      receiptMaxAmount: 25,
      categories: ['Travel', 'Meals', 'Software', 'Equipment', 'Office Supplies', 'Other'],
      defaultCurrency: 'USD',
      autoSubmit: false
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 60,
      passwordExpiry: 90,
      ipWhitelist: ['192.168.1.0/24']
    },
    notifications: {
      expenseSubmitted: true,
      expenseApproved: true,
      expenseRejected: true,
      monthlyReports: true,
      systemUpdates: false
    }
  });

  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'JPY', name: 'Japanese Yen' }
  ];

  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Singapore'
  ];

  const handleSave = () => {
    // In real app, this would save to backend
    alert('Settings saved successfully!');
  };

  const handleCompanyChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      company: { ...prev.company, [field]: value }
    }));
  };

  const handleExpenseChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      expense: { ...prev.expense, [field]: value }
    }));
  };

  const handleSecurityChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      security: { ...prev.security, [field]: value }
    }));
  };

  const handleNotificationChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value }
    }));
  };

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1e293b' }}>
        Company Settings
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        Manage your company profile and system configuration.
      </Typography>

      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#f8fafc' }}
        >
          <Tab icon={<Business />} label="Company Info" />
          <Tab icon={<Receipt />} label="Expense Settings" />
          <Tab icon={<Security />} label="Security" />
          <Tab icon={<Notifications />} label="Notifications" />
        </Tabs>

        {/* Company Info Tab */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
            Company Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Name"
                value={settings.company.name}
                onChange={(e) => handleCompanyChange('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Email"
                type="email"
                value={settings.company.email}
                onChange={(e) => handleCompanyChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={settings.company.phone}
                onChange={(e) => handleCompanyChange('phone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Base Currency"
                value={settings.company.baseCurrency}
                onChange={(e) => handleCompanyChange('baseCurrency', e.target.value)}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Fiscal Year Start"
                value={settings.company.fiscalYearStart}
                onChange={(e) => handleCompanyChange('fiscalYearStart', e.target.value)}
              >
                <MenuItem value="January">January</MenuItem>
                <MenuItem value="April">April</MenuItem>
                <MenuItem value="July">July</MenuItem>
                <MenuItem value="October">October</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Timezone"
                value={settings.company.timezone}
                onChange={(e) => handleCompanyChange('timezone', e.target.value)}
              >
                {timezones.map((tz) => (
                  <MenuItem key={tz} value={tz}>
                    {tz}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Company Address"
                value={settings.company.address}
                onChange={(e) => handleCompanyChange('address', e.target.value)}
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Expense Settings Tab */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
            Expense Policy Settings
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.expense.receiptRequired}
                    onChange={(e) => handleExpenseChange('receiptRequired', e.target.checked)}
                  />
                }
                label="Receipt Required for All Expenses"
              />
            </Grid>
            
            {settings.expense.receiptRequired && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Receipt Required Above Amount"
                  value={settings.expense.receiptMaxAmount}
                  onChange={(e) => handleExpenseChange('receiptMaxAmount', e.target.value)}
                  InputProps={{ startAdornment: '$' }}
                  helperText="Receipts required for expenses above this amount"
                />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Default Currency for Employees"
                value={settings.expense.defaultCurrency}
                onChange={(e) => handleExpenseChange('defaultCurrency', e.target.value)}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.expense.autoSubmit}
                    onChange={(e) => handleExpenseChange('autoSubmit', e.target.checked)}
                  />
                }
                label="Auto-submit Expenses (Skip Draft)"
                helperText="Expenses are submitted immediately instead of saved as draft"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Expense Categories
              </Typography>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Grid container spacing={1}>
                  {settings.expense.categories.map((category, index) => (
                    <Grid item key={index}>
                      <Chip label={category} variant="outlined" />
                    </Grid>
                  ))}
                </Grid>
                <Button variant="outlined" size="small" sx={{ mt: 2 }}>
                  Manage Categories
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Security Tab */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
            Security Settings
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.security.twoFactorAuth}
                    onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
                  />
                }
                label="Require Two-Factor Authentication"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Session Timeout (minutes)"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                helperText="Automatically log out users after inactivity"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Password Expiry (days)"
                value={settings.security.passwordExpiry}
                onChange={(e) => handleSecurityChange('passwordExpiry', e.target.value)}
                helperText="Require password change after this period"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="IP Whitelist"
                value={settings.security.ipWhitelist.join(', ')}
                onChange={(e) => handleSecurityChange('ipWhitelist', e.target.value.split(', '))}
                helperText="Comma-separated list of allowed IP addresses/networks"
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Notifications Tab */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
            Notification Preferences
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.expenseSubmitted}
                    onChange={(e) => handleNotificationChange('expenseSubmitted', e.target.checked)}
                  />
                }
                label="Notify when employees submit expenses"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.expenseApproved}
                    onChange={(e) => handleNotificationChange('expenseApproved', e.target.checked)}
                  />
                }
                label="Notify when expenses are approved"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.expenseRejected}
                    onChange={(e) => handleNotificationChange('expenseRejected', e.target.checked)}
                  />
                }
                label="Notify when expenses are rejected"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.monthlyReports}
                    onChange={(e) => handleNotificationChange('monthlyReports', e.target.checked)}
                  />
                }
                label="Send monthly expense reports"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.systemUpdates}
                    onChange={(e) => handleNotificationChange('systemUpdates', e.target.checked)}
                  />
                }
                label="Notify about system updates and maintenance"
              />
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Save Button */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSave}
          size="large"
        >
          Save All Settings
        </Button>
      </Box>

      {/* Current Settings Summary */}
      <Card sx={{ mt: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Current Settings Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Company: <strong>{settings.company.name}</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Base Currency: <strong>{settings.company.baseCurrency}</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Receipt Required: <strong>{settings.expense.receiptRequired ? 'Yes' : 'No'}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                2FA Enabled: <strong>{settings.security.twoFactorAuth ? 'Yes' : 'No'}</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Session Timeout: <strong>{settings.security.sessionTimeout} min</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Categories: <strong>{settings.expense.categories.length}</strong>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CompanySettings;