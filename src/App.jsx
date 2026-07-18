import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import BackgroundImage     from "./assets/background.jpeg";
import HomeScreen from "./routes/Home/homeScreen";
import About from "./routes/About/about";

import Header from "./components/header";
import Footer from "./components/footer";

import StLuciaPics from "./routes/StLucia/stLuciaPics";
import AddPicsStLucia from "./components/addPicsStLucia";
import ViewUpdateSLPost from "./components/viewUpdateSLPost";
import AddBlogSL from "./components/addBlogSL";
import DisplaySLBlogs from "./components/displaySLBlogs";
import UpdateSLBlogs from "./components/updateSLBlogs";

import GrandAntiguaPics from "./routes/GrandAntigua/grandAntiguaPics";
import AddPicsGrandAntigua from "./components/addPicsGrandAntigua";
import ViewUpdateGAPost from "./components/viewUpdateGAPost";
import AddBlogGA from "./components/addBlogGA";
import DisplayGABlogs from "./components/displayGABlogs";
import UpdateGABlogs from "./components/updateGABlogs";

import ArubaPics from "./routes/Aruba/arubaPics";
import AddPicsAruba from "./components/addPicsAruba";
import ViewUpdateArubaPost from "./components/viewUpdateArubaPost";
import AddBlogAruba from "./components/addBlogAruba";
import DisplayArubaBlogs from "./components/displayArubaBlogs";
import UpdateArubaBlogs from "./components/updateArubaBlogs";

function App() {
  return (
    <Router>
      <div
      // className="h-[2000px]  bg-contain repeat-y bg-center"
      // style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />

          <Route path="/stLuciaPics" element={<StLuciaPics />} />
          <Route path="/grandAntiguaPics" element={<GrandAntiguaPics />} />
          <Route path="/arubaPics" element={<ArubaPics />} />

          <Route path="/addPicsStLucia" element={<AddPicsStLucia />} />
          <Route
            path="/addPicsGrandAntigua"
            element={<AddPicsGrandAntigua />}
          />
          <Route path="/addPicsAruba" element={<AddPicsAruba />} />

          <Route path="/addBlogSL/:postId" element={<AddBlogSL />} />
          <Route path="/addBlogGA/:postId" element={<AddBlogGA />} />
          <Route path="/addBlogAruba/:postId" element={<AddBlogAruba />} />

          <Route
            path="/viewUpdateSLPost/:postId"
            element={<ViewUpdateSLPost />}
          />
          <Route
            path="/viewUpdateGAPost/:postId"
            element={<ViewUpdateGAPost />}
          />
          <Route
            path="/viewUpdateArubaPost/:postId"
            element={<ViewUpdateArubaPost />}
          />

          <Route path="/displaySLBlogs/:postId" element={<DisplaySLBlogs />} />
          <Route path="/displayGABlogs/:postId" element={<DisplayGABlogs />} />
          <Route
            path="/displayArubaBlogs/:postId"
            element={<DisplayArubaBlogs />}
          />

          <Route
            path="/updateSLBlogs/:postId/:itemId"
            element={<UpdateSLBlogs />}
          />
          <Route
            path="/updateGABlogs/:postId/:itemId"
            element={<UpdateGABlogs />}
          />
          <Route
            path="/updateArubaBlogs/:postId/:itemId"
            element={<UpdateArubaBlogs />}
          />

          <Route path="/viewUpdateGAPost/:id" element={<ViewUpdateGAPost />} />

          <Route
            path="/viewUpdateArubaPost/:id"
            element={<ViewUpdateArubaPost />}
          />

          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
