"use client";

import { useState } from "react";
import {
  useForm,
  FieldErrors,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";

import CustomInput from "@/components/shared/form/CustomInput";
import { PlusIcon, TrashIcon } from "lucide-react";
import { coachOnboardingStepFourSchema } from "@/schemas/onboarding.schema";
import { CoachAvailabilityInput } from "@/types/coach.type";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SelectField } from "@/components/shared/form/SelectField";
import { Separator } from "@/components/ui/separator";
import { BaseProfile } from "@/types/profiles.type";
import { useVenuesByRadius } from "@/hooks/location/useVenuesByRadius";
import { FieldLegend, FieldSet } from "@/components/ui/field";
import { VenueResponseItem } from "@/types/venues.type";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  CoachOnboardingStepFour,
  CoachStepFourPayload,
} from "@/types/onboarding.type";
import { useCompleteOnboardingSteps } from "@/hooks/onboarding/useOnboarding";

const DAY_OPTIONS = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];

export default function CoachStepFour({ profile }: { profile: BaseProfile }) {
  const { data: venues } = useVenuesByRadius(profile.postcode!);

  const onboardingComplete = useCompleteOnboardingSteps();

  const { register, handleSubmit, watch, control } =
    useForm<CoachOnboardingStepFour>({
      resolver: zodResolver(coachOnboardingStepFourSchema),
      defaultValues: {
        availability: [],
        venue_ids: [],
        custom_venues: [],
      },
    });

  const { append, remove } = useFieldArray({
    control,
    name: "availability",
  });

  const watchedAvailability = watch("availability");
  const [activeDay, setActiveDay] =
    useState<CoachAvailabilityInput["day_of_week"]>("monday");

  const grouped = (watchedAvailability ?? []).reduce((acc, item, index) => {
    (acc[item.day_of_week] ||= []).push({ item, index });
    return acc;
  }, {} as Record<string, { item: CoachAvailabilityInput; index: number }[]>);

  const onSubmit = async (data: CoachStepFourPayload) => {
    await onboardingComplete.mutateAsync(data);
  };

  const handleAddingAvailability = () => {
    const count = grouped[activeDay]?.length ?? 0;
    if (count >= 4) {
      toast.warning("You can add a maximum of 4 availability blocks per day.");
      return;
    }

    append({
      day_of_week: activeDay,
      start_time: "",
      end_time: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-6 min-h-[40vh]"
    >
      <Accordion type="single" collapsible defaultValue="availability">
        <AccordionItem value="availability">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Add your Coaching Availability</CardTitle>
                <CardAction>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddingAvailability}
                    disabled={(grouped[activeDay]?.length ?? 0) >= 4}
                    className="flex items-center gap-2"
                  >
                    <PlusIcon size={16} />
                    Add Availability
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <Tabs
                  defaultValue="monday"
                  onValueChange={(value) =>
                    setActiveDay(value as CoachAvailabilityInput["day_of_week"])
                  }
                >
                  <TabsList>
                    {DAY_OPTIONS.map(({ label, value }) => (
                      <TabsTrigger
                        key={value}
                        className="text-emerald-700"
                        value={value}
                      >
                        {label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {DAY_OPTIONS.map(({ label, value }) => (
                    <TabsContent
                      key={value}
                      value={value}
                      className="space-y-6 px-1 min-h-[30vh]"
                    >
                      {grouped[value]?.length ? (
                        grouped[value].map(({ item, index }) => (
                          <div
                            key={`${value}-${item.day_of_week}-${index}`}
                            className="border border-emerald-200 rounded-lg p-4 space-y-4 relative"
                          >
                            <div className="grid grid-cols-4 gap-4 items-end">
                              <SelectField
                                control={control}
                                label="Day"
                                options={DAY_OPTIONS}
                                name={`availability.${index}.day_of_week`}
                                disabled
                              />

                              <CustomInput
                                label="Start Time"
                                type="time"
                                name={`availability.${index}.start_time`}
                                register={register}
                              />

                              <CustomInput
                                label="End Time"
                                type="time"
                                name={`availability.${index}.end_time`}
                                register={register}
                              />
                            </div>
                            <Button
                              type="button"
                              variant="secondary"
                              className="w-8 h-8 absolute top-4 right-4 p-0 flex items-center justify-center text-red-100 bg-red-600 rounded-full"
                              onClick={() => remove(index)}
                            >
                              <TrashIcon size={18} />
                            </Button>
                            <Separator />
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No availability for {label}.
                        </p>
                      )}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="venues">
          <AccordionItem value="venues">
            <AccordionTrigger>Venues</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle>Choose a Tennis Club</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <Controller
                      name="venue_ids"
                      control={control}
                      render={({ field, fieldState }) => (
                        <FieldSet>
                          <FieldLegend>
                            Below are the nearest 5 tennis clubs within 10
                            miles.
                          </FieldLegend>
                          <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
                            {venues &&
                              venues.map((venue: VenueResponseItem) => {
                                const selected: string[] = field.value ?? [];
                                const checked = selected.includes(venue.id);
                                console.log(field.value);
                                return (
                                  <Label
                                    key={venue.id}
                                    className="flex items-center gap-3 p-2 border rounded-md hover:bg-slate-50 cursor-pointer hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                                  >
                                    <Checkbox
                                      id={venue.id}
                                      checked={checked}
                                      onCheckedChange={(isChecked) => {
                                        const updated = isChecked
                                          ? [...selected, venue.id]
                                          : selected.filter(
                                              (v) => v !== venue.id
                                            );

                                        field.onChange(updated);
                                      }}
                                    />

                                    <div className="flex flex-col">
                                      <span className="font-medium">
                                        {venue.venue_name}
                                      </span>
                                      {venue.town && (
                                        <span className="text-xs text-slate-600">
                                          {venue.town}
                                        </span>
                                      )}
                                    </div>
                                  </Label>
                                );
                              })}
                          </div>

                          {fieldState.error && (
                            <p className="text-red-600 text-sm">
                              {fieldState.error.message}
                            </p>
                          )}
                        </FieldSet>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </AccordionItem>
      </Accordion>
      <div className="flex justify-end mt-auto">
        <Button
          type="submit"
          className="bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Finish Onboarding
        </Button>
      </div>
    </form>
  );
}
