import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';

const ManagerDashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manager Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Approvals
              </Typography>
              <Typography variant="h4">
                5
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Team Members
              </Typography>
              <Typography variant="h4">
                8
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography>
          Manager dashboard content will be developed here...
        </Typography>
      </Paper>
    </Box>
  );
};

export default ManagerDashboard;