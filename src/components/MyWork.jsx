import React, { useEffect, useRef, useState } from 'react';
import './MyWork.css';

const MyWork = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const containerRef = useRef(null);

  const projects = [
    { id: 1, caption: 'DEVELOPER', heading: 'Nordblooms', image: './nordblooms-2.png', link: '#', gradient: '#d094e5' },
    { id: 2, caption: 'FAST & EFFECTIVE CMS', heading: 'Vape Vend Nz', image: './vapevend.PNG', link: '#', gradient: '#a3dcd4' },
    { id: 3, caption: 'DESIGNER & DEVELOPER', heading: 'Cleaning The Depressed', image: './ctd.png', link: '#', gradient: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)' },
    { id: 4, caption: 'POD BRANDING', heading: 'Perla', image: './per-la.PNG', link: '#', gradient: '#e8b89c' },
  ];

  useEffect(() => {
    // breakpoint for "mobile" — adjust as needed
    const mobileMQ = window.matchMedia('(max-width: 640px)');

    if (!mobileMQ.matches) return; // only run on mobile

    // Respect user motion preference
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.project-card');

    // Observer options: trigger when ~40-60% of the card is visible
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        // You can tune the threshold check; here we mark in-view if >= 40% visible
        if (entry.intersectionRatio >= 0.4) {
          el.classList.add('in-view');
        } else {
          el.classList.remove('in-view');
        }
      });
    }, observerOptions);

    cards.forEach((card) => observer.observe(card));

    // cleanup
    return () => {
      observer.disconnect();
    };
  }, []); // runs once (on mount)

  return (
    <div className="projects-container" ref={containerRef}>
      <div className="projects-grid">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            className="project-card"
            style={{ background: project.gradient }}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="card-overlay" />
            <div className="card-content">
              <div className="card-header">
                <p className="card-caption">{project.caption}</p>
                <h2 className="card-heading">{project.heading}</h2>
              </div>

              <div className="card-image-wrapper">
                <img
                  src={project.image}
                  alt={project.heading}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/600x1200/4a4a4a/ffffff?text=Image+Unavailable';
                  }}
                  className="card-image"
                />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MyWork;
