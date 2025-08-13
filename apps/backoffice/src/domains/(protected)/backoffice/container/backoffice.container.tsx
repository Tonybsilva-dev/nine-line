"use client";

import { DASHBOARD_NAVIGATION } from "@/core/modules/constants/dashboard.constants";
import { DashboardLayout } from "@/core/modules/layouts/dashboard-layout.component";
import { BackofficeView } from "../view/backoffice.view";

import { useTranslations } from "next-intl";
import { MOCK_BACKOFFICE_USER } from "../../helpers/dashboard-mock.helper";

export const BackofficeContainer = () => {
  const t = useTranslations("dashboard");

  const navigation = DASHBOARD_NAVIGATION.backoffice.map((item) => ({
    ...item,
    isActive: item.href === "/backoffice",
  }));

  const breadcrumbs = [{ label: "dashboard" }, { label: "backoffice" }];

  return (
    <DashboardLayout
      user={MOCK_BACKOFFICE_USER}
      navigation={navigation}
      breadcrumbs={breadcrumbs}
    >
      <BackofficeView params={{ translations: t }} />
    </DashboardLayout>
  );
};
