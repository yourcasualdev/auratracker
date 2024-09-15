"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface FollowButtonProps {
  userId: string;
  friendId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId, friendId }) => {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("friends")
        .select("*")
        .eq("user_id", userId)
        .eq("friend_id", friendId)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 is a code for "Row not found". Handle other errors only.
        toast.error("Something went wrong while fetching follow status!");
        return;
      }

      setIsFollowing(data !== null);
    };

    fetchFollowStatus();
  }, [userId, friendId]);

  const followFriend = async () => {
    const supabase = createClient();
    const { error } = await supabase.from("friends").insert({
      user_id: userId,
      friend_id: friendId,
    });
    if (error) {
      toast.error("Something went wrong while following!");
      return;
    }
    toast.success("Friend added!");
    setIsFollowing(true);
  };

  const unfollowFriend = async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from("friends")
      .delete()
      .match({ user_id: userId, friend_id: friendId });

    if (error) {
      toast.error("Something went wrong while unfollowing!");
      return;
    }
    toast.success("Friend removed!");
    setIsFollowing(false);
  };

  if (isFollowing === null) {
    return (
      <Button size="sm" variant="default" disabled>
        Loading...
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      variant="default"
      onClick={isFollowing ? unfollowFriend : followFriend}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
