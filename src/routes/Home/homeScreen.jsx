import React from "react";
import TheFunBunch from "../../assets/TheFunBunch.jpeg"

function HomeScreen() {
  return (
    <div>
      <img className="w-1/2 border-8 border-orange-200 mx-auto h-full" src={TheFunBunch} alt={"The Fun Bunch"} />
    </div>
  );
}
export default HomeScreen;
