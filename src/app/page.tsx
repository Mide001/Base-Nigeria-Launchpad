"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, FileText, GitPullRequest, Github, Menu, X } from "lucide-react";
import Logo from "@/assets/BASE-NIGERIA-LOGO.png";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import WestAfricanProducts from "@/components/WestAfricanProducts";
import PointSystemAndLeaderboard from "@/components/PointSystemAndLeaderboard";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <div className="sticky top-0 z-50 bg-gray-800/90 backdrop-blur-md border-b border-gray-700">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image
              src={Logo}
              alt="Base Nigeria Logo"
              width={40}
              height={40}
              className="w-10 h-10 sm:w-14 sm:h-14"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="https://github.com/Mide001/Base-Africa-Dao/"
              target="_blank"
              className="flex items-center space-x-2 hover:text-emerald-300 transition"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://github.com/Mide001/Base-Africa-Dao/issues"
              className="flex items-center space-x-2 hover:text-emerald-300 transition"
            >
              <GitPullRequest className="w-5 h-5" />
              <span>Contribute</span>
            </a>
            <Link
              href="https://t.me/+kQO46PtAQhs3NGQ0"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
            >
              Join Community
            </Link>
          </nav>

          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 hover:bg-gray-700 rounded-lg transition"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleSidebar}
          />

          <div className="fixed right-0 top-0 h-auto w-full bg-gray-800 p-6 shadow-xl transform transition-transform rounded-b-2xl">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center space-x-3">
                <Image
                  src={Logo}
                  alt="Base Nigeria Logo"
                  width={40}
                  height={40}
                  className="w-9 h-9 sm:w-14 sm:h-14"
                />
              </div>
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-700 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col space-y-6">
              <a
                href="https://github.com/Mide001/Base-Africa-Dao/"
                target="_blank"
                className="flex items-center space-x-2 hover:text-emerald-300 transition"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://github.com/Mide001/Base-Africa-Dao/issues"
                className="flex items-center space-x-2 hover:text-emerald-300 transition"
              >
                <GitPullRequest className="w-5 h-5" />
                <span>Contribute</span>
              </a>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition w-full">
                Join Community
              </button>
            </nav>
          </div>
        </div>
      )}

      <div className="flex-grow flex flex-col">
        <main className="hero-gradient relative overflow-hidden flex-grow">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          </div>

          <div className="container mx-auto px-4 pt-8 sm:pt-16 pb-12 sm:pb-24 grid md:grid-cols-2 gap-8 sm:gap-12 items-center relative z-10">
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm border border-gray-700/50">
                Open Source Community Project
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-300 leading-tight">
                Think Global, Solve Local: Onchain Nigeria
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
                {"We're"} building blockchain solutions that solve real
                challenges for Nigerian communities, bridging technology and
                local needs to onboard the next million users to the Onchain
                Economy.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/ideas"
                  className="bg-emerald-600/90 backdrop-blur-sm text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-emerald-600 transition text-sm sm:text-base"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>See Ideas</span>
                </Link>
                <Link
                  href="#how-it-works"
                  className="border border-gray-700/50 backdrop-blur-sm text-gray-300 px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-gray-800/50 transition text-center text-sm sm:text-base"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <Features />
          </div>
        </main>
      </div>
      <WestAfricanProducts />
      <PointSystemAndLeaderboard />
      <Footer />
    </div>
  );
}
