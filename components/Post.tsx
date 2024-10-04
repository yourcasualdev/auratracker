import { createClient } from "@/utils/supabase/client";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import React from "react";
import AuraBadge from "./aura-badge";

interface PostProps {
  id: string;
  source: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  target: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  title: string;
  description: string;
  timestamp: string;
  amount: number;
}

const Post: React.FC<PostProps> = async ({
  source,
  target,
  title,
  description,
  timestamp,
  amount,
}) => {
  const supabase = createClient();

  const { data: sourceImage } = await supabase.storage
    .from("profile_images")
    .createSignedUrl(`/public/profile-image-${source.id}.jpg`, 60);

  const { data: targetImage } = await supabase.storage
    .from("profile_images")
    .createSignedUrl(`/public/profile-image-${target.id}.jpg`, 60);

  return (
    <div className="border p-4 rounded-lg shadow-md max-w-md mx-auto my-4">
      <div className="flex flex-row gap-2 items-center">
        <div className="flex items-center mb-2">
          <div className="flex-shrink-0">
            <img
              className="h-8 w-8 rounded-full"
              src={sourceImage?.signedUrl || source.avatar}
              alt={`${source.username}'s avatar`}
            />
          </div>
          <div className="ml-3 w-24 overflow-hidden">
            <p className="font-bold text-xs truncate">{source.name}</p>
            <p className="text-gray-500 text-xs truncate">{`@${source.username}`}</p>
          </div>
        </div>
        <ArrowRightIcon className="w-4 h-4" />
        <div className="flex items-center mb-2">
          <div className="flex-shrink-0">
            <img
              className="h-8 w-8 rounded-full"
              src={targetImage?.signedUrl || target.avatar}
              alt={`${target.username}'s avatar`}
            />
          </div>
          <div className="ml-3 w-24 overflow-hidden">
            <p className="font-bold text-xs truncate">{target.name}</p>
            <p className="text-gray-500 text-xs truncate">{`@${target.username}`}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-start">
        <p className="mb-2 font-bold text-md">{title}</p>
        <AuraBadge aura={amount} />
      </div>
      <p className="mb-2 tracking-tight">{description}</p>
      <p className="text-gray-400 text-sm">
        {new Date(timestamp).toLocaleDateString()}
      </p>
    </div>
  );
};

export default Post;
