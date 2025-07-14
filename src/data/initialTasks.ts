import { Task } from "../types/index";

export const initialTasks: Task[] = [
  {
    id: "1",
    title: "Most famous serial killers",
    description: "All famous serial killers",
    thumbnail: "",
    roleAssignments: [
      { userId: 1, roleId: 1 },
      { userId: 4, roleId: 2 },
      { userId: 10, roleId: 5 },
    ],
    lastEdited: new Date().toISOString(),
    decision: "started",
    phaseDecisions: { design: "", dev: "" },
  },
  {
    id: "2",
    title: "Most feared gang leaders",
    description: "Some description",
    thumbnail: "",
    roleAssignments: [
      { userId: 1, roleId: 1 },
      { userId: 4, roleId: 2 },
      { userId: 10, roleId: 5 },
    ],
    lastEdited: new Date().toISOString(),
    decision: "started",
    phaseDecisions: { devOps: "approved" },
  },
  {
    id: "3",
    title: "Famous suicide killers",
    description: "Some description",
    thumbnail: "",
    roleAssignments: [
      { userId: 1, roleId: 1 },
      { userId: 4, roleId: 2 },
    ],
    lastEdited: new Date().toISOString(),
    decision: "draft",
    phaseDecisions: { techWriter: "revised" },
  },
  {
    id: "4",
    title: "Top 5 most cruel Satanic rituals",
    description: "666",
    thumbnail: "",
    roleAssignments: [
      { userId: 2, roleId: 1 },
      { userId: 4, roleId: 2 },
    ],
    lastEdited: new Date().toISOString(),
    decision: "draft",
    phaseDecisions: { pm: "approved", dev: "approved" },
  },
  {
    id: "5",
    title: "Top 5 politicians prosecuted for corruption",
    description: "Aleksandar Vucic",
    thumbnail: "",
    roleAssignments: [
      { userId: 3, roleId: 1 },
      { userId: 4, roleId: 2 },
    ],
    lastEdited: new Date().toISOString(),
    decision: "draft",
    phaseDecisions: { marketing: "denied" },
  },
];
