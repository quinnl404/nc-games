import { ReactComponent as CommentIcon } from "../icons/comment.svg";
import { ReactComponent as VotesIcon } from "../icons/votes.svg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const PostInfo = ({ created_at, votes, comment_count }) => {
  return (
    <span className="flex flex-row gap-2 w-full justify-end items-center mr-3 font-extralight text-xs">
      <p className="text-xs font-extralight">
        {dayjs(created_at).format("D MMM YYYY")}
      </p>
      <span className="flex flex-row items-center gap-1">
        <p>{`${votes}`}</p>
        <VotesIcon className="w-4 mb-[3px] fill-stone-700 stroke-transparent" />
      </span>
      {comment_count !== undefined && (
        <span className="flex flex-row items-center gap-1">
          <p>{`${comment_count}`}</p>
          <CommentIcon className="w-4 fill-stone-700 stroke-transparent pt-[1px]" />
        </span>
      )}
    </span>
  );
};

export default PostInfo;
