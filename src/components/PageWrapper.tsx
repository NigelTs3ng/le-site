"use client";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname();
  const showNavigation = pathname !== "/admin" && pathname !== "/thank-you";

  return (
    <>
      {showNavigation && <Navigation />}
      {children}
    </>
  );
} 