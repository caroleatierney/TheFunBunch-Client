import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ViewUpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`;
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
        setFetchedDate(data.date);;
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
        method: "DELETE"
      });
      if(response.ok) {
        navigate('/stLuciaPics');
      }
    } catch (error) {     
    }
  }

  // display form
  return (
    <div>
      <div className="breadcrump-nav">
        <Link to="/" className="back-button">
          👈 back
        </Link>

        <button onClick={removePost} className="delete">
          ❌ Remove
        </button>
      </div>

      <div>
        View and Update
        <form onSubmit={updatePost}>
          <label htmlFor="title">Title of Image</label>
          <input
            type="text"
            onChange={(e) => setPicName(e.target.value)}
            value={picName}
            required
          />
          <label htmlFor="date">Date Added</label>
          <div>{fetchedDate}</div>
          <label htmlFor="Image">Image from Imgur</label>
          <img src={imageUrl} alt={picName} />
          <input
            type="text"
            onChange={(e) => setImageUrl(e.target.value)}
            value={imageUrl}
            required
          />
          <label htmlFor="Description">Description</label>
          <input
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            required
          />
          <input
            type="submit"
            value={submitted ? "Saving note..." : "💾 Save Updates"}
            disabled={submitted}
          />

          <p className="text-center">
            {submitted && (
              <div className="success-message">Note has been updated!</div>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

export default ViewUpdatePost