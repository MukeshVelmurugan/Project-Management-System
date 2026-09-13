import { useContext, useEffect, useState } from "react";
import { User, Mail, Lock, Save } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.fullName,
        email: user.email,
      });
    }
  }, [user]);

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.put("/profile", profile);

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);

      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (password.newPassword !== password.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await API.put("/profile/password", {
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
      });

      toast.success("Password changed successfully");

      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Profile Settings
          </h1>
          <p className="text-slate-500">
            Manage your account information
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* User Card */}
          <div className="bg-white rounded-3xl shadow p-6 text-center h-fit">

            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-4xl font-bold mx-auto">
              {user?.fullName?.charAt(0).toUpperCase()}
            </div>

            <h2 className="text-xl font-bold mt-4">
              {user?.fullName}
            </h2>

            <p className="text-slate-500">
              {user?.email}
            </p>

            <div className="mt-6 bg-blue-50 rounded-2xl p-4">
              <p className="text-sm text-slate-500">
                Account Status
              </p>
              <h3 className="font-semibold text-blue-700">
                Active User
              </h3>
            </div>

          </div>

          {/* Forms */}
          <div className="lg:col-span-2 space-y-6">

            {/* Personal Info */}
            <div className="bg-white rounded-3xl shadow p-6">

              <h2 className="text-xl font-bold mb-5">
                Personal Information
              </h2>

              <form
                onSubmit={updateProfile}
                className="space-y-5"
              >

                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Full Name
                  </label>

                  <div className="relative mt-2">
                    <User className="absolute left-3 top-3 text-gray-400" size={18}/>

                    <input
                      value={profile.fullName}
                      onChange={(e)=>
                        setProfile({
                          ...profile,
                          fullName:e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Email
                  </label>

                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={18}/>

                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e)=>
                        setProfile({
                          ...profile,
                          email:e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <button
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50"
                >
                  <Save size={18}/>
                  Save Changes
                </button>

              </form>

            </div>

            {/* Password */}
            <div className="bg-white rounded-3xl shadow p-6">

              <h2 className="text-xl font-bold mb-5">
                Change Password
              </h2>

              <form
                onSubmit={changePassword}
                className="space-y-5"
              >

                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Current Password
                  </label>

                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-3 text-gray-400" size={18}/>

                    <input
                      type="password"
                      value={password.currentPassword}
                      onChange={(e)=>
                        setPassword({
                          ...password,
                          currentPassword:e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-600">
                    New Password
                  </label>

                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-3 text-gray-400" size={18}/>

                    <input
                      type="password"
                      value={password.newPassword}
                      onChange={(e)=>
                        setPassword({
                          ...password,
                          newPassword:e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Confirm Password
                  </label>

                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-3 text-gray-400" size={18}/>

                    <input
                      type="password"
                      value={password.confirmPassword}
                      onChange={(e)=>
                        setPassword({
                          ...password,
                          confirmPassword:e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <button
                  disabled={loading}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl disabled:opacity-50"
                >
                  Update Password
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}