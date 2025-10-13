// Home.jsx
import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { useNavigate, useLocation } from "react-router-dom";
import "./Home.css";

function Home() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get username
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUser(storedUser);
  }, []);

  // ✅ Fetch questions
  const fetchQuestions = async () => {
    try {
      const res = await axios.get("/questions/all");
      setQuestions(res.data || []);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  // ✅ Run on mount + when refresh flag is true
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
                  <p className="username">{item.username}</p>
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
