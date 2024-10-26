// Displays all of the blogs for post
import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Card, Button } from "flowbite-react";

function DisplayGABlogs() {
  const { postId } = useParams();
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/grandantiguablogs/${postId}`;
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
        setData(data); // Update data state with fetched data

        // const blogEntry = data.blogArray

        // const blogEntry = data.blogArray.find(item => item._id === itemId); // Find the specific blog entry

        // if (blogEntry) {
        //   setBlogName(blogEntry.blogName)
        //   setBlogDate(blogEntry.blogDate);
        //   setComments(blogEntry.comments);
        //   setRating(blogEntry.rating);
        // }

        setIsLoading(false);
      } catch (error) {
        setError("Error fetching data," + error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [baseUrl, postId ]);

  return (
    // Returns all blogs
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)} </pre> */}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : data ? ( // Check if data is defined

          <div className="bg-card hover:bg-card-hover rounded-md p-3 m-2 grid grid-cols-1 laptop:grid-cols-3 desktop:grid-cols-4">
            {data.blogArray &&
              data.blogArray.map(
                (
                  item // Check if data.blogArray exists before mapping
                ) => (
                  <Card
                    key={item._id}
                    className="max-w-sm m-2 bg-white bg-opacity-40 border-4 border-orange-200"
                  >
                    <NavLink
                      key={item._id}
                      to={`/UpdateSLBlogs/${data._id}/${item._id}`}
                    >
                      <div>
                        <div className="flex flex-col laptop:flex-row justify-center laptop:justify-evenly">
                          <div>
                            <h3 className="text-center text-teal-500 font-margarine text-lg p-2">
                              {item.blogName}
                            </h3>
                          </div>
                          <div>
                            <h3 className="text-center text-teal-500 font-margarine text-lg p-2">
                              {item.blogDate}
                            </h3>
                          </div>
                        </div>
                        <h3 className="text-center text-teal-500 font-margarine text-lg p-2">
                          {item.comments}
                        </h3>

                        <h3 className="text-center text-teal-500 font-margarine text-lg p-2">
                          {item.rating}
                        </h3>
                      </div>
                    </NavLink>
                  </Card>
                )
              )}
          </div>

      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
}

export default DisplayGABlogs;
