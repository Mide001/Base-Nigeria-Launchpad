"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, GitPullRequest, Menu, X } from "lucide-react";
import Logo from "@/assets/BASE-NIGERIA-LOGO.png";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-gray-800/90 backdrop-blur-md border-b border-gray-700">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image
              src={Logo}
              alt="Base West Africa Logo"
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

      {/* Mobile Sidebar */}
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
                  alt="Base West Africa Logo"
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
    </>
  );
} 