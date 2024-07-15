// Displays all of the pictures from St. Lucia
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Button } from "flowbite-react";

function StLuciaPics() {
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


    return (
      // Returns all images
      <div>
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
            <h1 className="text-center text-teal-500 font-margarine text-2xl pt-2">
              Click on the photo to update it
            </h1>
            <div className="flex bg-card hover:bg-card-hover rounded-md p-3 m-2 lg:grid grid-cols-2 xl:grid-cols-4">
              {data.map((item) => (
                <Card key={item.id} className="max-w-sm m-2 bg-white bg-opacity-40 border-4 border-orange-200">
                  <NavLink key={item._id} to={`/ViewUpdateSLPost/${item._id}`}>
                    <h3 className="text-center text-teal-500 font-margarine text-lg p-2">
                      {item.title}
                    </h3>
                    <img
                      className="max-w-full max-h-full object-contain"
                      src={item.image}
                      alt={item.title}
                    />
                  </NavLink>
                </Card>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <NavLink to="/addPicsStLucia">
            <Button className="bg-orange-200 text-bg-cyan-400 p-1 rounded hover:bg-emerald-100">
              Add new memory
            </Button>
          </NavLink>
        </div>
      </div>
    );
}

export default StLuciaPics;
