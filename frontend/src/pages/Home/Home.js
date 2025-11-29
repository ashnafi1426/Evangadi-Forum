// Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import questionService from "../../services/questionService";
import "./Home.css";

function Home() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get username from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUser(storedUser);
  }, []);

  // Fetch questions from backend
  const fetchQuestions = async () => {
    try {
      const data = await questionService.getAllQuestions();
      setQuestions(data || []);
    } catch (err) {
      console.error("Error fetching questions:", err.message);
    }
  };

  // Run on mount and refresh
  useEffect(() => {
    fetchQuestions();
  }, [location.state?.refresh]);

  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-wrapper">
      <div className="home-header">
        <button className="ask-btn" onClick={() => navigate("/ask")}>
          Ask Question
        </button>
        <p className="welcome-text">
          Welcome: <span>{user || "Guest"}</span>
        </p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search question..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="question-list">
        {filteredQuestions.length === 0 ? (
          <p className="no-questions">No questions found.</p>
        ) : (
          filteredQuestions.map((item) => (
            <div
              key={item.id}
              className="question-item"
              onClick={() => navigate(`/questions/${item.id}`)}
            >
              <div className="question-left">
                <div className="avatar">👤</div>
                <div>
                  <p className="username">{item.users?.username || "Unknown"}</p>
                  <p className="question-title">{item.title}</p>
                </div>
              </div>
              <div className="arrow">›</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
