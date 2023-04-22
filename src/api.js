import axios from "axios";

const api = axios.create({
  baseURL: "https://board-games-api-q1cq.onrender.com/api",
});

export const fetchReviews = (params) => {
  return api
    .get(`/reviews`, {
      params,
    })
    .then((response) => {
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

export const voteOnPost = (postData, incrementBy) => {
  if (postData.type === "review") {
    return api
      .patch(`/reviews/${postData.id}`, { inc_votes: incrementBy })
      .then((response) => {
        return response.data.review.votes;
      });
  }
  // implement comment voting
};

export const postComment = (comment, reviewId) => {
  return api.post(`/reviews/${reviewId}/comments`, comment).then((response) => {
    return response.data.comment;
  });
};

export const fetchCategories = () => {
  return api.get("/categories").then((response) => {
    return response.data.categories;
  });
};

export const fetchUsers = () => {
  return api.get("/users").then((response) => {
    return response.data.users;
  });
};

export const deleteComment = (commentId) => {
  return api.delete(`/comments/${commentId}`).then((response) => {
    return response.status;
  });
};
