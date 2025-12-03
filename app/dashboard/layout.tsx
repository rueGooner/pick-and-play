import DashboardWrapper from "@/components/dashboard/shared/DashboardWrapper";
import { getAuthenticatedUser } from "@/lib/server/auth";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getAuthenticatedUser();
  console.log(user); // null on page load
  return (
    <DashboardWrapper user={user}>
      <p>DASHBOARD</p>
    </DashboardWrapper>
  );
}
