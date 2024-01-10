import { useContext } from "react";

import { ProjectsContext } from "../store/projects-context";

import Sidebar from "./Sidebar";
import SelectedProject from "./SelectedProject";
import NewProject from "./NewProject";
import NoProjectSelected from "./NoProjectSelected";

export default function Page() {
  const ctx = useContext(ProjectsContext);

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        projects={ctx.projects}
        selectedProjectId={ctx.selectedProjectId}
      />
      {ctx.selectedProjectId && (
        <SelectedProject project={ctx.selectedProject} />
      )}
      {ctx.selectedProjectId === null && <NewProject />}
      {ctx.selectedProjectId === undefined && <NoProjectSelected />}
    </main>
  );
}
