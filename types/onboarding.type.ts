export type CoachOnboardingStepOne = {
  phone: string;
  avatar_url?: string;
  date_of_birth: string;
  address_line: string;
  town: string;
  postcode: string;
  lat: number;
  lng: number;
};

export type CoachOnboardingStepTwo = {
  bio: string;
  lta_number: string;
  lta_level: number;
  years_experience: number;
};

export type CoachOnboardingStepThree = {
  specialties: string[];
  languages: string[];
  price_per_hour: number;
  price_group_per_hour: number;
  service_radius_miles: number;
  accepting_bookings: boolean;
};

export type CoachOnboardingStepFour = {
  availability: CoachAvailabilityEntry[];
  venue_ids: string[];
  custom_venues?: CoachCustomVenue[];
};

export type CoachAvailabilityEntry = {
  day_of_week:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  start_time: string; // "HH:MM"
  end_time: string; // "HH:MM"
};

export type CoachCustomVenue = {
  venue_name: string;
  address_line: string;
  town: string;
  postcode: string;
  lat: number;
  lng: number;
};

export type CoachStepFourPayload = {
  availability: CoachAvailabilityEntry[];
  venue_ids: string[];
  custom_venues?: CoachCustomVenue[];
};
