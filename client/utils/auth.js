import API from "./api";

// Register User
export const registerUser = async (name, email, password) => {
  try {
    const response = await API.post("/auth/register", { name, email, password });
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

// Login User
export const loginUser = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    const { token, userId, name } = response.data;

    // Store token securely in sessionStorage (auto-clears on tab close)
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("name", name);

    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Logout User
export const logoutUser = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("name");

  // Redirect to login (optional)
  window.location.href = "/login";
};
