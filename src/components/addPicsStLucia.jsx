import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AddPicsStLucia() {
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/blogs`;
  const [newPicName, setNewPicName] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  // const [newPicDate] = useState(getDate());
  const [newPicDate] = useState("11/30/2024");
  const [submitted, setSubmitted] = useState(false);

  const addPic = async (e) => {
    e.preventDefault();
    // function getDate() {
    //     const today = new Date();
    //     const month = today.getMonth() + 1;
    //     const year = today.getFullYear();
    //     const date = today.getDate();
    //     return `${month}/${date}/${year}`;
    // };

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPicName,
          image: newImageUrl,
          date: newPicDate,
        }),
      });

      if (response.ok) {
        // set form fields to blank after update
        setNewPicName('')
        setNewImageUrl('')
        setNewPicDate('')
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
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
      <Link to="/stLuciaPics" className="back-button">
        Back
      </Link>

      <div>
        Add a new Memory
        <form onSubmit={addPic}>
          <label htmlFor="title">Title of Image</label>
          <input
            type="text"
            onChange={(e) => setNewPicName(e.target.value)}
            value={newPicName}
            required
          />

          <label htmlFor="Image">Image from Imgur</label>
          <input
            type="text"
            onChange={(e) => setNewImageUrl(e.target.value)}
            value={newImageUrl}
            required
          />
          <input
            type="submit"
            value={submitted ? "Saving note..." : "💾 Save Note"}
            disabled={submitted}
          />

          <p className="text-center">
            {submitted && (
              <div className="success-message">Note has been added!</div>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

export default AddPicsStLucia