import { useContext } from "react";
import { ProjectsContext } from "../store/projects-context";

import NewTask from "./NewTask";
export default function Tasks() {
  const projectsCtx = useContext(ProjectsContext);
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask />
      {projectsCtx.tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet
        </p>
      )}
      {projectsCtx.tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {projectsCtx.tasks.map((task) => (
            <li key={task.id} className="flex justify-between my-4">
              <span>{task.text}</span>
              <button
                onClick={() => {
                  projectsCtx.deleteTask(task.id);
                }}
                className="text-stone-700 hover:text-red-500"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
