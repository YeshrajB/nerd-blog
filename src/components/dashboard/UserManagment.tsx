import { useEffect, useState } from 'react';
import { AdminUser } from '../../models/admin';
import { UserModal } from '../UserModal';
import axios from '../../api/axiosConfig';
import { User } from '../../models/user';

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users/all');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);
  
//   const handleAddUser = () => {
//     setCurrentUser({

//     });
//     setIsModalOpen(true);
//   };

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = async(user: User) => {
    if (currentUser?.id) {
      await axios.patch(`/users/${currentUser.id}`, user);
      setUsers(users.map(u => u.id === currentUser.id ? {...u, ...user} : u));
    } else {
      const result = await axios.post('/users/create', user);
      const newUser: User = (result.data.user);
      setUsers([...users, {
        ...newUser,
      }]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold dark:text-white">Users</h2>
        {/* <button 
          onClick={handleAddUser}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <div className="mr-2 h-5 w-5" /> Add User
        </button> */}
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
            {users.map((usr) => (
              <tr key={usr.id}>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">{usr.name}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">{usr.email}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">{usr.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`
                    px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${usr.isActive ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'}
                  `}>
                    {usr.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => handleEditUser(usr)}
                      className="text-blue-600 hover:text-blue-900"
                    >Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(usr.id)}
                      className="text-red-600 hover:text-red-900"
                    >Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <UserModal 
          user={currentUser!}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};
