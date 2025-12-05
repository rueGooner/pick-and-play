import { RegistrationRole } from "@/schemas/enums/roles.enum";

export type LoginFields = {
  email: string;
  password: string;
};

export type RegistrationFields = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role: RegistrationRole;
};
