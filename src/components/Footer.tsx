import React from "react";
import Image from "next/image";
import Logo from "@/assets/BASE-NIGERIA.png"; 

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-6 sm:py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <Image
            src={Logo}
            alt="Base Nigeria Logo"
            width={40}
            height={40}
            className="w-36 h-8 sm:w-48 sm:h-12"
          />
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
          <a href="#" className="text-gray-400 hover:text-emerald-300">
            Code of Conduct
          </a>
          <a href="#" className="text-gray-400 hover:text-emerald-300">
            Contributing Guidelines
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;