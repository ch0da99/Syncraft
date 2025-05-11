import { useState } from "react";

// Helper Functions
function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

function getStatusColor(status: string) {
  switch (status) {
    case "approved":
      return "bg-green-600";
    case "revised":
      return "bg-yellow-600";
    case "denied":
      return "bg-red-600";
    case "started":
      return "bg-blue-600";
    case "draft":
      return "bg-gray-600";
    default:
      return "bg-gray-600";
  }
}

function getDecisionIcon(status: string) {
  switch (status) {
    case "approved":
      return "✅";
    case "revised":
      return "✏️";
    case "denied":
      return "❌";
    case "started":
      return "🚀";
    case "draft":
      return "📝";
    default:
      return "➖";
  }
}

interface Status {
  id: string;
  label: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  roleAssignments: Record<string, string>;
  lastEdited: string;
  decision: "approved" | "revised" | "denied" | "draft" | "started";
  phaseDecisions: Record<string, "approved" | "revised" | "denied" | "">;
}

const statuses: Status[] = [
  { id: "scriptwriting", label: "Scriptwriting" },
  { id: "voiceover", label: "Voiceover" },
  { id: "fileOrganization", label: "File Organization" },
  { id: "videoEdit", label: "Video Edit" },
  { id: "thumbnail", label: "Thumbnail" },
];

const users: Record<string, string[]> = {
  scriptwriting: ["Alice", "Bob", "Charlie"],
  voiceover: ["Dave", "Eve", "Frank"],
  fileOrganization: ["Grace", "Heidi", "Ivan"],
  videoEdit: ["Judy", "Karl", "Liam"],
  thumbnail: ["Mallory", "Niaj", "Olivia"],
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editTask, setEditTask] = useState<Task | null>(null);

  const handleCreateTask = () => {
    const createdTask: Task = {
      id: Math.random().toString(36).substring(7),
      title: newTask.title,
      description: newTask.description,
      roleAssignments: {},
      lastEdited: new Date().toISOString(),
      decision: "draft",
      phaseDecisions: statuses.reduce(
        (acc, status) => ({ ...acc, [status.id]: "" }),
        {}
      ),
    };
    setTasks((prev) => [...prev, createdTask]);
    setShowCreateModal(false);
    setNewTask({ title: "", description: "" });
  };

  const handleSaveEditTask = () => {
    if (editTask) {
      editTask.lastEdited = new Date().toISOString();
      setTasks((prev) =>
        prev.map((task) => (task.id === editTask.id ? editTask : task))
      );
      setShowEditModal(false);
      setEditTask(null);
    }
  };

  const handleStartProject = () => {
    if (editTask) {
      const updatedTask = { ...editTask, decision: "started" };
      setTasks((prev) =>
        prev.map((task) => (task.id === editTask.id ? updatedTask : task))
      );
      setEditTask(updatedTask);
      setShowEditModal(false);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    setShowEditModal(false);
    setEditTask(null);
  };

  const updatePhaseDecisionInModal = (
    phaseId: string,
    decision: "approved" | "revised" | "denied"
  ) => {
    setEditTask((prev) =>
      prev
        ? {
            ...prev,
            phaseDecisions: { ...prev.phaseDecisions, [phaseId]: decision },
          }
        : null
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex justify-between items-center p-6 bg-gray-800 shadow">
        <div className="text-xl font-bold">Trello Board App</div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => setShowCreateModal(true)}
        >
          + Add New Task
        </button>
      </div>

      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-gray-700 text-white rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => {
              setEditTask(task);
              setShowEditModal(true);
            }}
          >
            <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
            <p className="text-gray-300 text-sm mb-2">
              Last edited: {formatDate(task.lastEdited)}
            </p>
            {task.decision === "started" ? (
              <div className="flex flex-wrap gap-2 mt-4 max-w-full">
                {statuses.map((status) => (
                  <div key={status.id} className="relative">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${getStatusColor(
                        task.phaseDecisions[status.id]
                      )}`}
                    >
                      {task.phaseDecisions[status.id]
                        ? getDecisionIcon(task.phaseDecisions[status.id])
                        : "➖"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm italic text-gray-400 mt-2">
                Project is not started yet
              </p>
            )}
          </div>
        ))}
      </div>

      {showEditModal && editTask && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <input
              className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
              type="text"
              placeholder="Title"
              value={editTask.title}
              onChange={(e) =>
                setEditTask((prev) =>
                  prev ? { ...prev, title: e.target.value } : null
                )
              }
            />
            <textarea
              className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
              placeholder="Description"
              value={editTask.description}
              onChange={(e) =>
                setEditTask((prev) =>
                  prev ? { ...prev, description: e.target.value } : null
                )
              }
            />
            {statuses.map((status) => (
              <div key={status.id} className="mb-3">
                <label className="block text-sm mb-1">
                  {status.label} Responsible:
                </label>
                <select
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  value={editTask.roleAssignments[status.id] || ""}
                  onChange={(e) =>
                    setEditTask((prev) =>
                      prev
                        ? {
                            ...prev,
                            roleAssignments: {
                              ...prev.roleAssignments,
                              [status.id]: e.target.value,
                            },
                          }
                        : null
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
                {editTask.decision === "started" && (
                  <div className="mt-2">
                    <label className="block text-sm mb-1">Phase Status:</label>
                    <div className="flex space-x-2">
                      {["approved", "revised", "denied"].map((option) => (
                        <button
                          key={option}
                          className={`px-2 py-1 rounded text-sm ${
                            editTask.phaseDecisions[status.id] === option
                              ? getStatusColor(option)
                              : "bg-gray-600"
                          }`}
                          onClick={() =>
                            updatePhaseDecisionInModal(status.id, option as any)
                          }
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              {editTask.decision !== "started" && (
                <button
                  className="px-4 py-2 rounded bg-green-600 hover:bg-green-500"
                  onClick={handleStartProject}
                >
                  Start Project
                </button>
              )}
              <button
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-500"
                onClick={() => handleDeleteTask(editTask.id)}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500"
                onClick={handleSaveEditTask}
              >
                Save
              </button>
              <button
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
                onClick={() => setShowEditModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Create New Task</h2>
            <input
              className="w-full mb-3 p-2 rounded bg-gray-700 text-white"
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <textarea
              className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, description: e.target.value }))
              }
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500"
                onClick={handleCreateTask}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}