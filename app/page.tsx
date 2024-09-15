import { createClient } from "@/utils/supabase/server";

export default async function Notes() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("profiles").select();

  return (
    <div>
      selam
      <div></div>
    </div>
  );
}
