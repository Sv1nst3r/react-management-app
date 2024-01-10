import { createContext, useState, useReducer } from "react";

const initialProjectState = {
  selectedProject: undefined,
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
  addTask: () => {},
  deleteTask: () => {},
  addProject: () => {},
  deleteProject: () => {},
  startAddProject: () => {},
  cancelAddProject: () => {},
  selectProject: () => {},
};

export const ProjectsContext = createContext(initialProjectState);

function projectStateReducer(state, action) {
  if (action.type === "ADD_TASK") {
    const taskId = Math.random();
    const newTask = {
      text: action.payload,
      id: taskId,
      projectId: state.selectedProjectId,
    };
    return {
      ...state,
      tasks: [...state.tasks, newTask],
    };
  }

  if (action.type === "DELETE_TASK") {
    return {
      ...state,
      tasks: state.tasks.filter((task) => task.id !== action.payload),
    };
  }

  if (action.type === "START_ADD_PROJECT") {
    return {
      ...state,
      selectedProjectId: null,
    };
  }

  if (action.type === "SELECT_PROJECT") {
    return {
      ...state,
      selectedProjectId: action.payload,
    };
  }

  if (action.type === "CANCEL_ADD_PROJECT") {
    return {
      ...state,
      selectedProjectId: undefined,
    };
  }

  if (action.type === "DELETE_PROJECT") {
    return {
      ...state,
      projects: state.projects.filter(
        (project) => project.id !== state.selectedProjectId
      ),
      selectedProjectId: undefined,
    };
  }

  if (action.type === "ADD_PROJECT") {
    const projectId = Math.random();
    const newProject = {
      ...action.payload,
      id: projectId,
    };
    return {
      ...state,
      selectedProjectId: undefined,
      projects: [...state.projects, newProject],
    };
  }
  return state;
}
export default function ProjectsContextProvider({ children }) {
  const [projectState, projectStateDispatch] = useReducer(
    projectStateReducer,
    initialProjectState
  );
  //const [projectState, setProjectState] = useState(initialProjectState);

  function handleAddTask(text) {
    projectStateDispatch({ type: "ADD_TASK", payload: text });
  }

  function handleDeleteTask(taskId) {
    projectStateDispatch({ type: "DELETE_TASK", payload: taskId });
  }

  function handleDeleteProject() {
    projectStateDispatch({ type: "DELETE_PROJECT" });
  }

  function handleSelectProject(id) {
    projectStateDispatch({ type: "SELECT_PROJECT", payload: id });
  }

  function handleCancelAddProject() {
    projectStateDispatch({ type: "CANCEL_ADD_PROJECT" });
  }

  function handleAddProject(projectData) {
    projectStateDispatch({ type: "ADD_PROJECT", payload: projectData });
  }

  function handleStartAddProject() {
    projectStateDispatch({ type: "START_ADD_PROJECT" });
  }

  const selectedProject = [...projectState.projects].find(
    (project) => project.id === projectState.selectedProjectId
  );

  const ctxValue = {
    selectedProject: selectedProject,
    selectedProjectId: projectState.selectedProjectId,
    projects: projectState.projects,
    tasks: projectState.tasks,
    addTask: handleAddTask,
    deleteTask: handleDeleteTask,
    addProject: handleAddProject,
    deleteProject: handleDeleteProject,
    startAddProject: handleStartAddProject,
    cancelAddProject: handleCancelAddProject,
    selectProject: handleSelectProject,
  };

  return (
    <ProjectsContext.Provider value={ctxValue}>
      {children}
    </ProjectsContext.Provider>
  );
}
