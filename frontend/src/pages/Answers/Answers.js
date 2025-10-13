import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import "./Answers.css";

function AnswerPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");

  const fetchQuestionAndAnswers = async () => {
    try {
      const qRes = await axios.get(`/questions/${id}`);
      setQuestion(qRes.data.question);
      setAnswers(qRes.data.answers || []);
    } catch (err) {
      console.error("Error fetching question/answers", err);
    }
  };

  useEffect(() => {
    fetchQuestionAndAnswers();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return alert("Please write your answer");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/answers/${id}`,
        { answer: newAnswer },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Answer posted successfully!");
      setNewAnswer("");
      fetchQuestionAndAnswers();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to post answer");
      console.error(err);
    }
  };

  return (
    <div className="answer-wrapper">
      <h2>QUESTION</h2>
      <div className="question-box">
        <h3 className="question-title">{question.title}</h3>
        <p className="question-desc">{question.description}</p>
      </div>

      <h2>Answer From The Community</h2>
      <div className="answer-list">
        {answers.length === 0 ? (
          <p>No answers yet — be the first to answer!</p>
        ) : (
          answers.map((ans) => (
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
        <button type="submit">Post Answer</button>
      </form>
    </div>
  );
}

export default AnswerPage;
