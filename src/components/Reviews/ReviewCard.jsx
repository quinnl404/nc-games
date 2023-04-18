import { ReactComponent as CommentIcon } from "../../icons/comment.svg";
import { ReactComponent as VotesIcon } from "../../icons/votes.svg";

const ReviewCard = ({ review }) => {
  const {
    title,
    category,
    review_img_url,
    owner,
    review_body,
    comment_count,
    votes,
    created_at,
  } = review;
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
    <button>
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
        <span className="flex flex-row gap-2 w-full justify-end mr-2 font-extralight text-xs">
          <span className="flex flex-row items-center gap-1">
            <p>{`${votes}`}</p>
            <VotesIcon className="w-4 mb-[3px] fill-stone-700 stroke-stone-900" />
          </span>
          <span className="flex flex-row items-center gap-1">
            <p>{`${comment_count}`}</p>
            <CommentIcon className="w-4 fill-stone-700 stroke-stone-900" />
          </span>
        </span>
      </div>
    </button>
  );
};

export default ReviewCard;
