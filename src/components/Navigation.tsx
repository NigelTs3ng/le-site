"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navigation() {
  const [language, setLanguage] = useState("English");

  return (
    <nav className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Image src="/le-logo.png" alt="LE" width={32} height={32} />
              <span className="text-xs font-medium text-gray-600">LEADING-EDGE</span>
            </div>
            <span className="text-lg font-semibold text-blue-900">Leading Edge</span>
          </Link>

          {/* Right side - Navigation links and language selector */}
          <div className="flex items-center space-x-6">
            <Link href="/apply" className="text-blue-900 hover:text-blue-600 transition-colors">
              Apply
            </Link>
            <Link href="/contact" className="text-blue-900 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguage(language === "English" ? "中文" : "English")}
                className="flex items-center space-x-1 text-blue-900 hover:text-blue-600 transition-colors"
              >
                <span className="text-sm">🇺🇸</span>
                <span className="text-sm">{language}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 