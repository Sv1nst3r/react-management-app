import { useState, useContext } from "react";
import { ProjectsContext } from "../store/projects-context";

export default function NewTask() {
  const projectsCtx = useContext(ProjectsContext);
  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(e) {
    setEnteredTask(e.target.value);
  }
  function handleclick() {
    setEnteredTask("");
    projectsCtx.addTask(enteredTask);
  }

  return (
    <div className="flex items-center gap-4">
      <input
        value={enteredTask}
        onChange={handleChange}
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
      />
      <button
        onClick={handleclick}
        className="text-stone-700 hover:text-stone-950"
      >
        Add task
      </button>
    </div>
  );
}
