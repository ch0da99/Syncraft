// components/EditModal.tsx
import React, { useEffect } from "react";
import { Task } from "../types/index";

interface EditModalProps {
  task: Task;
  statuses: { id: string; label: string }[];
  users: Record<string, string[]>;
  setTask: React.Dispatch<React.SetStateAction<Task | null>>;
  onSave: () => void;
  onDelete: (taskId: string) => void;
  onStartProject: () => void;
  onClose: () => void;
  updatePhaseDecision: (
    phaseId: string,
    decision: "approved" | "revised" | "denied"
  ) => void;
  handleThumbnailChange: (id: string, newThumbnail: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-600";
    case "revised":
      return "bg-yellow-600";
    case "denied":
      return "bg-red-600";
    default:
      return "bg-gray-600";
  }
};

const decisionOptions: ("approved" | "revised" | "denied")[] = [
  "approved",
  "revised",
  "denied",
];

const decisionIcons: Record<string, string> = {
  approved: "✅",
  revised: "✏️",
  denied: "❌",
};

export const EditModal: React.FC<EditModalProps> = ({
  task,
  statuses,
  users,
  setTask,
  onSave,
  onDelete,
  onStartProject,
  onClose,
  updatePhaseDecision,
  handleThumbnailChange,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        const newThumbnail = reader.result.toString();
        setTask((prev) => (prev ? { ...prev, thumbnail: newThumbnail } : prev));
        handleThumbnailChange(task.id, newThumbnail);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    setTask((prev) => {
      if (!prev) return prev;
      const updatedAssignments = { ...prev.roleAssignments };
      statuses.forEach((status) => {
        if (!updatedAssignments[status.id] && users[status.id]?.length === 1) {
          updatedAssignments[status.id] = users[status.id][0];
        }
      });
      return { ...prev, roleAssignments: updatedAssignments };
    });
  }, [statuses, users, setTask]);

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>

        {task.thumbnail && (
          <img
            src={task.thumbnail}
            alt={`${task.title} thumbnail`}
            className="w-full h-40 object-cover rounded mb-2"
          />
        )}

        <div className="mb-3">
          <label className="block text-sm mb-1">Change Thumbnail:</label>
          <button
            onClick={triggerFileInput}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded"
          >
            Upload Thumbnail
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            ref={fileInputRef}
          />
        </div>

        <input
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
          type="text"
          placeholder="Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <textarea
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />

        {statuses.map((status, idx) => (
          <div key={status.id} className="mb-3">
            <label className="block text-sm mb-1">
              {status.label} Responsible:
            </label>
            <select
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={task.roleAssignments[status.id] || ""}
              onChange={(e) =>
                setTask((prev) =>
                  prev
                    ? {
                        ...prev,
                        roleAssignments: {
                          ...prev.roleAssignments,
                          [status.id]: e.target.value,
                        },
                      }
                    : prev
                )
              }
            >
              <option value="">Select...</option>
              {users[status.id].map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>

            {task.decision === "started" && (
              <div className="mt-2">
                <label className="block text-sm mb-1">Phase Status:</label>
                <div className="flex space-x-2">
                  {decisionOptions.map((option) => (
                    <button
                      key={option}
                      className={`w-8 h-8 flex items-center justify-center rounded-full border text-white text-lg font-bold transition-colors duration-200 ${
                        task.phaseDecisions[status.id] === option
                          ? getStatusColor(option)
                          : "bg-gray-600"
                      }`}
                      onClick={() => updatePhaseDecision(status.id, option)}
                      title={option}
                    >
                      {decisionIcons[option]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {idx < statuses.length - 1 && (
              <hr className="my-4 border-t-2 border-yellow-400" />
            )}
          </div>
        ))}

        <div className="flex justify-end space-x-2 mt-4">
          {task.decision !== "started" && (
            <button
              className="px-4 py-2 rounded bg-green-600 hover:bg-green-500"
              onClick={onStartProject}
            >
              Start Project
            </button>
          )}
          <button
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-500"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500"
            onClick={onSave}
          >
            Save
          </button>
          <button
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
