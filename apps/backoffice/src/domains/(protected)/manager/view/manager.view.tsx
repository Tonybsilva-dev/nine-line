import React from "react";
import { DashboardStats } from "../../components/dashboard-stats.component";
import { ActivityLog } from "../components/activity-log.component";
import { OrderManagement } from "../components/order-management.component";
import { InventoryControl } from "../components/inventory-control.component";
import { MOCK_MANAGER_DATA } from "../../helpers/manager-mock.helper";
import { PageProps } from "@/core/@types/page-params.types";

interface ManagerViewProps extends PageProps {
  user?: unknown;
}

export const ManagerView: React.FC<ManagerViewProps> = ({ params }) => {
  const { translations: t } = params;

  const stats = {
    totalOrders: 156,
    pendingOrders: MOCK_MANAGER_DATA.orders.pending,
    totalRevenue: 15600,
    activeDeliveries: 12,
  };

  return (
    <div>
      <DashboardStats stats={stats} translations={t} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
        <OrderManagement orders={MOCK_MANAGER_DATA.orders} translations={t} />
        <InventoryControl
          inventory={MOCK_MANAGER_DATA.inventory}
          translations={t}
        />
        <ActivityLog
          activities={MOCK_MANAGER_DATA.activities}
          translations={t}
        />
      </div>
    </div>
  );
};
