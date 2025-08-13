import { Suspense } from "react";
import { BackofficeContainer } from "@/domains/(protected)/backoffice/container/backoffice.container";

export default function BackofficePage() {
  return (
    <Suspense>
      <BackofficeContainer />
    </Suspense>
  );
}
