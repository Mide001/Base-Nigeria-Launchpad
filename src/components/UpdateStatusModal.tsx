import React, { useState } from "react";
import {
  X,
  RefreshCcw,
  FileText,
  User,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import { useWriteContract } from "wagmi";
import { BaseAfricaDaoAddress, BaseAfricaDaoABI } from "@/constants/constants";
import { Toast, useToast } from "./Toast";

class ViewportManager {
  static lockViewport() {
    let viewportMeta = document.querySelector(
      'meta[name="viewport"]'
    ) as HTMLMetaElement;
    if (!viewportMeta) {
      viewportMeta = document.createElement("meta");
      viewportMeta.name = "viewport";
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.content =
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
  }

  static unlockViewport() {
    const viewportMeta = document.querySelector(
      'meta[name="viewport"]'
    ) as HTMLMetaElement;
    if (viewportMeta) {
      viewportMeta.content = "width=device-width, initial-scale=1.0";
    }
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.height = "";
  }
}

const STATUS_MAP = {
  Active: 0,
  InDevelopment: 1,
  Completed: 2,
  Deleted: 3,
} as const;

type StatusKey = keyof typeof STATUS_MAP;

const UpdateStatusModal = ({
  isOpen,
  onClose,
  proposalId,
  currentStatus,
}: {
  isOpen: boolean;
  onClose: () => void;
  proposalId: string;
  currentStatus: number;
}) => {
  const [newStatus, setNewStatus] = useState<string>(() => {
    const matchedStatus = (Object.keys(STATUS_MAP) as StatusKey[]).find(
      (key) => STATUS_MAP[key] === currentStatus
    );
    return matchedStatus || "";
  });

  const [farcasterUsername, setFarcasterUsername] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [statusError, setStatusError] = useState("");
  const [farcasterError, setFarcasterError] = useState("");
  const [telegramError, setTelegramError] = useState("");

  const { data: hash, writeContractAsync } = useWriteContract();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast, hideToast, toast } = useToast();

  if (isOpen) {
    ViewportManager.lockViewport();
  }

  const handleClose = () => {
    ViewportManager.unlockViewport();
    onClose();
  };

  const validateForm = () => {
    let isValid = true;

    if (!newStatus) {
      setStatusError("Please select a new status");
      isValid = false;
    } else {
      setStatusError("");
    }

    if (!farcasterUsername.trim()) {
      setFarcasterError("Farcaster username is required");
      isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(farcasterUsername.trim())) {
      setFarcasterError("Invalid Farcaster username format");
      isValid = false;
    } else {
      setFarcasterError("");
    }

    if (!telegramUsername.trim()) {
      setTelegramError("Telegram username is required");
      isValid = false;
    } else {
      setTelegramError("");
    }

    return isValid;
  };

  const handleSubmit = async () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const STATUS_MAP: { [key: string]: number } = {
        Active: 0,
        InDevelopment: 1,
        Completed: 2,
        Deleted: 3,
      };

      const transactionHash = await writeContractAsync({
        address: BaseAfricaDaoAddress,
        abi: BaseAfricaDaoABI,
        functionName: "updateProposalStatus",
        args: [
          proposalId,
          STATUS_MAP[newStatus],
          farcasterUsername,
          telegramUsername,
        ],
      });

      if (transactionHash) {
        showToast(
          `Status updated successfully! TX: ${transactionHash.slice(0, 10)}...`,
          "success"
        );

        setNewStatus("");
        setFarcasterUsername("");
        setTelegramUsername("");
        onClose();
      }
    } catch (error) {
      showToast("Error updating proposal status", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputClassName =
    "w-full text-xs bg-gray-800/50 border border-gray-700 rounded-xl py-2 pl-2 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 [-webkit-text-size-adjust:100%] [transform:translateZ(0)] appearance-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 [transform:translateZ(0)]">
      <div className="bg-gray-900 rounded-2xl w-full max-w-2xl mx-auto border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600/80 to-emerald-500/80 p-4 sm:p-6 flex justify-between items-center">
          <h2 className="text-xl sm:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
            <RefreshCcw className="w-6 h-6 sm:w-8 sm:h-8" />
            Update Proposal Status
          </h2>
          <button
            onClick={handleClose}
            className="text-white bg-white/20 hover:bg-white/30 rounded-full p-1 sm:p-2 transition-all"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
          <div>
            <label className="flex items-center text-xs text-gray-300 mb-1 sm:mb-2 gap-2">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
              New Status
            </label>
            <div className="relative">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className={inputClassName}
              >
                <option value="" className="text-gray-500">
                  Select New Status
                </option>
                {Object.keys(STATUS_MAP).map((status) => (
                  <option key={status} value={status}>
                    {status === "InDevelopment" ? "In Development" : status}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
            </div>
            {statusError && (
              <p className="text-red-400 text-xs mt-1">{statusError}</p>
            )}
          </div>

          <div>
            <label className="flex items-center text-xs text-gray-300 mb-1 sm:mb-2 gap-2">
              <User className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
              Farcaster Username
            </label>
            <input
              type="text"
              value={farcasterUsername}
              onChange={(e) => setFarcasterUsername(e.target.value)}
              placeholder="Enter Farcaster username"
              className={inputClassName}
            />
            {farcasterError && (
              <p className="text-red-400 text-xs mt-1">{farcasterError}</p>
            )}
          </div>

          <div>
            <label className="flex items-center text-xs text-gray-300 mb-1 sm:mb-2 gap-2">
              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
              Telegram Username
            </label>
            <input
              type="text"
              value={telegramUsername}
              onChange={(e) => setTelegramUsername(e.target.value)}
              placeholder="Enter Telegram username"
              className={inputClassName}
            />
            {telegramError && (
              <p className="text-red-400 text-xs mt-1">{telegramError}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r 
            ${
              isSubmitting
                ? "from-gray-600 to-gray-500 cursor-not-allowed"
                : "from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 hover:scale-[1.02]"
            } 
            text-white py-3 sm:py-4 rounded-xl transition-all text-sm sm:text-lg font-semibold active:scale-100`}
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <RefreshCcw className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
            {isSubmitting ? "Updating Status..." : "Update Status"}
          </button>
        </div>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
          />
        )}
      </div>
    </div>
  );
};

export default UpdateStatusModal;