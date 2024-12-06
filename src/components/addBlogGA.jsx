import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "flowbite-react";
import { NavLink } from "react-router-dom";

function AddBlogGA() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const baseUrl = `${
    import.meta.env.VITE_SERVER_URL
  }/api/grandantiguablogs/${postId}/blogArray`;
  const [newBlogName, setNewBlogName] = useState("");
  const blogDate = getDate();
  const [newComments, setNewComments] = useState("");
  const [newRating, setNewRating] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [blogArray, setBlogArray] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Function to fetch initial data
    const fetchInitialData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        setBlogArray(data.blogArray || []);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    // Call the function
    fetchInitialData();
  }, [baseUrl]);

  const handleRatingChange = (e) => {
    const value = e.target.value;
    setNewRating(value);

    // Clear previous error
    setRatingError("");

    // Check if the input is not a number
    if (isNaN(value)) {
      setRatingError("Please enter a number.");
    }
    // Check if the number is not between 1 and 10
    else if (value < 1 || value > 10) {
      setRatingError("Rating must be between 1 and 10.");
    }
  };

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    // const dateEntered = ${month}/${date}/${year};
    // formatDate = formatDate
    return `${month}/${date}/${year}`;
    // return
  }

  // function formatDate(date) {
  //   const options = { month: "2-digit", day: "2-digit", year: "numeric" };
  //   return new Intl.DateTimeFormat("en-US", options).format(date);
  // }

  const addBlogGA = async (e) => {
    e.preventDefault();

    // Check for rating errors before submitting
    if (ratingError || !newRating) {
      setRatingError("Please enter a valid rating between 1 and 10.");
      return;
    }

    try {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      const blogArray = data.blogArray || [];

      const newBlog = {
        blogName: newBlogName,
        blogDate: new Date(blogDate),
        comments: newComments,
        rating: parseInt(newRating),
      };

      blogArray.push(newBlog);

      const putData = await fetch(baseUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newBlog,
        }),
      });

      if (putData.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
        navigate(`/viewUpdateGAPost/${postId}`);
      } else {
        console.log(
          "Failed to update data. Server response status:",
          putData.status
        );
        console.log("Server response message:", putData.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-teal-300 w-full">
      <h1 className="text-center text-teal-500 font-margarine text-3xl py-3">
        Grand Antigua
      </h1>
      <h1 className="text-center text-teal-500 font-margarine text-2xl py-3">
        Add a new Comment
      </h1>

      <form className=" bg-teal-300 flex flex-col" onSubmit={addBlogGA}>
        <div className="flex flex-col mx-auto text-center w-5/6">
          <div className="flex flex-col items-center ">
            <label
              htmlFor="Blog Name"
              className="mt-4 text-teal-500 font-margarine text-xl pb-2"
              style={{ width: `${Math.max(10, newBlogName.length + 20)}ch` }}
            >
              Your Name
            </label>
            <input
              type="text"
              className="text-teal-500 font-margarine text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
              style={{ width: `${Math.max(10, newBlogName.length + 20)}ch` }}
              onChange={(e) => setNewBlogName(e.target.value)}
              value={newBlogName}
              required
            />

            <label
              htmlFor="Comments"
              className="mt-4 text-teal-500 font-margarine text-xl pb-2"
              style={{ width: `${Math.max(10, newBlogName.length + 20)}ch` }}
            >
              Your Comments
            </label>
            <textarea
              type="text"
              rows="5"
              className="text-teal-500 font-margarine text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
              onChange={(e) => setNewComments(e.target.value)}
              value={newComments}
              required
            />
            <label
              htmlFor="Rating"
              className="mt-4 text-teal-500 font-margarine text-2xl pb-2"
              style={{ width: `${Math.max(10, newBlogName.length + 20)}ch` }}
            >
              Rating (1-10)
            </label>
            <input
              type="text"
              className="text-teal-500 font-margarine text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
              style={{ width: `${Math.max(10, newBlogName.length + 20)}ch` }}
              onChange={handleRatingChange}
              value={newRating}
              required
            />
            {ratingError && (
              <p className="text-red-500 text-sm mt-1">{ratingError}</p>
            )}

            <div className="flex items-center w-full flex-col tablet:flex-row desktop:flex-col mt-3">
              <Button
                onClick={() => navigate(`/viewUpdateGAPost/${postId}`)}
                className="w-40 h-8 flex items-center justify-center tablet:w-auto bg-orange-200 text-bg-cyan-400 m-2 p-1 rounded hover:bg-emerald-100 text-xxs"
              >
                👈 back to Photo
              </Button>

              <Button
                type="submit"
                className="w-40 h-8 flex items-center tablet:w-auto bg-orange-200 text-bg-cyan-400 m-2 p-1 rounded hover:bg-emerald-100 text-xxs"
                value={submitted ? "Saving comment..." : "💾 Save Comment"}
                disabled={submitted}
              >
                {submitted ? "Saving comment..." : "💾 Save Comment"}
              </Button>
            </div>

            <p className="text-center">
              {submitted && (
                <div className="success-message">Comment has been saved!</div>
              )}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddBlogGA;
