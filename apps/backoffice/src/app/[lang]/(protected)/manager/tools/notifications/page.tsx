import { Suspense } from "react";
import { NotificationsContainer } from "@/domains/(protected)/manager/tools/notifications/container/notifications.container";

export default function NotificationsPage() {
  return (
    <Suspense>
      <NotificationsContainer />
    </Suspense>
  );
}
