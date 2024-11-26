import { useEffect, useState } from "react";
import { User } from "../models/user";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTimeout(() => {
        setUsers([
            {
                id: "1",
                name: "John Doe",
                email: "iJt6D@example.com",
                role: "admin",
                bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                isActive: true,
            },
        ])
    }, 5000);
    // axios.get("/users").then((response) => setUsers(response.data));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (userId: string) => {
    console.log("Delete user with ID:", userId);
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search Users"
          className="px-4 py-2 border rounded"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add User
        </button>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className={ user.isActive ? "text-green-500 border px-4 py-2" : "text-red-500 border px-4 py-2"}>
                {user.isActive ? "Active" : "Inactive"}
              </td>
              <td className="border px-4 py-2">
              <EditButton user={user} />
              <DeleteButton user={user} onDelete={handleDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
