import { Route, Navigate } from 'react-router-dom'
import RoutesNotFound from '@/lib/RoutesNotFound';
import { AdminRoutes } from '@/routes/routes';

import { Dashboard } from './dashboard/Dashboard';

export const Admin = () => {
  return (
    <RoutesNotFound>
        <Route path="/" element={<Navigate to={AdminRoutes.Dashboard} />} />
        <Route path={AdminRoutes.Dashboard} element={<Dashboard />} />
    </RoutesNotFound>  
  )
}
