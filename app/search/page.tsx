"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import Typography from "@/components/ui/Typography";
import AuraBadge from "@/components/aura-badge";
import SearchItem from "./search-item";

const Search = () => {
  const supabase = createClient();

  const [profiles, setProfiles] = React.useState<
    {
      amount_of_aura: number | null;
      first_name: string | null;
      id: string;
      last_name: string | null;
      username: string | null;
    }[]
  >([]);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.trim();

    if (!searchTerm) {
      setProfiles([]); // Clear profiles if the search term is empty
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .or(
        `username.ilike.%${searchTerm}%,first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%`
      )
      .range(0, 9);

    if (error) {
      console.error("Error fetching profiles:", error);
      return;
    }
    setProfiles(data);
  };

  return (
    <div className="container mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="h-5 w-5 text-gray-500" />
        </div>
        <Input
          className="pl-10" // Adjust padding-left for the input
          placeholder="Search for a user..."
          onChange={handleSearch}
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {profiles.map((profile) => (
          <SearchItem profile={profile} />
        ))}
      </div>
    </div>
  );
};

export default Search;
