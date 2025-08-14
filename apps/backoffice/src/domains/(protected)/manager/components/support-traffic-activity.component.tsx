"use client";

import * as React from "react";
import { RefreshCw, Calendar, Download } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@nine-line/ui";

interface ChartDataItem {
  month: string;
  tickets: number;
  highlighted: boolean;
}

// Dados dos 12 meses do ano
const chartData: ChartDataItem[] = [
  { month: "Jan", tickets: 1200, highlighted: false },
  { month: "Fev", tickets: 1350, highlighted: false },
  { month: "Mar", tickets: 980, highlighted: false },
  { month: "Abr", tickets: 1450, highlighted: false },
  { month: "Mai", tickets: 2647, highlighted: true },
  { month: "Jun", tickets: 1800, highlighted: false },
  { month: "Jul", tickets: 2100, highlighted: false },
  { month: "Ago", tickets: 1750, highlighted: false },
  { month: "Set", tickets: 1950, highlighted: false },
  { month: "Out", tickets: 2200, highlighted: false },
  { month: "Nov", tickets: 1850, highlighted: false },
  { month: "Dez", tickets: 2400, highlighted: false },
];

interface SupportTrafficActivityProps {
  translations: {
    title: string;
    description: string;
    totalTickets: string;
    percentage: string;
  };
}

// Tooltip personalizado para o gráfico
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white shadow-lg rounded-lg p-3">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-semibold text-gray-900">{label}</p>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <p className="text-sm text-gray-600">
              Tickets:{" "}
              <span className="font-medium text-gray-900">
                {data.value?.toLocaleString()}
              </span>
            </p>
          </div>
          <div className="text-xs text-gray-500">
            {data.value && data.value > 0 ? (
              <span className="text-green-500">↗ Ativo</span>
            ) : (
              <span className="text-gray-400">○ Sem dados</span>
            )}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function SupportTrafficActivity({
  translations,
}: SupportTrafficActivityProps) {
  const totalTickets = chartData.reduce((acc, curr) => acc + curr.tickets, 0);

  return (
    <Card className="bg-secondary/50 border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex flex-col">
          <CardTitle className="text-lg font-semibold text-card-foreground">
            {translations.title}
          </CardTitle>
        </div>
        <div className="flex items-center gap-1">
          {/* Mini Toolbar */}
          <button className="p-3 bg-primary rounded-lg text-white hover:text-foreground hover:bg-primary/80 transition-colors h-12">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button className="p-3 bg-primary rounded-lg text-white hover:text-foreground hover:bg-primary/80 transition-colors h-12">
            <Calendar className="w-5 h-5" />
          </button>
          <button className="p-3 bg-primary rounded-lg text-white hover:text-foreground hover:bg-primary/80 transition-colors h-12">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {translations.totalTickets}:
          </span>
          <span className="text-2xl font-bold text-card-foreground">
            {totalTickets.toLocaleString()}
          </span>
          <div className="text-green-500 text-sm font-medium flex items-center gap-1">
            <span className="text-xs">↗</span>
            {translations.percentage}
          </div>
        </div>

        {/* Gráfico de Barras */}
        <div className="w-full h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="hsl(var(--muted-foreground))"
                opacity={0.1}
                fill="none"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="tickets"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                opacity={0.8}
                className="cursor-pointer transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Destaque para o mês com maior valor */}
        {chartData.map(
          (entry, index) =>
            entry.highlighted && (
              <div key={index} className="flex justify-center">
                <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
                  {entry.tickets.toLocaleString()}
                </div>
              </div>
            ),
        )}
      </CardContent>
    </Card>
  );
}
