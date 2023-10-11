import { useState } from "react";
import { BsList } from "react-icons/bs";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };
    return (
        <>
        <BsList
          className="navigation__icon"
          size={36}
          onClick={toggleMenu}
        ></BsList>
        <nav
          className={`navigation ${isOpen ? "isOpen" : "isClosed"}`}
          id="navigation"
        >
          <ul className={`navigation__ul ${isOpen ? "open" : ""}`}>
            
            <li className="navigation__li rounded">
              <a href={process.env.PUBLIC_URL + '/'} className="navigation__link rounded">
                Über mich
              </a>
            </li>
            <li className="navigation__li rounded">
              <a href={process.env.PUBLIC_URL + '/timeline'} className="navigation__link rounded">
                Lebenslauf
              </a>
            </li>
            <li className="navigation__li rounded">
              <a href={process.env.PUBLIC_URL + '/projects'} className="navigation__link rounded">
              {/* "/projects" */}
                Projekte
              </a>
            </li>
            
            
          </ul>
        </nav>
       
      </>
      
    );
  }
  