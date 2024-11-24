"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ThumbsUp, MessageCircle, ThumbsUpIcon } from "lucide-react";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Footer from "@/components/Footer";
import { BaseAfricaDaoABI, BaseAfricaDaoAddress } from "@/constants/constants";

enum ProposalStatus {
  Active,
  UnderReview,
  Implemented,
  Rejected,
}

type ProposalArray = [string, string, string, string, bigint, number];

interface ProposalData {
  author: string;
  title: string;
  description: string;
  category: string;
  status: ProposalStatus;
  votes: number;
}

const ProposalDetails: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [activeTab, setActiveTab] = useState<"details" | "comments">("details");
  const [newComment, setNewComment] = useState("");
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  
  const { address } = useAccount();

  const { data: proposalArray, isLoading } = useReadContract({
    abi: BaseAfricaDaoABI,
    address: BaseAfricaDaoAddress,
    functionName: "getProposal",
    args: [params.id],
  });

  const { data: commentsData, isLoading: isCommentsLoading } = useReadContract({
    abi: BaseAfricaDaoABI,
    address: BaseAfricaDaoAddress,
    functionName: "getComments",
    args: [params.id],
  });

  const { data: hash, writeContractAsync } = useWriteContract();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!proposalArray) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="text-red-500">Proposal Not Found</div>
      </div>
    );
  }

  const [author, title, description, category, votes, status] =
    proposalArray as ProposalArray;

  const cleanCategory = category.replace(/\0/g, "").trim();

  const proposal: ProposalData = {
    author,
    title,
    description,
    category: cleanCategory,
    votes: Number(votes),
    status: Number(status) as ProposalStatus,
  };

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

  const truncateAddress = (
    str: string,
    frontChars = 4,
    backChars = 3
  ): string => {
    if (!str) return "";
    if (str.length <= frontChars + backChars) return str;
    return `${str.slice(0, frontChars)}...${str.slice(-backChars)}`;
  };

  const processCommentContent = (content: string) => {
    if (!content || !content.startsWith("0x")) {
      console.error(
        "Invalid content format. Expected a hex string starting with '0x'."
      );
      return "";
    }

    try {
      return Buffer.from(content.slice(2), "hex")
        .toString("utf-8")
        .replace(/\u0000/g, "");
    } catch (error) {
      console.error("Error processing comment content:", error);
      return "";
    }
  };

  const onSupport = async () => {
    if (!address) {
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 3000); // Hide alert after 3 seconds
      return;
    }

    try {
      const transactionHash = await writeContractAsync({
        address: BaseAfricaDaoAddress,
        abi: BaseAfricaDaoABI,
        functionName: "upvoteProposal",
        args: [params.id],
      });

      console.log("Supporting proposal:", transactionHash);
    } catch (error) {
      console.error("Error supporting proposal:", error);
    }
  };

  const handleAddComment = async () => {
    if (!address) {
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 3000);
      return;
    }

    if (newComment.trim() === "") {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      const transactionHash = await writeContractAsync({
        address: BaseAfricaDaoAddress,
        abi: BaseAfricaDaoABI,
        functionName: "addComment",
        args: [params.id, newComment],
      });

      console.log(transactionHash);
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white">
        {showLoginAlert && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm">
            <Alert variant="destructive" className="bg-red-950 border-red-900">
              <AlertTitle className="text-red-400">Authentication Required</AlertTitle>
              <AlertDescription className="text-red-200">
                Please connect your wallet to support this proposal.
              </AlertDescription>
            </Alert>
          </div>
        )}
        
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
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        proposal.status
                      )}`}
                    >
                      {ProposalStatus[proposal.status]}
                    </span>
                    <span className="text-emerald-400">
                      {proposal.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-emerald-300 mt-2">
                    {proposal.title}
                  </h2>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-700">
                <div className="flex items-center gap-2 text-gray-400">
                  <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-base font-medium">
                    {proposal.votes} Votes
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  {isCommentsLoading ? (
                    <></>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-base font-medium">
                        {commentsData?.length} Comments
                      </span>
                    </>
                  )}
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

          <div className="bg-gray-800/50 rounded-xl p-6">
            {activeTab === "details" && (
              <div className="prose prose-invert max-w-none">
                <h3 className="text-emerald-300 text-xl font-semibold tracking-wide mb-4 uppercase">
                  PROPOSAL DESCRIPTION
                </h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-base mb-6">
                  {proposal.description}
                </p>
                <div className="flex items-center justify-center border-t border-gray-700 pt-6">
                  <div className="flex flex-col items-center gap-2">
                    <button
                      className={`flex items-center justify-center w-12 h-12 rounded-full 
                        ${address ? 'bg-emerald-500/20 hover:bg-emerald-500/30' : 'bg-gray-500/20'} 
                        ${address ? 'text-emerald-400' : 'text-gray-400'} 
                        transition-all duration-300 
                        ${address ? 'hover:scale-110 active:scale-95' : ''}`}
                      onClick={onSupport}
                      title={address ? "Support Proposal" : "Connect wallet to support"}
                    >
                      <ThumbsUpIcon className="w-6 h-6" />
                    </button>
                    <span className={`text-xs font-medium ${address ? 'text-emerald-400' : 'text-gray-400'}`}>
                      Support
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "comments" && (
              <div className="space-y-4">
                {commentsData && commentsData.length > 0 ? (
                  commentsData.map((comment, index) => (
                    <div
                      key={index}
                      className="border border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-emerald-400">
                            {truncateAddress(comment.commenter)}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(
                              Number(comment.timestamp) * 1000
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">
                        {processCommentContent(comment.content)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400">
                    No comments yet. Be the first to comment!
                  </p>
                )}

                <div>
                  <textarea
                    placeholder={address ? "Add a comment..." : "Connect wallet to comment"}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full bg-transparent border border-gray-700 rounded-lg p-3 text-gray-300 focus:outline-none focus:border-emerald-500 transition-colors duration-300"
                    rows={5}
                    disabled={!address}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleAddComment}
                      className={`${
                        address 
                          ? 'bg-emerald-600 hover:bg-emerald-500' 
                          : 'bg-gray-600 cursor-not-allowed'
                      } text-xs text-white px-4 py-2 rounded-lg transition-colors duration-300`}
                      disabled={!address}
                    >
                      {address ? 'Add Comment' : 'Connect Wallet to Comment'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ProposalDetails;