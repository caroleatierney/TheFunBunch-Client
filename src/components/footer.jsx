import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="flex justify-center py-4">
        &copy; CopyRight {new Date().getFullYear()}
      </footer>
    </div>
  );
  }

export  default Footer