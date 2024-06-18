import React from "react";
import { Link } from "react-router-dom";
import StLuciaPics from "../../routes/StLucia/stLuciaPics";
import TheFunBunch from "../../assets/TheFunBunch.jpeg"

function Home() {
  return (
    <div>
      <Link to={`/stLuciaPics`}>St. Lucia</Link>
      {/* <Link to={`/grandAntiguaPics`}>Grand Antigua</Link> */}
      <img src={TheFunBunch} alt={"The Fun Bunch"} />
    </div>
  );
}
export default Home;
