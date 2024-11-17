import React from 'react'

function Footer() {
  return (
    <div className= "bg-teal-300">
      <footer className="flex justify-center py-4 text-white">
        &copy; CopyRight {new Date().getFullYear()}
      </footer>
    </div>
  );
  }

export  default Footer