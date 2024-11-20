import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "flowbite-react";
import InputMask from "react-input-mask";
import DisplaySLBlogs from "./displaySLBlogs";

function ViewUpdateSLPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const baseUrl = `${
    import.meta.env.VITE_SERVER_URL
  }/api/stluciablogs/${postId}`;
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
    <form className="flex flex-col bg-teal-300" onSubmit={updatePost}>
      <h1 className="text-center text-teal-500 font-margarine text-sm tablet:text-3xl laptop:text-6xl py-3">
        St. Lucia
      </h1>
      <div className="flex flex-col justify-center min-h-screen bg-teal-300">
        <div className="flex flex-col items-center desktop:flex-row">
          <div className="justify-center flex m-10 laptop:w-2/3 desktop:w-1/2">
            {imageUrl.match(/\.(mp4|webm|ogg)$/i) ? (
              <video
                className="max-w-full max-h-full object-cover"
                src={imageUrl}
                alt={picName}
                controls
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                className="max-w-full max-h-full object-contain"
                src={imageUrl}
                alt={picName}
              />
            )}
          </div>

          <div className="flex flex-col items-center laptop:w-1/3 mt-14 desktop:mt-0 desktop:w-1/2">
            <div className="flex flex-col items-center ">
              <div className="flex flex-col tablet:flex-row desktop:flex-col items-center">
                <label
                  htmlFor="title"
                  className="text-teal-500 font-margarine smallestMobile:text-sm tablet:text-xl laptop:text-2xl tablet:pr-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  style={{ width: `${Math.max(10, imageUrl.length - 3)}ch` }}
                  className="text-teal-500 font-margarine smallestMobile:text-sm tablet:text-xl laptop:text-2xl desktop:text-xl bg-white bg-opacity-50 border-2 border-orange-300 text-center rounded-md smallestMobile:mt-4 desktop:mt-0 p-2 focus:outline-none focus:ring-2 focus:ring-orange-300 laptop:mt-0 mb-8 desktop:w-full"
                  onChange={(e) => setPicName(e.target.value)}
                  value={picName}
                  required
                />
              </div>

              <div className="flex flex-col tablet:flex-row desktop:flex-col items-center">
                <label
                  htmlFor="date"
                  className="text-teal-500 font-margarine smallestMobile:text-sm tablet:text-xl laptop:text-2xl pr-4"
                >
                  Date taken
                </label>
                <InputMask
                  ref={dateInputRef}
                  mask="99/99/9999"
                  maskChar={null}
                  style={{ width: `${Math.max(10, imageUrl.length - 3)}ch` }}
                  className="text-center text-teal-500 font-margarine smallestMobile:text-sm tablet:text-xl laptop:text-2xl desktop:text-xl bg-white bg-opacity-50 border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 smallestMobile:mt-4 laptop:mx-1 laptop:mt-0 mb-8"
                  placeholder="mm/dd/yyyy"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  required
                />
              </div>

              <div className="flex flex-col tablet:flex-row desktop:flex-col items-center">
                <label
                  htmlFor="Image"
                  className="text-teal-500 font-margarine smallestMobile:text-sm tablet:text-xl laptop:text-2xl pr-4"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  style={{ width: `${Math.max(10, imageUrl.length - 3)}ch` }}
                  className="text-center text-teal-500 font-margarine smallestMobile:text-sm tablet:text-xl laptop:text-2xl desktop:text-xl bg-white bg-opacity-50 border-2 border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 smallestMobile:mt-4 laptop:mt-0 mb-8 desktop:px-0 "
                  onChange={(e) => setImageUrl(e.target.value)}
                  value={imageUrl}
                  required
                />
              </div>
            </div>

            <div className="flex items-center w-5/6 flex-col tablet:flex-row desktop:flex-col">
              <label
                className="text-teal-500 font-margarine smallestMobile:text-sm tablet:text-xl laptop:text-2xl pr-4"
                htmlFor="Description"
              >
                Description
              </label>
              <textarea
                rows="5"
                style={{ width: `${Math.max(10, imageUrl.length - 3)}ch` }}
                className="text-teal-500 font-margarine smallestMobile:text-xs tablet:text-xl tablet:text-orange laptop:text-2xl desktop:text-xl bg-white bg-opacity-50 border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300 w-3/4"
                type="text"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                required
              />
            </div>

            <div className="grid grid-cols-1 desktop:grid-cols-2 gap-x-8 align-content:content-evenly items-center m-5">
              <NavLink to="/stLuciaPics">
                <Button className="w-full w-30 h-8 tablet:w-auto desktop:w-40 desktop:h-15 bg-orange-200 text-bg-cyan-400 m-2 p-1 rounded hover:bg-emerald-100 text-xs items-center">
                  👈 St. Lucia
                </Button>
              </NavLink>

              <input
                className="w-full w-30 h-8 tablet:w-auto desktop:w-40 desktop:h-15 bg-orange-200 text-bg-cyan-400 m-2 p-1 rounded hover:bg-emerald-100 text-xs items-center"
                type="submit"
                value={submitted ? "Saving note..." : "💾     Save Updates"}
                disabled={submitted}
              />

              <NavLink to={`/addBlogSL/${postId}`}>
                <Button className="w-full w-30 h-8 tablet:w-auto desktop:w-40 desktop:h-15 bg-orange-200 text-bg-cyan-400 m-2 rounded hover:bg-emerald-100 text-xs items-center">
                  Add a Comment
                </Button>
              </NavLink>

              <NavLink to="/stLuciaPics">
                <Button
                  onClick={removePost}
                  className="w-full w-30 h-8 tablet:w-auto desktop:w-40 desktop:h-15 bg-orange-200 text-bg-cyan-400 m-2 p-1 rounded hover:bg-emerald-100 text-xs items-center"
                >
                  ❌ Remove
                </Button>
              </NavLink>
            </div>
            <p className="text-center">
              {submitted && (
                <div className="success-message">Note has been updated!</div>
              )}
            </p>
            <DisplaySLBlogs postId={postId} />
          </div>
        </div>
      </div>
    </form>
  );
}

export default ViewUpdateSLPost;
