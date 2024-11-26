import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { usePermissions } from '../hooks/userPermission';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermissions?: {
    action: Permission['action'];
    resource: Permission['resource'];
  }[];
  requiredRoles?: Role[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermissions = [],
  requiredRoles = [],
}) => {
  const { hasPermission, hasRole } = usePermissions();
  const { user } = useAuth()!;
  const location = useLocation();

//   if (!user) {
//     return <Navigate to="/login" replace={true} />;
//   }

  const hasRequiredPermissions = requiredPermissions.length === 0 || 
    requiredPermissions.every(({ action, resource }) =>
      hasPermission(action, resource)
    );

  const hasRequiredRoles = requiredRoles.length === 0 ||
    requiredRoles.some(role => hasRole(role));

  if (!hasRequiredPermissions || !hasRequiredRoles) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};