import { BrowserRouter,  Route } from 'react-router-dom';
import {Login, Register, CheckEmail, ForgotPassword} from '@/pages/auth';
import Dashboard from '@/pages/dashboard/Dashboard';
import {AppContainer} from '@/assets/css/App';
import VerifyCode from '@/pages/auth/VerifyCode';

import { PublicRoutes, PrivateRoutes, AdminRoutes } from './routes';
import RoutesNotFound from '@/lib/RoutesNotFound';
import useLocalStorage from '@/hooks/useLocalStorage';
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

  const [user] = useLocalStorage<string>('session_token', '');
  console.log(user);

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