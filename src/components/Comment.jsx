import PostInfo from "./PostInfo";
import { useState } from "react";

const Comment = ({ comment, setComments, previousComments, comments }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className="flex flex-col w-96 bg-stone-300 drop-shadow-md rounded-sm">
      {!isDeleting && (
        <>
          <p className="text-xl self-start ml-1 mt-1">{comment.author}</p>
          <p className="text-xl font-light self-start ml-2 mb-1">
            {comment.body}
          </p>
          <span className="mr-2">
            <PostInfo
              author={comment.author}
              created_at={comment.created_at}
              initialVotes={comment.votes}
              cantDelete={comment?.cantDelete}
              postData={comment}
              setComments={setComments}
              previousComments={previousComments}
              setIsDeleting={setIsDeleting}
              comments={comments}
            />
          </span>
        </>
      )}
      {!!isDeleting && <div className="h-52">Deleting</div>}
    </div>
  );
};

export default Comment;
