"use client";

import AuraBadge from "@/components/aura-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Typography from "@/components/ui/Typography";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface SearchItemProps {
  profile: {
    amount_of_aura: number | null;
    first_name: string | null;
    id: string;
    last_name: string | null;
    username: string | null;
  };
}

const SearchItem: FC<SearchItemProps> = ({ profile }) => {
  const supabase = createClient();
  const [profileImage, setProfileImage] = React.useState<string | null>(null);

  const getProfileImage = async () => {
    const { data: image } = await supabase.storage
      .from("profile_images")
      .createSignedUrl(`/public/profile-image-${profile?.id}.jpg`, 60);

    if (image?.signedUrl) {
      setProfileImage(image.signedUrl);
    }
  };

  React.useEffect(() => {
    getProfileImage();
  }, [profile]);

  return (
    <div key={profile.id}>
      <Link href={`/users/${profile.username}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <Image
                src={profileImage || "/default-avatar.png"}
                alt={profile.first_name + " " + profile.last_name}
                width={40}
                height={40}
              />
              <AvatarFallback className="h-10 w-10">
                {profile.first_name?.[0]?.toUpperCase()! +
                  profile.last_name?.[0]?.toUpperCase()!}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <Typography variant="SemiBold" size="text-sm">
                {profile.first_name} {profile.last_name}
              </Typography>
              <Typography
                variant="SemiBold"
                size="text-sm"
                className="text-muted-foreground"
              >
                @{profile.username}
              </Typography>
            </div>
          </div>
          <div className="flex items-center">
            <AuraBadge aura={profile.amount_of_aura!} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchItem;
