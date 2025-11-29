const api_url = process.env.REACT_APP_API_URL;

// Add a new question
const addQuestion = async (questionData, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(questionData),
  };

  const response = await fetch(`${api_url}/api/questions/ask`, requestOptions);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || "Failed to create question");
  }

  return data;
};

// Get all questions
const getAllQuestions = async () => {
  const response = await fetch(`${api_url}/api/questions/all`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || "Failed to load questions");
  }

  return data;
};

// Get a single question + its answers
const getQuestionById = async (id) => {
  const response = await fetch(`${api_url}/api/questions/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || "Failed to load question");
  }

  return data; // {question, answers}
};

const questionService = {
  addQuestion,
  getAllQuestions,
  getQuestionById,
};

export default questionService;
