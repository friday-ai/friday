import Container from '@mui/material/Container';
import React from 'react';
import { Outlet } from 'react-router-dom';

import AppBar from '../AppBar/AppBar';
import AnimationLayout from './AnimationLayout';

export default function DashboardLayout() {
  return (
    <Container sx={{ padding: 2, paddingTop: 0 }}>
      <AppBar />
      <Container sx={{ paddingTop: 2 }}>
        <AnimationLayout>
          <Outlet />
        </AnimationLayout>
      </Container>
    </Container>
  );
}
