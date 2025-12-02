"use client";

import { supabaseClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../shared/form/CustomInput";
import { SelectField } from "../shared/form/SelectField";
import { TextAreaInput } from "../shared/form/TextAreaInput";

type ContactForm = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  consent: boolean;
};

export default function ContactFormSection() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const supabase = supabaseClient();

  const { register, handleSubmit, reset, control } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setServerError(null);
    setSent(false);

    const { error } = await supabase.from("contact_enquiries").insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      },
    ]);

    if (error) {
      console.error(error);
      setServerError("Something went wrong. Please try again later.");
    } else {
      setSent(true);
      reset();
    }
  };

  return (
    <div className="bg-gray-800">
      <div className="max-w-2xl mx-auto w-full p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full bg-white p-6 rounded  shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-center text-slate-600">
            Get in Contact
            <div className="mt-2 h-[2px] w-24 bg-gradient-to-r from-emerald-500 to-teal-400 mx-auto rounded-full"></div>
          </h2>

          <CustomInput name="name" label="Name" register={register} />
          <CustomInput
            name="email"
            label="Email"
            type="email"
            register={register}
          />
          <CustomInput
            name="phone"
            label="Phone (optional)"
            register={register}
          />

          <SelectField
            name="subject"
            label="Subject"
            control={control}
            options={[
              { label: "General Enquiry", value: "general" },
              { label: "Coaching", value: "coaching" },
              { label: "Membership", value: "membership" },
              { label: "Other", value: "other" },
            ]}
            placeholder="Select a subject"
          />

          <TextAreaInput name="message" label="Message" register={register} />

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              {...register("consent", { required: true })}
            />
            I consent to be contacted about my enquiry
          </label>

          {serverError && <p className="text-sm text-red-600">{serverError}</p>}
          {sent && (
            <p className="text-sm text-emerald-600">
              ✅ Enquiry sent! We’ll get back to you soon.
            </p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-4 rounded bg-emerald-600 text-white font-semibold py-2 px-8 cursor-pointer hover:bg-emerald-500 transition disabled:opacity-60"
            >
              Send enquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
