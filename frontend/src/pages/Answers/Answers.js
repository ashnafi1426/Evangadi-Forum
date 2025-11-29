// AnswerPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import questionService from "../../services/questionService";
import answerService from "../../services/answerService";
import "./Answers.css";

function AnswerPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch question and answers
  const fetchData = async () => {
    try {
      const data = await questionService.getQuestionById(id);

      // Set question
      setQuestion(data.question || {});

      // Flatten answers for easy rendering
      const flattenedAnswers = (data.answers || []).map(ans => ({
        id: ans.id,
        answer: ans.answer,
        created_at: ans.created_at,
        username: ans.users?.username || "Unknown", // Correct field
      }));

      setAnswers(flattenedAnswers);
    } catch (err) {
      console.error("Fetch Error:", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Post a new answer
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return alert("Please write your answer");

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Send answer to backend
      await answerService.addAnswer(id, { answer: newAnswer }, token);

      alert("Answer posted successfully!");
      setNewAnswer("");
      fetchData(); // Refresh answers after posting
    } catch (err) {
      console.error("Post Error:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="answer-wrapper">
      <h2>QUESTION</h2>
      <div className="question-box">
        <h3 className="question-title">{question.title}</h3>
        <p className="question-desc">{question.description}</p>
      </div>

      <h2>Answers From The Community</h2>
      <div className="answer-list">
        {answers.length === 0 ? (
          <p>No answers yet — be the first to answer!</p>
        ) : (
          answers.map(ans => (
            <div key={ans.id} className="answer-item">
              <div className="answer-avatar">👤</div>
              <div>
                <p className="answer-username">{ans.username}</p>
                <p className="answer-text">{ans.answer}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <form className="answer-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Your answer..."
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Answer"}
        </button>
      </form>
    </div>
  );
}

export default AnswerPage;
