import Image from "next/image";

interface AuraEventCardProps {
  event: {
    id: string;
    created_at: string;
    aura_type: string;
    description: string;
    profiles: {
      id: string;
      username: string;
      avatar_url: string;
    };
  };
}

export default function AuraEventCard({ event }: AuraEventCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex items-center mb-2">
        <Image
          src={event.profiles.avatar_url || "/default-avatar.png"}
          alt={event.profiles.username}
          width={40}
          height={40}
          className="rounded-full mr-2"
        />
        <div>
          <h3 className="font-semibold">{event.profiles.username}</h3>
          <p className="text-sm text-gray-500">
            {new Date(event.created_at).toLocaleString()}
          </p>
        </div>
      </div>
      <p className="font-medium mb-2">Aura Type: {event.aura_type}</p>
      <p>{event.description}</p>
    </div>
  );
}
