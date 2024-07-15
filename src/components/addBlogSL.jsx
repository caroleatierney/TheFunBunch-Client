import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function AddBlogSL() {
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/stluciablogs`;
  const [newBlogName, setNewBlogName] = useState("");
  const [newBlogDate, setNewBlogDate] = (getDate());
  const [newComments, setNewComments] = useState("");
  const [newRating, setNewRating] = useState("");
  const [newBlogArray] = useState([]); 
  const [submitted, setSubmitted] = useState(false);

  function getDate() {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const date = today.getDate();
      return `${month}/${date}/${year}`;
  };

  const addBlog = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseUrl, {
        method: "PUT",
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
      <h1 className="text-center text-teal-500 font-margarine text-3xl py-3">
        St. Lucia
      </h1>
      <h1 className="text-center text-teal-500 font-margarine text-3xl py-3">
        Add a Comment
      </h1>

      <form onSubmit={addBlog}>
        <div className="flex flex-col w-1/4 mx-auto text-center">
          <label
            htmlFor="blogName"
            className="mt-4 text-teal-500 font-margarine text-2xl pb-2"
          >
            Your Name
          </label>
          <input
            type="text"
            className="text-teal-500 font-margarine text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            onChange={(e) => setNewBlogName(e.target.value)}
            value={newBlogName}
            required
          />

          <label
            htmlFor="Comments"
            className="mt-4 text-teal-500 font-margarine text-2xl pb-2"
          >
            Your Comments
          </label>
          <input
            type="text"
            className="text-teal-500 font-margarine text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            onChange={(e) => setNewComments(e.target.value)}
            value={newComments}
            required
          />
          <label
            htmlFor="Rating"
            className="mt-4 text-teal-500 font-margarine text-2xl pb-2"
          >
            Rating
          </label>
          <input
            type="text"
            className="text-teal-500 font-margarine text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            onChange={(e) => setNewRating(e.target.value)}
            value={newRating}
            required
          />
          <div className="flex flex-row w-full mx-auto justify-evenly pt-3">
            <Link
              to="/grandAntiguaPics"
              className="bg-orange-200 text-bg-cyan-400 p-1 rounded hover:bg-emerald-100"
            >
              👈 back
            </Link>

            <input
              type="submit"
              className="bg-orange-200 text-bg-cyan-400 p-1 rounded hover:bg-emerald-100"
              value={submitted ? "Saving comment..." : "💾 Save Comment"}
              disabled={submitted}
            />
          </div>

          <p className="text-center">
            {submitted && (
              <div className="success-message">Comment has been added!</div>
            )}
          </p>
        </div>
      </form>
    </div>
  );
}

export default AddBlogSL