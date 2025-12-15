export type SessionsWithCounts = {
  session_id: string;
  session_name: string | null;

  program_id: string;
  program_type: "private_1_to_1" | "private_group" | "public_class";
  program_title: string;

  session_date: string;
  start_time: string;
  end_time: string;

  location: string | null;
  location_postcode: string | null;
  price_per_person_per_hour: number;
  location_status: "pending" | "confirmed";
  status: "draft" | "open" | "full" | "cancelled" | "completed";

  max_players: number;
  min_players_billed: number;

  notes: string | null;

  category: "adult" | "junior";
  skill_level: "beginner" | "intermediate" | "advanced" | null;

  coach_id: string;
  coach_firstname: string;
  coach_lastname: string;
  coach_email: string;

  booked_count: number;
  booking_count: number;
  spots_left: number;
  is_full: boolean;
  is_available: boolean;
}

export type NearbySession = {
  id: string;
  program_id: string | null;
  program_type: string;
  session_date: string;
  start_time: string;
  end_time: string;
  location: string | null;
  title: string;
  category: string | null;
  skill_level: string | null;
  coach_id: string | null;
  price: number | null;
  max_players: number | null;
  status: string | null;
  name: string | null;
  lat: number | null;
  lng: number | null;
  computed_distance: number | null;
}