import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Button } from "flowbite-react";

function Header() {
  return (
    <header className="flex smallMobile:flex-col desktop:flex-row items-center justify-evenly px-4 py-2 bg-teal-300">
      <Navbar className="bg-transparent">
        <div>
          <h1
            className="font-margarine font-bold text-center bg-transparent 
                     
           text-yellow-100 text-xl 
           smallestMobile:text-amber-500 smallestMobile:text-xl 
           smallMobile:text-emerald-500 smallMobile:text-3xl
           smallMedMobile:text-fuchsia-500 smallMediumMobile:text-3xl
           regularMobile:text-lime-200 regularMobile:text-xl
           tablet:text-purple-500 tablet:text-4xl
           laptop:text-cyan-300 laptop:text-5xl
           desktop:text-blue-500 desktop:text-6xl
           largeScreen:text-rose-300 largeScreen:text-7xl
           reallyLargeScreen:text-amber-500 reallyLargeScreen:text-7xl
         "
         >
            The Fun Bunch
          </h1>

          <ul className="flex flex-col tablet:flex-row items-center justify-around space-y-2 tablet:space-y-0 tablet:space-x-10 pt-4 w-full text-md desktop:text-xl">
            <li className="w-full desktop:w-auto flex justify-center">
              <NavLink to="/">
                <Button
                  size={`xs sm:sm md:md lg:lg xl:xl`}
                  style={{ minWidth: "100px" }}
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
                  style={{ minWidth: "110px" }}
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
                  style={{ minWidth: "120px" }}
                  className="bg-cyan-400 text-white p-1 rounded hover:bg-emerald-100 w-full"
                >
                  Saint Lucia
                </Button>
              </NavLink>
            </li>
            <li className="w-full desktop:w-auto flex justify-center">
              <NavLink to="/grandAntiguaPics" className="w-62">
                <Button
                  size={`xs sm:sm md:md lg:lg`}
                  style={{ minWidth: "150px" }}
                  className="bg-cyan-400 text-white p-1 rounded hover:bg-emerald-100 w-full"
                >
                  Grand Antigua
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