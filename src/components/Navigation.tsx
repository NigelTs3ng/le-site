"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Image src="/le-logo.png" alt="LE" width={32} height={32} />
              <span className="text-lg font-semibold text-blue-900">Leading Edge</span>
            </div>
          </Link>

          {/* Right side - Navigation links */}
          <div className="flex items-center space-x-6">
            <Link href="/about" className="text-blue-900 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/apply" className="text-blue-900 hover:text-blue-600 transition-colors">
              Apply
            </Link>
            <Link href="/contact" className="text-blue-900 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}