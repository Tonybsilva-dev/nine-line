"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <div suppressHydrationWarning>{children}</div>
    </SessionProvider>
  );
};

export default AuthProvider;
