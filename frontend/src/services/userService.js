const api_url = process.env.REACT_APP_API_URL || "https://evangadi-forum-vne0.onrender.com";

// Register a new user
const registerUser = async (formData) => {
  const response = await fetch(`${api_url}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  // Parse response safely
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    throw new Error("Invalid response from server");
  }

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

  const text = await response.text();
  console.log(text)
  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    throw new Error("Invalid response from server");
  }

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

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (error) {
    throw new Error("Invalid response from server");
  }

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
