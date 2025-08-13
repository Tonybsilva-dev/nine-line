import React from "react";

import { IconWithBackground } from "@/core/modules/components/custom";
import { getIconComponent } from "../../helpers/icon-mapping.helper";
import { formatCurrency } from "@/core/modules/utils/format-number.utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Small,
  Muted,
} from "@nine-line/ui";

interface OrderManagementProps {
  orders: {
    pending: number;
    processing: number;
    completed: number;
    recentOrders: Array<{
      id: string;
      customer: string;
      amount: number;
      status: "pending" | "processing" | "completed" | "cancelled";
      time: string;
    }>;
  };
  translations: (key: string) => string;
}

export const OrderManagement: React.FC<OrderManagementProps> = ({
  orders,
  translations,
}) => {
  const t = translations;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-orange-500";
      case "processing":
        return "text-blue-500";
      case "completed":
        return "text-green-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-500";
      case "processing":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <IconWithBackground
            icon={getIconComponent("shopping-cart")}
            variant="primary"
            size="sm"
          />
          <span>{t("manager.orderManagement.title")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">
              {orders.pending}
            </div>
            <Small className="text-muted-foreground">
              {t("manager.orderManagement.pending")}
            </Small>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {orders.processing}
            </div>
            <Small className="text-muted-foreground">
              {t("manager.orderManagement.processing")}
            </Small>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {orders.completed}
            </div>
            <Small className="text-muted-foreground">
              {t("manager.orderManagement.completed")}
            </Small>
          </div>
        </div>
        <div className="space-y-2">
          {orders.recentOrders.slice(0, 4).map((order) => (
            <div
              key={order.id}
              className="flex items-center space-x-3 p-2 bg-muted rounded-lg"
            >
              <div
                className={`w-2 h-2 rounded-full ${getStatusBg(order.status)}`}
              ></div>
              <div className="flex-1">
                <Small className="font-medium">{order.customer}</Small>
                <Muted className="text-xs">Pedido #{order.id}</Muted>
              </div>
              <div className="text-right">
                <Small
                  className={`font-medium ${getStatusColor(order.status)}`}
                >
                  {formatCurrency(order.amount)}
                </Small>
                <Muted className="text-xs">{order.time}</Muted>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
