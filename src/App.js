import { useState, createContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import ReviewsPage from "./components/Reviews/ReviewsPage";
import SingleReviewPage from "./components/Reviews/SingleReviewPage";

export const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState("tickle122");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

function App() {
  return (
    <>
      <UserProvider>
        <Navbar />
        <br />
        <br />
        <Routes>
          <Route path="/" element={<ReviewsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/reviews/:review_id" element={<SingleReviewPage />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
