import { useState, useEffect } from "react";
import "./PillNav.css";

const PillNav = () => {
  const [activeItem, setActiveItem] = useState("Work");
  const [hoverItem, setHoverItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const navItems = ["Work", "About", "Play", "Notes", "Contact"];

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
              <button
                onClick={() => setActiveItem(item)}
                onMouseEnter={() => setHoverItem(item)}
                onMouseLeave={() => setHoverItem(null)}
                className={`pillnav-button ${activeItem === item ? "active" : ""} ${
                  hoverItem === item && activeItem !== item ? "hover" : ""
                } ${item === "Work" ? "pillnav-button-work" : ""}`}
                aria-current={activeItem === item ? "page" : undefined}
              >
                {item}
                {item === "Work" && ( // Conditionally render the slash icon for "Work"
                  <span className="pillnav-work-icon">/</span>
                )}
              </button>
            </div>
          ))}
        </nav>
      </header>

      {/* Spacer to prevent content from sliding under fixed header */}
      <div className="pillnav-spacer" />
    </>
  );
};

export default PillNav;