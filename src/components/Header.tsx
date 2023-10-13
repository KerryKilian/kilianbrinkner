import { useState } from "react";
import { BsList } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };
    return (
        <>
        <BsList
          className="navigation__icon"
          size={42}
          onClick={toggleMenu}
        ></BsList>
        <nav
          className={`navigation ${isOpen ? "isOpen" : "isClosed"}`}
          id="navigation"
        >
          <ul className={`navigation__ul ${isOpen ? "open" : ""}`}>
            
            <li className="navigation__li rounded">
              {/* <a href="/" className="navigation__link rounded">
                Über mich
              </a> */}
              <Link to="/" className="navigation__link rounded">
              Über mich
              </Link>
            </li>
            <li className="navigation__li rounded">
              {/* <a href="/timeline" className="navigation__link rounded">
                Lebenslauf
              </a> */}
              <Link to="/timeline" className="navigation__link rounded">
              Lebenslauf
              </Link>
            </li>
            <li className="navigation__li rounded">
              {/* <a href="/projects" className="navigation__link rounded">
                Projekte
              </a> */}
              <Link to="/projects" className="navigation__link rounded">
                Projekte
              </Link>
            </li>
            
            
          </ul>
        </nav>
       
      </>
      
    );
  }
  