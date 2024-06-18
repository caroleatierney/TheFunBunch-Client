// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// export default function AddBlog({$blogId}) {
//     const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/blogs`;
//     const [newBlogName, setNewBlogName] = useState('');
//     const [newBlogDate] = useState(getDate());
//     const [newComments, setNewComments] = useState('');
//     const [newRating, setNewRating] = useState('');

//     function getDate() {
//         const today = new Date();
//         const month = today.getMonth() + 1;
//         const year = today.getFullYear();
//         const date = today.getDate();
//         return `${month}/${date}/${year}`;
//     };

//     function validateForm() {
//         if (!newBlogName || !newComments || !newRating) {
//             alert("All fields are required");
//             return false;
//         } else {
//             return true;
//         }
//     }

//     const isValid = validateForm();
//     if (!isValid) {
//         return;
//     }

//     try {
//       const response = await fetch(baseUrl, {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({
//           blogName: newBlogName,
//           blogDate: newBlogDate,
//           comments: newComments,
//           rating: newRating
//         })
//       })
//     }
//       catch (error) {}
//     }

//     const response = await fetch(`${MOCK_API_URL}/${blogId}`);
//     const data = await response.json();
//     const blogArray = data.blogArray;
//     // console.log(blogArray)

//     // Add the new post to the blogArray
//     blogArray.push({
//         blogName: newBlogName,
//         blogDate: newBlogDate,
//         comments: newComments,
//         rating: newRating
//     });

//     // Update the blogArray data in Mock API
//     await fetch(`${MOCK_API_URL}/${blogId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             blogArray: blogArray
//         })
//     })

//     // set form fields to blank after update
//     setNewBlogName('')
//     setNewComments('')
//     setNewRating('')

//     updateTripPosts();
//     }

//     // display form as long as all the fields are not updated
//     return (
//       <>
//         <Link to="/" className="back-button">
//           Back
//         </Link>

//         <div>
//           Add a new Post

//           <form>
//             <label htmlFor="bloggersName">Your Name Here</label>
//             <input
//               onChange={(e) => setNewBlogName(e.target.value)}
//               value={newBlogName}
//               required
//             />

//             <label htmlFor="comments" className="montserratMd mb-1 white">
//               Add Your Comments
//             </label>
//             <textarea
//               onChange={(e) => setNewComments(e.target.value)}
//               rows="5"
//               value={newComments}
//               required
//             />

//             <label htmlFor="rating">Add Your Rating</label>
//             <input
//               onChange={(e) => setNewRating(e.target.value)}
//               value={newRating}
//               required
//             />
//             <input type="submit" />
//           </form>
//         </div>
//       </>
//     );
// }