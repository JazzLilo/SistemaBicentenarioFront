import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Login, Register, CheckEmail, ForgotPassword} from '@/pages/auth';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AuthProvider } from '@/context/AuthProvider';
import Dashboard from '@/pages/dashboard/Dashboard';
import {AppContainer} from '@/style/App';
import VerifyCode from '@/pages/auth/VerifyCode';

import { PublicRoutes, PrivateRoutes, AdminRoutes } from './routes';
import RoutesNotFound from '@/lib/RoutesNotFound';

import { Admin } from '@/pages/admin/Admin';

/*
<Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
*/

function App() {
  return (
    <BrowserRouter>
        <AppContainer>
          <RoutesNotFound>
            <Route path={PublicRoutes.Login} element={<Login />} />
            <Route path={PublicRoutes.CheckEmail} element={<CheckEmail />} />
            <Route path={PublicRoutes.VerifyCode} element={<VerifyCode />} />
            <Route path={PublicRoutes.Register} element={<Register />} />
            <Route path={PublicRoutes.ForgotPassword} element={<ForgotPassword />} />
            
            <Route 
              path={PrivateRoutes.Dashboard} 
              element={
                  <Dashboard />
              } 
            />

            <Route path={`${AdminRoutes.Base}/*`} element={<Admin />} />
          </RoutesNotFound>
        </AppContainer>
    </BrowserRouter>
  );
}

export default App;