import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import questionService from "../../services/questionService";
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
      const username = localStorage.getItem("username");

      await questionService.addQuestion(
        { ...formData, username },
        token
      );

      alert("Question posted successfully!");
      navigate("/home", { state: { refresh: true } });

    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  return (
    <div className="ask-page">
      <div className="ask-wrapper">
        <div className="ask-header">
          <h2>Steps To Write A Good Question</h2>
          <ul>
            <li>🟣 Summarize your problem in one line</li>
            <li>🟣 Describe your problem in detail</li>
            <li>🟣 Explain what you tried</li>
            <li>🟣 Review and post</li>
          </ul>
          <h3>Post Your Question</h3>
        </div>

        <div className="ask-form-container">
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
            />
            <button type="submit">Post Question</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AskQuestion;
