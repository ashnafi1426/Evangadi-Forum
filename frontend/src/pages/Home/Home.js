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

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUser(storedUser);
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await questionService.getAllQuestions();
      setQuestions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching questions:", err.message);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [location.state?.refresh]);

  const filteredQuestions = questions.filter((q) =>
    q.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-wrapper">
      {/* Header */}
      <div className="home-header">
        <p className="welcome-text">
          Welcome, <span>{user || "Guest"}</span>
        </p>
      </div>

      {/* Search bar + Ask button */}
      <div className="top-actions">
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button className="ask-btn" onClick={() => navigate("/ask")}>
          Ask Question
        </button>
      </div>

      {/* Question list */}
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
                <div className="text-wrap">
                  <p className="username">
                    {item.users?.username || "Unknown"}
                  </p>
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
