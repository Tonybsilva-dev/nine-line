import React from "react";
import { PageProps } from "@/core/@types/page-params.types";
import { Card, CardContent, CardHeader, CardTitle } from "@nine-line/ui";
import { Clock, ShoppingCart, Package, Truck } from "lucide-react";
import { MOCK_MANAGER_DATA } from "../../helpers/manager-mock.helper";
import { MOCK_KPI_DATA } from "../helpers/kpi-mock.helper";
import { useTranslations } from "next-intl";
import { ClientMonthlyOverview } from "../components/client-monthly-overview.component";
import { TotalIncomingTickets } from "../components/total-incoming-tickets.component";
import { AvgResponseTime } from "../components/avg-response-time.component";
import { AgentSatisfaction } from "../components/agent-satisfaction.component";
import { SupportTrafficActivity } from "../components/support-traffic-activity.component";
import { InventoryControlTable } from "../components/inventory-control-table.component";

interface ManagerViewProps extends PageProps {
  user?: unknown;
}

export const ManagerView: React.FC<ManagerViewProps> = () => {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      {/* Layout de duas colunas */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Coluna da esquerda - Cards principais em azul */}
        <div className="xl:col-span-1 space-y-6 mx-auto">
          {/* Card principal - Visão Geral de Clientes */}
          <ClientMonthlyOverview />
        </div>

        {/* Coluna da direita - Interface limpa e organizada */}
        <div className="xl:col-span-3 space-y-6">
          {/* KPIs principais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TotalIncomingTickets
              value={MOCK_KPI_DATA.totalIncomingTickets.value}
              percentage={MOCK_KPI_DATA.totalIncomingTickets.percentage}
              translations={{
                title: t("dashboard.stats.totalIncomingTickets"),
              }}
            />

            <AvgResponseTime
              value={MOCK_KPI_DATA.avgResponseTime.value}
              translations={{
                title: t("dashboard.stats.avgResponseTime"),
              }}
            />

            <AgentSatisfaction
              value={MOCK_KPI_DATA.agentSatisfaction.value}
              translations={{
                title: t("dashboard.stats.agentSatisfaction"),
              }}
            />
          </div>

          {/* Tráfego de Atividades de Suporte */}
          <SupportTrafficActivity
            translations={{
              title: t("dashboard.stats.supportTrafficActivity"),
              description: t("dashboard.stats.supportTrafficDescription"),
              totalTickets: t("dashboard.stats.totalTickets"),
              percentage: "+5%",
            }}
          />

          {/* Controle de Estoque */}
          <InventoryControlTable
            inventory={MOCK_MANAGER_DATA.inventory}
            translations={{
              title: t("dashboard.manager.inventoryControl.title"),
              subtitle: t("dashboard.manager.inventoryControl.subtitle"),
              addItem: t("dashboard.manager.inventoryControl.addItem"),
              status: t("dashboard.manager.inventoryControl.status"),
              itemName: t("dashboard.manager.inventoryControl.itemName"),
              quantity: t("dashboard.manager.inventoryControl.quantity"),
              rowsSelected: t(
                "dashboard.manager.inventoryControl.rowsSelected",
              ),
              previous: t("dashboard.manager.inventoryControl.previous"),
              next: t("dashboard.manager.inventoryControl.next"),
            }}
          />

          {/* Atividades Recentes */}
          <Card className="bg-card border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-card-foreground flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>{t("dashboard.views.manager.activities.title")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_MANAGER_DATA.activities.slice(0, 3).map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 p-4 bg-card rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-all duration-200 relative"
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${
                        activity.type === "order"
                          ? "bg-blue-500"
                          : activity.type === "delivery"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                      } rounded-l-xl`}
                    ></div>
                    <div
                      className={`w-8 h-8 ${
                        activity.type === "order"
                          ? "bg-blue-100"
                          : activity.type === "delivery"
                            ? "bg-green-100"
                            : "bg-yellow-100"
                      } rounded-lg flex items-center justify-center ml-3`}
                    >
                      {activity.type === "order" ? (
                        <ShoppingCart className="w-4 h-4 text-blue-600" />
                      ) : activity.type === "delivery" ? (
                        <Truck className="w-4 h-4 text-green-600" />
                      ) : (
                        <Package className="w-4 h-4 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-card-foreground">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
