import { ReactComponent as CommentIcon } from "../../icons/comment.svg";
import { ReactComponent as VotesIcon } from "../../icons/votes.svg";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PostInfo from "../PostInfo";
dayjs.extend(relativeTime);

const ReviewCard = ({ review }) => {
  const { review_body, comment_count, votes } = review;
  const getReviewTextPreview = () => {
    const firstSentenceOfReview = review_body.match(/^.*?[\.!\?](?:\s|$)/)[0];
    if (firstSentenceOfReview.split(" ").length > 20) {
      return firstSentenceOfReview.slice(0, firstSentenceOfReview.length - 2);
    } else {
      const firstTwentyWords = review_body.split(" ").slice(0, 20).join(" ");
      return firstTwentyWords.slice(0, firstTwentyWords.length - 1);
    }
  };

  return (
    <Link to={`/reviews/${review.review_id}`}>
      <div className="w-96 bg-stone-300 group drop-shadow-md rounded-sm hover:drop-shadow-2xl hover:shadow-2xl hover:shadow-stone-600 flex flex-col justify-items-center items-center ">
        <span className="flex flex-row self-start ml-1 items-baseline gap-1">
          <h2 className="text-xs group-hover:font-semibold">{review.title}</h2>
          <p>
            <i className="text-[10px] font-thin">{review.category}</i>
          </p>
        </span>
        <img className="w-96 p-1 rounded-[6px]" src={review.review_img_url} />
        <p className="text-xs self-start ml-1">{review.owner}</p>
        <p className="text-[10px] font-thin self-start ml-2 mb-1">
          <i>{`${getReviewTextPreview()}...`}</i>
        </p>
        <PostInfo
          created_at={review.created_at}
          comment_count={review.comment_count}
          votes={review.votes}
        />
      </div>
    </Link>
  );
};

export default ReviewCard;
