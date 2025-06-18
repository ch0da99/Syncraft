export interface RoleAssignment {
  userId: number;
  roleId: number;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  roleId: number;
}

export interface Role {
  id: number;
  roleName: string;
}

export const roles: Role[] = [
  { id: 1, roleName: "Scriptwriting" },
  { id: 2, roleName: "Voiceover" },
  { id: 3, roleName: "File Organization" },
  { id: 4, roleName: "Video Edit" },
  { id: 5, roleName: "Thumbnail" },
];

export const employees: Employee[] = [
  { id: 1, firstName: "Alice", lastName: "Johnson", roleId: 1 }, // Scriptwriting
  { id: 2, firstName: "Bob", lastName: "Smith", roleId: 1 },
  { id: 3, firstName: "Charlie", lastName: "Brown", roleId: 1 },

  { id: 4, firstName: "Dave", lastName: "Wilson", roleId: 2 }, // Voiceover

  { id: 5, firstName: "Grace", lastName: "Miller", roleId: 3 }, // File Organization

  { id: 6, firstName: "Judy", lastName: "Davis", roleId: 4 }, // Video Edit
  { id: 7, firstName: "Karl", lastName: "Anderson", roleId: 4 },
  { id: 8, firstName: "Liam", lastName: "Moore", roleId: 4 },

  { id: 9, firstName: "Mallory", lastName: "Taylor", roleId: 5 }, // Thumbnail
  { id: 10, firstName: "Niaj", lastName: "Thomas", roleId: 5 },
  { id: 11, firstName: "Olivia", lastName: "Jackson", roleId: 5 },
];

//TODO
//@Every user should be able to request revision of his task
export const users: Record<string, string[]> = {
  scriptwriting: ["Alice", "Bob", "Charlie"], //to add link to the script
  voiceover: ["Dave"],
  fileOrganization: ["Grace"],
  videoEdit: ["Judy", "Karl", "Liam"],
  thumbnail: ["Mallory", "Niaj", "Olivia"], //to add thumbnail
};

// Flatten users to a unique array of user names
export const allUsers = Array.from(new Set(Object.values(users).flat()));
