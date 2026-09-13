import { useEffect, useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import {
  Plus,
  Search,
  Calendar,
  CheckCircle2,
  Pencil,
  Trash2,
  ClipboardList,
} from "lucide-react";

export default function Tasks() {
  const emptyForm = {
    projectId: "",
    name: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  };

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState(emptyForm);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const p = await API.get("/projects");
    const t = await API.get(
      `/tasks?search=${search}&status=${status}&priority=${priority}`
    );

    setProjects(p.data.projects || p.data);
    setTasks(t.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await API.put(`/tasks/${editingId}`, form);
    } else {
      await API.post("/tasks", form);
    }

    closeModal();
    loadData();
  };

  const editTask = (task) => {
    setEditingId(task.id);

    setForm({
      projectId: task.projectId,
      name: task.name,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
    });

    setShowModal(true);
  };

  const completeTask = async (id) => {
    await API.patch(`/tasks/${id}/complete`);
    loadData();
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    await API.delete(`/tasks/${id}`);
    loadData();
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const priorityColor = (p) => {
    switch (p) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  const statusColor = (s) => {
    switch (s) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Task Management
            </h1>
            <p className="text-slate-500">
              Organize and track project tasks
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus size={18} />
            New Task
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow p-5">
          <div className="grid md:grid-cols-4 gap-4">

            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <input
                className="w-full pl-10 pr-4 py-3 border rounded-xl"
                placeholder="Search task..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />
            </div>

            <select
              className="border rounded-xl px-4"
              value={status}
              onChange={(e)=>setStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <select
              className="border rounded-xl px-4"
              value={priority}
              onChange={(e)=>setPriority(e.target.value)}
            >
              <option value="">All Priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <button
              onClick={loadData}
              className="bg-slate-800 text-white rounded-xl"
            >
              Apply
            </button>

          </div>
        </div>

        {/* Task Cards */}
        <div className="grid lg:grid-cols-2 gap-5">

          {tasks.map((task)=>(
            <div
              key={task.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6"
            >

              <div className="flex justify-between items-start">

                <div>
                  <div className="flex items-center gap-2">
                    <ClipboardList
                      className="text-purple-600"
                      size={20}
                    />
                    <h2 className="text-xl font-semibold">
                      {task.name}
                    </h2>
                  </div>

                  <p className="text-slate-500 mt-2">
                    {task.description}
                  </p>

                  <p className="text-sm mt-3 text-slate-600">
                    Project:{" "}
                    <strong>{task.Project?.name}</strong>
                  </p>
                </div>

              </div>

              <div className="flex gap-2 mt-4 flex-wrap">

                <span
                  className={`px-3 py-1 rounded-full text-sm ${priorityColor(task.priority)}`}
                >
                  {task.priority}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${statusColor(task.status)}`}
                >
                  {task.status}
                </span>

              </div>

              <div className="flex items-center gap-2 mt-4 text-slate-500">
                <Calendar size={16}/>
                {task.dueDate}
              </div>

              <div className="flex gap-2 mt-6">

                {task.status !== "Completed" && (
                  <button
                    onClick={()=>completeTask(task.id)}
                    className="flex-1 bg-green-50 text-green-600 py-2 rounded-xl flex justify-center items-center gap-2"
                  >
                    <CheckCircle2 size={16}/>
                    Complete
                  </button>
                )}

                <button
                  onClick={()=>editTask(task)}
                  className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-xl flex justify-center items-center gap-2"
                >
                  <Pencil size={16}/>
                  Edit
                </button>

                <button
                  onClick={()=>deleteTask(task.id)}
                  className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl flex justify-center items-center gap-2"
                >
                  <Trash2 size={16}/>
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

            <div className="bg-white rounded-2xl w-full max-w-lg p-6">

              <h2 className="text-2xl font-bold mb-5">
                {editingId ? "Edit Task" : "Create Task"}
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                <select
                  className="w-full border rounded-xl px-4 py-3"
                  value={form.projectId}
                  onChange={(e)=>
                    setForm({...form,projectId:e.target.value})
                  }
                  required
                >
                  <option value="">Select Project</option>

                  {projects.map((p)=>(
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}

                </select>

                <input
                  className="w-full border rounded-xl px-4 py-3"
                  placeholder="Task Name"
                  value={form.name}
                  onChange={(e)=>
                    setForm({...form,name:e.target.value})
                  }
                />

                <textarea
                  className="w-full border rounded-xl px-4 py-3"
                  rows="3"
                  placeholder="Description"
                  value={form.description}
                  onChange={(e)=>
                    setForm({...form,description:e.target.value})
                  }
                />

                <div className="grid grid-cols-2 gap-3">

                  <select
                    className="border rounded-xl px-4 py-3"
                    value={form.priority}
                    onChange={(e)=>
                      setForm({...form,priority:e.target.value})
                    }
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>

                  <input
                    type="date"
                    className="border rounded-xl px-4 py-3"
                    value={form.dueDate}
                    onChange={(e)=>
                      setForm({...form,dueDate:e.target.value})
                    }
                  />

                </div>

                <div className="flex gap-3 pt-2">

                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 border py-3 rounded-xl"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700"
                  >
                    {editingId ? "Update" : "Create"}
                  </button>

                </div>

              </form>

            </div>

          </div>
        )}

      </div>
    </MainLayout>
  );
}