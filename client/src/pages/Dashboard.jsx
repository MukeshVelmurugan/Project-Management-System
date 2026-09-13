import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";

import {
  FolderKanban,
  CheckSquare,
  Clock,
  Activity,
  ArrowRight,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#10B981", "#F59E0B"];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressProjects: 0,
    logs: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const { data } = await API.get("/dashboard");
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  const pieData = [
    { name: "Completed", value: stats.completedTasks },
    { name: "Pending", value: stats.pendingTasks },
  ];

  const barData = [
    { name: "Projects", value: stats.totalProjects },
    { name: "Tasks", value: stats.totalTasks },
    { name: "Progress", value: stats.inProgressProjects },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-5 sm:p-6 lg:p-8 text-white shadow-lg">

          <p className="text-blue-100 text-sm">
            Welcome Back 👋
          </p>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">
            {user?.fullName}
          </h1>

          <p className="mt-3 text-blue-100 max-w-2xl text-sm sm:text-base">
            Manage projects, monitor team progress and track tasks
            with your professional project management dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">

            <button
              onClick={() => navigate("/projects")}
              className="w-full sm:w-auto bg-white text-blue-700 px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition"
            >
              <FolderKanban size={18}/>
              Manage Projects
              <ArrowRight size={16}/>
            </button>

            <button
              onClick={() => navigate("/tasks")}
              className="w-full sm:w-auto bg-blue-500/30 border border-blue-300 text-white px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-500/40 transition"
            >
              <CheckSquare size={18}/>
              Manage Tasks
            </button>

          </div>

        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">

          <StatCard
            title="Projects"
            value={stats.totalProjects}
            icon={<FolderKanban size={22}/>}
            color="blue"
          />

          <StatCard
            title="Tasks"
            value={stats.totalTasks}
            icon={<CheckSquare size={22}/>}
            color="purple"
          />

          <StatCard
            title="Completed"
            value={stats.completedTasks}
            icon={<Activity size={22}/>}
            color="green"
          />

          <StatCard
            title="Pending"
            value={stats.pendingTasks}
            icon={<Clock size={22}/>}
            color="orange"
          />

          <StatCard
            title="In Progress"
            value={stats.inProgressProjects}
            icon={<FolderKanban size={22}/>}
            color="indigo"
          />

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Pie Chart */}
          <div className="bg-white rounded-3xl shadow p-5 sm:p-6">

            <h2 className="text-lg sm:text-xl font-bold text-slate-700 mb-4">
              Task Completion
            </h2>

            <div className="h-64 sm:h-72">

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={90}
                    label
                  >
                    {pieData.map((item, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip/>
                </PieChart>
              </ResponsiveContainer>

            </div>

          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-3xl shadow p-5 sm:p-6">

            <h2 className="text-lg sm:text-xl font-bold text-slate-700 mb-4">
              Overall Statistics
            </h2>

            <div className="h-64 sm:h-72">

              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>

                  <Bar
                    dataKey="value"
                    fill="#2563EB"
                    radius={[8,8,0,0]}
                  />

                </BarChart>
              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl shadow p-5 sm:p-6">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-5">

            <h2 className="text-lg sm:text-xl font-bold text-slate-700">
              Recent Activity
            </h2>

            <span className="text-sm text-slate-500">
              Latest 5 Activities
            </span>

          </div>

          {stats.logs.length === 0 ? (

            <div className="text-center py-10 text-slate-400">
              No recent activity found
            </div>

          ) : (

            <div className="space-y-4">

              {stats.logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 sm:gap-4 border-b pb-4 last:border-none"
                >

                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Activity
                      className="text-blue-600"
                      size={20}
                    />
                  </div>

                  <div className="flex-1 min-w-0">

                    <h4 className="font-semibold text-slate-800 break-words">
                      {log.action}
                    </h4>

                    <p className="text-sm text-slate-500">
                      {log.tableName}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(log.createdAt).toLocaleString()}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          )}

        </div>

      </div>
    </MainLayout>
  );
}

function StatCard({ title, value, icon, color }) {

  const colors = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    indigo: "bg-indigo-100 text-indigo-600",
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow hover:shadow-xl transition-all duration-300">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-500 text-xs sm:text-sm">
            {title}
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-slate-800">
            {value}
          </h2>

        </div>

        <div className={`p-3 rounded-xl ${colors[color]}`}>
          {icon}
        </div>

      </div>

    </div>
  );

}