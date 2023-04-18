import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../api";
import { ReactComponent as CommentIcon } from "../../icons/comment.svg";
import { ReactComponent as VotesIcon } from "../../icons/votes.svg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const SingleReviewPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [review, setReview] = useState([]);
  const { review_id } = useParams();

  useEffect(() => {
    api.fetchSingleReview(review_id).then((review) => {
      setReview(review);
      setLoading(false);
    });
  }, []);

  return (
    <section className="h-max flex flex-col items-center columns-1 bg-stone-500 gap-5 mt-5">
      <h2 className="justify-self-start">Review</h2>
      {!isLoading && (
        <div className="w-96 bg-stone-300  drop-shadow-md rounded-sm  flex flex-col justify-items-center items-center ">
          <span className="flex flex-row self-start ml-1 items-baseline gap-1">
            <h2 className="text-xs ">{review.title}</h2>
            <p>
              <i className="text-[10px] font-thin">{review.category}</i>
            </p>
          </span>
          <img className="w-96 p-1 rounded-[6px]" src={review.review_img_url} />
          <p className="text-xs self-start ml-1">{review.owner}</p>
          <p className="text-sm font-light self-start ml-2 mb-1">
            {review.review_body}
          </p>
          <span className="flex flex-row gap-2 w-full justify-end items-center mr-2 font-extralight text-xs">
            <p className="text-xs font-extralight">
              {dayjs(review.created_at).format("D MMM YYYY")}
            </p>
            <span className="flex flex-row items-center gap-1">
              <p>{`${review.votes}`}</p>
              <VotesIcon className="w-4 mb-[3px] fill-stone-700 stroke-stone-900" />
            </span>
            <span className="flex flex-row items-center gap-1">
              <p>{`${review.comment_count}`}</p>
              <CommentIcon className="w-4 fill-stone-700 stroke-stone-900" />
            </span>
          </span>
        </div>
      )}
      {!!isLoading && (
        <div className="w-96 h-96 bg-stone-300 group drop-shadow-md rounded-sm hover:drop-shadow-2xl hover:shadow-2xl hover:shadow-stone-600 flex flex-col justify-items-center items-center"></div>
      )}
    </section>
  );
};

export default SingleReviewPage;
