import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputMask from "react-input-mask";

function AddPicsGrandAntigua() {
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/grandantiguablogs`;
  const [newPicName, setNewPicName] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newPicDate, setNewPicDate] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newBlogArray] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  
  const addPic = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPicName,
          image: newImageUrl,
          date: newPicDate,
          description: newDesc,
          blogArray: newBlogArray,
        }),
      });

      if (response.ok) {
        // set form fields to blank after update
        setNewPicName("");
        setNewImageUrl("");
        setNewPicDate("");
        setNewDesc("");
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
        navigate("/grandAntiguaPics");
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
      <Link to="/grandAntiguaPics" className="back-button">
        👈 back
      </Link>

      <div>
        Add a new Memory - addPicsGrandAntigua
        <form onSubmit={addPic}>
          <label htmlFor="title">Title of Image</label>
          <input
            type="text"
            onChange={(e) => setNewPicName(e.target.value)}
            value={newPicName}
            required
          />

          <label htmlFor="Image">Date taken</label>
          <InputMask
            mask="99/99/9999"
            maskChar={null}
            className="text-center"
            placeholder="mm/dd/yyyy"
            onChange={(e) => setNewPicDate(e.target.value)}
            value={newPicDate}
            required
          />

          <label htmlFor="Image">Image from Imgur</label>
          <input
            type="text"
            onChange={(e) => setNewImageUrl(e.target.value)}
            value={newImageUrl}
            required
          />

          <label htmlFor="Description">Description</label>
          <input
            type="text"
            onChange={(e) => setNewDesc(e.target.value)}
            value={newDesc}
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

export default AddPicsGrandAntigua