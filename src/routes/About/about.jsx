import React from 'react'
import LocalsNight from "../../assets/Locals-Night.jpeg"

function About() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 smallMobile:pt-3 mx-auto p-2 bg-teal-300">
      <div className="flex flex-col justify-center mx-auto text-center">
        <h1 className="text-sky-800 font-margarine text-3xl desktop:text-5xl p-4">
          About Us
        </h1>
        <p className="text-sky-800 font-margarine text-xl p-4 smallMobile:p-0 smallMobile:text-sm desktop:text-3xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A, excepturi
          ea. Neque pariatur placeat veritatis, accusamus inventore ipsa totam
          cum eius iure, illum ipsam, numquam maxime dolorum consequuntur
          repudiandae accusantium.
        </p>
      </div>
      <div className="flex justify-center">
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