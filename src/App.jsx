import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home    from "./routes/Home/home";
import ViewUpdatePost from "./routes/Home/ViewUpdatePost";
import About   from "./routes/About/about";
// import AddBlog from "./components/addBlog";
import AddPicsStLucia from "./components/addPicsStLucia";
import Header  from "./components/header";
import Footer  from "./components/footer";
import StLuciaPics from "./routes/StLucia/stLuciaPics";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stLuciaPics" element={<StLuciaPics />} />
          {/* <Route path="/blog/:id"       element={<ViewUpdatePost />} /> */}
          <Route path="/addPicsStLucia" element={<AddPicsStLucia />} />
          <Route path="/viewUpdatePost/:id" element={<ViewUpdatePost />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
