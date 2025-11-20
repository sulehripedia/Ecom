import React, { useState } from 'react';
import './MyWork.css';
// The main application component
const MyWork = () => {
    
    // State to track the currently hovered project (not strictly used for the scrolling effect, 
    // but kept for potential future use or debugging)
    const [hoveredId, setHoveredId] = useState(null);

    const projects = [
        {
            id: 1,
            caption: 'DEVELOPER',
            heading: 'Nordblooms',
            image: './nordblooms-2.png',
            link: '#',
            gradient: '#d094e5',
        },
        {
            id: 2,
            caption: 'FAST & EFFECTIVE CMS',
            heading: 'Vape Vend Nz',
            image: './vapevend.PNG',
            link: '#',
            gradient: '#a3dcd4',
        },
        {
            id: 3,
            caption: 'DESIGNER & DEVELOPER',
            heading: 'Cleaning The Depressed',
            image: './ctd.png',
            link: '#',
            gradient: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)',
        },
        {
            id: 4,
            caption: 'POD BRANDING',
            heading: 'Perla',
            image: './per-la.PNG',
            link: '#',
            gradient: '#e8b89c',
        }
    ];

    return (
        <>
            <div className="projects-container">
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
                            <div className="card-overlay"></div>
                            
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
                                            e.target.src = "https://placehold.co/600x1200/4a4a4a/ffffff?text=Image+Unavailable";
                                        }}
                                        className="card-image"
                                    />
                                </div>

                               
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MyWork;