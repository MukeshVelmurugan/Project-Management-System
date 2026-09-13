import { useState, useContext } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await register({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });

      toast.success("Account created successfully!");

      navigate("/");

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Registration Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-blue-700 to-cyan-700 p-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">

        <div className="text-center mb-8">

          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <UserPlus className="text-white" size={34}/>
          </div>

          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-blue-100 mt-2">
            Join Project Management System
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="text-white text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              required
              placeholder="Mukesh V"
              value={form.fullName}
              onChange={(e)=>
                setForm({
                  ...form,
                  fullName:e.target.value,
                })
              }
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-blue-100 outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              required
              placeholder="example@gmail.com"
              value={form.email}
              onChange={(e)=>
                setForm({
                  ...form,
                  email:e.target.value,
                })
              }
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-blue-100 outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium">
              Password
            </label>

            <div className="relative mt-2">

              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={(e)=>
                  setForm({
                    ...form,
                    password:e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-blue-100 outline-none focus:ring-2 focus:ring-white"
              />

              <button
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-white"
              >
                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>

            </div>
          </div>

          <div>
            <label className="text-white text-sm font-medium">
              Confirm Password
            </label>

            <div className="relative mt-2">

              <input
                type={showConfirm ? "text" : "password"}
                required
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={(e)=>
                  setForm({
                    ...form,
                    confirmPassword:e.target.value,
                  })
                }
                className={`w-full px-4 py-3 rounded-xl bg-white/20 border text-white placeholder-blue-100 outline-none focus:ring-2 ${
                  form.confirmPassword &&
                  form.password !== form.confirmPassword
                    ? "border-red-400 focus:ring-red-300"
                    : "border-white/30 focus:ring-white"
                }`}
              />

              <button
                type="button"
                onClick={()=>setShowConfirm(!showConfirm)}
                className="absolute right-4 top-3 text-white"
              >
                {showConfirm ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>

            </div>

            {form.confirmPassword &&
              form.password !== form.confirmPassword && (
                <p className="text-red-200 text-xs mt-2">
                  Passwords do not match
                </p>
              )}

            {form.confirmPassword &&
              form.password === form.confirmPassword && (
                <p className="text-green-200 text-xs mt-2">
                  ✓ Passwords match
                </p>
              )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-purple-700 font-semibold py-3 rounded-xl hover:bg-slate-100 transition disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center text-blue-100 mt-6 text-sm">
          Already have an account?{" "}

          <Link
            to="/"
            className="font-semibold text-white underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}