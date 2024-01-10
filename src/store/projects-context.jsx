import { createContext, useState } from "react";

const initialProjectState = {
  selectedProject :undefined,
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

export default function ProjectsContextProvider({ children }) {
  const [projectState, setProjectState] = useState(initialProjectState);

  function handleAddTask(text) {
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text,
        id: taskId,
        projectId: prevState.selectedProjectId,
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(taskId) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== taskId),
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
        selectedProjectId: undefined,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleStartAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
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
