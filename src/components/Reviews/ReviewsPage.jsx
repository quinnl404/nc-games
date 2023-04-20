import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import toast from "react-hot-toast";
import * as api from "../../api";

const ReviewsPage = () => {
  const [areReviewsLoading, setAreReviewsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [areCategoriesLoading, setAreCategoriesLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );
  const previousCategory = useRef("all");
  const previousReviews = useRef([]);
  const previousSearchParams = useRef();

  useEffect(() => {
    setAreReviewsLoading(true);
    const categoryParam =
      searchParams.get("category") !== "all"
        ? { category: searchParams.get("category") }
        : undefined;
    api
      .fetchReviews(categoryParam)
      .then((reviews) => {
        previousReviews.current = reviews;
        previousCategory.current = category;
        previousSearchParams.current = searchParams;
        setReviews(reviews);
        setAreReviewsLoading(false);
      })
      .catch((error) => {
        setCategory(previousCategory.current);
        setReviews(previousReviews.current);
        setSearchParams(previousSearchParams.current);
        toast.error("Changing category failed! Please try again later.");
      });
    api.fetchCategories().then((categories) => {
      setCategories(categories);
      setAreCategoriesLoading(false);
    });
  }, [searchParams, category, setSearchParams]);

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    setSearchParams((currentSearchParams) => {
      const newParams = new URLSearchParams(currentSearchParams);
      newParams.set("category", event.target.value);
      return newParams;
    });
  };

  return (
    <section className="h-max flex flex-col items-center columns-1 gap-5 mt-5">
      <div className="flex flex-col items-center gap-1">
        <h1>
          <b>{`${
            category.slice(0, 1).toUpperCase() + category.slice(1)
          } Reviews`}</b>
        </h1>
        <span className="flex gap-2">
          {!areCategoriesLoading && (
            <>
              <label htmlFor="review category">Choose a category:</label>
              <select
                onChange={handleChangeCategory}
                value={category}
                className="text-center"
                name="review category"
              >
                <option value="all">{"all"}</option>
                {categories.map((category) => {
                  return (
                    <option key={category.slug} value={category.slug}>
                      {category.slug}
                    </option>
                  );
                })}
              </select>
            </>
          )}
          {!!areCategoriesLoading && <p>Loading...</p>}
        </span>
      </div>

      {!areReviewsLoading &&
        reviews.map((review, index) => {
          return <ReviewCard key={index} review={review} />;
        })}
      {!!areReviewsLoading &&
        new Array(10).fill(1).map((_, index) => {
          return (
            <div
              key={index}
              className="w-96 h-[360px] drop-shadow-md rounded-sm bg-stone-300"
            ></div>
          );
        })}
    </section>
  );
};

export default ReviewsPage;
