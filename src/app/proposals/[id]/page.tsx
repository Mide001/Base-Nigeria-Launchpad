"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ThumbsUp,
  MessageCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import comments from "./comments.json";

enum ProposalStatus {
  Active,
  UnderReview,
  Implemented,
  Rejected,
}

interface Proposal {
  id: number;
  title: string;
  description: string;
  author: string;
  status: ProposalStatus;
  votes: number;
  votesFor: number;
  votesAgainst: number;
  comments: number;
  date: number;
  category: string;
  implementationTarget?: number;
}

const proposals: Proposal[] = [
  {
    id: 1,
    title: "Blockchain-Based Digital Identity System",
    description:
      "A comprehensive proposal to implement a decentralized digital identity system using blockchain technology to enhance security and user control over personal information.",
    author: "0xABCD1234UserWallet",
    status: ProposalStatus.Active,
    votes: 156,
    votesFor: 120,
    votesAgainst: 36,
    comments: 23,
    date: 1710460800,
    category: "Identity & Security",
    implementationTarget: 1725907200,
  },
];

const ProposalDetails: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [activeTab, setActiveTab] = useState<"details" | "comments">("details");
  const [showDetails, setShowDetails] = useState(false);

  const proposal = proposals.find((p) => p.id === parseInt(params.id));

  if (!proposal) {
    return <div className="text-center text-red-500">Proposal Not Found</div>;
  }

  const getStatusColor = (status: ProposalStatus) => {
    switch (status) {
      case ProposalStatus.Active:
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
      case ProposalStatus.Implemented:
        return "bg-blue-500/15 text-blue-400 border-blue-500/20";
      case ProposalStatus.UnderReview:
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case ProposalStatus.Rejected:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white">
      <div className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 pt-6 md:pt-8">
          <Link
            href="/proposals"
            className="flex items-center text-sm text-gray-500 hover:text-emerald-300 transition-colors group"
          >
            <ArrowLeft className="mr-1 w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
            Back
          </Link>
        </div>
      </div>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
          <div className="mb-4">
            <div className="flex flex-wrap gap-4 justify-between items-start mb-4">
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    proposal.status
                  )}`}
                >
                  {ProposalStatus[proposal.status]}
                </span>
                <h2 className="text-xl font-bold text-emerald-300 mt-2">
                  {proposal.title}
                </h2>
              </div>
            </div>

            {/* Voting Section */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-700">
              <div className="flex items-center gap-2 text-gray-400">
                <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-base font-medium">
                  {proposal.votes} Votes
                </span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-base font-medium sm:block hidden">
                  Votes For
                </span>
                <span className="text-xs sm:text-base font-medium">
                  {proposal.votesFor}
                </span>
              </div>
              <div className="flex items-center gap-2 text-red-400">
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-base font-medium sm:block hidden">
                  Votes Against
                </span>
                <span className="text-xs sm:text-base font-medium">
                  {proposal.votesAgainst}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-base font-medium">
                  {proposal.comments} Comments
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("details")}
            className={`text-xs sm:text-base px-3 sm:px-4 py-1 sm:py-2 rounded-lg transition-all duration-300 ${
              activeTab === "details"
                ? "bg-emerald-500/20 text-emerald-400"
                : "text-gray-400 hover:bg-gray-800"
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab("comments")}
            className={`text-xs sm:text-base px-3 sm:px-4 py-1 sm:py-2 rounded-lg transition-all duration-300 ${
              activeTab === "comments"
                ? "bg-emerald-500/20 text-emerald-400"
                : "text-gray-400 hover:bg-gray-800"
            }`}
          >
            Comments
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800/50 rounded-xl p-6">
          {activeTab === "details" && (
            <div className="prose prose-invert max-w-none">
              <h3 className="text-emerald-300">Proposal Description</h3>
              <p>{proposal.description}</p>
            </div>
          )}

          {activeTab === "comments" && (
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-gray-800/50 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-emerald-400">
                          {comment.author}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                      </div>
                     
                    </div>
                    <p className="text-gray-300 text-sm">{comment.content}</p>
                    {comment.replies > 0 && (
                      <div className="text-xs text-gray-400 mt-2">
                        {comment.replies} repl
                        {comment.replies === 1 ? "y" : "ies"}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          )}
          <div className="bg-gray-700/30 rounded-lg p-4">
            <textarea
              placeholder="Add a comment..."
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-gray-300 focus:outline-none focus:border-emerald-500 transition-colors duration-300"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                Post Comment
              </button>
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 mt-6">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex justify-between items-center p-4 border-b border-gray-700"
          >
            <span className="text-emerald-300">
              Additional Proposal Information
            </span>
            {showDetails ? (
              <ChevronUp className="text-white" />
            ) : (
              <ChevronDown className="text-white" />
            )}
          </button>

          {showDetails && (
            <div className="p-4 space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>Category</span>
                <span className="text-emerald-400">{proposal.category}</span>
              </div>
              {proposal.implementationTarget && (
                <div className="flex justify-between text-gray-400">
                  <span>Target Implementation</span>
                  <span className="text-emerald-400">
                    {new Date(
                      proposal.implementationTarget * 1000
                    ).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-gray-400">
                <span>Total Votes</span>
                <span className="text-emerald-400">{proposal.votes}</span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProposalDetails;
