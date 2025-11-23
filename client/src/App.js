import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Footer from "./component/Footer";
import { useState } from "react";

function App() {
  const [headerPageName, setHeaderPageName] = useState("home");
  return (
    <>
      <BrowserRouter>
        <Header headerPageName={headerPageName} />
        <Routes>
          <Route
            path="/"
            element={<Home setHeaderPageName={setHeaderPageName} />}
          />
          <Route
            path="/post/:id"
            element={<Post setHeaderPageName={setHeaderPageName} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
