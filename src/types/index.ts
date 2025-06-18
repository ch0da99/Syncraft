import { RoleAssignment } from "../data/data";

export interface Status {
  id: string;
  label: string;
}

// export type RoleId =
//   | "scriptwriting"
//   | "voiceover"
//   | "fileOrganization"
//   | "videoEdit"
//   | "thumbnail";

export interface Task {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  roleAssignments: RoleAssignment[];
  lastEdited: string;
  decision: "approved" | "revised" | "denied" | "draft" | "started";
  phaseDecisions: Record<string, "approved" | "revised" | "denied" | "">;
}

export type NewTaskDraft = Pick<Task, "title" | "description">;
