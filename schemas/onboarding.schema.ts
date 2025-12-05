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

export const coachStepTwoSchema = z.object({
  bio: z
    .string()
    .min(20, "Please provide at least 20 characters.")
    .nonempty("Coach Biography is required"),

  lta_number: z.string().min(4, "LTA Number seems too short."),

  lta_level: z
    .number()
    .min(1, "Level must be between 1 and 5")
    .max(5, "Level must be between 1 and 5"),

  years_experience: z.number().min(0, "Years experience must be 0 or greater"),
});

export const coachStepThreeSchema = z.object({
  specialties: z.array(z.string()).min(1, "Select at least one specialty."),
  languages: z.array(z.string()).min(1, "Select at least one language."),
  price_per_hour: z.number(),
  price_group_per_hour: z.number(),
  service_radius_miles: z.number(),
  accepting_bookings: z.boolean(),
});

const timeRangeRegex = /^([01]\d|2[0-3]):[0-5]\d-([01]\d|2[0-3]):[0-5]\d$/;

const timeRangeSchema = z
  .string()
  .regex(timeRangeRegex, "Time must be in HH:MM-HH:MM format");

export const coachServiceAreaSchema = z.object({
  venue_name: z.string().min(2, "Venue name must be at least 2 characters"),
  address_line: z.string().min(2, "Address must be at least 2 characters"),
  town: z.string().min(2, "Town/City is required"),
  postcode: z.string().min(4, "Postcode is required"),
  lat: z.number().refine((v) => !isNaN(v), "Latitude must be a number"),
  lng: z.number().refine((v) => !isNaN(v), "Longitude must be a number"),
});

export const coachWeeklyAvailabilitySchema = z.object({
  monday: z.array(timeRangeSchema).optional(),
  tuesday: z.array(timeRangeSchema).optional(),
  wednesday: z.array(timeRangeSchema).optional(),
  thursday: z.array(timeRangeSchema).optional(),
  friday: z.array(timeRangeSchema).optional(),
  saturday: z.array(timeRangeSchema).optional(),
  sunday: z.array(timeRangeSchema).optional(),
});

export const coachOnboardingStepFourSchema = z.object({
  availability: z
    .array(
      z.object({
        day_of_week: z.enum([
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ]),
        start_time: z.string().min(1),
        end_time: z.string().min(1),
      })
    )
    .max(21),

  venue_ids: z.array(z.uuid()),

  custom_venues: z
    .array(
      z.object({
        venue_name: z.string().min(2),
        address_line: z.string().min(2),
        town: z.string().min(2),
        postcode: z.string().min(3),
        lat: z.number(),
        lng: z.number(),
      })
    )
    .default([]),
});
