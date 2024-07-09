import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BackgroundImage from "./assets/background.jpeg";
import HomeScreen      from "./routes/Home/homeScreen";
import ViewUpdatePost  from "./routes/Home/ViewUpdatePost";
import StLuciaPics     from "./routes/StLucia/stLuciaPics";
import AddPicsStLucia  from "./components/addPicsStLucia";
import About           from "./routes/About/about";
// import AddBlog from "./components/addBlog";
import Header          from "./components/header";
import Footer          from "./components/footer";

function App() {
  return (

      <Router>
        <div
            className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/stLuciaPics" element={<StLuciaPics />} />
          {/* <Route path="/blog/:id"       element={<ViewUpdatePost />} /> */}
          <Route path="/addPicsStLucia" element={<AddPicsStLucia />} />
          <Route path="/viewUpdatePost/:id" element={<ViewUpdatePost />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
        </div>
      </Router>
    
  );
}

export default App;
