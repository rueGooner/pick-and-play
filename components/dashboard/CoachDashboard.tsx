"use client";

import Link from "next/link";

import { Button } from "../ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../ui/item";
// import {
//   getCoachUpcomingBookings,
//   getCoachUpcomingSessions,
// } from "@/actions/coaches/coach.read";

import { DashboardCard } from "./shared/DashboardCard";
import { UpcomingBooking } from "@/types/booking.type";
import { SessionsWithCounts } from "@/types/session.type";
import { useUpcomingCoachSessions } from "@/hooks/coaches/useUpcomingCoachSessions";
import { CoachProfile } from "@/types/coach.type";

interface CoachDashboardProps {
  profile: CoachProfile;
}

export default function CoachDashboard({ profile }: CoachDashboardProps) {
  const { data: sessions } = useUpcomingCoachSessions();
  console.log(sessions)
  // const bookings = await getCoachUpcomingBookings(1);
  return (
    <div className="bg-white gap-8 min-h-screen flex flex-col p-8">
      <div className="grid gap-6 md:grid-cols-2 relative">
        <DashboardCard<SessionsWithCounts>
          cardData={sessions || []}
          title="Upcoming Sessions"
          description="Your upcoming available sessions."
          href="/dashboard/sessions"
          linkTitle="View all Sessions"
        >
          {(upcomingSession) => (
            <Item key={upcomingSession.session_id} size="sm" variant="outline">
              <ItemContent>
                <ItemTitle>
                  {upcomingSession.program_title === "Public Class"
                    ? `${upcomingSession.session_name} for upto `
                    : `${upcomingSession.session_name} for `}
                  {upcomingSession.max_players === 1
                    ? `${upcomingSession.max_players} player`
                    : `${upcomingSession.max_players} players`}
                </ItemTitle>
                <ItemDescription className="text-xs font-semibold text-slate-600">
                  Session available with Coach:{" "}
                  {upcomingSession.coach_firstname}{" "}
                  {upcomingSession.coach_lastname}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-emerald-500 hover:border-emerald-400 text-emerald-600"
                >
                  <Link
                    href={`/dashboard/sessions/${upcomingSession.session_id}`}
                  >
                    View Session
                  </Link>
                </Button>
              </ItemActions>
            </Item>
          )}
        </DashboardCard>
         <DashboardCard<SessionsWithCounts>
          cardData={sessions || []}
          title="Upcoming Sessions"
          description="Your upcoming available sessions."
          href="/dashboard/sessions"
          linkTitle="View all Sessions"
        >
          {(upcomingSession) => (
            <Item key={upcomingSession.session_id} size="sm" variant="outline">
              <ItemContent>
                <ItemTitle>
                  {upcomingSession.program_title === "Public Class"
                    ? `${upcomingSession.session_name} for upto `
                    : `${upcomingSession.session_name} for `}
                  {upcomingSession.max_players === 1
                    ? `${upcomingSession.max_players} player`
                    : `${upcomingSession.max_players} players`}
                </ItemTitle>
                <ItemDescription className="text-xs font-semibold text-slate-600">
                  Session available with Coach:{" "}
                  {upcomingSession.coach_firstname}{" "}
                  {upcomingSession.coach_lastname}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-emerald-500 hover:border-emerald-400 text-emerald-600"
                >
                  <Link
                    href={`/dashboard/sessions/${upcomingSession.session_id}`}
                  >
                    View Session
                  </Link>
                </Button>
              </ItemActions>
            </Item>
          )}
        </DashboardCard>

        {/* <DashboardCard<UpcomingBooking>
          cardData={bookings.slice(0, 3)}
          title="Upcoming Bookings"
          description={`You have ${bookings.length} session${
            bookings.length > 1 ? "s" : ""
          } booked.`}
          href="/dashboard/bookings"
          linkTitle="View all Bookings"
        >
          {(upcomingBooking) => (
            <Item key={upcomingBooking.booking_id} size="sm" variant="outline">
              <ItemContent>
                <ItemTitle>{upcomingBooking.program_title}</ItemTitle>
                <ItemDescription className="text-xs font-semibold text-slate-600">
                  Session Coached by: Coach {upcomingBooking.coach_firstname}{" "}
                  {upcomingBooking.coach_lastname}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-emerald-500 hover:border-emerald-400 text-emerald-600"
                >
                  <Link href={`/sessions/${upcomingBooking.session_id}`}>
                    View Session
                  </Link>
                </Button>
              </ItemActions>
            </Item>
          )}
        </DashboardCard> */}

        {/* <Card className="w-full rounded flex flex-col justify-between md:col-span-2 relative">
          {" "}
          <p className="absolute top-0 right-0 text-xs bg-green-700 text-white p-1">
            Included
          </p>
          <CardHeader>
            <CardTitle className="text-slate-600">Your Progress</CardTitle>
            <CardDescription>8 of 12 sessions completed</CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="w-full bg-slate-100 rounded h-3">
              <div className="bg-emerald-600 h-3 rounded w-2/3"></div>
            </div>
          </CardFooter>
        </Card>

        {/* Coach Info */}
        {/* <Card className="w-full rounded flex flex-col justify-between relative">
          <p className="bg-orange-400 text-white p-1 absolute top-0 right-0 text-xs">
            not included
          </p>{" "}
          <CardHeader>
            <CardTitle className="text-slate-600">Your Coach</CardTitle>
            <CardDescription>Coach Jade Thompson</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between items-center">
            <Button asChild size="sm">
              <Link href="/coach">View Profile</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/messages">Message</Link>
            </Button>
          </CardFooter>
        </Card> */}

        {/* Announcements */}
        {/* <Card className="w-full rounded flex flex-col justify-between relative">
          <p className="bg-orange-400 text-white p-1 absolute top-0 right-0 text-xs">
            not included
          </p>
          <CardHeader>
            <CardTitle className="text-slate-600">Announcements</CardTitle>
            <CardDescription>Latest updates from GSM Academy</CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-2 text-sm text-slate-600">
            <p> Holiday camp registration now open!</p>
            <p> Club tournament — December 8–9 weekend.</p>
            <p> Reminder: No sessions on public holidays.</p>
          </CardFooter>
        </Card> */}

        {/* <Card className="w-full rounded flex flex-col justify-between md:col-span-2 relative">
          <p className="bg-orange-400 text-white p-1 absolute top-0 right-0 text-xs">
            not included
          </p>
          <CardHeader>
            <CardTitle className="text-slate-600">
              Membership & Payments
            </CardTitle>
            <CardDescription>
              Monthly Coaching Plan — Active until Nov 30
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-2">
            <div className="text-sm text-slate-500 border rounded p-3 bg-slate-50 w-full">
              <p> Last payment: Oct 1 — £120</p>
              <p> Next payment: Nov 1</p>
            </div>
            <Button asChild className="w-full">
              <Link href="/payments">View Payment History</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-full rounded flex flex-col justify-between md:col-span-2">
          <CardHeader>
            <CardTitle className="text-slate-600">Achievements</CardTitle>
            <CardDescription>Your tennis milestones</CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-wrap gap-3">
            <div className="bg-emerald-100 text-emerald-700 text-sm px-3 py-2 rounded-full">
              50 Sessions Completed
            </div>
            <div className="bg-emerald-100 text-emerald-700 text-sm px-3 py-2 rounded-full">
              Backhand Master
            </div>
            <div className="bg-emerald-100 text-emerald-700 text-sm px-3 py-2 rounded-full">
              Consistent Attendee
            </div>
            <div className="bg-emerald-100 text-emerald-700 text-sm px-3 py-2 rounded-full">
              Fastest Serve — 45 km/h
            </div>
          </CardFooter>
        </Card> */}
      </div>
    </div>
  );
}