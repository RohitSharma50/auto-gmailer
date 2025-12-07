import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import AuthLayout from "./AuthLayout.jsx";
import { loginUser, fetchMe } from "../features/auth/authSlice.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { status, error, token } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(fetchMe()).then((res) => {
        if (res.meta.requestStatus === "fulfilled") navigate("/dashboard");
      });
    }
  }, [token, dispatch, navigate]);

  useEffect(() => {
    if (status === "failed" && error) toast.error(error);
  }, [status, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Email and password are required.");
    const res = await dispatch(loginUser({ email, password }));
    if (res.meta.requestStatus === "fulfilled") toast.success("Logged in");
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="********"
          />
        </div>
        <button
          type="submit" disabled={status === "loading"}
          className="w-full py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
        >
          {status === "loading" ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm text-gray-600 text-center">
          No account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign up</Link>
        </p>
      </form>
    </AuthLayout>
  );
}