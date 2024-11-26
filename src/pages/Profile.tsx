import { useAuth } from '../contexts/AuthContext';

export const ProfilePage: React.FC = () => {
  const auth = useAuth();

  const user = auth?.user || null;
  
  if (!user) {
    return <div>Please login to view your profile.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Profile</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-white font-medium mb-2">Name</label>
            <p className="text-gray-600 dark:text-white">{user.name}</p>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-white font-medium mb-2">Email</label>
            <p className="text-gray-600 dark:text-white">{user.email}</p>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-white font-medium mb-2">Bio</label>
            <p className="text-gray-600 dark:text-white">{user.bio || 'No bio added yet'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};