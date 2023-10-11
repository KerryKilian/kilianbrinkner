import { useParams } from "react-router-dom";
import { projectsData } from "../data/Projects";

function Project() {
  const { title } = useParams();
  const data = projectsData.find((project) => project.title === title);
  return (
    <div className="page">
      <h1>{data?.title}</h1>
      <h2>{data?.shortDescription}</h2>
      <p>{data?.longDescription}</p>
      {data?.github ? <button className="page__github">
        <a className="page__a" href={data?.github}>
        Github
        </a>
      </button> : <></>}
      
      <div className="images">
        {data?.images.map((image) => (
          <div className="image__container" key={image.image}>
            <img
              src={window.location.origin + "/" + image.image}
              alt={image.image}
              key={image.image}
              className="rounded"
            />
            <p>{image.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;
