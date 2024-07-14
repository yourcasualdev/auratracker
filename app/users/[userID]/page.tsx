import { createClient } from "@/utils/supabase/server";
import React from "react";

const User = async ({ params }: { params: { userID: string } }) => {
  const { userID } = params;

  const supabase = createClient();
  console.log(userID);

  // get user by id
  const { data: user, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", userID)
    .single();

  return (
    <div className="container">
      {user?.id}
      {user?.first_name}
      {user?.last_name}
      {user?.amount_of_aura}
    </div>
  );
};

export default User;
