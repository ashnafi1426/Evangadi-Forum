// src/services/userService.js
const api_url = process.env.REACT_APP_API_URL || "http://localhost:5500"; // fallback if .env missing

// Register a new user
const registerUser = async (formData) => {
  const response = await fetch(`${api_url}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  // Convert response to JSON
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || "Registration failed");
  }

  return data;
};

// Login user
const loginUser = async (formData) => {
  const response = await fetch(`${api_url}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.msg || "Login failed");
  }

  return data;
};

const checkUser = async (token) => {
  const response = await fetch(`${api_url}/api/users/check`, {
    method: "GET",
    headers: { "Content-Type": "application/json", "x-access-token": token },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.msg || "User check failed");
  }

  return data;
};

const userService = {
  registerUser,
  loginUser,
  checkUser,
};

export default userService;
