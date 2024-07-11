import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { Button } from "flowbite-react";

function ViewUpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/stluciablogs/${id}`;
  const [picName, setPicName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [picDate] = useState(getDate());
  const [fetchedDate, setFetchedDate] = useState("");
  const [desc, setDesc] = useState("");
  const [blogArray] = useState([]);
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
        setPicName(data.title);
        setImageUrl(data.image);
        setFetchedDate(data.date);
        setDesc(data.description);
        setIsLoading(false);
      } catch (error) {
        setError("Error fetching data," + error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

  const updatePost = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: picName,
          image: imageUrl,
          date: picDate,
          description: desc,
          blogArray: blogArray,
        }),
      });

      if (response.ok) {
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
    <div>
      <div>
        <form className="flex flex-col justify-center" onSubmit={updatePost}>
          <div className="flex flex-row pt-10">
            <div className="flex flex-col justify-center">
              <img className="w-2/3 mx-auto" src={imageUrl} alt={picName} />
            </div>

            <div className="flex flex-col justify-center w-full p-5">
              <div className="flex flex-col justify-center p-6">
                <div>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    onChange={(e) => setPicName(e.target.value)}
                    value={picName}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="date">Date taken - TBD</label>
                  {/* <div>{fetchedDate}</div> */}
                </div>
                <div>
                  <label htmlFor="Image">Image URL from Imgur</label>
                  <input
                    type="text"
                    onChange={(e) => setImageUrl(e.target.value)}
                    value={imageUrl}
                    required
                  />
                </div>
              </div>

              <label className="text-center text-bold" htmlFor="Description">
                Description
              </label>
              <textarea
                rows="5"
                type="text"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                required
              />
              <div className="flex justify-around p-8">
                <NavLink to="/stLuciaPics">
                  <Button className="bg-white text-bg-cyan-400 p-1 rounded hover:bg-emerald-100">
                    👈 Back to St. Lucia Memories
                  </Button>
                </NavLink>

                <input
                  className="bg-white text-bg-cyan-400 p-1 rounded hover:bg-emerald-100"
                  type="submit"
                  value={submitted ? "Saving note..." : "💾 Save Updates"}
                  disabled={submitted}
                />

                <NavLink to="/stLuciaPics">
                  <Button
                    onClick={removePost}
                    className="bg-white text-bg-cyan-400 p-1 rounded hover:bg-emerald-100"
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ViewUpdatePost;