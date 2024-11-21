import React, { useState } from "react";
import {
  X,
  PlusCircle,
  FileText,
  Layers,
  Tag,
  ChevronDown,
} from "lucide-react";

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

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({ title, description, category });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-2xl mx-auto border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600/80 to-emerald-500/80 p-4 sm:p-6 flex justify-between items-center">
          <h2 className="text-xl sm:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
            <PlusCircle className="w-6 h-6 sm:w-8 sm:h-8" />
            Create New Proposal
          </h2>
          <button
            onClick={onClose}
            className="text-white bg-white/20 hover:bg-white/30 rounded-full p-1 sm:p-2 transition-all"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
          <div>
            <label className="flex items-center text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2 gap-2">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
              Proposal Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a concise and clear proposal title"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {titleError && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {titleError}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-center text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2 gap-2">
              <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
              Detailed Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a comprehensive explanation of your proposal, its impact, and implementation strategy"
              rows={4}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {descriptionError && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {descriptionError}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-center text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2 gap-2">
              <Tag className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-base text-white appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="" className="text-gray-500">
                  Select a Category
                </option>
                <option value="Identity">Identity</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Energy">Energy</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
            </div>
            {categoryError && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {categoryError}
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-3 sm:py-4 rounded-xl hover:from-emerald-500 hover:to-emerald-400 transition-all text-sm sm:text-lg font-semibold hover:scale-[1.02] active:scale-100"
          >
            <PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            Submit Proposal
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProposalModal;
