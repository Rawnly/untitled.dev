import { Post } from "contentlayer/generated";
import format from "date-fns/format";
import React, { FC, PropsWithChildren } from "react";

interface IPostListItemProps {
  post: Post;
}

const PostListItem: FC<PropsWithChildren<IPostListItemProps>> = ({ post }) => {
  return (
    <li className="rounded flex items-center gap-4 justify-start hover:rx-bg-neutral-2 px-4 py-2">
      <div className="flex-1">
        <h3 className="text-xl mb-1 sm:text-2xl">{post.title}</h3>
        <p className="text-sm sm:text-base">{post.summary}</p>
      </div>
      <small className="md:hidden text-sm text-center opacity-50 min-w-[50px]">
        {format(new Date(post.date), "yyyy")} <br />
        {format(new Date(post.date), "dd MMM")}
      </small>
      <small className="ml-auto hidden md:block opacity-50">
        {format(new Date(post.date), "yyyy-MM-dd")}
      </small>
    </li>
  );
};

PostListItem.displayName = "PostListItem";

export default PostListItem;
