import React, { useState } from 'react';
import './MyWork.css';


const InProgressWork = () => {
    

    const [hoveredId, setHoveredId] = useState(null);

    const projects = [
        {
            id: 1,
            caption: 'NEXT GEN WEB',
            heading: 'Daran Holdings',
            image: './daran-holding.png',
            link: '#',
            gradient: 'white',
            color: 'black',
        },
        {
            id: 2,
            caption: 'FINANCE ENGINE',
            heading: 'Cosmos Wealth AI',
            image: './cosmos.PNG',
            link: '#',
            gradient: 'black',
            color: 'white',
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
                            <div className="card-content">
                                <div className="card-header">
                                    <h6 className="card-caption"  style={{ color: project.color }}>{project.caption}</h6>
                                    <h6 className="card-heading" style={{ color: project.color }}>{project.heading}</h6>
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

export default InProgressWork;