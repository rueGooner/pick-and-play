export type UpcomingBooking = {
  booking_id: string;
  player_id: string;
  session_id: string;

  booking_status:
    | "pending"
    | "confirmed"
    | "cancelled"
    | "completed"
    | "no_show"
    | "waitlisted";

  payment_status: "unpaid" | "paid" | "refunded" | "waived";
  booked_at: string;
  cancelled_at: string | null;

  session_date: string;
  session_name: string;
  start_time: string;
  end_time: string;
  location: string | null;
  session_status: "scheduled" | "cancelled" | "completed";

  max_players: number;
  program_id: string;
  program_title: string;
  category: string | null;
  skill_level: string | null;

  coach_id: string;
  coach_firstname: string;
  coach_lastname: string;

  start_ts: string;
}