import AuraBadge from "@/components/aura-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Typography from "@/components/ui/Typography";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import FollowButton from "./follow-button";

const User = async ({ params }: { params: { username: string } }) => {
  const { username } = params;

  const supabase = createClient();

  // get us
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // get user by id
  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("username", username)
    .single();

  const { data: image } = await supabase.storage
    .from("profile_images")
    .createSignedUrl(`/public/profile-image-${profile?.id}.jpg`, 60);

  const { data: events } = await supabase
    .from("aura_events")
    .select()
    .eq("user_id", profile?.id!)
    .order("created_at", { ascending: false });

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-start w-full ">
        <span className="w-full min-h-20 bg-gradient-to-r from-blue-500 to-purple-500"></span>
        <div className="flex flex-col justify-start w-full  px-4 h-44 -translate-y-8 border-b">
          <Avatar className="h-24 w-24">
            <Image
              src={image?.signedUrl!}
              alt={
                "Profile image of " +
                profile?.first_name +
                " " +
                profile?.last_name
              }
              width={96}
              height={96}
            />
            <AvatarFallback className="h-24 w-24">
              {profile?.first_name?.[0]?.toUpperCase()! +
                profile?.last_name?.[0]?.toUpperCase()!}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-row gap-4 justify-between">
              <div>
                <Typography variant="Bold" size="display-sm">
                  {profile?.first_name} {profile?.last_name}
                </Typography>
                <Typography
                  variant="Bold"
                  size="text-sm"
                  className="text-muted-foreground"
                >
                  @{profile?.username}
                </Typography>
              </div>
              <div>
                <FollowButton userId={user?.id!} friendId={profile?.id!} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollArea className="w-full -translate-y-8">
        <div className="flex flex-col gap-4">
          {events?.map((event) => (
            <div key={event.id} className="border-b p-4 relative">
              <Typography variant="Bold" size="text-xl">
                {event.title}
              </Typography>
              <Typography variant="Regular" size="text-sm" color="secondary">
                {event.description}
              </Typography>
              <AuraBadge
                aura={event.amount!}
                className="absolute right-4 top-4"
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default User;
