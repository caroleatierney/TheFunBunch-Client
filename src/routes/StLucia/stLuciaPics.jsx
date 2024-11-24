// Displays all of the pictures from St. Lucia
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Button } from "flowbite-react";
import { useLocation } from 'react-router-dom';
// import Coral from "../src/assets/coral.jpeg"; ;szhg;h;hb;awht

function StLuciaPics() {
    const location = useLocation();
    const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/stluciablogs`;
    const [data, setData] = useState([]);
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
                setData(data);
                setIsLoading(false);
            } catch (error) {
                setError('Error fetching data,' + error.message);
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

  useEffect(() => {
    // Restore scroll position if available
    if (location.state && location.state.scrollPosition !== undefined) {
      window.scrollTo(0, location.state.scrollPosition);
    }
  }, [location]);

    return (
      // Returns all images
      <div className=" bg-teal-300 min-h-screen">
        {/* <pre>{JSON.stringify(data, null, 2)} </pre> */}
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <h1 className="text-center text-teal-500 font-margarine text-3xl pt-2">
              St. Lucia
            </h1>
            <h1 className="text-center text-teal-500 font-margarine text-2xl pt-2 pb-2">
              Click on a photo to update it
            </h1>
            <div className="flex flex-row justify-evenly">
              <NavLink to="/addPicsStLucia">
                <Button className="bg-orange-200 text-bg-cyan-400 p-1 rounded hover:bg-emerald-100">
                  Add new photo or video
                </Button>
              </NavLink>
            </div>
            {/* <div className="bg-card hover:bg-card-hover rounded-md m-1 grid grid-cols-1 gap-10 tablet:grid-cols-2 desktop:grid-cols-4">
              {data.map((item) => (
                <Card
                  key={item._id}
                  className="max-w-sm desktop:max-w-4xl m-1 bg-white bg-opacity-40 border-8 border-orange-200 h-96 desktop:max-h-full"
                > */}
            <div className="bg-card hover:bg-card-hover rounded-md p-3 m-2 grid grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-4">
              {data.map((item) => (
                <Card
                  key={item._id}
                  className="max-w-sm m-2 bg-white bg-opacity-40 border-4 border-orange-200"
                >
                  <NavLink key={item._id} to={`/ViewUpdateSLPost/${item._id}`}>
                    <h3 className="text-center text-teal-500 font-margarine text-lg p-2">
                      {item.title}
                    </h3>

                    {item.image.match(/\.(mp4|webm|ogg)$/i) ? (
                      <video
                        className="w-full h-64 object-cover"
                        src={item.image}
                        controls
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        className="w-full h-64 object-cover"
                        src={item.image}
                        alt={item.title}
                      />
                    )}
                  </NavLink>
                </Card>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <NavLink to="/addPicsStLucia">
            <Button className="bg-orange-200 text-bg-cyan-400 p-1 rounded hover:bg-emerald-100">
              Add new photo or video
            </Button>
          </NavLink>
        </div>
      </div>
    );
}

export default StLuciaPics;
