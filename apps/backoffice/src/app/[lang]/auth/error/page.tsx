import { Suspense } from "react";
import { AuthErrorContainer } from "@/domains/(public)/auth/container/error.container";

export default function AuthErrorPage() {
  return (
    <Suspense>
      <AuthErrorContainer />
    </Suspense>
  );
}
