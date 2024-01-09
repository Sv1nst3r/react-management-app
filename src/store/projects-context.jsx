import { createContext } from "react";

const initialProjectState = {
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
  addTask: () => {},
  deleteTask: () => {},
  addProject: () => {},
  deleteProject: () => {},
  startAddProject: () => {},
  cancelAddProject: () => {},
  selectedProject: () => {},
};

export const ProjectsContext = createContext(initialProjectState);
