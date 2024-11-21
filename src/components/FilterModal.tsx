import React from "react";

enum ProposalStatus {
  Active = "active",
  UnderReview = "in development",
  Implemented = "completed",
  Rejected = "rejected"
}

interface FilterModalProps {
  selectedStatus: ProposalStatus[];
  onStatusChange: (status: ProposalStatus[]) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ selectedStatus, onStatusChange }) => {
  return (
    <div className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-lg z-20">
      <div className="space-y-2">
        {[
          { status: ProposalStatus.Active, label: "Active" },
          { status: ProposalStatus.Implemented, label: "Completed" },
          { status: ProposalStatus.UnderReview, label: "In Development" },
        ].map(({ status, label }) => (
          <label
            key={status}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedStatus.includes(status)}
              onChange={() => {
                onStatusChange(
                  selectedStatus.includes(status)
                    ? selectedStatus.filter((s) => s !== status)
                    : [...selectedStatus, status]
                );
              }}
              className="form-checkbox text-emerald-500"
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterModal;