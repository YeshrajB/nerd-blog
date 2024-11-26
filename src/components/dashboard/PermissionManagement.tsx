import React, { useState } from "react";

export const PermissionManagement = () => {
  const [roleData, setRoleData] = useState<Role[]>([]);

  // Toggle permission for a specific role
  const togglePermission = (roleId: string, permissionId: string) => {
    // setRoleData((prevRoles) =>
    //   prevRoles.map((role) =>
    //     role.id === roleId
    //       ? {
    //           ...role,
    //           permissions: role.permissions.includes(permissionId)
    //             ? role.permissions.filter((p) => p !== permissionId) // Remove permission
    //             : [...role.permissions, permissionId], // Add permission
    //         }
    //       : role
    //   )
    // );
  };

  const permissions: Permission[] = [
    { id: "read", action: "Create", resource: "Post" },
    { id: "write", action: "Update", resource: "Post" },
    { id: "delete", action: "Delete", resource: "Post" },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold dark:text-white">Permissions</h2>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
              {permissions.map((permission) => (
                <th
                  key={permission.id}
                  className="border border-gray-300 px-4 py-2 text-center dark:text-white"
                >
                  {permission.action}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roleData.map((role) => (
              <tr key={role}>
                <td className="px-4 py-2">{role}</td>

                {/* Permission Checkboxes */}
                {permissions.map((permission) => (
                  <td
                    key={permission.id}
                    className=" px-4 py-2 text-center"
                  >
                    <input
                      type="checkbox"
                      checked={true}
                      onChange={() => togglePermission(role, permission.id)}
                      className="form-checkbox h-5 w-5 text-blue-500"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
