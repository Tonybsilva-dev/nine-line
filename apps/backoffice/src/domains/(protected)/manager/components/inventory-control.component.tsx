import React from "react";

import { IconWithBackground } from "@/core/modules/components/custom";
import { getIconComponent } from "../../helpers/icon-mapping.helper";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Small,
  Muted,
} from "@nine-line/ui";

interface InventoryControlProps {
  inventory: {
    totalItems: number;
    lowStock: number;
    outOfStock: number;
    items: Array<{
      id: string;
      name: string;
      quantity: number;
      minQuantity: number;
      status: "in_stock" | "low_stock" | "out_of_stock";
      lastRestocked: string;
    }>;
  };
  translations: (key: string) => string;
}

export const InventoryControl: React.FC<InventoryControlProps> = ({
  inventory,
  translations,
}) => {
  const t = translations;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_stock":
        return "text-green-500";
      case "low_stock":
        return "text-yellow-500";
      case "out_of_stock":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "in_stock":
        return "bg-green-500";
      case "low_stock":
        return "bg-yellow-500";
      case "out_of_stock":
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
            icon={getIconComponent("package")}
            variant="warning"
            size="sm"
          />
          <span>{t("manager.inventoryControl.title")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {inventory.totalItems}
            </div>
            <Small className="text-muted-foreground">
              {t("manager.inventoryControl.totalItems")}
            </Small>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-500">
              {inventory.lowStock}
            </div>
            <Small className="text-muted-foreground">
              {t("manager.inventoryControl.lowStock")}
            </Small>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">
              {inventory.outOfStock}
            </div>
            <Small className="text-muted-foreground">
              {t("manager.inventoryControl.outOfStock")}
            </Small>
          </div>
        </div>
        <div className="space-y-2">
          {inventory.items.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-3 p-2 bg-muted rounded-lg"
            >
              <div
                className={`w-2 h-2 rounded-full ${getStatusBg(item.status)}`}
              ></div>
              <div className="flex-1">
                <Small className="font-medium">{item.name}</Small>
                <Muted className="text-xs">{item.quantity} unidades</Muted>
              </div>
              <div className="text-right">
                <Small className={`font-medium ${getStatusColor(item.status)}`}>
                  {item.quantity}/{item.minQuantity}
                </Small>
                <Muted className="text-xs">{item.lastRestocked}</Muted>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
