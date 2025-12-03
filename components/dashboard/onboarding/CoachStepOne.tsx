"use client";

import CustomInput from "@/components/shared/form/CustomInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUploadStepOne } from "@/hooks/onboarding/useUploadStepOne";
import { lookupPostcode } from "@/lib/location";
import { coachStepOneSchema } from "@/schemas/onboarding.schema";
import { CoachOnboardingStepOne } from "@/types/onboarding.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function CoachStepOne({
  firstname,
  lastname,
}: {
  firstname: string;
  lastname: string;
}) {
  const updateStepOne = useUploadStepOne();
  const { register, handleSubmit, watch, setValue, clearErrors, setError } =
    useForm<CoachOnboardingStepOne>({
      resolver: zodResolver(coachStepOneSchema),
    });

  const handlePostcodeLookup = async () => {
    const rawPostcode = watch("postcode");

    try {
      clearErrors("postcode");

      const result = await lookupPostcode(rawPostcode);

      setValue("lat", result.lat);
      setValue("lng", result.lng);
      setValue("postcode", result.postcode);
    } catch (err: unknown) {
      setError("postcode", {
        type: "manual",
        message: (err as Error).message,
      });
    }
  };

  const onSubmit = async (data: CoachOnboardingStepOne) => {
    await updateStepOne.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <span className="col-span-2 text-sm font-semibold text-slate-100 bg-orange-400 rounded p-2">
          You cannot edit your name during onboarding.
        </span>
        <div>
          <Label>Firstname</Label>
          <Input
            readOnly
            value={firstname}
            className="font-semibold text-emerald-700"
          />
        </div>
        <div>
          <Label>Lastname</Label>
          <Input
            readOnly
            value={lastname}
            className="font-semibold text-emerald-700"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          label="Phone Number"
          name="phone"
          register={register}
          type="text"
        />
        <CustomInput
          label="Date of Birth"
          name="date_of_birth"
          register={register}
          type="date"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          label="Address Line 1"
          name="address_line"
          register={register}
          type="text"
        />
        <CustomInput
          label="Town/City"
          name="town"
          register={register}
          type="text"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CustomInput
          label="Postcode"
          name="postcode"
          register={register}
          type="text"
          onBlur={handlePostcodeLookup}
        />
        <CustomInput
          label="Latitude"
          name="lat"
          register={register}
          type="number"
          step="any"
        />
        <CustomInput
          label="Longitude"
          name="lng"
          register={register}
          type="number"
          step="any"
        />
      </div>
      <div className="flex justify-end mt-auto">
        <Button
          type="submit"
          className="bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Save Step One
        </Button>
      </div>
    </form>
  );
}
