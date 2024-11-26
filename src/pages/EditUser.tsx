import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import { User } from "../models/user";

interface EditUserProps {
    user: User;
    onSubmit: (user: User) => void;
    onCancel: () => void;
}

const EditUser : React.FC<EditUserProps> = ({ user, onSubmit, onCancel }) => {
  const navigate = useNavigate();

  const [currentUser, setUser] = useState<User>(user);
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);

//   React.useEffect(() => {


//     // axios.get<User>(`/users/${id}`).then((response) => {
//     //     setUser(response.data);
//     //     setRole(response.data.role);
//     //   setPermissions(response.data.permissions);
//     // });
//   }, [id]);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  const handlePermissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const permission = event.target.value;
    if (event.target.checked) {
      setPermissions((prev) => [...prev, permission]);
    } else {
      setPermissions((prev) => prev.filter((p) => p !== permission));
    }
  };

  const handleSubmit = () => {
    console.log("Submitted:", currentUser);
    // axios
    //   .patch<User>(`/users/${id}`, {
    //     role,
    //     permissions,
    //   })
    //   .then((response) => {
    //     setUser(response.data);
    //     navigate(`/users`);
    //   });

    
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="role" className="block mb-2">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={handleRoleChange}
            className="px-4 py-2 border rounded"
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Permissions</label>
          <div className="flex flex-wrap space-x-4">
            <label className="mr-4">
              <input
                type="checkbox"
                value="read"
                style={{ marginRight: "5px" }}
                checked={permissions.includes("read")}
                onChange={handlePermissionChange}
              />
              Read
            </label>
            <label className="mr-4">
              <input
                type="checkbox"
                style={{ marginRight: "5px" }}
                value="write"
                checked={permissions.includes("write")}
                onChange={handlePermissionChange}
              />
              Write
            </label>
            <label className="mr-4">
              <input
                type="checkbox"
                value="delete"
                style={{ marginRight: "5px" }}
                checked={permissions.includes("delete")}
                onChange={handlePermissionChange}
              />
              Delete
            </label>
          </div>
        </div>
        <div className="flex-row space-x-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={ () => { onSubmit(currentUser); handleSubmit(); }}>
          Save
        </button>
        <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={() => onCancel()}
            >
            Cancel
        </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default EditUser;
