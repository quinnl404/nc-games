import PostInfo from "./PostInfo";

const Comment = ({ comment }) => {
  return (
    <div className="flex flex-col w-96 bg-stone-300 drop-shadow-md rounded-sm">
      <p className="text-xs self-start ml-1 mt-1">{comment.author}</p>
      <p className="text-sm font-light self-start ml-2 mb-1">{comment.body}</p>
      <span className="mr-2">
        <PostInfo created_at={comment.created_at} votes={comment.votes} />
      </span>
    </div>
  );
};

export default Comment;
