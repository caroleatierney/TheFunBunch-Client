import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "flowbite-react";

function ViewUpdateSLBlogs() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/stluciablogs/${id}`;
  const [newBlogName, setNewBlogName] = useState("");
//   const [newBlogDate, setNewBlogDate] = useState("");
  const [newComments, setNewComments] = useState("");
  const [newRating, setNewRating] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        // const blogArray = data.blogArray || [];
        // const newBlog = {};
        // blogDate = blogArray.BlogDate
        // newBlog.blogName = newBlogName;
        // newBlog.blogDate = blogArray.blogDate;
        // newBlog.comments = newComments;
        // newBlog.rating = newRating;
        // blogArray.push(newBlog);

        setNewBlogName(data.blogArray.blogName);
        setNewComments(data.blogArray.comments);
        setNewBlogDate(data.blogArray.blogDate);
        setNewRating(data.blogArray.rating);
        setIsLoading(false);
        blogArray.push(newBlog);

      } catch (error) {
        setError("Error fetching data," + error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateBlog = async (e) => {
    e.preventDefault();

        try {
          const putData = await fetch(baseUrl, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              blogArray: blogArray,
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

  const removeBlog = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseUrl, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/stLuciaPics");
      }
    } catch (error) {}
  };

  // display form
  return (
    <div>
      <h1 className="text-center text-teal-500 font-margarine text-3xl py-3">
        St. Lucia
      </h1>

      <div>
        <form className="flex flex-col justify-center" onSubmit={updateBlog}>
          <div className="flex flex-row pt-10">

            <div className="flex flex-col justify-center w-full p-5">
              <div className="flex flex-col justify-center">
                <div>
                  <label
                    htmlFor="Blog Name"
                    className="text-teal-500 font-margarine text-2xl pr-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="text-teal-500 font-margarine text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md p-2 
                    style={{ width: `${Math.max(100, picName.length * 10)}px` }}
                    focus:outline-none focus:ring-2 focus:ring-orange-300"
                    onChange={(e) => setNewBlogName(e.target.value)}
                    value={newBlogName}
                    required
                  />
                </div>
                <div>
                  <h1 className="text-teal-500 font-margarine text-2xl pr-2">
                    Date: blogDate
                  </h1>
                </div>

                <div>
                  <label
                    htmlFor="Comments"
                    className="text-teal-500 font-margarine text-2xl pr-2"
                  >
                    Comments
                  </label>
                  <input
                    type="text"
                    className="text-teal-500 font-margarine text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-orange-300 mt-2"
                    onChange={(e) => setNewComments(e.target.value)}
                    value={newComments}
                    required
                  />
                </div>
              </div>

              <label
                className="text-teal-500 font-margarine text-2xl"
                htmlFor="Rating"
              >
                Rating
              </label>
              <textarea
                rows="5"
                className="text-teal-500 font-margarine text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
                type="text"
                onChange={(e) => setNewRating(e.target.value)}
                value={newRating}
                required
              />
              <div className="flex justify-around p-8">
                <NavLink to="/stLuciaPics">
                  <Button className="bg-orange-200 text-bg-cyan-400 p-1 rounded hover:bg-emerald-100">
                    👈 Back to St. Lucia Memories
                  </Button>
                </NavLink>

                <input
                  className="bg-orange-200 text-bg-cyan-400 p-1 rounded hover:bg-emerald-100"
                  type="submit"
                  value={submitted ? "Saving note..." : "💾 Save Updates"}
                  disabled={submitted}
                />

                <NavLink to={`/addBlogSL/${id}`}>
                  <Button className="bg-orange-200 text-bg-cyan-400 p-1 rounded hover:bg-emerald-100">
                    Add a Comment
                  </Button>
                </NavLink>

                <NavLink to="/stLuciaPics">
                  <Button
                    onClick={removeBlog}
                    className="bg-orange-200 text-bg-cyan-400 p-1 rounded hover:bg-emerald-100"
                  >
                    ❌ Remove
                  </Button>
                </NavLink>
              </div>
              <p className="text-center">
                {submitted && (
                  <div className="success-message">Blod has been updated!</div>
                )}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ViewUpdateSLBlogs;
