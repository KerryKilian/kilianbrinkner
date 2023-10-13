import Project from "../components/ProjectCard";
import { projectsData } from "../data/Projects";
import {useEffect} from "react";

export default function Projects() {
  useEffect(() => {
    document.title = "Projekte";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    return (
      <div className="page">
        <h1 className="h1">Kilian Aaron Brinkner</h1>
        <h2 className="h2">Projekte</h2>
        <div className="cards__container">
            {projectsData.map((project) => (
              <Project 
                key={project.title}
                title={project.title} 
                shortDescription={project.shortDescription} 
                longDescription={project.longDescription} 
                language={project.language} 
                github={project.github} 
                available={project.available} 
                images={project.images}/>
            ))}
        </div>
      </div>
      
    );
  }
  