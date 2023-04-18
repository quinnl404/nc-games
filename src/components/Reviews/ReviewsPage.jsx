import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import * as api from "../../api";

const ReviewsPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.fetchReviews().then((reviews) => {
      setReviews(reviews);
      setLoading(false);
    });
  }, []);

  return (
    <div className="h-max flex flex-col items-center columns-1 bg-stone-500 gap-5 mt-5">
      {!isLoading &&
        reviews.map((review, index) => {
          return <ReviewCard key={index} review={review} />;
        })}
      {!!isLoading &&
        new Array(10).fill(1).map(() => {
          return (
            <div className="w-96 h-[360px] bg-stone-300 drop-shadow-md rounded-sm"></div>
          );
        })}
    </div>
  );
};

export default ReviewsPage;
