import { Badge, Button, Chip } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { Typography, Avatar } from "@mui/material";

import { createContext, useContext } from "react";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const ReviewContext = createContext(null);

export const useReviewContext = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("ProductCard.* component must be a child of ProductCard");
  }
  return context;
};

const ReviewCard = ({ review, children, avatar }) => {
  return (
    <ReviewContext.Provider value={{ review, avatar }}>
      <div className="flex w-1/2 flex-col p-1 bg-stone-300">{children}</div>
    </ReviewContext.Provider>
  );
};

const Header = ({ children }) => {
  return <span className="flex justify-between">{children}</span>;
};

const Title = () => {
  const { review } = useReviewContext();
  return <Typography variant="body1">{review.title}</Typography>;
};

const Category = () => {
  const { review } = useReviewContext();
  return (
    <Typography variant="body1">
      <i>{review.category}</i>
    </Typography>
  );
};

const Image = () => {
  const { review } = useReviewContext();
  return (
    <img className="" alt="Reviewed board game" src={review.review_img_url} />
  );
};

const MetaData = ({ children }) => {
  return <span className="flex gap-3">{children}</span>;
};

const Footer = ({ children }) => {
  return (
    <span className="flex flex-wrap justify-center gap-5 items-end">
      {children}
    </span>
  );
};

const Designer = () => {
  const { review } = useReviewContext();
  return (
    <p>
      <i>{review.designer}</i>
    </p>
  );
};

const CreatedAt = () => {
  const { review } = useReviewContext();
  return (
    <Typography variant="body1">
      {dayjs(review.created_at).format("D MMM YYYY")}
    </Typography>
  );
};

const LikeCount = () => {
  const { review } = useReviewContext();
  return (
    <Badge badgeContent={review.votes} color="secondary">
      <ThumbUpIcon color="primary" />
    </Badge>
  );
};

const CommentCount = () => {
  const { review } = useReviewContext();
  return (
    <Badge badgeContent={review.comment_count} color="secondary">
      <CommentIcon color="primary" />
    </Badge>
  );
};

const OpenButton = () => {
  const { review } = useReviewContext();
  return (
    <Link to={`reviews/${review.review_id}`} className="flex justify-center">
      <Button>Open Review</Button>
    </Link>
  );
};

const Info = ({ children }) => {
  return <span>{children}</span>;
};

const Author = () => {
  const { review, avatar } = useReviewContext();
  return <Chip icon={<Avatar src={avatar} />} label={review.owner} />;
};

const Body = () => {
  const { review } = useReviewContext();
  return <Typography variant="body2">{review.review_body}</Typography>;
};

ReviewCard.Header = Header;
ReviewCard.Title = Title;
ReviewCard.Category = Category;
ReviewCard.Image = Image;
ReviewCard.MetaData = MetaData;
ReviewCard.Footer = Footer;
ReviewCard.Designer = Designer;
ReviewCard.CreatedAt = CreatedAt;
ReviewCard.LikeCount = LikeCount;
ReviewCard.CommentCount = CommentCount;
ReviewCard.OpenButton = OpenButton;
ReviewCard.Info = Info;
ReviewCard.Author = Author;
ReviewCard.Body = Body;

export default ReviewCard;
