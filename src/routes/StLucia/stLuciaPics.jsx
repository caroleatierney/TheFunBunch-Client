// Displays all of the pictures from St. Lucia
import React, {useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

function StLuciaPics() {
    // const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/blogs`;
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
      // Returns all notes
      <div className="bg-red-100">
        {/* <pre>{JSON.stringify(data, null, 2)} </pre> */}
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <Link to={`/addPicsStLucia`} className="bg-red-100">
              Add new picture
            </Link>
            <ul>
              {data.map((item) => (
                <li key={item._id}>
                  <Link to={`/ViewUpdatePost/${item._id}`}>
                    <h3 className="bg-red-100">{item.title}</h3>
                    <img src={item.image} alt={item.title} />
                    <p>
                      {item.description.length > 50
                        ? `${item.description.substring(0, 50)}...`
                        : item.description}
                    </p>
                    <div>Date Added: {item.date}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
}

export default StLuciaPics;
