import React from "react";
import TheFunBunch from "../../assets/TheFunBunch.jpeg"

function HomeScreen() {
  return (
    <div className="flex w-full mx-auto">
      <img className="w-3/4 border-8 border-orange-200 mx-auto h-full mt-5" src={TheFunBunch} alt={"The Fun Bunch"} />
    </div>
  );
}
export default HomeScreen;
