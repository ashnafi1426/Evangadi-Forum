// AskQuestion.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import "./AskQuestion.css";

function AskQuestion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post("/questions/ask", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Question posted successfully!");
      // ✅ Navigate to home AND trigger refresh flag
      navigate("/home", { state: { refresh: true } });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Failed to post question");
    }
  };

  return (
    <div className="ask-wrapper">
      <h2>Steps To Write A Good Question</h2>
      <ul>
        <li>🟣 Summarize your problem in one line</li>
        <li>🟣 Describe your problem in more detail</li>
        <li>🟣 Describe what you tried and what you expected</li>
        <li>🟣 Review and post your question</li>
      </ul>

      <h3>Post Your Question</h3>
      <form onSubmit={handleSubmit} className="ask-form">
        <input
          type="text"
          name="title"
          placeholder="Question title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Question details..."
          value={formData.description}
          onChange={handleChange}
          required
          rows="5"
        ></textarea>
        <button type="submit">Post Question</button>
      </form>
    </div>
  );
}

export default AskQuestion;
