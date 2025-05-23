// components/TaskBoard.tsx
import React from "react";
import { Task, Status } from "../types/index";
import TaskCard from "./TaskCard";
import { formatDate, getStatusColor } from "../helpers/format";

interface TaskBoardProps {
  tasks: Task[];
  statuses: Status[];
  onClickCard: (task: Task) => void;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onClickCard }) => {
  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {tasks.map((task) => (
        <TaskCard task={task} onClick={(task: Task) => onClickCard(task)} />
      ))}
    </div>
  );
};

export default TaskBoard;
