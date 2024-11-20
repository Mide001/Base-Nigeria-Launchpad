import React from "react";
import {
  Code,
  Users,
  Terminal,
  Star,
  FileText,
  GitPullRequest,
  Github,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-gray-800/90 backdrop-blur-md border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Terminal className="text-emerald-400 w-8 h-8" />
            <span className="text-2xl font-bold text-emerald-300">
              Base Africa DAO
            </span>
          </div>
          <nav className="flex items-center space-x-6">
            <a
              href="https://github.com/base-africa-dao"
              target="_blank"
              className="flex items-center space-x-2 hover:text-emerald-300 transition"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a
              href="#contribute"
              className="flex items-center space-x-2 hover:text-emerald-300 transition"
            >
              <GitPullRequest className="w-5 h-5" />
              <span>Contribute</span>
            </a>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
              Join Community
            </button>
          </nav>
        </div>
      </header>

      <main className="hero-gradient relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        </div>


        <div className="container mx-auto px-4 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm inline-block px-4 py-2 rounded-full text-sm border border-gray-700/50">
              Open Source Community Project
            </div>
            <h1 className="text-5xl font-extrabold text-emerald-300 leading-tight">
              Think Global, Solve Local: Onchain Africa
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              We're building blockchain solutions that solve real challenges for
              African communities, bridging technology and local needs to
              onboard the next million users to the Onchain Economy.
            </p>
            <div className="flex space-x-4">
              <button className="bg-emerald-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-emerald-600 transition">
                <FileText className="w-5 h-5" />
                <span>Create Proposal</span>
              </button>
              <a
                href="#how-it-works"
                className="border border-gray-700/50 backdrop-blur-sm text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-800/50 transition"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 space-y-6 border border-gray-700/50">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-900/50 rounded-lg">
                <Star className="text-yellow-400 w-10 h-10" />
              </div>
              <div>
                <h3 className="font-bold text-emerald-300">
                  Community-Driven Innovation
                </h3>
                <p className="text-gray-400">
                  Powered by developers, for developers
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-900/50 rounded-lg">
                <Code className="text-blue-400 w-10 h-10" />
              </div>
              <div>
                <h3 className="font-bold text-emerald-300">
                  Open Source First
                </h3>
                <p className="text-gray-400">
                  Transparent, collaborative development
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Contribution Section */}
      <section id="contribute" className="bg-gray-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-emerald-300 mb-8">
            How You Can Contribute
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <GitPullRequest className="w-12 h-12 mx-auto text-blue-400 mb-4" />
                ),
                title: "Submit Proposals",
                description:
                  "Identify and articulate technical challenges in the African tech ecosystem",
              },
              {
                icon: (
                  <Users className="w-12 h-12 mx-auto text-green-400 mb-4" />
                ),
                title: "Community Voting",
                description:
                  "Help prioritize and validate community needs through transparent voting",
              },
              {
                icon: (
                  <Github className="w-12 h-12 mx-auto text-purple-400 mb-4" />
                ),
                title: "Open Source Development",
                description:
                  "Contribute code, review PRs, and help build solutions",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-emerald-600 transition"
              >
                {feature.icon}
                <h3 className="text-xl font-bold text-emerald-300 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <a
              href="https://github.com/base-africa-dao"
              target="_blank"
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg flex items-center justify-center space-x-3 mx-auto w-fit hover:bg-emerald-700 transition"
            >
              <Github className="w-6 h-6" />
              <span>View GitHub Repository</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <Terminal className="text-emerald-400 w-6 h-6" />
            <span className="font-bold text-emerald-300">Base Africa DAO</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-emerald-300">
              Code of Conduct
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-300">
              Contributing Guidelines
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-300">
              Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
