"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from '@/context/AuthContext';
import React from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
} 