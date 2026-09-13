import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Columns3,
  User,
  LogOut,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar({ open, setOpen }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const link = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <div>
            <h1 className="text-2xl font-bold text-white">PMS</h1>
            <p className="text-xs text-slate-400">
              Project Management System
            </p>
          </div>

          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <NavLink
            to="/dashboard"
            className={link}
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/projects"
            className={link}
            onClick={() => setOpen(false)}
          >
            <FolderKanban size={20} />
            Projects
          </NavLink>

          <NavLink
            to="/tasks"
            className={link}
            onClick={() => setOpen(false)}
          >
            <CheckSquare size={20} />
            Tasks
          </NavLink>

          <NavLink
            to="/kanban"
            className={link}
            onClick={() => setOpen(false)}
          >
            <Columns3 size={20} />
            Kanban Board
          </NavLink>

          {/* NEW PROFILE PAGE */}
          <NavLink
            to="/profile"
            className={link}
            onClick={() => setOpen(false)}
          >
            <User size={20} />
            Profile
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 w-full px-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}