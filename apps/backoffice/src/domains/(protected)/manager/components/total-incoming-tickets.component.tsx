"use client";

import { Card, CardContent } from "@nine-line/ui";

interface TotalIncomingTicketsProps {
  value: string;
  percentage: string;
  translations: {
    title: string;
  };
}

export function TotalIncomingTickets({
  value,
  percentage,
  translations,
}: TotalIncomingTicketsProps) {
  return (
    <Card className="bg-secondary border-0 shadow-none">
      <CardContent className="p-4">
        <div className="space-y-3">
          <p className="text-sm text-gray-600 font-normal">
            {translations.title}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <div className="text-green-500 text-sm font-medium flex items-center gap-1">
              <span className="text-xs">↗</span>
              {percentage}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
