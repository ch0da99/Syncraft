import { useState } from "react";
import { NewTaskDraft, Task } from "./types/index";
import { Employee, employees, roles } from "./data/data";
import { CreateModal } from "./components/CreateModal";
import { EditModal } from "./components/EditModal";
import { initialTasks } from "./data/initialTasks";
import TaskBoard from "./components/TaskBoard";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | "all">("all");

  const handleCreateTask = (newTask: NewTaskDraft) => {
    const createdTask: Task = {
      id: Math.random().toString(36).substring(7),
      title: newTask.title,
      description: newTask.description,
      thumbnail: "",
      roleAssignments: [],
      lastEdited: new Date().toISOString(),
      decision: "draft",
      phaseDecisions: roles.reduce(
        (acc, status) => ({ ...acc, [status.id]: "" }),
        {}
      ),
    };
    setTasks((prev) => [...prev, createdTask]);
    setShowCreateModal(false);
  };

  const handleThumbnailChange = (id: string, newThumbnail: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, thumbnail: newThumbnail } : task
      )
    );
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
      const updatedTask = {
        ...editTask,
        decision: "started" as Task["decision"],
      };
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
    phaseId: number,
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

  const getFilteredTasks = (): Task[] => {
    return selectedUserId === "all"
      ? tasks
      : tasks.filter(
          (task) =>
            Array.isArray(task.roleAssignments) &&
            task.roleAssignments.some(
              (assignment) => assignment.userId.toString() == selectedUserId
            )
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

      {/* User Filter Dropdown */}
      <div className="p-4">
        <label htmlFor="userFilter" className="mr-2 font-medium">
          Filter by User:
        </label>
        <select
          id="userFilter"
          className="bg-gray-700 text-white px-3 py-1 rounded"
          value={selectedUserId}
          onChange={(e) => {
            setSelectedUserId(e.target.value);
          }}
        >
          <option value="all">All Users</option>
          {employees.map((user: Employee) => (
            <option key={user.id} value={user.id}>
              {user.firstName}
            </option>
          ))}
        </select>
      </div>

      {/* Task Board */}
      <TaskBoard
        tasks={getFilteredTasks()}
        roles={roles}
        onClickCard={(task) => {
          setEditTask(task);
          setShowEditModal(true);
        }}
      />

      {/* Edit Modal */}
      {showEditModal && editTask && (
        <EditModal
          task={editTask}
          roles={roles}
          employees={employees}
          setTask={setEditTask}
          onSave={handleSaveEditTask}
          onDelete={handleDeleteTask}
          onStartProject={handleStartProject}
          onClose={() => setShowEditModal(false)}
          updatePhaseDecision={updatePhaseDecisionInModal}
          handleThumbnailChange={handleThumbnailChange}
        />
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <CreateModal
          onCreate={handleCreateTask}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
}
