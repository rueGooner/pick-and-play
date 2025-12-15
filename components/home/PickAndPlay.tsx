"use client";

import { BadgeInfo } from "lucide-react";
import Image from "next/image";
import BookingStepOne from "./pick-and-play/BookingStepOne";
import { usePickAndPlay } from "@/app/contexts/pick-and-play/pick-and-play.provider";
import BookingStepTwo from "./pick-and-play/BookingStepTwo";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const bookingTypeMap: Record<
  string,
  "private" | "adult-class" | "junior-class"
> = {
  private: "private",
  group: "adult-class",
  junior: "junior-class",
};

export default function PickAndPlaySection() {
  const router = useRouter();
  const { state, dispatch } = usePickAndPlay();

  const plans = [
    {
      title: "Private Lesson",
      planTitle: "private",
      price: "£50/hr",
      memberPrice: "£45/hr",
      description:
        "One-to-one coaching tailored to your goals. Great for rapid improvement and personal feedback.",
      features: [
        "Flexible scheduling",
        "Video analysis & technical feedback",
        "Goal-based training plans",
      ],
      highlight: true,
      image:
        "https://res.cloudinary.com/dofl9qbcd/image/upload/v1762890137/Ball_toss_th3jra.png",
      callToAction: {
        href: null,
        text: "Book a Session",
        step: 1,
        bookingName: "Book an Adult 1-2-1 Lesson",
      },
    },
    {
      title: "Adult Class",
      planTitle: "adult-class",
      price: "£20/hr",
      memberPrice: "£18/hr",
      description:
        "Train in a small group with players of a similar level. Learn, practice, and have fun together.",
      features: [
        "Max 4 players per coach",
        "Game-based drills & match play",
        "Build confidence & meet other players",
      ],
      image:
        "https://res.cloudinary.com/dofl9qbcd/image/upload/v1762890045/Couple_pf7f0i.png",
      callToAction: {
        href: null,
        text: "Book a Session",
        step: 2,
        bookingName: "Book an Adult Group Lesson",
      },
    },
    {
      title: "Junior Class",
      planTitle: "junior-class",
      price: "£15/hr",
      memberPrice: "£13.50/hr",
      description:
        "Structured coaching for juniors, grouped by age and ability for the best progression.",
      features: [
        "For Juniors between 4 - 16 y/o",
        "LTA qualified junior coaches",
        "Safe, supportive environment",
      ],
      image:
        "https://res.cloudinary.com/dofl9qbcd/image/upload/v1762890259/Kids_ozldmr.png",
      callToAction: {
        href: null,
        text: "Book a Session",
        step: 2,
      },
    },
  ];

  const handleDialogOpen = (planTitle: string) => {
    dispatch({
      type: "SET_BOOKING_TYPE",
      bookingType: bookingTypeMap[planTitle],
    });
    dispatch({ type: "SET_STEP", step: 1 });
    router.push("/pick-and-play");
  };

  const handleDialogClose = () => {
    dispatch({ type: "CLOSE_DIALOG" });
  };

  return (
    <section
      id="pricing"
      className="py-20 bg-gradient-to-b from-rose-50 via-white to-rose-50 text-center"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-4 text-emerald-700">
          Pick & Play
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-12 text-sm md:text-base">
          Book sessions directly with LTA qualified tennis coaches — whether you
          want individual attention, group training, or junior development, we
          have a plan for you.
        </p>

        <div className="grid md:grid-cols-3 gap-8  mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative bg-white shadow-lg rounded-2xl flex flex-col hover:shadow-2xl transition transform hover:-translate-y-1 hover:ring-2 ring-emerald-400 ${
                plan.highlight ? "ring-2 ring-emerald-400" : ""
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <Image
                src={plan.image}
                alt={"alt"}
                width={400}
                height={250}
                unoptimized
                sizes="100vw"
                className="w-full h-auto overflow-hidden rounded-t-2xl object-cover object-center"
              />
              <div className="p-6 relative">
                <h3 className="text-2xl font-semibold mb-2 text-emerald-600">
                  {plan.title}
                </h3>

                {/* Pricing tiers */}
                <div className="flex flex-col mb-3 relative items-center gap-3">
                  <p className="text-emerald-600 text-3xl font-extrabold">
                    {plan.price}
                  </p>

                  <p className="text-gray-500 text-sm flex items-center gap-1">
                    <span className="font-semibold text-emerald-700">
                      GSM Members:
                    </span>{" "}
                    {plan.memberPrice}
                    {/* Tooltip with info icon */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            aria-label="Learn about GSM membership"
                            className="text-emerald-700 hover:text-emerald-600 transition ml-3"
                          >
                            <BadgeInfo className="w-5 h-5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="max-w-xs text-sm leading-snug"
                        >
                          <p>
                            GSM Members receive discounted pricing and early
                            booking access.
                            <br />
                            Join by registering for a free account and selecting
                            “Membership” in your profile.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </p>
                </div>

                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                <ul className="text-left text-sm text-gray-600 mb-6 space-y-1">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-emerald-400 rounded-full"></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleDialogOpen(plan.planTitle)}
                  className="mt-auto bg-emerald-600 text-white px-6 py-2 rounded font-semibold shadow-md cursor-pointer hover:bg-emerald-700 transition"
                >
                  {plan.callToAction.text}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-2xl mx-auto text-gray-700 text-sm bg-emerald-50 border border-emerald-100 p-1 rounded shadow">
          <p>
            Get £5 p/h off 1-2-1 Lessons plus 15% discount off our entire range
            of GSM Gear when you become a
            <a
              href="/contact"
              className="text-emerald-600 hover:underline font-semibold"
            >
              {" "}
              GSM Rewards Plus Member
            </a>
            .
          </p>
        </div>

        <Dialog open={state.openDialog} onOpenChange={handleDialogClose}>
          <DialogContent className="min-w-3xl">
            <DialogHeader>
              <DialogTitle>Pick and Play</DialogTitle>
            </DialogHeader>
            <DialogDescription></DialogDescription>
            {/* {state.step === 1 && <BookingStepOne />}
            {state.step === 2 && <BookingStepTwo />} */}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}