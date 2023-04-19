import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ReactComponent as UpVoteIcon } from "../icons/up_vote.svg";
import { ReactComponent as DownVoteIcon } from "../icons/down_vote.svg";
import { ReactComponent as CommentIcon } from "../icons/comment.svg";
import { useState, useRef } from "react";
import * as api from "../api";
import toast from "react-hot-toast";
dayjs.extend(relativeTime);

const VotingTray = ({ postData, votes, setVotes }) => {
  const [currentVote, setCurrentVote] = useState("neither");
  const previousVote = useRef("neither");
  const [isVoting, setIsVoting] = useState(false);

  const handleVoteClick = (voteType) => {
    setIsVoting(true);
    const isUnvoting = voteType === currentVote;
    const isSwappingMultiplier =
      currentVote !== "neither" && !isUnvoting ? 2 : 1;
    const baseIncrement = voteType === "down" ? -1 : 1;
    const voteIncrement = isUnvoting
      ? -baseIncrement
      : baseIncrement * isSwappingMultiplier;
    setVotes((currentVotes) => {
      return currentVotes + voteIncrement;
    });
    previousVote.current = currentVote;
    setCurrentVote(() => {
      if (isUnvoting) {
        return "neither";
      } else {
        return voteType;
      }
    });

    api
      .voteOnPost(postData, voteIncrement)
      .then((response) => {
        setIsVoting(false);
      })
      .catch((error) => {
        setVotes(votes);
        setCurrentVote(previousVote.current);
        setIsVoting(false);
        toast.error("Vote failed! Please try again later.");
      });
  };

  return (
    <>
      <button
        onClick={() => {
          handleVoteClick("up");
        }}
        disabled={isVoting}
      >
        <UpVoteIcon
          className={`w-4 ${
            currentVote === "up"
              ? isVoting
                ? "fill-green-900"
                : "fill-green-600"
              : "fill-stone-500"
          } ${
            currentVote !== "up" && !isVoting
              ? "hover:fill-green-700"
              : "hover:fill-green-900"
          } stroke-transparent pb-[4px]`}
        />
      </button>
      <p>{`${votes}`}</p>
      <button
        onClick={() => {
          handleVoteClick("down");
        }}
        disabled={isVoting}
      >
        <DownVoteIcon
          className={`w-4 ${
            currentVote === "down"
              ? !isVoting
                ? "fill-red-600"
                : "fill-red-900"
              : "fill-stone-500"
          } ${
            currentVote !== "down" && !isVoting
              ? "hover:fill-red-700"
              : "hover:fill-red-900"
          } stroke-transparent pt-[3px]`}
        />
      </button>
    </>
  );
};

const VoteDisplay = ({ votes }) => {
  return (
    <>
      <UpVoteIcon className="w-4 fill-stone-700 stroke-transparent" />
      <p>{`${votes}`}</p>
    </>
  );
};

const PostInfo = ({
  created_at,
  initialVotes,
  comment_count,
  postData,
  voteable,
}) => {
  const [votes, setVotes] = useState(initialVotes);
  return (
    <span className="flex flex-row gap-2 w-full justify-end items-center mr-3 font-extralight text-xs">
      <p className="text-xs font-extralight">
        {dayjs(created_at).format("D MMM YYYY")}
      </p>
      <span className="flex flex-row items-center gap-1">
        {voteable && (
          <VotingTray votes={votes} setVotes={setVotes} postData={postData} />
        )}
        {!voteable && <VoteDisplay votes={votes} />}
      </span>
      {comment_count !== undefined && (
        <span className="flex flex-row items-center gap-1">
          <p>{`${comment_count}`}</p>
          <CommentIcon className="w-4 fill-stone-700 stroke-transparent " />
        </span>
      )}
    </span>
  );
};

export default PostInfo;
