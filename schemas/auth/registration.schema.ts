import { z } from "zod";

export const profileSchema = z.object({
  id: z.uuid().optional(),
  firstname: z.string(),
  lastname: z.string(),
  phone: z.string().nullable(),
  avatar_url: z.url().nullable(),
  date_of_birth: z.string().nullable(),
  role: z.enum(["player", "guardian", "coach", "admin"]),
  is_active: z.boolean(),
  address_line: z.string().nullable(),
  town: z.string().nullable(),
  postcode: z.string().nullable(),
  lat: z.number().optional(),
  lng: z.number().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const profileRegistrationSchema = z
  .object({
    email: z.email(),
    firstname: z.string().min(2, "First name must be at least 2 characters."),
    lastname: z.string().min(2, "Last name must be at least 2 characters."),
    role: z.enum(["player", "guardian", "coach"], "You must select one role."),
    phone: z.string().min(10, "Please enter a valid phone number."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z
      .string()
      .min(6, "Password confirmation must be at least 6 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export const createProfileSchema = profileSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  is_active: true,
});

export const updateProfileSchema = createProfileSchema.partial();

export type CreateProfile = z.infer<typeof createProfileSchema>;
