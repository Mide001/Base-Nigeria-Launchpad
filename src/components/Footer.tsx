import { Terminal } from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 border-t border-gray-700 py-6 sm:py-8 mt-auto">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <Terminal className="text-emerald-400 w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-sm sm:text-base font-bold text-emerald-300">
              Base Nigeria
            </span>
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
    </>
  );
};

export default Footer;
