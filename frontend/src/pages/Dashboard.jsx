import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe, logout } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user, status } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMe()).unwrap().catch(() => {
      toast.error("Session expired. Please login again.");
      navigate("/login");
    });
  }, [dispatch, navigate]);

  const onLogout = () => {
    dispatch(logout());
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-semibold">Dashboard</h1>
          <button className="text-sm text-red-600 hover:underline" onClick={onLogout}>Logout</button>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-xl font-semibold">
            {status === "loading" ? "Loading..." : `Welcome${user ? `, ${user.name}` : ""}`}
          </h2>
          <p className="text-gray-600 mt-2">You are logged in.</p>
        </div>
      </main>
    </div>
  );
}