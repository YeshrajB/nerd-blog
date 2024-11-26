import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { usePermissions } from '../hooks/userPermission';

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth()!;
  const { hasRole } = usePermissions();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white shadow-md dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-around items-center">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-xl font-bold text-gray-800">
                BlogApp
              </Link>
              <Link to="/" className="text-gray-600 dark:text-gray-400 dark:hover:text-white hover:text-gray-800">
                Home
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link to="/profile" className="text-gray-600 dark:text-gray-400 dark:hover:text-white hover:text-gray-800">
                    Profile
                  </Link>
                  {hasRole("admin") && (
                    <Link to="/admin" className="text-gray-600 dark:text-gray-400 dark:hover:text-white hover:text-gray-800">
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="text-gray-600 dark:text-gray-400 dark:hover:text-white hover:text-gray-800"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-gray-600 dark:text-gray-400 dark:hover:text-white hover:text-gray-800">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
};