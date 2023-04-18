import axios from "axios";

const api = axios.create({
  baseURL: "https://board-games-api-q1cq.onrender.com/api",
});

export const fetchReviews = () => {
  return api.get("/reviews").then((response) => {
    return response.data.reviews;
  });
};

export const fetchSingleReview = (reviewId) => {
  return api.get(`/reviews/${reviewId}`).then((response) => {
    return response.data.review;
  });
};

export const fetchComments = (reviewId) => {
  return api.get(`/reviews/${reviewId}/comments`).then((response) => {
    return response.data.comments;
  });
};
