import { timelineData } from "../data/Timeline";
import { Chrono } from "react-chrono";


export default function Timeline() {
    return (
      <div className="page">
        <h1 className="h1">Kilian Aaron Brinkner</h1>
        <h2 className="h2">Lebenslauf</h2>
        {/* https://github.com/prabhuignoto/react-chrono */}
        <Chrono items={timelineData} mode="VERTICAL_ALTERNATING" 
        // slideShow
        // slideItemDuration={3000}
        // slideShowType="slide_from_sides"
        theme={{
          primary: 'rgb(0, 124, 219)',
          secondary: 'yellow',
          cardBgColor: 'yellow',
          titleColor: 'white',
          titleColorActive: 'black',
        }}
        ></Chrono>
      </div>
      
    );
  }
  