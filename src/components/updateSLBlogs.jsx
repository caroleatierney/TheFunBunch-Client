import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "flowbite-react";

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
          const response = await fetch(baseUrl, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              blogName,
              blogDate,
              comments,
              rating,
            }),
          });

          if (response.ok) {
            // set form fields to blank after update
            setNewBlogName("");
            setNewComments("");
            setNewRating("");
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 2000);
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

  const removeBlog = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${baseUrl}/stLuciaBlogs/${itemId}`, {
          method: "DELETE",
        });
      if (response.ok) {
        // setData((prevData) => ({
        //   ...prevData,
        //   blogArray: prevData.blogArray.filter(
        //     (item) => item._id !== itemIdToDelete
        //   ),
        // }));
      } else {
        console.error("Failed to delete the blog item");
      }
    } catch (error) {
      console.error("An error occurred while deleting the blog item:", error);
    }
  };

  // display form
  return (
    <div>
      <h1 className="text-center text-teal-500 font-margarine text-3xl py-3">
        St. Lucia
      </h1>
      <h1 className="text-center text-teal-500 font-margarine text-3xl py-3">
        Update a Comment
      </h1>

      <form onSubmit={updateBlog}>
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
            onChange={(e) => setBlogName(e.target.value)}
            value={blogName}
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
            onChange={(e) => setComments(e.target.value)}
            value={comments}
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
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            required
          />
          <div className="flex flex-row w-full mx-auto justify-evenly pt-3">
            <Link
              to="/stLuciaPics"
              className="bg-orange-200 text-bg-cyan-400 p-1 rounded hover:bg-emerald-100"
            >
              👈 Back to St. Lucia Memories
            </Link>

            <input
              type="submit"
              className="bg-orange-200 text-bg-cyan-400 p-1 rounded hover:bg-emerald-100"
              value={submitted ? "Saving updates..." : "💾 Save updates"}
              disabled={submitted}
            />

            <NavLink to="/viewUpdateSLPics">
              <Button
                onClick={removeBlog}
                className="bg-orange-200 text-bg-cyan-400 p-1 rounded hover:bg-emerald-100"
              >
                ❌ Remove Blog
              </Button>
            </NavLink>
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