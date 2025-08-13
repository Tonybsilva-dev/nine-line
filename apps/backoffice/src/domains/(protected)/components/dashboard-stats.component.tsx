import React from "react";

import { IconWithBackground } from "@/core/modules/components/custom";
import { getIconComponent } from "../helpers/icon-mapping.helper";
import {
  formatNumber,
  formatCurrency,
} from "@/core/modules/utils/format-number.utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  P,
  Small,
} from "@nine-line/ui";

interface DashboardStatsProps {
  stats: {
    totalOrders: number;
    pendingOrders: number;
    totalRevenue: number;
    activeDeliveries: number;
  };
  translations: (key: string) => string;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  stats,
  translations,
}) => {
  const t = translations;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <IconWithBackground
              icon={getIconComponent("shopping-cart")}
              variant="primary"
              size="sm"
            />
            <span>{t("stats.totalOrders")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <P className="text-muted-foreground mb-4">
            {t("stats.fromLastMonth")}
          </P>
          <div className="flex items-center justify-between">
            <span className="text-xl sm:text-2xl font-bold text-primary">
              {formatNumber(stats.totalOrders)}
            </span>
            <Small className="text-green-500 text-xs sm:text-sm">
              +18% {t("stats.monthlyGrowth")}
            </Small>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <IconWithBackground
              icon={getIconComponent("package")}
              variant="warning"
              size="sm"
            />
            <span>{t("stats.pendingOrders")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <P className="text-muted-foreground mb-4">
            {t("stats.awaitingProcessing")}
          </P>
          <div className="flex items-center justify-between">
            <span className="text-xl sm:text-2xl font-bold text-orange-500">
              {stats.pendingOrders}
            </span>
            <Small className="text-orange-500 text-xs sm:text-sm">
              {t("stats.awaitingProcessing")}
            </Small>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <IconWithBackground
              icon={getIconComponent("dollar-sign")}
              variant="success"
              size="sm"
            />
            <span>{t("stats.totalRevenue")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <P className="text-muted-foreground mb-4">
            {t("stats.fromLastMonth")}
          </P>
          <div className="flex items-center justify-between">
            <span className="text-xl sm:text-2xl font-bold text-green-500">
              {formatCurrency(stats.totalRevenue)}
            </span>
            <Small className="text-green-500 text-xs sm:text-sm">
              +12% {t("stats.monthlyGrowth")}
            </Small>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <IconWithBackground
              icon={getIconComponent("truck")}
              variant="secondary"
              size="sm"
            />
            <span>{t("stats.activeDeliveries")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <P className="text-muted-foreground mb-4">{t("stats.inTransit")}</P>
          <div className="flex items-center justify-between">
            <span className="text-xl sm:text-2xl font-bold text-blue-500">
              {stats.activeDeliveries}
            </span>
            <Small className="text-blue-500 text-xs sm:text-sm">
              {t("stats.inTransit")}
            </Small>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
