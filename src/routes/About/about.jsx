import React from 'react'
import TheFunBunch from "../../assets/TheFunBunch.jpeg"

function About() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 container mx-auto">
      <div className="flex flex-col justify-center mx-auto text-center">
        <h1 className="text-sky-800 font-margarine text-3xl p-4">
          About Us
        </h1>
        <p className="text-sky-800 font-margarine text-xl p-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A, excepturi
          ea. Neque pariatur placeat veritatis, accusamus inventore ipsa totam
          cum eius iure, illum ipsam, numquam maxime dolorum consequuntur
          repudiandae accusantium.
        </p>
      </div>
      <div>
        <img
          className="w-full border-8 border-orange-200 mx-auto h-full"
          src={TheFunBunch}
          alt={"The Fun Bunch"}
        />
      </div>
    </div>
  );
}

export default About