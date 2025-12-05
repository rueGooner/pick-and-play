"use client";

import { TriangleAlertIcon } from "lucide-react";
import { FC, useTransition } from "react";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CoachProfile } from "@/types/coach.type";
import { startStripeOnboarding } from "@/lib/server/stripe-onboarding";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../ui/item";

interface StripeNoticeProps {
  profile: CoachProfile;
}

export const StripeNotice: FC<StripeNoticeProps> = ({ profile }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      try {
        const url = await startStripeOnboarding();
        router.push(url);
      } catch (err: unknown) {
        toast.error((err as Error).message || "Stripe onboarding failed.");
      }
    });
  };

  return (
    <Item className="bg-white rounded shadow-md p-10 relative">
      <ItemContent>
        <ItemTitle className="text-xl font-semibold text-slate-700 mb-2">
          Action Required: {`${profile.firstname} ${profile.lastname}`}
        </ItemTitle>
        <ItemDescription>
          <span className="inline-flex bg-amber-500 text-amber-50 p-1 rounded text-sm">
            <TriangleAlertIcon className="w-5 h-5 mx-2" /> You still need to
            complete your Stripe payout setup before you can start accepting
            bookings.
          </span>
        </ItemDescription>
      </ItemContent>

      <ItemActions>
        <Button
          onClick={handleClick}
          type="button"
          variant="outline"
          size="sm"
          className="bg-emerald-600 text-white hover:bg-emerald-400 hover:text-white"
        >
          Complete Setup
        </Button>
      </ItemActions>
    </Item>
  );
};
