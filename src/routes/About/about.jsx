import React from 'react'
import LocalsNight from "../../assets/Locals-Night.jpeg"

function About() {
  return (
    <div className="grid grid-cols-1 laptop:grid-cols-2 gap-8 pt-3 mx-auto bg-teal-300 min-h-screen grid-rows-[1fr_auto]">
      <div className="flex flex-col justify-center mx-auto text-center">
        <h1 className="text-sky-800 font-margarine text-3xl desktop:text-5xl p-4">
          About Us
        </h1>
        <p className="text-sky-800 font-margarine p-4 text-sm desktop:text-3xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A, excepturi
          ea. Neque pariatur placeat veritatis, accusamus inventore ipsa totam
          cum eius iure, illum ipsam, numquam maxime dolorum consequuntur
          repudiandae accusantium.
        </p>
      </div>
      <div className="flex justify-center m-10">
        <img
          className="w-full border-8 border-orange-200 mx-auto h-full"
          src={LocalsNight}
          alt={"Grand Antigua Local's Party"}
        />
      </div>
    </div>
  );
}

export default About