import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../api";
import Comment from "../Comments/Comment";
import CommentBox from "../Comments/CommentBox";
import PostInfo from "../PostInfo";

const SingleReviewPage = () => {
  const [commentCount, setCommentCount] = useState(0);

  const [isReviewLoading, setIsReviewLoading] = useState(true);
  const [review, setReview] = useState([]);

  const [areCommentsLoading, setAreCommentsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { review_id } = useParams();

  useEffect(() => {
    api.fetchSingleReview(review_id).then((review) => {
      setReview(review);
      setCommentCount(review.comment_count);
      setIsReviewLoading(false);
    });
    api.fetchComments(review_id).then((comments) => {
      setComments(comments);
      setAreCommentsLoading(false);
    });
  }, []);

  return (
    <article className="h-max flex flex-col items-center columns-1 bg-stone-500 gap-5 mt-5">
      <h2 className="justify-self-start">Review</h2>
      {!isReviewLoading && (
        <div className="w-96 bg-stone-300  drop-shadow-md rounded-sm  flex flex-col justify-items-center items-center ">
          <span className="flex flex-row self-start ml-1 items-baseline gap-1">
            <h2 className="text-xs">{review.title}</h2>
            <p>
              <i className="text-[10px] font-thin">{review.category}</i>
            </p>
          </span>
          <img className="w-96 p-1 rounded-[6px]" src={review.review_img_url} />
          <p className="text-xs self-start ml-1">{review.owner}</p>
          <p className="text-sm font-light self-start ml-2 mb-1 pl-1">
            {review.review_body}
          </p>
          <PostInfo
            comment_count={commentCount}
            created_at={review.created_at}
            initialVotes={review.votes}
            postData={{ type: "review", id: review.review_id }}
            voteable={true}
          />
        </div>
      )}
      <h2 className="justify-self-start">Comments</h2>
      {!!isReviewLoading && (
        <div className="w-96 h-96 bg-stone-300 group drop-shadow-md rounded-sm hover:drop-shadow-2xl hover:shadow-2xl hover:shadow-stone-600 flex flex-col justify-items-center items-center"></div>
      )}
      <CommentBox
        setComments={setComments}
        setCommentCount={setCommentCount}
        reviewId={review_id}
      />
      {!areCommentsLoading && (
        <section className="h-max flex flex-col items-center columns-1 gap-3  justify-items-center">
          {comments.map((comment) => {
            return <Comment key={comment.comment_id} comment={comment} />;
          })}
        </section>
      )}
      {!!areCommentsLoading && (
        <section className="h-max flex flex-col items-center columns-1 bg-stone-500 gap-5">
          {new Array(review.comment_count).fill(1).map((_, index) => {
            return (
              <div
                key={index}
                className="w-96 h-40 bg-stone-300 drop-shadow-md rounded-sm"
              />
            );
          })}
        </section>
      )}
    </article>
  );
};

export default SingleReviewPage;
