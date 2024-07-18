import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function AddBlogSL() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/stluciablogs/${id}`;
  const [newBlogName, setNewBlogName] = useState("");
  const blogDate=(getDate());
  const [newComments, setNewComments] = useState("");
  const [newRating, setNewRating] = useState("");
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
      const response = await fetch(baseUrl);
      if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      const blogArray = data.blogArray || [];

      const newBlog = {};
      newBlog.blogName = newBlogName;
      newBlog.blogDate = blogDate;
      newBlog.comments = newComments;
      newBlog.rating = newRating;
      
      blogArray.push(newBlog)

      console.log("Add Blog Blog Array before PUT" + blogArray)
      console.log(baseUrl)

      const putData = await fetch(baseUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogArray: blogArray
        }),
      });

      if (putData.ok) {
        // set form fields to blank after update
        setNewBlogName("");
        setNewComments("");
        setNewRating("");
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
        navigate("/stLuciaPics");
      } else {
        console.log(
          "Failed to update data. Server response status:",
          putData.status
        );
        console.log("Server response message:", putData.statusText);
        console.log("Failed to update data.");
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
            htmlFor="Blog Name"
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