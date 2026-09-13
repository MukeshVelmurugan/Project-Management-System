import { useEffect, useState } from "react";
import API from "../api/axios";
import { Download } from "lucide-react";
import {
  exportProjectsPDF,
  exportProjectsExcel,
} from "../utils/exportUtils";
import MainLayout from "../layouts/MainLayout";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Calendar,
  FolderKanban,
} from "lucide-react";

export default function Projects() {
  const emptyForm = {
    name: "",
    description: "",
    status: "Not Started",
    startDate: "",
    endDate: "",
  };

  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProjects();
  }, [page]);

  const fetchProjects = async () => {
    const { data } = await API.get(
      `/projects?page=${page}&search=${search}&status=${status}`
    );

    setProjects(data.projects);
    setTotalPages(data.totalPages);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      name: form.name,
      description: form.description,
      status: form.status,
      startDate: form.startDate,
      endDate: form.endDate,
    };

    if (editingId) {
      await API.put(`/projects/${editingId}`, payload);
      alert("Project updated successfully!");
    } else {
      await API.post("/projects", payload);
      alert("Project created successfully!");
    }

    closeModal();
    fetchProjects();

  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Failed to save project");
  }
};

  const editProject = (project) => {
    setEditingId(project.id);
    setForm(project);
    setShowModal(true);
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    await API.delete(`/projects/${id}`);
    fetchProjects();
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const badgeColor = (status) => {
    switch (status) {
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
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Projects
            </h1>
            <p className="text-slate-500">
              Manage all your development projects
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

  <button
    onClick={() => exportProjectsPDF(projects)}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl flex items-center gap-2"
  >
    <Download size={18} />
    PDF
  </button>

  <button
    onClick={() => exportProjectsExcel(projects)}
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl flex items-center gap-2"
  >
    <Download size={18} />
    Excel
  </button>

  <button
    onClick={() => setShowModal(true)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
  >
    <Plus size={18} />
    New Project
  </button>

</div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow p-5">
          <div className="grid md:grid-cols-3 gap-4">

            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <input
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Search project..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />
            </div>

            <select
              className="border rounded-xl px-4 py-3"
              value={status}
              onChange={(e)=>setStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <button
              onClick={()=>{
                setPage(1);
                fetchProjects();
              }}
              className="bg-slate-800 hover:bg-slate-900 text-white rounded-xl"
            >
              Apply Filter
            </button>

          </div>
        </div>

        {/* Project Cards */}
        <div className="grid lg:grid-cols-2 gap-5">

          {projects.map((project)=>(
            <div
              key={project.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6"
            >

              <div className="flex justify-between items-start">

                <div>
                  <div className="flex items-center gap-2">
                    <FolderKanban className="text-blue-600" size={20}/>
                    <h2 className="text-xl font-semibold">
                      {project.name}
                    </h2>
                  </div>

                  <p className="text-slate-500 mt-2">
                    {project.description}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${badgeColor(project.status)}`}
                >
                  {project.status}
                </span>

              </div>

              <div className="flex items-center gap-2 mt-5 text-slate-500">
                <Calendar size={16}/>
                <span>
                  {project.startDate} → {project.endDate}
                </span>
              </div>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={()=>editProject(project)}
                  className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded-xl flex justify-center items-center gap-2"
                >
                  <Pencil size={16}/>
                  Edit
                </button>

                <button
                  onClick={()=>deleteProject(project.id)}
                  className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded-xl flex justify-center items-center gap-2"
                >
                  <Trash2 size={16}/>
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4">

          <button
            disabled={page===1}
            onClick={()=>setPage(page-1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            Previous
          </button>

          <span className="font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page===totalPages}
            onClick={()=>setPage(page+1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            Next
          </button>

        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-2xl w-full max-w-lg p-6">

              <h2 className="text-2xl font-bold mb-5">
                {editingId ? "Edit Project" : "Create Project"}
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                <input
                  className="w-full border rounded-xl px-4 py-3"
                  placeholder="Project Name"
                  value={form.name}
                  onChange={(e)=>
                    setForm({...form,name:e.target.value})
                  }
                  required
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

                <select
                  className="w-full border rounded-xl px-4 py-3"
                  value={form.status}
                  onChange={(e)=>
                    setForm({...form,status:e.target.value})
                  }
                >
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>

                <div className="grid grid-cols-2 gap-3">

                  <input
                    type="date"
                    className="border rounded-xl px-4 py-3"
                    value={form.startDate}
                    onChange={(e)=>
                      setForm({...form,startDate:e.target.value})
                    }
                  />

                  <input
                    type="date"
                    className="border rounded-xl px-4 py-3"
                    value={form.endDate}
                    onChange={(e)=>
                      setForm({...form,endDate:e.target.value})
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
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                    >
                    {editingId ? "Update Project" : "Create Project"}
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