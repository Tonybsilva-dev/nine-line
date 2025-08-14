"use client";

import { DASHBOARD_NAVIGATION } from "@/core/modules/constants/dashboard.constants";
import { DashboardLayout } from "@/core/modules/layouts/dashboard-layout.component";
import { ManagerView } from "../view/manager.view";

import { useTranslations } from "next-intl";
import { MOCK_MANAGER_USER } from "../../helpers/dashboard-mock.helper";

export const ManagerContainer = () => {
  const t = useTranslations("dashboard");

  // Filtrar itens baseado no role (manager não deve ver itens isBackoffice: true)
  const navigation = DASHBOARD_NAVIGATION.manager
    .filter((item) => !item.isBackoffice)
    .map((item) => ({
      ...item,
      children: item.children?.filter((child) => !child.isBackoffice),
    }))
    .filter((item) => {
      // Remover itens que não têm children ou têm children válidos
      if (!item.children) return true;
      return item.children.length > 0;
    });

  const breadcrumbs = [{ label: "dashboard" }, { label: "manager" }];

  return (
    <DashboardLayout
      user={MOCK_MANAGER_USER}
      navigation={navigation}
      breadcrumbs={breadcrumbs}
    >
      <ManagerView params={{ translations: t }} />
    </DashboardLayout>
  );
};
