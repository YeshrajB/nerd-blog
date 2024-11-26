import { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";

export const RoleManagement: React.FC = () => {
    const [roles, setRoles] = useState<{
      name: Role;
      description: string;
    }[]>([]);
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRole, setCurrentRole] = useState<{
      name: Role;
      description: string;
    } | null>(null);

    useEffect(() => {
        const fetchRoles = async () => {
            const result = await axios.get('/roles/all');
            setRoles(result.data.roles);
        }
        fetchRoles();
        //Todo save roles locally for some time
        //   const storedRoles = localStorage.getItem('roles');
        //   if (storedRoles) {
        //     setRoles(JSON.parse(storedRoles));
        //   }
    }, []);
  
    const handleAddRole = () => {
      setCurrentRole(null);
      setIsModalOpen(true);
    };
  
    const handleEditRole = (role: { name: Role; description: string }) => {
      setCurrentRole(role);
      setIsModalOpen(true);
    };
  
    const handleSaveRole = (roleData: { name: Role; description: string }) => {
      if (currentRole) {
        // Update existing role
        setRoles(roles.map(r => r.name === currentRole.name ? roleData : r));
      } else {
        // Add new role
        setRoles([...roles, roleData]);
      }
      setIsModalOpen(false);
    };
  
    const handleDeleteRole = (roleName: Role) => {
      setRoles(roles.filter(r => r.name !== roleName));
    };
  
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold dark:text-white">Roles</h2>
          <button 
            onClick={handleAddRole}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Role
          </button>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200">
              {roles.map((role) => (
                <tr key={role.name}>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">{role.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">{role.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {/* <button 
                        onClick={() => handleEditRole(role)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button> */}
                      <button 
                        onClick={() => handleDeleteRole(role.name)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
    )
};