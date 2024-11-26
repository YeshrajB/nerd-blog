import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Users", path: "/users" },
    { name: "Roles", path: "/roles" },
    { name: "Permissions", path: "/permissions" },
  ];

  return (
    <div className="h-screen w-64 bg-gray-800 text-white">
      <div className="p-4 text-lg font-bold">Admin Dashboard</div>
      <nav className="mt-4">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-gray-700" : "hover:bg-gray-600"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
