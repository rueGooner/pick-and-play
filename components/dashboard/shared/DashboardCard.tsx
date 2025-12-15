import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "../../ui/card";
import { Button } from "../../ui/button";
import Link from "next/link";

export const DashboardCard = <T,>({
  title,
  description,
  href,
  linkTitle,
  cardData,
  children,
}: {
  title: string;
  description: string;
  href: string;
  linkTitle: string;
  cardData: T[];
  children: (item: T, index: number) => React.ReactNode;
}) => {
  return (
    <Card className="w-full rounded flex flex-col relative">
      <CardHeader>
        <CardTitle className="text-slate-600">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-1 leading-none">
        {cardData.length > 0 ? (
          cardData.map(children)
        ) : (
          <p className="text-sm text-slate-500 text-center font-semibold">
            You have no upcoming bookings.
          </p>
        )}
      </CardContent>

      <CardFooter className="flex-col gap-2 mt-auto">
        <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
          <Link href={href}>{linkTitle}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};