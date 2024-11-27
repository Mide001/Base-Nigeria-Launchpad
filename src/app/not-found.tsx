"use client";
import Link from "next/link";
import Image from "next/image";
import { FileText } from "lucide-react";
import Logo from "@/assets/BASE-NIGERIA-LOGO.png";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="sticky top-0 z-50 bg-gray-800/90 backdrop-blur-md border-b border-gray-700">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image
              src={Logo}
              alt="Base Nigeria Logo"
              width={40}
              height={40}
              className="w-10 h-10 sm:w-12 sm:h-12"
              priority
            />
          </div>
        </div>
      </div>

      <main className="hero-gradient relative overflow-hidden flex-grow flex items-center justify-center px-4">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-10 right-0 sm:right-10 w-32 sm:w-72 h-32 sm:h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 sm:-bottom-20 -left-10 sm:-left-20 w-48 sm:w-96 h-48 sm:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        </div>

        <div className="container mx-auto text-center relative z-10 max-w-xl">
          <div className="bg-gray-800/50 backdrop-blur-sm inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm border border-gray-700/50 mb-4">
            404 Error
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-300 leading-tight mb-4">
            Page Not Found
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed mb-8 px-4 sm:px-0">
            The page you are looking for seems to have wandered off the
            blockchain.
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-0">
            <Link
              href="/"
              className="bg-emerald-600/90 backdrop-blur-sm text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-emerald-600 transition text-sm sm:text-base"
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Go to Homepage</span>
            </Link>
            <Link
              href="/ideas"
              className="border border-gray-700/50 backdrop-blur-sm text-gray-300 px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-gray-800/50 transition text-center text-sm sm:text-base"
            >
              View Ideas
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
