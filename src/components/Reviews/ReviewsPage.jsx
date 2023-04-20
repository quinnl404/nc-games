import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import toast from "react-hot-toast";
import * as api from "../../api";

const ReviewsPage = () => {
  // Loading states
  const [areReviewsLoading, setAreReviewsLoading] = useState(true);
  const [areSelectableCategoriesLoading, setAreSelectableCategoriesLoading] =
    useState(true);

  // Fetched state to display
  const [reviews, setReviews] = useState([]);
  const [selectableCategories, setSelectableCategories] = useState();
  const [searchParams, setSearchParams] = useSearchParams({
    order: "desc",
  });

  // References to step back to if an input fails
  const previousSearchParams = useRef();

  useEffect(() => {
    setAreReviewsLoading(true);
    api.fetchCategories().then((categories) => {
      setSelectableCategories(categories);
      setAreSelectableCategoriesLoading(false);
    });
    api
      .fetchReviews(searchParams)
      .then((reviews) => {
        setReviews(reviews);
        setAreReviewsLoading(false);
      })
      .catch((error) => {
        toast.error("Failed to load reviews, please try again later!");
        setSearchParams(previousSearchParams.current);
      });
  }, [searchParams, setSearchParams]);

  const handleChangeSearchParam = (param) => {
    previousSearchParams.current = searchParams;
    return (event) => {
      setSearchParams((currentSearchParams) => {
        const newParams = new URLSearchParams(currentSearchParams);
        if (!(param === "category" && event.target.value === "all")) {
          newParams.set(param, event.target.value);
          return newParams;
        }
        newParams.delete("category");
        return newParams;
      });
    };
  };

  return (
    <section className="h-max flex flex-col items-center columns-1 gap-5 mt-5">
      <div className="flex flex-col items-center gap-1">
        <h1>
          <b>{`${
            searchParams.has("category")
              ? searchParams
                  .get("category")
                  .replaceAll("-", " ")
                  .split(" ")
                  .map((word) => {
                    return word.slice(0, 1).toUpperCase() + word.slice(1);
                  })
                  .join(" ")
              : "All"
          } Reviews`}</b>
        </h1>
        <div className="flex flex-col items-end gap-1">
          <span className="flex gap-1">
            {!areSelectableCategoriesLoading && (
              <>
                <label htmlFor="review category">Choose a category:</label>
                <select
                  onChange={handleChangeSearchParam("category")}
                  value={searchParams.get("category")}
                  className="text-center"
                  name="review category"
                >
                  <option value="all">{"all"}</option>
                  {selectableCategories.map((category) => {
                    return (
                      <option key={category.slug} value={category.slug}>
                        {category.slug}
                      </option>
                    );
                  })}
                </select>
              </>
            )}
            {!!areSelectableCategoriesLoading && <p>Loading...</p>}
          </span>
          <span className="flex gap-1">
            <label htmlFor="order by">Order:</label>
            <select
              onChange={handleChangeSearchParam("order")}
              value={searchParams.get("order")}
              className="text-center"
              name="order by"
            >
              <option value="asc">{"ascending"}</option>
              <option value="desc">{"descending"}</option>
            </select>
          </span>
          <span className="flex gap-1">
            <label htmlFor="sort by">Sort By:</label>
            <select
              onChange={handleChangeSearchParam("sort_by")}
              value={searchParams.get("sort_by")}
              className="text-center"
              name="sort by"
            >
              <option value="comment_count">{"comments"}</option>
              <option value="created_at">{"time"}</option>
              <option value="votes">{"votes"}</option>
            </select>
          </span>
        </div>
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
