import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function AddBlogGA() {
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/grandStLucia`;
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogDate, setNewBlogDate] = getDate();
  const [newComments, setNewComments] = useState("");
  const [newRating, setNewRating] = useState("");
  // const [newBlogArray] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

  const addBlog= async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogArray: newBlogArray,
        }),
      });

      if (response.ok) {
        // set form fields to blank after update
        setNewBlogName("");
        setNewComments("");
        setNewRating("");
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
        navigate("/stLuciaPics");
      } else {
        console.log("Failed to submit data.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // display form
  return (
    <div>
      <Link to="/stLuciaPics" className="back-button">
        👈 back
      </Link>

      <div>
        Add a new Comment
        <form onSubmit={addBlog}>
          <label htmlFor="blogName">Your Name</label>
          <input
            type="text"
            onChange={(e) => setNewBlogTitle(e.target.value)}
            value={newBlogTite}
            required
          />

          <label htmlFor="Comments">Your Comments</label>
          <input
            type="text"
            onChange={(e) => setComments(e.target.value)}
            value={newComments}
            required
          />
          <label htmlFor="Rating">Rating</label>
          <input
            type="text"
            onChange={(e) => setRating(e.target.value)}
            value={newRating}
            required
          />
          <input
            type="submit"
            value={submitted ? "Saving comment..." : "💾 Save Comment"}
            disabled={submitted}
          />

          <p className="text-center">
            {submitted && (
              <div className="success-message">Comment has been added!</div>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

export default AddBlogGA;
