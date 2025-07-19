'use client';
import React, { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { TRPCReactProvider } from "~/trpc/react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Show loading for 3s
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Navbar />
      {loading ? <LoadingScreen /> : <TRPCReactProvider>{children}</TRPCReactProvider>}
      <Footer />
    </>
  );
} 