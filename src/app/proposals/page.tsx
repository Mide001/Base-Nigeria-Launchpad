"use client";
import React, { useState, useMemo } from "react";
import {
  Terminal,
  ArrowRight,
  ThumbsUp,
  MessageCircle,
  PlusCircle,
  Calendar,
  Filter,
  Search,
} from "lucide-react";
import Link from "next/link";
import NewProposalModal from "@/components/NewProposalModal";
import FilterModal from "@/components/FilterModal";

enum ProposalStatus {
  Active = "active",
  UnderReview = "in development",
  Implemented = "completed",
  Rejected = "rejected",
}

const proposals = [
  {
    id: 1,
    title: "Blockchain-Based Digital Identity System for Rural Communities",
    description:
      "Implement a secure and accessible digital identity system using blockchain technology to help rural communities access financial services and government benefits.",
    status: ProposalStatus.Active,
    votes: 156,
    comments: 23,
    date: "03/28/2024",
    author: "Oluwaseun A.",
    category: "Identity",
  },
  {
    id: 2,
    title: "Decentralized Agricultural Supply Chain Platform",
    description:
      "Create a transparent supply chain platform to connect farmers directly with buyers, reducing intermediaries and ensuring fair pricing.",
    status: ProposalStatus.Implemented,
    votes: 89,
    comments: 15,
    date: "10/03/2024",
    author: "Chioma B.",
    category: "Agriculture",
  },
  {
    id: 3,
    title: "Community-Driven Solar Power Grid",
    description:
      "Develop a blockchain-based system for managing community solar power generation and distribution in off-grid areas.",
    status: ProposalStatus.UnderReview,
    votes: 234,
    comments: 45,
    date: "02/15/2024",
    author: "Mohammed K.",
    category: "Energy",
  },
];

const getStatusColor = (status: ProposalStatus) => {
  switch (status) {
    case ProposalStatus.Active:
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
    case ProposalStatus.UnderReview:
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    case ProposalStatus.Implemented:
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    default:
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
  }
};

export default function Proposals() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<ProposalStatus[]>([
    ProposalStatus.Active,
    ProposalStatus.Implemented,
    ProposalStatus.UnderReview,
  ]);

  const filteredProposals = useMemo(() => {
    return proposals.filter(
      (proposal) =>
        selectedStatus.includes(proposal.status) &&
        proposal.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, selectedStatus]);

  const handleSubmitProposal = (proposalData: any) => {
    console.log("New Proposal:", proposalData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <Terminal className="text-emerald-400 w-5 h-5 sm:w-8 sm:h-8 transition-transform group-hover:scale-110 duration-300" />
            <span className="text-base sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              Base Africa DAO
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:py-12 relative">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
          <div className="relative w-full sm:flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search proposals..."
              className="w-full text-base sm:text-sm bg-gray-800/50 border border-gray-700 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              inputMode="text"
              autoComplete="off"
            />
          </div>
          <div className="flex-grow sm:flex-grow-0 relative w-full sm:w-auto">
            <div className="flex gap-4 sm:ml-4 items-center justify-end">
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="hidden sm:flex items-center justify-center gap-2 px-4 h-10 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-xl transition-all duration-300"
                >
                  <Filter className="w-5 h-5" />
                  <span className="text-sm">Filter</span>
                </button>
                {isFilterOpen && (
                  <FilterModal
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                  />
                )}
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="hidden sm:flex items-center justify-center gap-2 px-4 h-10 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <PlusCircle className="w-5 h-5" />
                <span className="text-sm whitespace-nowrap">New Proposal</span>
              </button>

              {/* Mobile buttons */}
              <div className="flex sm:hidden gap-2">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center justify-center w-12 h-10 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-xl transition-all duration-300"
                >
                  <Filter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center w-12 h-10 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <PlusCircle className="w-5 h-5" />
                </button>
              </div>

              <NewProposalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitProposal}
              />
            </div>
          </div>
        </div>
        {/* Proposals Grid */}
        <div className="grid gap-6">
          {filteredProposals.length > 0 ? (
            filteredProposals.map((proposal) => (
              <div
                key={proposal.id}
                className="group bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 p-6 hover:bg-gray-800/80"
              >
                {/* Proposal card content remains the same */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 items-center mb-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          proposal.status
                        )}`}
                      >
                        {proposal.status}
                      </span>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-300 border border-gray-600/50">
                        {proposal.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-emerald-300 group-hover:text-emerald-200 transition-colors duration-300">
                      {proposal.title}
                    </h2>
                  </div>
                  <span className="text-sm text-gray-400 flex items-center shrink-0">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(proposal.date).toDateString()}
                  </span>
                </div>

                <span className="text-gray-300 mb-6 leading-relaxed text-xs sm:text-base line-clamp-3">
                  {proposal.description.length > 150
                    ? `${proposal.description.slice(0, 150)}...`
                    : proposal.description}
                </span>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-700/50">
                  <div className="flex flex-wrap items-center gap-4">
                    <button className="flex items-center gap-1 text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                      <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">
                        {proposal.votes}
                      </span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                      <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">
                        {proposal.comments}
                      </span>
                    </button>

                    <span className="text-xs sm:text-sm text-gray-400">
                      by{" "}
                      <span className="text-emerald-400">
                        {proposal.author}
                      </span>
                    </span>
                  </div>
                  <Link
                    href={`/proposals/${proposal.id}`}
                    className="self-end sm:self-auto flex items-center text-xs sm:text-base text-emerald-400 hover:text-emerald-300 transition-colors duration-300 group/link"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">
              No proposals match your current filter criteria.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
