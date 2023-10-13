import { Slider } from "../components/Slider";
import {useEffect} from "react";

export default function Timeline() {
  useEffect(() => {
    document.title = "Lebenslauf";
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page">
      <h1 className="h1">Kilian Aaron Brinkner</h1>
      <h2 className="h2">Lebenslauf</h2>
      
      <Slider></Slider>
    </div>
  );
}
