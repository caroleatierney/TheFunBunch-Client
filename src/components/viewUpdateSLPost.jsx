import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "flowbite-react";
import InputMask from "react-input-mask";
import DisplaySLBlogs from "./displaySLBlogs";

function ViewUpdateSLPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const baseUrl = `${ import.meta.env.VITE_SERVER_URL }/api/stluciablogs/${postId}`;
  const [picName, setPicName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [blogArray] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dateInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        setPicName(data.title);
        setImageUrl(data.image);
        setDate(data.date);
        setDesc(data.description);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching data," + error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: picName,
          image: imageUrl,
          date: date,
          description: desc,
          blogArray: blogArray,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
        navigate(`/viewUpdateSLPost/${postId}`);
      } else {
        console.log("Failed to submit data.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removePost = async (e) => {
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
    <form className="flex flex-col justify-center bg-teal-300 min-h-screen" onSubmit={updatePost}>
      <h1 className="text-center text-teal-500 font-margarine text-3xl py-3">
        St. Lucia
      </h1>

      <div className="flex flex-col desktop:flex-row pt-10">
        <div className="flex flex-col justify-center">
          {imageUrl.match(/\.(mp4|webm|ogg)$/i) ? (
            <video
              className="w-5/6 mx-auto border-orange-200 border-8 mb-5"
              src={imageUrl}
              alt={picName}
              controls
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              className="w-5/6 mx-auto border-orange-200 border-8 mb-5"
              src={imageUrl}
              alt={picName}
            />
          )}
        </div>

        <div className="flex flex-col w-full p-5">
          <div className="flex justify-center">
            <div className="flex flex-col justify-center laptop:flex-row">
              <div>
                <label
                  htmlFor="title"
                  className="text-teal-500 font-margarine text-2xl pr-2"
                >
                  Title
                </label>
                {/* style={{ width: `${Math.max(100, picName.length * 10)}px` }} */}
                <input
                  type="text"
                  className="text-teal-500 font-margarine text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md smallestMobile:mt-4 desktop:mt-0 p-2 focus:outline-none focus:ring-2 focus:ring-orange-300 laptop:mt-0 "
                  onChange={(e) => setPicName(e.target.value)}
                  value={picName}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="text-teal-500 font-margarine text-2xl"
                >
                  Date taken
                </label>
                <InputMask
                  ref={dateInputRef}
                  mask="99/99/9999"
                  maskChar={null}
                  className="text-center text-teal-500 font-margarine text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 smallestMobile:mt-4 laptop:mx-1 laptop:mt-0 p-2"
                  placeholder="mm/dd/yyyy"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="Image"
                  className="text-teal-500 font-margarine text-2xl pr-2"
                >
                  Image URL
                </label>

                <input
                  type="text"
                  className="text-center text-teal-500 font-margarine text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 smallestMobile:mt-4 laptop:mt-0 p-2"
                  placeholder="mm/dd/yyyy"
                  onChange={(e) => setImageUrl(e.target.value)}
                  value={imageUrl}
                  required
                />
              </div>
            </div>
          </div>
          <label
            className="text-teal-500 font-margarine text-2xl"
            htmlFor="Description"
          >
            Description
          </label>
          <textarea
            rows="5"
            className="text-teal-500 font-margarine text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            required
          />

          <div className="flex flex-col laptop:flex-row items-center laptop:justify-around p-8">
            <NavLink to="/stLuciaPics">
              <Button className="bg-orange-200 text-bg-cyan-400 m-2 rounded hover:bg-emerald-100">
                👈 Back to St. Lucia
              </Button>
            </NavLink>

            <input
              className="bg-orange-200 text-bg-cyan-400 m-2 p-2 rounded hover:bg-emerald-100 text-sm"
              type="submit"
              value={submitted ? "Saving note..." : "💾 Save Updates"}
              disabled={submitted}
            />

            <NavLink to={`/addBlogSL/${postId}`}>
              <Button className="bg-orange-200 text-bg-cyan-400 m-2 rounded hover:bg-emerald-100 text-md">
                Add a Comment
              </Button>
            </NavLink>

            <NavLink to="/stLuciaPics">
              <Button
                onClick={removePost}
                className="bg-orange-200 text-bg-cyan-400 m-2 rounded hover:bg-emerald-100 text-md"
              >
                ❌ Remove
              </Button>
            </NavLink>
          </div>
          <p className="text-center">
            {submitted && (
              <div className="success-message">Page has been updated!</div>
            )}
          </p>
        </div>
      </div>
      <DisplaySLBlogs postId={postId} />
    </form>
  );
}

export default ViewUpdateSLPost;