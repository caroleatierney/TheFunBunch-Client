import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

function AddPicsStLucia() {
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/stluciablogs`;
  const [newPicName, setNewPicName] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newPicDate, setNewPicDate] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newBlogArray] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  
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
        navigate("/stLuciaPics");
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
      <h1 className="text-center text-teal-500 font-margarine text-3xl py-3">
        St. Lucia
      </h1>

      <form onSubmit={addPic}>
        <div className="flex flex-col w-1/4 mx-auto text-center">
          <label
            htmlFor="title"
            className="mt-4 text-teal-500 font-margarine text-2xl pb-2"
          >
            Title of Image
          </label>
          <input
            type="text"
            className="text-teal-500 font-margarine text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            onChange={(e) => setNewPicName(e.target.value)}
            value={newPicName}
            required
          />

          <label
            htmlFor="Date"
            className="mt-4 text-teal-500 font-margarine text-2xl pb-2"
          >
            Date taken
          </label>
          <InputMask
            mask="99/99/9999"
            maskChar={null}
            className="text-center text-teal-500 font-margarine text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            placeholder="mm/dd/yyyy"
            onChange={(e) => setNewPicDate(e.target.value)}
            value={newPicDate}
            required
          />

          <label
            htmlFor="Image"
            className="mt-4 text-teal-500 font-margarine text-2xl pb-2"
          >
            Image from Imgur
          </label>
          <input
            type="text"
            className="text-teal-500 font-margarine text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            onChange={(e) => setNewImageUrl(e.target.value)}
            value={newImageUrl}
            required
          />

          <label
            htmlFor="Description"
            className="mt-4 text-teal-500 font-margarine text-2xl pb-2"
          >
            Description
          </label>
          <textarea
            rows="5"
            className="text-teal-500 font-margarine text-lg bg-white bg-opacity-50 border-2 border-orange-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            value={setNewDesc}
            required
          />

          <div className="flex flex-row w-full mx-auto justify-evenly pt-3">
            <Link
              to="/grandAntiguaPics"
              className="bg-orange-200 text-bg-cyan-400 p-1 rounded hover:bg-emerald-100"
            >
              👈 back
            </Link>

            <input
              type="submit"
              className="bg-orange-200 text-bg-cyan-400 p-1 rounded hover:bg-emerald-100"
              value={submitted ? "Saving note..." : "💾 Save Note"}
              disabled={submitted}
            />
          </div>

          <p className="text-center">
            {submitted && (
              <div className="success-message">Note has been added!</div>
            )}
          </p>
        </div>
      </form>
    </div>
  );
}

export default AddPicsStLucia