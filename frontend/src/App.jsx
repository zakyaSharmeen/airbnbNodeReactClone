import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import ListingContext from "./context/ListingContext.jsx";
import ListingPage1 from "./pages/ListingPage1.jsx";
import ListingPage2 from "./pages/ListingPage2.jsx";

function App() {
  return (
    <div>
      {/* <h1 class="text-red-500 font-bold underline">Hello world!</h1> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/listingpage1" element={<ListingPage1 />} />
        <Route path="/listingpage2" element={<ListingPage2 />} />
      </Routes>
    </div>
  );
}

export default App;
