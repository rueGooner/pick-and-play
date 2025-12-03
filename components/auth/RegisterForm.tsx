"use client";

import { Label } from "@radix-ui/react-label";
import { Separator } from "@radix-ui/react-select";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import CustomInput from "../shared/form/CustomInput";
import {
  profileRegistrationSchema,
  RegisterSchema,
} from "@/schemas/auth/registration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import {
  FieldSet,
  FieldLegend,
  FieldDescription,
  FieldLabel,
  Field,
  FieldContent,
  FieldTitle,
  FieldError,
} from "../ui/field";
import { roles } from "@/lib/roles";
import { Button } from "../ui/button";
import { useRegistration } from "@/hooks/auth/useRegistration";
import { generateRegistrationPayload } from "@/lib/mocks/registration.seeder";

export default function RegisterForm() {
  const profileCreation = useRegistration();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(profileRegistrationSchema),
    defaultValues: {
      role: "player",
    },
  });

  const onSubmit = async (data: RegisterSchema) => {
    await profileCreation.mutateAsync(data);
    reset();
  };

  const onFailedSubmit = (
    errors: FieldErrors<{
      email: string;
      firstname: string;
      lastname: string;
      phone: string;
      password: string;
      confirmPassword: string;
    }>
  ) => {
    console.log("Failed submission errors:", errors);
  };

  const fillWithFakeUser = () => reset(generateRegistrationPayload());

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onFailedSubmit)}
      className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md border border-emerald-100 max-w-2xl"
    >
      <h1 className="text-2xl font-semibold text-center text-slate-600">
        Registration
        <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-emerald-500 to-teal-400 mx-auto rounded-full"></div>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          name="firstname"
          label="First Name"
          register={register}
          error={errors.firstname?.message}
        />
        <CustomInput
          name="lastname"
          label="Last Name"
          register={register}
          error={errors.lastname?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          name="email"
          label="Email Address"
          register={register}
          error={errors.email?.message}
        />
        <CustomInput
          name="phone"
          label="Phone Number"
          register={register}
          error={errors.phone?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          name="password"
          label="Password"
          register={register}
          type="password"
          error={errors.password?.message}
        />
        <CustomInput
          name="confirmPassword"
          label="Confirm Password"
          register={register}
          type="password"
          error={errors.confirmPassword?.message}
        />
      </div>
      <Separator />
      <div className="grid">
        <Label className="mb-4 text-emerald-600 text-lg">Registering as</Label>
        <Controller
          name="role"
          control={control}
          render={({ field, fieldState }) => (
            <FieldSet>
              <FieldLegend>Registering as</FieldLegend>
              <FieldDescription>
                You must register as one role.
              </FieldDescription>
              <RadioGroup
                name={field.name}
                onValueChange={field.onChange}
                value={field.value}
              >
                {roles.map((role) => (
                  <FieldLabel
                    key={role.value}
                    htmlFor={`role-${role.value}`}
                    className="flex items-center space-x-3 mb-2 border-emerald-200 cursor-pointer transition has-[button[data-state=checked]]:bg-emerald-50 hover:bg-emerald-50"
                  >
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <FieldTitle>{role.label}</FieldTitle>
                        <FieldDescription>{role.description}</FieldDescription>
                      </FieldContent>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          defaultValue="player"
                          key={role.value}
                          value={role.value}
                          id={`role-${role.value}`}
                          className="mr-4"
                          aria-invalid={fieldState.invalid}
                        />
                      </div>
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
              {fieldState.invalid && (
                <FieldError
                  className="text-xs ml-auto text-red-600"
                  errors={[fieldState.error]}
                />
              )}
            </FieldSet>
          )}
        />
      </div>

      <div className="flex gap-2 mt-2 flex justify-end items-center">
        <Button
          type="button"
          className="bg-cyan-400"
          onClick={fillWithFakeUser}
        >
          Generate Form Data
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-emerald-600 text-white hover:bg-emerald-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Creating profile..." : "Sign Up"}
        </Button>
      </div>
    </form>
  );
}
