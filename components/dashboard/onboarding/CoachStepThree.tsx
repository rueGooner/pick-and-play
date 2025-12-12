"use client";

import CustomInput from "@/components/shared/form/CustomInput";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { useOnboardingCoachStepThree } from "@/hooks/onboarding/useOnboarding";
import { LANGUAGES, SPECIALTY_OPTIONS } from "@/lib/specialties";
import { coachStepThreeSchema } from "@/schemas/onboarding.schema";
import { CoachOnboardingStepThree } from "@/types/onboarding.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export default function CoachStepThree() {
  const updateStepThree = useOnboardingCoachStepThree();

  const { register, handleSubmit, watch, setValue, control } =
    useForm<CoachOnboardingStepThree>({
      resolver: zodResolver(coachStepThreeSchema),
      defaultValues: {
        specialties: [],
        languages: [],
        accepting_bookings: false,
      },
    });

  const onSubmit = async (data: CoachOnboardingStepThree) => {
    await updateStepThree.mutateAsync(data);
  };

  const specialties = watch("specialties");
  const languages = watch("languages");
  const values = watch();

  const toggleArrayValue = (
    key: "specialties" | "languages",
    value: string
  ) => {
    const arr = watch(key);
    if (arr.includes(value)) {
      setValue(
        key,
        arr.filter((v) => v !== value)
      );
    } else {
      setValue(key, [...arr, value]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-3 gap-4"></div>
      <div className="grid grid-cols-3 gap-4">
        <Label className="col-span-3 text-emerald-700 text-xl mb-2">
          Specialties
        </Label>
        {SPECIALTY_OPTIONS.map((option) => (
          <Toggle
            key={option}
            pressed={specialties.includes(option)}
            onPressedChange={() => toggleArrayValue("specialties", option)}
            className="px-3 py-1 rounded-full border border-emerald-500 data-[state=on]:bg-emerald-600 
                   data-[state=on]:text-white data-[state=on]:border-emerald-600 
                   text-emerald-700 hover:bg-emerald-50 font-light"
          >
            {option}
          </Toggle>
        ))}
      </div>
      <div className="grid gap-4">
        <Label className="col-span-3 text-emerald-700 text-xl mb-2">
          Languages
        </Label>
        {LANGUAGES.map((option) => (
          <Toggle
            key={option}
            pressed={languages.includes(option)}
            onPressedChange={() => toggleArrayValue("languages", option)}
            className="px-3 py-1 rounded-full border border-emerald-500 data-[state=on]:bg-emerald-600 
                   data-[state=on]:text-white data-[state=on]:border-emerald-600 
                   text-emerald-700 hover:bg-emerald-50 font-light"
          >
            {option}
          </Toggle>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <CustomInput
          label="Price Per Hour"
          name="price_per_hour"
          type="number"
          register={register}
        />
        <CustomInput
          label="Group Price Per Hour"
          name="price_group_per_hour"
          type="number"
          register={register}
        />
        <CustomInput
          label="Serive Radius (miles)"
          name="service_radius_miles"
          type="number"
          register={register}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Controller
          name="accepting_bookings"
          control={control}
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldLabel htmlFor="accepting_bookings">
                  Currently Accepting Bookings
                </FieldLabel>
                <FieldDescription>
                  Enable when you&apos;re accepting bookings or not.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldContent>
              <Switch
                id="accepting_bookings"
                name={field.name}
                checked={field.value ?? false}
                onCheckedChange={field.onChange}
                aria-invalid={fieldState.invalid}
              />
            </Field>
          )}
        />
      </div>

      <div className="flex justify-end mt-auto">
        <Button
          type="submit"
          className="bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Save Step Three
        </Button>
      </div>
    </form>
  );
}
