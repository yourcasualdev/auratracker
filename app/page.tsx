import { createClient } from "@/utils/supabase/server";
import AuraEventCard from "./AuraEventCard";
import Pagination from "./Pagination";
import Typography from "@/components/ui/Typography";
import AuraBadge from "@/components/aura-badge";
import { Separator } from "@/components/ui/separator";
import Post from "@/components/Post";

const ITEMS_PER_PAGE = 10;

export default async function Feed({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const supabase = createClient();
  const page = parseInt(searchParams.page) || 1;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  // Fetch user's friends
  const { data: friends } = await supabase
    .from("friends")
    .select("friend_id")
    .eq("user_id", userId!);

  const friendIds = friends?.map((f) => f.friend_id) || [];

  // Fetch aura events and join with profiles table
  const { data: auraEvents, error } = await supabase
    .from("aura_events")
    .select(
      `
      *,
      profiles:user_id (*),
      source_profiles:source_friend_id (*)
    `
    )
    .in("user_id", friendIds)
    .order("created_at", { ascending: false })
    .returns<
      {
        id: number;
        amount: number | null;
        created_at: string;
        description: string | null;
        title: string | null;
        user_id: string | null;
        source_friend_id: string | null;
        profiles: {
          id: string;
          username: string | null;
          first_name: string | null;
          last_name: string | null;
          avatar_url: string | null;
        } | null;
        source_profiles: {
          id: string;
          username: string | null;
          first_name: string | null;
          last_name: string | null;
          avatar_url: string | null;
        } | null;
      }[]
    >();

  if (error) {
    console.error("Error fetching aura events:", error);
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-1 mb-4">
        <h1 className="text-3xl font-bold">Feed</h1>
        <p className="text-gray-600">Find out what your friends are up to!</p>
      </div>
      {auraEvents && auraEvents.length > 0 ? (
        <div className="space-y-4">
          {auraEvents?.map((event) => (
            <>
              <Post
                id={String(event.id)}
                source={{
                  id: event.source_profiles?.id || "",
                  name: `${event.source_profiles?.first_name} ${event.source_profiles?.last_name}`,
                  username: event.source_profiles?.username || "",
                  avatar: event.source_profiles?.avatar_url || "",
                }}
                target={{
                  id: event.profiles?.id || "",
                  name: `${event.profiles?.first_name} ${event.profiles?.last_name}`,
                  username: event.profiles?.username || "",
                  avatar: event.profiles?.avatar_url || "",
                }}
                title={event.title || ""}
                description={event.description || ""}
                timestamp={event.created_at}
                amount={event.amount || 0}
              />
              <Separator />
            </>
          ))}
        </div>
      ) : (
        <p>No recent aura events from your friends.</p>
      )}
    </div>
  );
}
