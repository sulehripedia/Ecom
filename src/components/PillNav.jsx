import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./PillNav.css";

const PillNav = () => {
  const [activeItem, setActiveItem] = useState("Work");
  const [hoverItem, setHoverItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [{name:"Work", link:"/"}, {name: "About", link: "/about"}, {name:"Play", link: "/play"}, 
    {name: "Notes", link:"/notes"}, {name: "Contact", link:"/contact"}];
  

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Fixed header */}
      <header className={`pillnav-header ${scrolled ? "scrolled" : ""}`}>
        <nav className={`pillnav-container ${scrolled ? "scrolled" : ""}`}>
          {navItems.map((item) => (
            <div key={item} className="pillnav-item-wrapper">
              <NavLink to={item.link}
                onClick={() => setActiveItem(item.name)}
                onMouseEnter={() => setHoverItem(item.name)}
                onMouseLeave={() => setHoverItem(null)}
                className={`pillnav-button ${activeItem === item.name ? "active" : ""} ${
                  hoverItem === item.name && activeItem !== item.name ? "hover" : ""
                } ${item.name === "Work" ? "pillnav-button-work" : ""}`}
                aria-current={activeItem === item.name ? "page" : undefined}
              >
                {item.name}
                {item.name === "Work" && (
                  <span className="pillnav-work-icon">/</span>
                )}
              </NavLink>
            </div>
          ))}
        </nav>
      </header>

      <div className="pillnav-spacer" />
    </>
  );
};

export default PillNav;