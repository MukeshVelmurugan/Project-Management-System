import {
  Menu,
  Bell,
  AlertTriangle,
  Clock,
  Calendar,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

export default function Navbar({ setOpen }) {
  const { user } = useContext(AuthContext);

  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const { data } = await API.get("/notifications");
      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "overdue":
        return <AlertTriangle className="text-red-500" size={20} />;
      case "today":
        return <Clock className="text-orange-500" size={20} />;
      default:
        return <Calendar className="text-blue-500" size={20} />;
    }
  };

  const getBadge = (type) => {
    switch (type) {
      case "overdue":
        return "bg-red-100 text-red-600";
      case "today":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <header className="h-16 bg-white border-b shadow-sm sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div>
          <h1 className="font-bold text-lg text-slate-800">
            Project Management
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">
            Enterprise Dashboard
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Notification Bell */}
        <div className="relative">

          <button
            onClick={() => setShow(!show)}
            className="relative p-2 rounded-full hover:bg-slate-100 transition"
          >
            <Bell size={22} className="text-slate-600" />

            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {show && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border overflow-hidden z-50">

              <div className="px-4 py-3 bg-slate-50 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-slate-800">
                    Notifications
                  </h3>

                  <span className="text-xs text-slate-500">
                    {notifications.length} New
                  </span>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto">

                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-slate-400">
                    🎉 No pending deadlines
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-4 border-b hover:bg-slate-50 transition"
                    >

                      <div className="mt-1">
                        {getIcon(item.type)}
                      </div>

                      <div className="flex-1">

                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-sm text-slate-800">
                            {item.title}
                          </h4>

                          <span
                            className={`text-[10px] px-2 py-1 rounded-full capitalize ${getBadge(item.type)}`}
                          >
                            {item.type}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 mt-1">
                          {item.project}
                        </p>

                        <p className="text-sm mt-2 text-slate-700">
                          {item.message}
                        </p>

                      </div>

                    </div>
                  ))
                )}

              </div>

            </div>
          )}

        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow">
            {user?.fullName?.charAt(0)?.toUpperCase()}
          </div>

          <div className="hidden md:block">
            <p className="font-semibold text-sm text-slate-800">
              {user?.fullName}
            </p>

            <p className="text-xs text-slate-500">
              {user?.email}
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}