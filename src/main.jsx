import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import "./tailwindcss/tailwind.css";
// import "./tailwindcss/output.css";
// import "./output.css";
import "tailwindcss/tailwind.css";
// import "./tailwind.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
