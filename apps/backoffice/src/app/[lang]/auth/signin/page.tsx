import { Metadata } from "next";
import { Suspense } from "react";
import { SignInContainer } from "@/domains/(public)/auth/container/signin.container";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function SignInPage() {
  return (
    <Suspense>
      <SignInContainer />
    </Suspense>
  );
}
