import Page from "./components/page";
import ProjectsContextProvider from "./store/projects-context";

function App() {
  return (
    <ProjectsContextProvider>
      <Page />
    </ProjectsContextProvider>
  );
}

export default App;
