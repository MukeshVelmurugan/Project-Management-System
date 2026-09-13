import { useState, useContext, useEffect } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login(form);

      toast.success("Login Successful");

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Login Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 p-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">

        <div className="text-center mb-8">

          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-white" size={34}/>
          </div>

          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-blue-100 mt-2">
            Project Management System
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="text-white text-sm">
              Email
            </label>

            <input
              type="email"
              required
              value={form.email}
              onChange={(e)=>
                setForm({
                  ...form,
                  email:e.target.value,
                })
              }
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-white text-sm">
              Password
            </label>

            <div className="relative mt-2">

              <input
                type={show ? "text" : "password"}
                required
                value={form.password}
                onChange={(e)=>
                  setForm({
                    ...form,
                    password:e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={()=>setShow(!show)}
                className="absolute right-4 top-3 text-white"
              >
                {show ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>

            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-indigo-700 font-semibold py-3 rounded-xl hover:bg-slate-100 transition disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <p className="text-center text-blue-100 mt-6 text-sm">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-white underline font-semibold"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}