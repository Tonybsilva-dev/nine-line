"use client";

import { TrendingUp, Users } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nine-line/ui";

// Função para obter os últimos 6 meses com abreviações
function getLastSixMonths() {
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const currentDate = new Date();
  const result = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1,
    );
    const monthIndex = date.getMonth();
    const monthAbbr = months[monthIndex];
    const year = date.getFullYear();

    // Simular dados de clientes (em produção, isso viria de uma API)
    const clients = Math.floor(Math.random() * 200) + 100;

    result.push({
      month: monthAbbr,
      clients,
      fullMonth: `${monthAbbr} ${year}`,
    });
  }

  return result;
}

export function ClientMonthlyOverview() {
  const chartData = getLastSixMonths();

  // Calcular o crescimento percentual
  const currentMonth = chartData[chartData.length - 1].clients;
  const previousMonth = chartData[chartData.length - 2].clients;
  const growthPercentage = (
    ((currentMonth - previousMonth) / previousMonth) *
    100
  ).toFixed(1);

  // Obter o primeiro e último mês para o footer
  const firstMonth = chartData[0].fullMonth;
  const lastMonth = chartData[chartData.length - 1].fullMonth;

  return (
    <Card className="bg-secondary border-0 shadow-lg max-w-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-card-foreground flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Solicitações
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Tenha um alto nível de captura das suas solicitações dos últimos 6
          meses.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="mx-auto aspect-square max-h-[250px]">
          <RadarChart data={chartData} width={250} height={250}>
            <PolarGrid
              className="fill-muted-foreground opacity-20"
              gridType="circle"
            />
            <PolarAngleAxis
              dataKey="month"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Radar
              dataKey="clients"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
          </RadarChart>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium text-card-foreground">
          {parseFloat(growthPercentage) >= 0 ? "Crescimento" : "Redução"} de{" "}
          {Math.abs(parseFloat(growthPercentage))}% este mês
          <TrendingUp
            className={`h-4 w-4 ${parseFloat(growthPercentage) >= 0 ? "text-green-500" : "text-red-500"}`}
          />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          {firstMonth} - {lastMonth}
        </div>
      </CardFooter>
    </Card>
  );
}
