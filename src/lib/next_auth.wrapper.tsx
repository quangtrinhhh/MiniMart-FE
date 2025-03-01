"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface NextAuthWrapperProps {
  children: ReactNode;
}

export default function NextAuthWrapper({ children }: NextAuthWrapperProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
