import React, { useState } from "react";
import {
  X,
  PlusCircle,
  FileText,
  Layers,
  Tag,
  ChevronDown,
  Info,
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

const NewProposalModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    category: string;
  }) => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const { data: hash, writeContractAsync } = useWriteContract();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast, hideToast, toast } = useToast();

  // Handle viewport locking/unlocking when modal opens/closes
  if (isOpen) {
    ViewportManager.lockViewport();
  }

  const handleClose = () => {
    ViewportManager.unlockViewport();
    onClose();
  };

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError("Proposal title is required");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (!description.trim()) {
      setDescriptionError("Proposal description is required");
      isValid = false;
    } else if (description.length < 50) {
      setDescriptionError("Description must be at least 50 characters");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (!category) {
      setCategoryError("Please select a category");
      isValid = false;
    } else {
      setCategoryError("");
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
      const transactionHash = await writeContractAsync({
        address: BaseAfricaDaoAddress,
        abi: BaseAfricaDaoABI,
        functionName: "createProposal",
        args: [title, description, category],
      });

      if (transactionHash) {
        showToast(
          `Proposal created successfully! TX: ${transactionHash.slice(
            0,
            10
          )}...`,
          "success"
        );

        setTitle("");
        setDescription("");
        setCategory("");
        onClose();
      }
    } catch (error) {
      showToast("Error creating proposal", "error");
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
            <PlusCircle className="w-6 h-6 sm:w-8 sm:h-8" />
            Create New Proposal
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
              Proposal Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a concise and clear proposal title"
              inputMode="text"
              autoComplete="off"
              className={inputClassName}
            />
            {titleError && (
              <p className="text-red-400 text-xs mt-1">{titleError}</p>
            )}
          </div>

          <div>
            <label className="flex items-center text-xs text-gray-300 mb-1 sm:mb-2 gap-2">
              <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
              Detailed Description
            </label>
            <div className="space-y-2">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a comprehensive explanation of your proposal, its impact, and implementation strategy"
                rows={4}
                inputMode="text"
                autoComplete="off"
                className={inputClassName}
              />
              <div className="flex items-start gap-2 text-gray-400 text-xs">
                <Info className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                <p>
                  Press Enter twice to create a new paragraph. Use single Enter
                  for line breaks within paragraphs.
                </p>
              </div>
            </div>
            {descriptionError && (
              <p className="text-red-400 text-xs mt-1">{descriptionError}</p>
            )}
          </div>

          <div>
            <label className="flex items-center text-xs text-gray-300 mb-1 sm:mb-2 gap-2">
              <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClassName}
              >
                <option value="" className="text-gray-500">
                  Select a Category
                </option>
                <option value="Financial Services">Financial Services</option>
                <option value="Education">Education</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Healthcare">Healthcare</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
            </div>
            {categoryError && (
              <p className="text-red-400 text-xs mt-1">{categoryError}</p>
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
              <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
            {isSubmitting ? "Creating Proposal..." : "Submit Proposal"}
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

export default NewProposalModal;
