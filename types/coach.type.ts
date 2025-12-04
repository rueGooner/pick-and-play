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
