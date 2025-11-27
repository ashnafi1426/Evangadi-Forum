
const api_url = process.env.REACT_APP_API_URL;

// Function to register a new user
const registerUser = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/users/register`, requestOptions);

  // Convert response to JSON
  const data = await response.json();

  if (!response.ok) {
    // Throw error to be caught in the component
    throw new Error(data.msg || "Registration failed");
  }
  return data;
};

// Function to login user
const loginUser = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  const response = await fetch(`${api_url}/api/users/login`, requestOptions);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || "Login failed");
  }

  return data;
};

// Optional: Function to check user (requires token)
const checkUser = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  const response = await fetch(`${api_url}/api/users/check`, requestOptions);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || "User check failed");
  }

  return data;
};

// Export all functions
const userService = {
  registerUser,
  loginUser,
  checkUser,
};

export default userService;
