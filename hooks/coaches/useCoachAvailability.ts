import { supabaseClient } from "@/lib/supabase/client";
import { CoachAvailability } from "@/types/coach.type";
import { useQuery } from "@tanstack/react-query";

export async function fetchCoachAvailability(): Promise<CoachAvailability[]> {
  const supabase = supabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("coach_availability")
    .select("*")
    .eq("coach_profile_id", user?.id);

  if (error) throw error;
  return data || [];
}

export function useCoachAvailability() {
  return useQuery({
    queryKey: ["coach-availability"],
    queryFn: fetchCoachAvailability,
  });
}
