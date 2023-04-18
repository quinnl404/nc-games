import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import ReviewsPage from "./components/Reviews/ReviewsPage";
import SingleReviewPage from "./components/Reviews/SingleReviewPage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("tickle122");

  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<ReviewsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/reviews/:review_id" element={<SingleReviewPage />} />
      </Routes>
    </div>
  );
}

export default App;
