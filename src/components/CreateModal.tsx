import React, { useState } from "react";
import { NewTaskDraft } from "../types";

interface CreateModalState {
  newTask: NewTaskDraft;
}

interface CreateModalProps {
  onCreate: (newTask: NewTaskDraft) => void;
  onClose: () => void;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  onClose,
  onCreate,
}) => {
  const [state, setState] = useState<CreateModalState>({
    newTask: { title: "", description: "" },
  });
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Create New Task</h2>
        <input
          className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
          type="text"
          placeholder="Title"
          value={state?.newTask.title}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              newTask: {
                ...prev?.newTask,
                title: e.target.value,
              },
            }))
          }
        />
        <textarea
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
          placeholder="Description"
          value={state?.newTask.description}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              newTask: {
                ...prev?.newTask,
                description: e.target.value,
              },
            }))
          }
        />
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500"
            onClick={() => onCreate(state.newTask)}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
