export type BaseProfile = {
  role: "coach" | "player" | "admin";
  firstname: string;
  lastname: string;
  phone: string | null;
  avatar_url: string | null;
  date_of_birth: string | null;
  skill_level: number | null;
  address_line: string | null;
  town: string | null;
  postcode: string | null;
  lat: number | null;
  lng: number | null;
  is_active: boolean;
  onboarding_step: number;
};
