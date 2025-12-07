import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api.js";

const tokenFromStorage = () => localStorage.getItem("token");

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try { await api.post("/auth/register", { name, email, password }); return true; }
    catch (err) { return rejectWithValue(err?.response?.data?.message || "Signup failed"); }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try { const { data } = await api.post("/auth/login", { email, password }); return data.token; }
    catch (err) { return rejectWithValue(err?.response?.data?.message || "Login failed"); }
  }
);

export const fetchMe = createAsyncThunk(
  "auth/me",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token || tokenFromStorage();
      const { data } = await api.get("/auth/me", {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      return data.user;
    } catch {
      return rejectWithValue("Unauthorized");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { token: tokenFromStorage(), user: null, status: "idle", error: null },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    }
  },
  extraReducers: (b) => {
    b.addCase(registerUser.pending, (s)=>{s.status="loading"; s.error=null;})
     .addCase(registerUser.fulfilled, (s)=>{s.status="succeeded";})
     .addCase(registerUser.rejected, (s,a)=>{s.status="failed"; s.error=a.payload;})
     .addCase(loginUser.pending, (s)=>{s.status="loading"; s.error=null;})
     .addCase(loginUser.fulfilled, (s,a)=>{s.status="succeeded"; s.token=a.payload; localStorage.setItem("token", a.payload);})
     .addCase(loginUser.rejected, (s,a)=>{s.status="failed"; s.error=a.payload;})
     .addCase(fetchMe.pending, (s)=>{s.status="loading";})
     .addCase(fetchMe.fulfilled, (s,a)=>{s.status="succeeded"; s.user=a.payload;})
     .addCase(fetchMe.rejected, (s,a)=>{s.status="failed"; s.user=null; s.token=null; localStorage.removeItem("token"); s.error=a.payload;});
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;