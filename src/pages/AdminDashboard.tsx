import React, { useState, useEffect } from 'react';
import { usePermissions } from '../hooks/userPermission';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { 
  UserManagement 
} from '../components/dashboard/UserManagment';
import { 
  RoleManagement 
} from '../components/dashboard/RoleManagement';
import { 
  PermissionManagement 
} from '../components/dashboard/PermissionManagement';


export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'permissions'>('users');
  const { hasRole } = usePermissions();

  const tabs = [
    { 
      key: 'users', 
      label: 'User Management', 
      component: <UserManagement /> 
    },
    { 
      key: 'roles', 
      label: 'Role Management', 
      component: <RoleManagement />
    },
    { 
      key: 'permissions', 
      label: 'Permission Management', 
      component: <PermissionManagement />
    }
  ];

  return (
    <ProtectedRoute requiredRoles={['admin']}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">Admin Dashboard</h1>
        
        <div className="mb-6 border-b">
          <nav className="-mb-px flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`
                  py-2 px-4 border-b-2 transition-colors duration-300
                  ${activeTab === tab.key 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div>
          {tabs.find(tab => tab.key === activeTab)?.component}
        </div>
      </div>
    </ProtectedRoute>
  );
};