import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PostInfo from "../PostInfo";
dayjs.extend(relativeTime);

const ReviewCard = ({ review }) => {
  const getReviewTextPreview = () => {
    const firstSentenceOfReview =
      review.review_body.match(/^.*?[\.!\?](?:\s|$)/)[0];
    if (firstSentenceOfReview.split(" ").length > 20) {
      return firstSentenceOfReview.slice(0, firstSentenceOfReview.length - 2);
    } else {
      const firstTwentyWords = review.review_body
        .split(" ")
        .slice(0, 20)
        .join(" ");
      return firstTwentyWords.slice(0, firstTwentyWords.length - 1);
    }
  };

  return (
    <div className="bg-stone-300 group drop-shadow-md rounded-sm hover:drop-shadow-2xl hover:shadow-2xl hover:shadow-stone-600 flex flex-col justify-items-center  mb-2 w-full xl:w-5/6">
      <Link className="" to={`/reviews/${review.review_id}`}>
        <span className="flex flex-row self-start pr-1 pl-1 items-baseline gap-1 justify-between w-full">
          <h2 className="group-hover:font-semibold">{review.title}</h2>
          <p>
            <i className="font-thin">{review.category}</i>
          </p>
        </span>
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center flex-wrap">
            <img
              alt="Board game"
              className="p-1 rounded-[6px]"
              src={review.review_img_url}
            />
            <div className="pl-2 pr-2">
              <p className="self-start text-xl ml-1">{review.owner}</p>
              <p className="font-thin text-xl ml-2 mb-1 self-auto">
                <i>{`${getReviewTextPreview()}...`}</i>
              </p>
              <PostInfo
                created_at={review.created_at}
                comment_count={review.comment_count}
                initialVotes={review.votes}
                postData={{ type: "review", id: review.review_id }}
                voteable={false}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ReviewCard;
