import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Button } from "flowbite-react";

function Header() {
  return (
    <header className="flex smallMobile:flex-col desktop:flex-row smallestMobile:text-xl items-center justify-evenly px-4 py-2 max-w-screen-lg">
      <Navbar
        fluid
        rounded
        className="flex items-center justify-evenly px-4 py-2 bg-transparent"
      >
        <div className="bg-white bg-opacity-20">
          <h1 className="font-margarine font-bold text-center bg-transparent text:sm sm:text-3xl sm:text-amber-500 md:text-4xl md:text-yellow-200 lg:text-5xl lg:text-blue-500 text-gray-500">
            The Fun Bunch
          </h1>

          <ul className="flex flex-col items-center space-y-2 pt-4 desktop:flex-row desktop:space-y-0 desktop:space-x-4">
            <li className="w-full desktop:w-auto flex justify-center">
              <NavLink to="/" className="w-62">
                <Button
                  size={`xs sm:sm md:md lg:lg`}
                  className="bg-cyan-400 text-white p-1 rounded hover:bg-emerald-100 w-full"
                >
                  Home
                </Button>
              </NavLink>
            </li>
            <li className="w-full desktop:w-auto flex justify-center">
              <NavLink to="/about" className="w-62">
                <Button
                  size={`xs sm:sm md:md lg:lg`}
                  className="bg-cyan-400 text-white p-1 rounded hover:bg-emerald-100 w-full"
                >
                  About Us
                </Button>
              </NavLink>
            </li>
            <li className="w-full desktop:w-auto flex justify-center">
              <NavLink to="/stLuciaPics" className="w-62">
                <Button
                  size={`xs sm:sm md:md lg:lg`}
                  className="bg-cyan-400 text-white p-1 rounded hover:bg-emerald-100 w-full"
                >
                  St. Lucia Memories
                </Button>
              </NavLink>
            </li>
            <li className="w-full desktop:w-auto flex justify-center">
              <NavLink to="/grandAntiguaPics" className="w-62">
                <Button
                  size={`xs sm:sm md:md lg:lg`}
                  className="bg-cyan-400 text-white p-1 rounded hover:bg-emerald-100 w-full"
                >
                  Grand Antigua Memories
                </Button>
              </NavLink>
            </li>
          </ul>
        </div>
      </Navbar>
    </header>
  );
}

export default Header;