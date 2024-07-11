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
          // <div>

          <div>
            <h1 className='text-center pt-2'>Click on the photo to update</h1>
            <div className="flex bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2 lg:grid grid-cols-2 xl:grid-cols-4">
              {data.map((item) => (
                <Card className="max-w-sm m-2">
                  <NavLink key={item._id} to={`/ViewUpdatePost/${item._id}`}>
                    <h3 className="text-center">{item.title}</h3>
                    <img
                      className="max-w-full max-h-full object-contain"
                      src={item.image}
                      alt={item.title}
                    />
                  </NavLink>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <NavLink to="/addPicsStLucia">
                <Button className="bg-white text-bg-cyan-400 p-1 rounded hover:bg-emerald-100">
                  Add new memory
                </Button>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    );
}

export default StLuciaPics;
