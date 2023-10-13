import "./styles/css/styles.css";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';
import Start from './pages/Start';
import Header from "./components/Header";
import Timeline from "./pages/Timeline";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import NotFound from "./components/NotFound";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Header/>
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:title" element={<Project/>} />
      <Route element={<NotFound/>} />
    </Routes>
    </ErrorBoundary>
  );
}

export default App;
