import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import React from 'react';
import { Outlet } from 'react-router-dom';

import AppBar from '../AppBar/AppBar';

export default function DashboardLayout() {
  return (
    <Container sx={{ paddingTop: 0 }}>
      <AppBar />
      <Container sx={{ padding: 2, paddingTop: 2 }}>
        <Outlet />
        <Paper className="primary-gradient"></Paper>
      </Container>
    </Container>
  );
}
