import Container from '@mui/material/Container';
import React from 'react';
import { Outlet } from 'react-router-dom';

import AppBar from '../AppBar/AppBar';
import AnimationLayout from './AnimationLayout';

export default function DashboardLayout() {
  return (
    <Container maxWidth={false} disableGutters>
      <AppBar />
      <Container maxWidth={false}>
        <AnimationLayout>
          <Outlet />
        </AnimationLayout>
      </Container>
    </Container>
  );
}
