import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";


type image = {
  image: string;
  description: string;
}

interface Props {
  title: string;
  shortDescription: string;
  longDescription: string;
  language: string;
  github?: string;
  available?: string;
  images: image[];
}

export default function ProjectCard({title, shortDescription, longDescription, language, github, available, images}: Props) {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [cardRef, inView] = useInView({
    triggerOnce: true, // Trigger the animation only once
  });

  useEffect(() => {
    if (inView) {
      setIsCardVisible(true);
    }
  }, [inView]);
    return (
       
      <Link to={`/projects/${title}`} ref={cardRef} className={`card rounded ${isCardVisible ? 'slide-in' : ''}`}>
        <h3>{title}</h3>
        <p className={`card__language rounded ${language}`}>{language}</p>
        <p>{shortDescription}</p>
        <figure className="card__figure">
          <img src={window.location.origin + "/" + images[0]?.image} alt={`image of ${title}`} className="card__image rounded" />
        </figure>
        
        
      </Link>
    );
  }
  