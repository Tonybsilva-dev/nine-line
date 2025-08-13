import { Suspense } from "react";
import { ManagerContainer } from "@/domains/(protected)/manager/container/manager.container";

export default function ManagerPage() {
  return (
    <Suspense>
      <ManagerContainer />
    </Suspense>
  );
}
