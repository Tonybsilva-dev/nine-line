import React from "react";
import { IconWithBackground } from "@/core/modules/components/custom";
import { Clock } from "lucide-react";
import { getIconComponent } from "../../helpers/icon-mapping.helper";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Small,
  Muted,
} from "@nine-line/ui";

interface ActivityLogProps {
  activities: Array<{
    id: string;
    type: "order" | "delivery" | "stock" | "customer";
    title: string;
    description: string;
    time: string;
    color: string;
  }>;
  translations: (key: string) => string;
}

export const ActivityLog: React.FC<ActivityLogProps> = ({
  activities,
  translations,
}) => {
  const t = translations;

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <IconWithBackground icon={Clock} variant="warning" size="sm" />
          <span>{t("views.manager.activities.title")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center space-x-4 p-3 bg-muted rounded-lg relative"
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 ${activity.color} rounded-l-lg`}
              ></div>
              <div
                className={`w-8 h-8 ${activity.color.replace("bg-", "bg-").replace("-500", "-100")} rounded-full flex items-center justify-center ml-2`}
              >
                <IconWithBackground
                  icon={getIconComponent(
                    activity.type === "order"
                      ? "shopping-cart"
                      : activity.type === "delivery"
                        ? "truck"
                        : "package",
                  )}
                  size="sm"
                  className="w-6 h-6 p-1"
                />
              </div>
              <div className="flex-1">
                <Small className="font-medium">{activity.title}</Small>
                <Muted className="text-xs">{activity.description}</Muted>
              </div>
              <Muted className="text-xs">{activity.time}</Muted>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
