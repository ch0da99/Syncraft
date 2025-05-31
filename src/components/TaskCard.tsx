import React from "react";
import { Task } from "../types/index";
import { formatDate } from "../helpers/format";
import { Role, roles } from "../data/data";

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0]?.toUpperCase())
    .join("");
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-600";
    case "revised":
      return "bg-yellow-600";
    case "denied":
      return "bg-red-600";
    default:
      return "bg-gray-500";
  }
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  return (
    <div
      key={task.id}
      className="bg-gray-700 text-white rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
      onClick={() => onClick(task)}
    >
      {task.thumbnail ? (
        <img
          src={task.thumbnail}
          alt={`${task.title} thumbnail`}
          className="w-full h-40 object-cover rounded mb-2"
        />
      ) : (
        <div className="w-full h-40 flex items-center justify-center bg-gray-600 rounded mb-2 text-sm text-gray-400">
          No Thumbnail
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
      <p className="text-gray-300 text-sm mb-2">
        Last edited: {formatDate(task.lastEdited ?? "")}
      </p>

      {/* Assigned people initials */}
      <div className="flex flex-wrap gap-2 mt-4 max-w-full">
        {(Array.isArray(task.roleAssignments) ? task.roleAssignments : [])
          .filter(Boolean)
          .map((assignment, idx) => (
            <div
              key={idx}
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold bg-gray-200 text-black border border-black"
              title={assignment.userId}
            >
              {getInitials(assignment.userId)}
            </div>
          ))}
      </div>

      {task.decision === "started" ? (
        <div className="flex flex-wrap gap-2 mt-4 max-w-full">
          {roles.map((role: Role) => (
            <div key={role.id} className="relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getStatusColor(
                  task.phaseDecisions[role.id]
                )}`}
                title={role.roleName}
              >
                {role.roleName.charAt(0).toUpperCase()}
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
  );
};

export default TaskCard;
