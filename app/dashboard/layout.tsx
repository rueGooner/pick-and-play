import DashboardWrapper from "@/components/dashboard/shared/DashboardWrapper";
import { getAuthenticatedUser } from "@/lib/server/auth";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { profile } = await getAuthenticatedUser();
  return (
    <DashboardWrapper user={profile}>
      <p>DASHBOARD</p>
    </DashboardWrapper>
  );
}
