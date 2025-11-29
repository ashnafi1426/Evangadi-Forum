const api_url = process.env.REACT_APP_API_URL;

// Add a new answer
const addAnswer = async (questionId, answerData, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT token
    },
    body: JSON.stringify(answerData),
  };

  const response = await fetch(`${api_url}/api/answers/${questionId}`, requestOptions);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || "Failed to post answer");
  }

  return data;
};

// Get all answers for a question
const getAnswersByQuestion = async (questionId) => {
  const response = await fetch(`${api_url}/api/answers/${questionId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || "Failed to load answers");
  }

  // Flatten username from nested 'users' object
  const flattened = (data || []).map(ans => ({
    id: ans.id,
    answer: ans.answer,
    created_at: ans.created_at,
    username: ans.users?.username || "Unknown",
  }));

  return flattened;
};

const answerService = {
  addAnswer,
  getAnswersByQuestion,
};

export default answerService;
