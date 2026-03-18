"use client";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import { LanguageProvider } from "./LanguageProvider";
import LanguageToggle from "./LanguageToggle";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname();
  const showNavigation = pathname !== "/admin" && pathname !== "/thank-you";

  return (
    <LanguageProvider>
      {showNavigation && <Navigation />}
      {showNavigation && <LanguageToggle />}
      {children}
    </LanguageProvider>
  );
} 