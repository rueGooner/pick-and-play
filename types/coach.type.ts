export interface CoachServiceArea {
  id: string;
  coach_id: string;
  venue_name: string;
  address: string;
  lat: number;
  lng: number;
  created_at: string;
}

export interface CoachAvailability {
  id: string;
  coach_profile_id: string;
  day_of_week:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  start_time: string;
  end_time: string;
  created_at: string;
}

export type CoachAvailabilityInput = Omit<
  CoachAvailability,
  "id" | "coach_profile_id" | "created_at"
>;

export type CoachProfile = {
  // From profiles
  id: string;
  role: "coach";
  firstname: string;
  lastname: string;
  phone: string | null;
  avatar_url: string | null;
  date_of_birth: string | null; // ISO date
  skill_level: "beginner" | "intermediate" | "improver" | "advanced" | null;
  address_line: string | null;
  town: string | null;
  postcode: string | null;
  lat: number | null;
  lng: number | null;
  profile_is_active: boolean;
  profile_created_at: string;
  profile_updated_at: string;

  // From coaches
  bio: string | null;
  lta_number: string | null;
  lta_level: 1 | 2 | 3 | 4 | 5 | null;
  years_experience: number;
  specialties: string[] | null;
  languages: string[] | null;
  price_per_hour: number | null;
  price_group_per_hour: number | null;
  star_rating: number;
  total_reviews: number;
  stripe_account_id: string | null;
  stripe_payouts_enabled: boolean;
  stripe_charges_enabled: boolean;
  accepting_bookings: boolean;
  is_onboarded: boolean;
  profile_complete: boolean;
  coach_is_active: boolean;
  service_radius_miles: number;
  coach_created_at: string;
  coach_updated_at: string;
};
