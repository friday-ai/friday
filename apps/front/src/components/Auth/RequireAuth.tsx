import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useSharedApp from '../../services/app/useApp';

export default function RequireAuth() {
  const location = useLocation();
  const { hasSession } = useSharedApp();

  if (!hasSession) {
    // Redirect them to the /login (or /signup) page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
}
