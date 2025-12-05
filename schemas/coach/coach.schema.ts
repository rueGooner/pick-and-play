import z from "zod";

const availabilityEntrySchema = z.object({
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
});
const venueSelectionSchema = z.array(z.string().uuid());
const customVenueSchema = z.object({
  venue_name: z.string().min(2),
  address_line: z.string().min(2),
  town: z.string().min(2),
  postcode: z.string().min(3),
  lat: z.number(),
  lng: z.number(),
});

export const coachStepFourSchema = z.object({
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

  venue_ids: z.array(z.string().uuid()),

  custom_venues: z.array(
    z.object({
      venue_name: z.string().min(2),
      address_line: z.string().min(2),
      town: z.string().min(2),
      postcode: z.string().min(3),
      lat: z.number(),
      lng: z.number(),
    })
  ),
});
