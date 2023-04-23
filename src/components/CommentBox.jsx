import { useState, useRef, useContext } from "react";
import { UserContext } from "../App";
import * as api from "../api";
import toast from "react-hot-toast";

const CommentBox = ({ setComments, setCommentCount, reviewId, comments }) => {
  const { user } = useContext(UserContext);
  const [inputText, setInputText] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const previousComments = useRef([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    previousComments.current = comments;
    setIsPosting(true);
    setInputText("");
    setCommentCount((currentCommentCount) => {
      return currentCommentCount + 1;
    });
    setComments((currentComments) => {
      previousComments.current = currentComments;
      const currentTime = Date.now();
      const newComment = {
        cantDelete: true,
        author: user,
        body: inputText,
        votes: 0,
        created_at: currentTime,
        comment_id: currentTime, //make a unique comment_id to satisfy react's unique key on children requirement, server will send the real comment_id when users get the comment for real
      };
      console.log([newComment, ...currentComments]);
      return [newComment, ...currentComments];
    });

    api
      .postComment({ username: user, body: inputText }, reviewId)
      .then((comment) => {
        setIsPosting(false);
        setComments((currentComments) => {
          console.log(comment);
          const [commentToReplace, ...comments] = currentComments;
          return [comment, ...comments];
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Comment posting failed! Please try again later.");
        setComments(previousComments.current);
        setCommentCount(previousComments.current.length);
      });
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-96 bg-stone-300 drop-shadow-md rounded-sm"
      >
        <textarea
          type="text"
          value={inputText}
          disabled={isPosting}
          onChange={(event) => {
            setInputText(event.target.value);
          }}
          className="m-3 h-24 rounded-sm text-sm font-light ml-2 mb-1"
        ></textarea>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-stone-400 rounded-sm w-fit m-3 mt-1"
            disabled={inputText === "" || isPosting}
          >
            <p className="m-1 font-thin">Comment!</p>
          </button>
        </div>
      </form>
    </section>
  );
};
export default CommentBox;
