import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/Typography";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import React from "react";

const User = async ({ params }: { params: { username: string } }) => {
  const { username } = params;

  const supabase = createClient();

  // get user by id
  const { data: user } = await supabase
    .from("profiles")
    .select()
    .eq("username", username)
    .single();

  const { data: image } = await supabase.storage
    .from("profile_images")
    .createSignedUrl(`/public/profile-image-${user?.id}.jpg`, 60);

  return (
    <div className="container">
      <div className="flex items-start space-x-4 justify-start h-40 px-8 w-full ">
        <div className="flex flex-row gap-6 h-full justify-start w-full">
          <Avatar className="w-40 h-40">
            <Image
              src={image?.signedUrl!}
              alt={
                "Profile image of " + user?.first_name + " " + user?.last_name
              }
              width={160}
              height={160}
            />
            <AvatarFallback>
              {user?.first_name?.[0]?.toUpperCase()! +
                user?.last_name?.[0]?.toUpperCase()!}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col h-32 pt-16 gap-5 w-full">
            <div className="flex flex-row h-16 gap-4 justify-between">
              <div>
                <Typography variant="Bold" size="display-sm">
                  {user?.first_name} {user?.last_name}
                </Typography>
                <Typography
                  variant="Bold"
                  size="text-sm"
                  className="text-muted-foreground"
                >
                  @{user?.username}
                </Typography>
              </div>
              <div>
                <Button size="sm" variant="default">
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
