import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  TextField,
  MenuItem,
  Grid,
  Alert,
  Divider
} from '@mui/material';
import { Save } from '@mui/icons-material';

const ApprovalRules = () => {
  const [rules, setRules] = useState({
    multiLevelApproval: true,
    autoApproveLimit: 500,
    requireDirectorApproval: 5000,
    approvalFlow: ['manager', 'finance'],
    notificationSettings: {
      email: true,
      slack: false,
      inApp: true
    }
  });

  const approvalStages = [
    { value: 'manager', label: 'Direct Manager' },
    { value: 'finance', label: 'Finance Team' },
    { value: 'director', label: 'Department Director' },
    { value: 'ceo', label: 'CEO' }
  ];

  const handleSave = () => {
    // In real app, this would save to backend
    alert('Approval rules saved successfully!');
  };

  const handleToggle = (field) => {
    setRules(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleNumberChange = (field, value) => {
    setRules(prev => ({ ...prev, [field]: parseInt(value) || 0 }));
  };

  const handleApprovalFlowChange = (index, value) => {
    const newFlow = [...rules.approvalFlow];
    newFlow[index] = value;
    setRules(prev => ({ ...prev, approvalFlow: newFlow }));
  };

  const addApprovalStage = () => {
    if (rules.approvalFlow.length < 4) {
      setRules(prev => ({
        ...prev,
        approvalFlow: [...prev.approvalFlow, 'manager']
      }));
    }
  };

  const removeApprovalStage = (index) => {
    if (rules.approvalFlow.length > 1) {
      const newFlow = rules.approvalFlow.filter((_, i) => i !== index);
      setRules(prev => ({ ...prev, approvalFlow: newFlow }));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1e293b' }}>
        Approval Rules
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        Configure how expenses are approved in your organization.
      </Typography>

      <Grid container spacing={3}>
        {/* Multi-level Approval */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Approval Workflow
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={rules.multiLevelApproval}
                    onChange={() => handleToggle('multiLevelApproval')}
                    color="primary"
                  />
                }
                label="Enable Multi-level Approval"
                sx={{ mb: 3 }}
              />

              {rules.multiLevelApproval && (
                <Box>
                  <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
                    Define the approval flow sequence:
                  </Typography>
                  
                  {rules.approvalFlow.map((stage, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                      <Typography variant="body2" sx={{ minWidth: 100 }}>
                        Stage {index + 1}:
                      </Typography>
                      <TextField
                        select
                        value={stage}
                        onChange={(e) => handleApprovalFlowChange(index, e.target.value)}
                        sx={{ minWidth: 200 }}
                        size="small"
                      >
                        {approvalStages.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      {rules.approvalFlow.length > 1 && (
                        <Button 
                          size="small" 
                          color="error"
                          onClick={() => removeApprovalStage(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </Box>
                  ))}
                  
                  {rules.approvalFlow.length < 4 && (
                    <Button onClick={addApprovalStage} variant="outlined" size="small">
                      Add Approval Stage
                    </Button>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Auto-approval Rules */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Auto-approval Rules
              </Typography>
              
              <TextField
                fullWidth
                label="Auto-approve if amount is below"
                type="number"
                value={rules.autoApproveLimit}
                onChange={(e) => handleNumberChange('autoApproveLimit', e.target.value)}
                InputProps={{ startAdornment: '$' }}
                sx={{ mb: 3 }}
                helperText="Expenses below this amount will be automatically approved"
              />

              <TextField
                fullWidth
                label="Require Director approval if above"
                type="number"
                value={rules.requireDirectorApproval}
                onChange={(e) => handleNumberChange('requireDirectorApproval', e.target.value)}
                InputProps={{ startAdornment: '$' }}
                helperText="Expenses above this amount require director approval"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Notification Settings
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={rules.notificationSettings.email}
                    onChange={() => setRules(prev => ({
                      ...prev,
                      notificationSettings: {
                        ...prev.notificationSettings,
                        email: !prev.notificationSettings.email
                      }
                    }))}
                  />
                }
                label="Email Notifications"
                sx={{ display: 'block', mb: 1 }}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={rules.notificationSettings.slack}
                    onChange={() => setRules(prev => ({
                      ...prev,
                      notificationSettings: {
                        ...prev.notificationSettings,
                        slack: !prev.notificationSettings.slack
                      }
                    }))}
                  />
                }
                label="Slack Notifications"
                sx={{ display: 'block', mb: 1 }}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={rules.notificationSettings.inApp}
                    onChange={() => setRules(prev => ({
                      ...prev,
                      notificationSettings: {
                        ...prev.notificationSettings,
                        inApp: !prev.notificationSettings.inApp
                      }
                    }))}
                  />
                }
                label="In-app Notifications"
                sx={{ display: 'block' }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Save Button */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSave}
          size="large"
        >
          Save Rules
        </Button>
      </Box>

      {/* Current Rules Summary */}
      <Card sx={{ mt: 4, borderRadius: 3, boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Current Rules Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Multi-level Approval: <strong>{rules.multiLevelApproval ? 'Enabled' : 'Disabled'}</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Auto-approve Limit: <strong>${rules.autoApproveLimit}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Approval Flow: <strong>{rules.approvalFlow.map(stage => {
                  const stageLabel = approvalStages.find(s => s.value === stage)?.label;
                  return stageLabel;
                }).join(' → ')}</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Director Approval Required: <strong>${rules.requireDirectorApproval}+</strong>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ApprovalRules;