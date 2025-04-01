const API_BASE_URL = "/api"; // Base URL for API requests

export const signupUser = async (formData: { name: string; email: string; password: string }) => {
  const res = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Signup failed");

  return data; // { message: "Signup successful" }
};

// Login API
export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");

  return data; // { token: "..." }
};

// Get User Profile API
export const getUserProfile = async () => {
  const res = await fetch(`${API_BASE_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch profile");

  return data;
};

// Update User Profile API
export const updateUserProfile = async (updateData: {
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
}) => {
  const res = await fetch(`${API_BASE_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(updateData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update profile");

  return data;
};
