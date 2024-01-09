import { createContext } from "react";

const initialProjectState = {
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
};

export const ProjectsContext = createContext(initialProjectState);
