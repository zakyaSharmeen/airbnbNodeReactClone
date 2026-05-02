import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import ListingContext from "./context/ListingContext.jsx";
import ListingPage1 from "./pages/ListingPage1.jsx";
import ListingPage2 from "./pages/ListingPage2.jsx";
import ListingPage3 from "./pages/ListingPage3.jsx";
import { userDataContext } from "./context/UserContext.jsx";

function App() {
  let { userData } = useContext(userDataContext);
  return (
    <div>
      {/* <h1 class="text-red-500 font-bold underline">Hello world!</h1> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/listingpage1"
          element={
            userData != null ? (
              <ListingPage1 />
            ) : (
              <Navigate to={"/login"}></Navigate>
            )
          }
        />
        <Route
          path="/listingpage2"
          element={
            userData != null ? (
              <ListingPage2 />
            ) : (
              <Navigate to={"/login"}></Navigate>
            )
          }
        />
        <Route
          path="/listingpage3"
          element={
            userData != null ? (
              <ListingPage3 />
            ) : (
              <Navigate to={"/login"}></Navigate>
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
