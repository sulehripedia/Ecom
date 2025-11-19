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
            // Reverted to local image path
            image: './nordblooms-2.png',
            link: '#',
            gradient: '#d094e5',
        },
        {
            id: 2,
            caption: 'FAST & EFFECTIVE CMS',
            heading: 'Vape Vend Nz',
            // Reverted to local image path
            image: './vapevend.PNG',
            link: '#',
            gradient: '#a3dcd4',
        },
        {
            id: 3,
            caption: 'DESIGNER & DEVELOPER',
            heading: 'Cleaning The Depressed',
            // Reverted to local image path
            image: './ctd.png',
            link: '#',
            gradient: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)',
        },
        {
            id: 4,
            caption: 'POD BRANDING',
            heading: 'Perla',
            // Reverted to local image path
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
                            {/* Overlay */}
                            <div className="card-overlay"></div>
                            
                            <div className="card-content">
                                {/* Card Header */}
                                <div className="card-header">
                                    <p className="card-caption">{project.caption}</p>
                                    <h2 className="card-heading">{project.heading}</h2>
                                </div>

                                {/* Card Image */}
                                <div className="card-image-wrapper">
                                    <img
                                        src={project.image}
                                        alt={project.heading}
                                        // Fallback for failed image load
                                        onError={(e) => { 
                                            e.target.onerror = null; 
                                            // Fallback keeps the tall aspect ratio to maintain layout 
                                            e.target.src = "https://placehold.co/600x1200/4a4a4a/ffffff?text=Image+Unavailable";
                                        }}
                                        className="card-image"
                                    />
                                </div>

                                {/* CTA */}
                                {/* <div className="card-cta">
                                    <span className="cta-text">View Project</span>
                                    <svg className="cta-arrow" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div> */}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MyWork;