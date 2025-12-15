import { getClientAuthenticatedUser } from "@/lib/client/authenticated-user";
import { SessionsWithCounts } from "@/types/session.type";
import { useQuery } from "@tanstack/react-query";


export async function fetchCoachUpcomingSessions(): Promise<SessionsWithCounts[]> {
    const { supabase, profile } = await getClientAuthenticatedUser();
    const today = new Date().toISOString().split("T")[0];

    if (!supabase) {
        return [];
    }

    const { data } = await supabase
        .from("sessions_with_counts")
        .select("*")
        .eq("coach_id", profile.id)
        .eq("status", "open")
        .gte("session_date", today)
        .order("session_date", { ascending: true })
        .order("start_time", { ascending: true })
        .limit(3);

        console.log('huh')

  return data ?? [];
}

export function useUpcomingCoachSessions() {
    return useQuery({
        queryKey: ['upcoming-sessions'],
        queryFn: () => fetchCoachUpcomingSessions()
    })
}