import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "flowbite-react";

const DELETE_PW = `${import.meta.env.VITE_APP_DELETE_PASSWORD}`;

function UpdateSLBlogs() {
  const { postId, itemId } = useParams();
  const navigate = useNavigate();
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/stluciablogs/${postId}`;
  const [blogName, setBlogName] = useState("");
  const [blogDate, setBlogDate] = useState("");
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        const blogArray = data.blogArray || [];

        // Find the specific blog post by itemId
        const blog = blogArray.find((item) => item._id === itemId);
        if (blog) {
          setBlogName(blog.blogName);
          setComments(blog.comments);
          setBlogDate(blog.blogDate);
          setRating(blog.rating);
        }
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching data," + error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [baseUrl, itemId]);

  const updateBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      const blogArray = data.blogArray || [];

      // Find the index of the blog post to update
      const blogIndex = blogArray.findIndex((blog) => blog._id === itemId);

      if (blogIndex !== -1) {
        // Update the existing blog post
        blogArray[blogIndex] = {
          ...blogArray[blogIndex],
          blogName: blogName,
          blogDate: blogDate,
          comments: comments,
          rating: rating,
        };

        const putData = await fetch(baseUrl, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            blogArray: blogArray,
          }),
        });

        if (putData.ok) {
          // set form fields to blank after update
          setBlogName("");
          setComments("");
          setRating("");
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 2000);
          navigate(`/viewUpdateSLPost/${postId}`);
        } else {
          console.log(
            "Failed to update data. Server response status:",
            putData.status
          );
          console.log("Server response message:", putData.statusText);
        }
      } else {
        console.log("Blog post not found");
      }

    } catch (error) {
      console.log(error);
    }
  };

  const removeBlog = async (e) => {
    e.preventDefault();

    // only admin can delete
    alert("Enter admin password to delete");
    let password = prompt("Please enter the admin password");

    if (password == DELETE_PW) {
      alert("Comment will be deleted");
    } else {
      alert("You do not have authority, contact the admin");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/blogArray/${itemId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate(`/ViewUpdateSLPost/${postId}`);
      } else {
        console.error("Failed to delete the blog item");
      }
    } catch (error) {
      console.error("An error occurred while deleting the blog item:", error);
    }
  };

  // display form
  return (
    <div className=" bg-teal-300 w-full">
      <h1 className="text-center text-teal-500 font-margarine text-3xl py-3">
        St. Lucia
      </h1>
      <h1 className="text-center text-teal-500 font-margarine text-2xl py-3">
        Update a Comment
      </h1>
      <form onSubmit={updateBlog}>
        <div className="flex flex-col w-3/4 max-w-3xl mx-auto text-center">
          <label
            htmlFor="Your Name"
            className="mt-4 text-teal-500 font-margarine text-xl pb-2"
          >
            Your Name
          </label>
          <input
            type="text"
            className="text-center w-full max-w-2xl text-teal-500 font-margarine text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            onChange={(e) => setBlogName(e.target.value)}
            value={blogName}
            required
          />

          <label
            htmlFor="Comments"
            className="mt-4 text-teal-500 font-margarine text-xl pb-2"
          >
            Your Comments
          </label>
          <textarea
            rows="5"
            className="text-center w-full max-w-2xl text-teal-500 font-margarine text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            onChange={(e) => setComments(e.target.value)}
            value={comments}
            required
          />
          <label
            htmlFor="Rating"
            className="mt-4 text-teal-500 font-margarine text-xl pb-2"
          >
            Rating
          </label>
          <input
            type="text"
            className="w-full max-w-2xl text-teal-500 font-margarine text-center text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            required
          />
          <div className="flex items-center w-full flex-col tablet:flex-row desktop:flex-col mt-3">
            <Button
              onClick={() => navigate(`/viewUpdateSLPost/${postId}`)}
              className="w-40 h-8 flex items-center justify-center tablet:w-auto bg-orange-200 text-bg-cyan-400 m-2 p-1 rounded hover:bg-emerald-100 text-xxs"
            >
              👈 Back to Photo
            </Button>

            <Button
              type="submit"
              className="w-40 h-8 flex items-center justify-center tablet:w-auto bg-orange-200 text-bg-cyan-400 m-2 p-1 rounded hover:bg-emerald-100 text-xxs"
              disabled={submitted}
            >
              {submitted ? "Saving note..." : "💾 Save Updates"}
            </Button>

            <Button
              onClick={removeBlog}
              className="w-40 h-8 flex items-center justify-center tablet:w-auto bg-orange-200 text-bg-cyan-400 m-2 p-1 rounded hover:bg-emerald-100 text-xxs"
            >
              ❌ Remove Blog
            </Button>
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

export default UpdateSLBlogs;