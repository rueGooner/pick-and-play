import { z } from "zod";

export const coachStepOneSchema = z.object({
  phone: z
    .string()
    .min(11, "Phone number must be at least 11 digits.")
    .nonempty("Phone number is required"),

  date_of_birth: z.string().nonempty("Date of birth is required"),

  address_line: z
    .string()
    .min(3, "Address line is required")
    .nonempty("Address is required"),

  town: z
    .string()
    .min(2, "Town / City is required")
    .nonempty("Town / City is required"),

  postcode: z
    .string()
    .min(3, "Postcode is required")
    .nonempty("Postcode is required"),
  lat: z.number(),
  lng: z.number(),

  avatar_url: z.url().optional(),
});
