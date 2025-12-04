"use client";

import { useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CustomInput from "@/components/shared/form/CustomInput";
import { lookupPostcode } from "@/lib/location";
import { X } from "lucide-react";
import { CoachOnboardingStepFour } from "@/types/onboarding.type";
import { coachOnboardingStepFourSchema } from "@/schemas/onboarding.schema";
import { useVenueSearch } from "@/hooks/location/useVenueSearch";
import { CoachAvailabilityInput } from "@/types/coach.type";

const DAY_OPTIONS = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];

export default function CoachStepFour() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<CoachOnboardingStepFour>({
    resolver: zodResolver(coachOnboardingStepFourSchema),
    defaultValues: {
      availability: {},
      service_areas: [],
    },
  });

  const [activeDay, setActiveDay] =
    useState<CoachAvailabilityInput["day_of_week"]>("monday");

  const onSubmit = (data: CoachOnboardingStepFour) => {
    console.log("SUBMIT STEP 4:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      Availability
    </form>
  );
}
