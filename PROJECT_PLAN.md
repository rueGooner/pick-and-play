# Pick and Play - Project Development Plan

## Project Overview

**Pick and Play** (GSM Tennis Academy) is a Next.js application for connecting tennis coaches with players. The platform enables coaches to manage their availability, create sessions, accept bookings, and handle payments through Stripe.

## Current Status

### ✅ Completed Features

1. **Authentication & Authorization**

   - User registration and login
   - Role-based access (coach, player, admin)
   - Session management with Supabase

2. **Coach Onboarding Flow** (4 Steps)

   - Step 1: Personal information (phone, DOB, address, location)
   - Step 2: Professional details (bio, LTA info, experience)
   - Step 3: Service configuration (specialties, languages, pricing, radius)
   - Step 4: Availability and venues (weekly schedule, service areas)

3. **Infrastructure**

   - Next.js 16 with App Router
   - Supabase for database and auth
   - Stripe integration (partial - onboarding started)
   - UI components (Radix UI, Tailwind CSS)
   - Form handling (React Hook Form + Zod)

4. **Marketing Pages**

   - Home page with hero, about, FAQ sections
   - Contact form

5. **Basic Dashboard**
   - Dashboard layout with sidebar navigation
   - Role-based navigation menus defined

### ⚠️ Partially Complete

1. **Stripe Integration**

   - Stripe onboarding UI component exists
   - Missing: `/api/stripe/connect` route
   - Missing: Stripe webhook handlers
   - Missing: Payment processing for bookings

2. **Dashboard Pages**
   - Basic dashboard page exists but shows debug JSON
   - Navigation structure defined but most routes missing

## Priority Roadmap

### Phase 1: Core Infrastructure (High Priority)

#### 1.1 Complete Stripe Integration

- [ ] Create `/app/api/stripe/connect/route.ts` for onboarding
- [ ] Create `/app/api/stripe/webhooks/route.ts` for webhook handling
- [ ] Implement Stripe Connect account creation
- [ ] Handle Stripe onboarding completion callback
- [ ] Update profile `is_onboarded` flag on completion
- [ ] Add error handling and retry logic

**Files to create:**

- `app/api/stripe/connect/route.ts`
- `app/api/stripe/webhooks/route.ts`
- `lib/stripe/connect.ts` (helper functions)

#### 1.2 Fix Dashboard Debug Code

- [ ] Remove `<pre>{JSON.stringify(profile, null, 2)}</pre>` from dashboard
- [ ] Create proper dashboard overview component
- [ ] Add stats cards (upcoming sessions, bookings, earnings)
- [ ] Add quick actions section

**Files to update:**

- `app/dashboard/page.tsx`
- Create `components/dashboard/DashboardOverview.tsx`

#### 1.3 Player Onboarding

- [ ] Create player onboarding flow (similar to coach)
- [ ] Add player-specific fields (guardian info for minors, skill level)
- [ ] Create `components/dashboard/onboarding/PlayerStepOne.tsx`, etc.
- [ ] Update `lib/onboarding/update-profiles.ts` with player handlers

**Files to create:**

- `components/dashboard/onboarding/PlayerStepOne.tsx`
- `components/dashboard/onboarding/PlayerStepTwo.tsx`
- `lib/onboarding/player-onboarding.ts`

### Phase 2: Sessions Management (High Priority)

#### 2.1 Create Session Pages

- [ ] `/dashboard/sessions/create` - Form to create new session
  - Fields: title, description, date/time, duration, max participants, price, venue
  - Validation and submission
- [ ] `/dashboard/sessions/mine` - List coach's sessions
  - Filter by status (upcoming, past, cancelled)
  - Edit/delete actions
  - View bookings for each session
- [ ] `/dashboard/sessions` (player view) - Browse available sessions
  - Search/filter by location, date, coach, price
  - Book session functionality

**Files to create:**

- `app/dashboard/sessions/create/page.tsx`
- `app/dashboard/sessions/mine/page.tsx`
- `app/dashboard/sessions/page.tsx`
- `components/dashboard/sessions/CreateSessionForm.tsx`
- `components/dashboard/sessions/SessionList.tsx`
- `components/dashboard/sessions/SessionCard.tsx`
- `lib/sessions/create-session.ts`
- `lib/sessions/get-sessions.ts`
- `types/session.type.ts`
- `schemas/session.schema.ts`

#### 2.2 Session Database Schema

- [ ] Verify/update Supabase schema for sessions table
- [ ] Add relationships (sessions → coaches, sessions → venues)
- [ ] Add indexes for performance

### Phase 3: Availability Management (High Priority)

#### 3.1 Availability Calendar

- [ ] `/dashboard/availability` - Calendar view of availability
  - Use `react-big-calendar` (already in dependencies)
  - Show weekly recurring availability
  - Show blackout dates
  - Allow adding/removing availability slots
- [ ] `/dashboard/availability/rules` - Manage recurring rules
  - Create/edit/delete recurring availability patterns
- [ ] `/dashboard/availability/blackout` - Manage blackout dates
  - Add dates when coach is unavailable
- [ ] `/dashboard/locations` - Manage service locations
  - View/edit venues from onboarding
  - Add/remove venues

**Files to create:**

- `app/dashboard/availability/page.tsx`
- `app/dashboard/availability/rules/page.tsx`
- `app/dashboard/availability/blackout/page.tsx`
- `app/dashboard/locations/page.tsx`
- `components/dashboard/availability/AvailabilityCalendar.tsx`
- `components/dashboard/availability/RecurringRulesForm.tsx`
- `components/dashboard/availability/BlackoutDatesForm.tsx`
- `hooks/availability/useAvailability.ts`
- `lib/availability/update-availability.ts`

### Phase 4: Bookings System (High Priority)

#### 4.1 Booking Pages

- [ ] `/dashboard/bookings` (coach view) - All bookings
  - Filter by status, date, session
  - View booking details
  - Accept/reject/cancel bookings
- [ ] `/dashboard/bookings` (player view) - My bookings
  - Upcoming and past bookings
  - Cancel booking functionality
- [ ] `/dashboard/waitlist` - Waitlist management
  - View players on waitlist
  - Move from waitlist to booking when slot opens
- [ ] `/dashboard/clients` - Coach's client list
  - View all players who have booked
  - Client history and notes

**Files to create:**

- `app/dashboard/bookings/page.tsx`
- `app/dashboard/waitlist/page.tsx`
- `app/dashboard/clients/page.tsx`
- `components/dashboard/bookings/BookingList.tsx`
- `components/dashboard/bookings/BookingCard.tsx`
- `components/dashboard/bookings/BookingDetails.tsx`
- `lib/bookings/create-booking.ts`
- `lib/bookings/update-booking.ts`
- `types/booking.type.ts`
- `schemas/booking.schema.ts`

#### 4.2 Booking Flow

- [ ] Implement booking creation from session
- [ ] Payment processing with Stripe
- [ ] Email notifications (optional: use Supabase Edge Functions or Resend)
- [ ] Booking confirmation page
- [ ] Handle booking conflicts (double-booking prevention)

### Phase 5: Finance Features (Medium Priority)

#### 5.1 Payouts

- [ ] `/dashboard/payouts` - View payout history
  - List completed and pending payouts
  - Payout schedule information
  - Connect to Stripe payouts API

#### 5.2 Pricing Management

- [ ] `/dashboard/pricing` - Update pricing
  - Edit individual and group rates
  - Set special pricing for specific sessions
  - View pricing history

**Files to create:**

- `app/dashboard/payouts/page.tsx`
- `app/dashboard/pricing/page.tsx`
- `components/dashboard/finance/PayoutsList.tsx`
- `components/dashboard/finance/PricingForm.tsx`
- `lib/stripe/payouts.ts`

### Phase 6: Profile & Settings (Medium Priority)

#### 6.1 Public Profile

- [ ] `/dashboard/coach/profile` - Edit public profile
  - Bio, specialties, photos
  - Preview of public-facing profile
  - SEO optimization

#### 6.2 Settings

- [ ] `/dashboard/coach/settings` - Account settings
  - Change password
  - Update email
  - Notification preferences
  - Delete account

**Files to create:**

- `app/dashboard/coach/profile/page.tsx`
- `app/dashboard/coach/settings/page.tsx`
- `components/dashboard/profile/PublicProfileEditor.tsx`
- `components/dashboard/profile/SettingsForm.tsx`

### Phase 7: Admin Features (Low Priority)

#### 7.1 User Management

- [ ] `/users` - All users list
- [ ] `/coaches` - Coaches management
- [ ] `/guardians` - Guardians list (for minor players)

#### 7.2 System Management

- [ ] `/settings` - System-wide settings
- [ ] `/change-requests` - Handle change requests from users

**Files to create:**

- `app/users/page.tsx`
- `app/coaches/page.tsx`
- `app/guardians/page.tsx`
- `app/settings/page.tsx`
- `app/change-requests/page.tsx`

### Phase 8: Polish & Enhancement (Ongoing)

#### 8.1 Error Handling

- [ ] Add comprehensive error boundaries
- [ ] Improve error messages throughout app
- [ ] Add retry logic for failed API calls

#### 8.2 Performance

- [ ] Optimize database queries
- [ ] Add loading states and skeletons
- [ ] Implement pagination for lists
- [ ] Add caching where appropriate

#### 8.3 Testing

- [ ] Add unit tests for critical functions
- [ ] Add integration tests for booking flow
- [ ] E2E tests for onboarding

#### 8.4 Documentation

- [ ] Update README with setup instructions
- [ ] Document API endpoints
- [ ] Add code comments for complex logic
- [ ] Create user guides

#### 8.5 UI/UX Improvements

- [ ] Add loading spinners
- [ ] Improve mobile responsiveness
- [ ] Add animations/transitions
- [ ] Improve accessibility (a11y)

## Technical Debt & Issues

1. **Navigation Menu Bug**

   - Line 89 in `lib/menus/sidebar.navigation.ts` has syntax error (missing array brackets)
   - Line 143 and 252 have trailing commas

2. **Type Safety**

   - Some `any` types may exist - audit and fix
   - Ensure all database queries are properly typed

3. **Environment Variables**

   - Document all required env vars
   - Add validation for missing vars

4. **Database Schema**
   - Verify all tables exist in Supabase
   - Add migrations if needed
   - Document relationships

## Immediate Next Steps (This Week)

1. **Fix navigation menu syntax errors**
2. **Create Stripe Connect API route** (`/api/stripe/connect`)
3. **Remove debug code from dashboard** and create proper overview
4. **Create session creation page** (MVP version)
5. **Set up database tables** for sessions and bookings if not exists

## Success Metrics

- [ ] Coaches can complete onboarding and set up Stripe
- [ ] Coaches can create and manage sessions
- [ ] Players can browse and book sessions
- [ ] Payments process successfully through Stripe
- [ ] Bookings are properly tracked and managed
- [ ] All navigation links work

## Notes

- The project uses Next.js 16 App Router
- Supabase for backend (auth + database)
- Stripe for payments (Connect for marketplace)
- React Hook Form + Zod for form validation
- Tailwind CSS + Radix UI for styling
- TypeScript throughout

---

**Last Updated:** [Current Date]
**Status:** Active Development
