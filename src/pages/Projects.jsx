import React, { useState, useEffect, useRef } from 'react';
import { X, Filter, ExternalLink, Calendar, Users, Clock, Award, Code, CheckCircle, ArrowLeft } from 'lucide-react';

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const scrollY = useRef(0);

  const categories = [
    { id: 'all', name: 'All Projects', color: '#00f0ff' },
    { id: 'game', name: 'Game Development', color: '#ff00ff' },
    { id: 'app', name: 'App Development', color: '#00ff88' },
    { id: 'ecommerce', name: 'E-Commerce', color: '#ffaa00' },
    { id: 'shopify', name: 'Shopify', color: '#95bf47' },
    { id: 'devops', name: 'DevOps', color: '#ff4444' },
    { id: 'cloud', name: 'Cloud Computing', color: '#4488ff' },
    { id: 'ai', name: 'AI Agents', color: '#ff66ff' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Cyber Racing Arena',
      category: 'game',
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop',
      subtitle: 'Multiplayer Racing Game with Real-time Physics',
      tags: ['Unity', '3D', 'Multiplayer', 'WebGL'],
      client: 'GameStudio Inc',
      duration: '8 months',
      team: '12 developers',
      completionDate: 'March 2024',
      description: 'An immersive multiplayer racing game featuring cutting-edge physics simulation and real-time competitive gameplay across multiple platforms.',
      challenges: 'Implementing low-latency multiplayer synchronization across different devices while maintaining 60fps gameplay and realistic physics calculations.',
      solution: 'Developed custom netcode using Unity\'s DOTS framework combined with client-side prediction and server reconciliation to achieve seamless multiplayer experience.',
      techStack: ['Unity 2023', 'C#', 'Photon Networking', 'DOTween', 'Addressables', 'FMOD Audio'],
      features: [
        'Real-time multiplayer for up to 16 players',
        'Advanced vehicle physics system',
        'Dynamic weather and day/night cycle',
        'Cross-platform matchmaking',
        'In-game voice chat integration',
        'Customizable vehicles with 200+ parts'
      ],
      metrics: {
        users: '500K+ active players',
        rating: '4.8/5 stars',
        performance: '60 FPS on mid-tier devices'
      },
      testimonial: 'The team delivered beyond our expectations. The game runs smoothly and our player retention increased by 300%.',
      testimonialAuthor: 'John Mitchell, CTO at GameStudio Inc'
    },
    {
      id: 2,
      title: 'HealthTrack Pro',
      category: 'app',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop',
      subtitle: 'AI-Powered Health Monitoring Mobile App',
      tags: ['React Native', 'AI/ML', 'Healthcare', 'IoT'],
      client: 'MediCare Solutions',
      duration: '6 months',
      team: '8 developers',
      completionDate: 'January 2025',
      description: 'A comprehensive health monitoring application that integrates with wearable devices to provide real-time health insights and AI-driven recommendations.',
      challenges: 'Creating a HIPAA-compliant platform that seamlessly integrates with multiple wearable device APIs while providing accurate health predictions.',
      solution: 'Built a secure microservices architecture with end-to-end encryption, implementing machine learning models for health trend analysis and anomaly detection.',
      techStack: ['React Native', 'TypeScript', 'TensorFlow Lite', 'AWS HealthLake', 'GraphQL', 'PostgreSQL'],
      features: [
        'Real-time vital signs monitoring',
        'AI-powered health insights and predictions',
        'Integration with 20+ wearable devices',
        'Telemedicine video consultation',
        'Personalized workout and diet plans',
        'Emergency alert system with location sharing'
      ],
      metrics: {
        users: '250K+ downloads',
        rating: '4.9/5 stars',
        performance: 'HIPAA & GDPR compliant'
      },
      testimonial: 'Revolutionary app that has transformed how our patients manage their health. The AI insights are remarkably accurate.',
      testimonialAuthor: 'Dr. Sarah Chen, Medical Director'
    },
    {
      id: 3,
      title: 'LuxeMarket',
      category: 'ecommerce',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop',
      subtitle: 'High-End Fashion E-Commerce Platform',
      tags: ['Next.js', 'Stripe', 'Headless CMS', 'PWA'],
      client: 'Luxe Fashion Group',
      duration: '5 months',
      team: '10 developers',
      completionDate: 'December 2024',
      description: 'A premium e-commerce platform offering seamless shopping experience with advanced personalization and AR try-on features.',
      challenges: 'Building a high-performance platform that handles 10,000+ concurrent users during flash sales while providing personalized recommendations.',
      solution: 'Implemented edge computing with CDN caching, created a custom recommendation engine, and utilized serverless functions for scalability.',
      techStack: ['Next.js 14', 'Stripe Payments', 'Contentful', 'Algolia Search', 'Redis', 'AWS Lambda'],
      features: [
        'AR virtual try-on for accessories',
        'AI-powered size recommendations',
        'Multi-currency and multi-language support',
        'Advanced product filtering and search',
        'One-click checkout with saved preferences',
        'Real-time inventory management'
      ],
      metrics: {
        users: '2M+ monthly visitors',
        rating: '94% customer satisfaction',
        performance: '99.9% uptime, <1s page load'
      },
      testimonial: 'Our conversion rate increased by 180% after the platform launch. The AR feature is a game-changer.',
      testimonialAuthor: 'Emma Rodriguez, CEO Luxe Fashion'
    },
    {
      id: 4,
      title: 'Artisan Marketplace',
      category: 'shopify',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop',
      subtitle: 'Custom Shopify Store for Handcrafted Goods',
      tags: ['Shopify Plus', 'Liquid', 'Custom Theme', 'Apps'],
      client: 'Artisan Collective',
      duration: '3 months',
      team: '6 developers',
      completionDate: 'November 2024',
      description: 'A beautifully crafted Shopify store with custom features for artisan sellers, including maker profiles and story-driven product pages.',
      challenges: 'Creating unique product storytelling experience while maintaining Shopify\'s robust e-commerce functionality and performance standards.',
      solution: 'Developed custom Shopify theme from scratch with advanced metafields, integrated custom apps for maker profiles and story sections.',
      techStack: ['Shopify Plus', 'Liquid', 'JavaScript', 'Shopify Polaris', 'GraphQL Admin API', 'Klaviyo'],
      features: [
        'Maker profile pages with storytelling',
        'Custom product bundling system',
        'Advanced subscription management',
        'Multi-vendor marketplace functionality',
        'Interactive product customization',
        'Integrated loyalty rewards program'
      ],
      metrics: {
        users: '50K+ monthly shoppers',
        rating: '4.7/5 merchant satisfaction',
        performance: '45% increase in AOV'
      },
      testimonial: 'The custom features perfectly showcase our artisans\' stories. Sales doubled in the first quarter.',
      testimonialAuthor: 'Michael Torres, Founder'
    },
    {
      id: 5,
      title: 'CloudOps Pipeline',
      category: 'devops',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop',
      subtitle: 'Enterprise CI/CD Infrastructure Automation',
      tags: ['Kubernetes', 'Terraform', 'Jenkins', 'Docker'],
      client: 'TechCorp Enterprise',
      duration: '7 months',
      team: '9 engineers',
      completionDate: 'February 2025',
      description: 'Comprehensive DevOps infrastructure supporting automated deployment pipelines for microservices architecture across multi-cloud environments.',
      challenges: 'Migrating legacy monolithic applications to containerized microservices while ensuring zero downtime and maintaining security compliance.',
      solution: 'Implemented blue-green deployment strategy with automated rollback, created infrastructure as code for reproducible environments.',
      techStack: ['Kubernetes', 'Terraform', 'Jenkins', 'Docker', 'ArgoCD', 'Prometheus', 'Grafana', 'Vault'],
      features: [
        'Automated CI/CD pipelines for 100+ services',
        'Infrastructure as Code (IaC) templates',
        'Real-time monitoring and alerting',
        'Automated security scanning and compliance',
        'Multi-cloud deployment support',
        'Self-healing infrastructure'
      ],
      metrics: {
        users: 'Enterprise-scale deployment',
        rating: '99.99% service availability',
        performance: '10x faster deployment cycles'
      },
      testimonial: 'Reduced our deployment time from hours to minutes. The automation has been transformative.',
      testimonialAuthor: 'David Park, VP Engineering'
    },
    {
      id: 6,
      title: 'DataScale Platform',
      category: 'cloud',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop',
      subtitle: 'Scalable Cloud Data Processing Infrastructure',
      tags: ['AWS', 'Serverless', 'Big Data', 'Analytics'],
      client: 'DataInsights Corp',
      duration: '9 months',
      team: '14 engineers',
      completionDate: 'January 2025',
      description: 'Enterprise-grade cloud infrastructure processing billions of data points daily with real-time analytics and machine learning capabilities.',
      challenges: 'Processing and analyzing petabytes of data in real-time while optimizing costs and maintaining sub-second query response times.',
      solution: 'Built serverless data lake architecture with streaming analytics, implemented intelligent data partitioning and caching strategies.',
      techStack: ['AWS Lambda', 'S3', 'Kinesis', 'Athena', 'QuickSight', 'DynamoDB', 'EMR', 'Step Functions'],
      features: [
        'Real-time data streaming and processing',
        'Automated data quality monitoring',
        'Machine learning model deployment',
        'Interactive analytics dashboards',
        'Cost optimization with auto-scaling',
        'Multi-region data replication'
      ],
      metrics: {
        users: '5B+ events processed daily',
        rating: '60% reduction in cloud costs',
        performance: '<100ms query response time'
      },
      testimonial: 'The platform handles our massive data volumes effortlessly. ROI was achieved in just 6 months.',
      testimonialAuthor: 'Lisa Wang, Chief Data Officer'
    },
    {
      id: 7,
      title: 'SmartAssist AI',
      category: 'ai',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
      subtitle: 'Intelligent Customer Service AI Agent',
      tags: ['NLP', 'Machine Learning', 'Chatbot', 'Automation'],
      client: 'ServiceHub Technologies',
      duration: '8 months',
      team: '11 specialists',
      completionDate: 'December 2024',
      description: 'Advanced AI agent system providing human-like customer support with multi-language capabilities and context-aware responses.',
      challenges: 'Creating an AI agent that understands context, handles complex queries, and seamlessly escalates to human agents when necessary.',
      solution: 'Developed hybrid AI model combining large language models with custom-trained domain-specific models and reinforcement learning.',
      techStack: ['Python', 'TensorFlow', 'Transformers', 'FastAPI', 'PostgreSQL', 'Redis', 'WebSocket', 'spaCy'],
      features: [
        'Natural language understanding in 30+ languages',
        'Context-aware conversation handling',
        'Sentiment analysis and emotion detection',
        'Intelligent escalation to human agents',
        'Automated ticket categorization',
        'Continuous learning from interactions'
      ],
      metrics: {
        users: '1M+ conversations handled',
        rating: '92% query resolution rate',
        performance: '70% reduction in support costs'
      },
      testimonial: 'The AI agent handles 90% of our customer queries autonomously. Customer satisfaction has never been higher.',
      testimonialAuthor: 'Robert Kim, Head of Customer Experience'
    },
    {
      id: 8,
      title: 'VR Training Simulator',
      category: 'game',
      image: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&auto=format&fit=crop',
      subtitle: 'Industrial Safety Training in Virtual Reality',
      tags: ['Unreal Engine', 'VR', 'Training', 'Simulation'],
      client: 'SafeWork Industries',
      duration: '10 months',
      team: '15 developers',
      completionDate: 'October 2024',
      description: 'Immersive VR training platform for industrial safety procedures with realistic physics and hazard simulations.',
      challenges: 'Creating photorealistic environments with accurate physics simulation while maintaining VR performance standards and preventing motion sickness.',
      solution: 'Utilized Unreal Engine 5 with optimized rendering techniques, implemented comfort settings and adaptive difficulty based on trainee performance.',
      techStack: ['Unreal Engine 5', 'C++', 'Blueprints', 'SteamVR', 'Oculus SDK', 'Wwise Audio'],
      features: [
        'Photorealistic industrial environments',
        'Realistic hazard simulations',
        'Performance tracking and analytics',
        'Multi-user collaborative training',
        'Haptic feedback integration',
        'Customizable training scenarios'
      ],
      metrics: {
        users: '10K+ trained workers',
        rating: '95% training effectiveness',
        performance: '40% reduction in workplace incidents'
      },
      testimonial: 'Training effectiveness increased dramatically. Workers are better prepared for real-world scenarios.',
      testimonialAuthor: 'Jennifer Adams, Safety Director'
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const cubes = [];
    const numCubes = window.innerWidth < 768 ? 8 : 15;

    for (let i = 0; i < numCubes; i++) {
        const size = Math.random() * 80 + 40;
        cubes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * 200 - 100,
            size: size,
            initialSize: size,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.01,
            opacity: Math.random() * 0.2 + 0.05,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3
        });
    }

    const drawCube = (cube) => {
        ctx.save();
        ctx.translate(cube.x, cube.y);
        ctx.rotate(cube.rotation);
        
        const s = cube.size;
        ctx.strokeStyle = `rgba(0, 240, 255, ${cube.opacity})`;
        ctx.lineWidth = 1.5;

        // Front face
        ctx.beginPath();
        ctx.moveTo(-s/2, -s/2); ctx.lineTo(s/2, -s/2); ctx.lineTo(s/2, s/2); ctx.lineTo(-s/2, s/2);
        ctx.closePath();
        ctx.stroke();

        // Back face
        ctx.strokeStyle = `rgba(255, 0, 255, ${cube.opacity * 0.6})`;
        const p = s / 3;
        ctx.beginPath();
        ctx.moveTo(-p, -p); ctx.lineTo(p, -p); ctx.lineTo(p, p); ctx.lineTo(-p, p);
        ctx.closePath();
        ctx.stroke();

        // Connecting lines
        ctx.strokeStyle = `rgba(0, 255, 136, ${cube.opacity * 0.4})`;
        ctx.beginPath();
        ctx.moveTo(-s/2, -s/2); ctx.lineTo(-p, -p);
        ctx.moveTo(s/2, -s/2); ctx.lineTo(p, -p);
        ctx.moveTo(s/2, s/2); ctx.lineTo(p, p);
        ctx.moveTo(-s/2, s/2); ctx.lineTo(-p, p);
        ctx.stroke();

        ctx.restore();
    };

    const animate = () => {
        ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        cubes.forEach(cube => {
            // Mouse parallax effect
            const dx = cube.x - mousePos.current.x;
            const dy = cube.y - mousePos.current.y;
            const parallaxFactor = cube.z / 20000;
            cube.x -= dx * parallaxFactor;
            cube.y -= dy * parallaxFactor;

            // Scroll effect to make cubes feel closer/further
            const scrollScale = scrollY.current * 0.001;
            cube.size = cube.initialSize + scrollScale * cube.z;
            cube.size = Math.max(10, Math.min(cube.size, 250)); // Clamp size to avoid extremes

            cube.rotation += cube.rotationSpeed + scrollY.current * 0.00005;

            // Movement
            cube.x += cube.speedX;
            cube.y += cube.speedY;

            // Boundary check
            if (cube.x < -100) cube.x = canvas.width + 100;
            if (cube.x > canvas.width + 100) cube.x = -100;
            if (cube.y < -100) cube.y = canvas.height + 100;
            if (cube.y > canvas.height + 100) cube.y = -100;

            drawCube(cube);
        });

        animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    
    const handleMouseMove = (e) => {
        mousePos.current = { x: e.clientX, y: e.clientY };
    };
    
    const handleScroll = () => {
        scrollY.current = window.scrollY;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('resize', resizeCanvas);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const handleProjectClick = (project) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProject(project);
      setIsTransitioning(false);
      window.scrollTo(0, 0);
    }, 300);
  };

  const handleCloseProject = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsTransitioning(false);
    }, 300);
  };
  
  const DetailView = ({ project }) => {
    if (!project) return null;
    return (
        <div className={`detail-view ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
              <div className="detail-content">
                <div className="detail-header">
                    <img src={project.image} alt={project.title} className="detail-image" />
                    <div className="detail-overlay">
                        <h1 className="detail-title">{project.title}</h1>
                        <p className="detail-subtitle">{project.subtitle}</p>
                        <div className="detail-meta">
                            <span><Calendar size={16} /> {project.completionDate}</span>
                            <span><Users size={16} /> {project.team}</span>
                            <span><Clock size={16} /> {project.duration}</span>
                        </div>
                    </div>
                </div>

                <div className="detail-body">
                    <div className="detail-section">
                        <h2 className="section-title">Project Overview</h2>
                        <p className="detail-text">{project.description}</p>
                        <div className="client-info">
                            <strong>Client:</strong> {project.client}
                        </div>
                    </div>

                    <div className="tags-container">
                        {project.tags.map((tag, idx) => (
                            <span key={idx} className="detail-tag">{tag}</span>
                        ))}
                    </div>

                    <div className="detail-section">
                        <h2 className="section-title">Challenges</h2>
                        <p className="detail-text">{project.challenges}</p>
                    </div>

                    <div className="detail-section">
                        <h2 className="section-title">Our Solution</h2>
                        <p className="detail-text">{project.solution}</p>
                    </div>

                    <div className="detail-section">
                        <h2 className="section-title">Key Features</h2>
                        <div className="feature-grid">
                            {project.features.map((feature, idx) => (
                                <div key={idx} className="feature-item">
                                    <CheckCircle size={20} className="check-icon" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                        
                    </div>


                    <div className="detail-section">
                        <h2 className="section-title">Technology Stack</h2>
                        <div className="tech-grid">
                            {project.techStack.map((tech, idx) => (
                                <div key={idx} className="tech-item">
                                    <Code size={18} />
                                    <span>{tech}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="metrics-section">
                        <h2 className="section-title">Impact & Metrics</h2>
                        <div className="metrics-grid">
                            <div className="metric-card">
                                <Users size={32} />
                                <h3>User Base</h3>
                                <p>{project.metrics.users}</p>
                            </div>
                            <div className="metric-card">
                                <Award size={32} />
                                <h3>Rating</h3>
                                <p>{project.metrics.rating}</p>
                            </div>
                            <div className="metric-card">
                                <CheckCircle size={32} />
                                <h3>Performance</h3>
                                <p>{project.metrics.performance}</p>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-section">
                        <h2 className="section-title">Client Testimonial</h2>
                        <blockquote className="testimonial">
                            <p>"{project.testimonial}"</p>
                            <footer>— {project.testimonialAuthor}</footer>
                        </blockquote>
                    </div>
                    
                </div>
            </div>
               <button onClick={handleCloseProject} className="close-button">
                <ArrowLeft size={24} /> Back to Projects
            </button>
        </div>
    );
  };

  return (
    <div className="portfolio-container">
      <canvas ref={canvasRef} className="background-canvas" />
      
      {selectedProject ? (
        <DetailView project={selectedProject} />
      ) : (
        <div className="main-content">
          <header className="header">
            <h1 className="main-title">Our Projects</h1>
            <p className="main-subtitle">Innovative solutions across multiple domains</p>
          </header>

          <div className="filter-section">
            <div className="filter-icon">
              <Filter size={20} />
              <span>Filter by:</span>
            </div>
            <div className="category-buttons">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`category-button ${selectedCategory === cat.id ? 'active' : ''}`}
                  style={{ 
                      '--glow-color': cat.color,
                      '--glow-color-transparent': `${cat.color}80`
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className={`projects-grid ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
            {filteredProjects.map(project => {
              const category = categories.find(c => c.id === project.category);
              return (
                <div
                  key={project.id}
                  className="project-card"
                  onClick={() => handleProjectClick(project)}
                  style={{ '--glow-color': category.color }}
                >
                  <div className="card-image-container">
                    <img src={project.image} alt={project.title} className="card-image" />
                    <div className="card-overlay">
                      <ExternalLink size={24} />
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="card-header">
                      <h3 className="card-title">{project.title}</h3>
                      <span className="category-badge" style={{ borderColor: category.color, color: category.color }}>
                        {category.name}
                      </span>
                    </div>
                    <p className="card-subtitle">{project.subtitle}</p>
                    <div className="card-tags">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        :root {
            --background-dark: #0a0a14;
            --background-light: #1a0a28;
            --primary-glow: #00f0ff;
            --secondary-glow: #ff00ff;
            --accent-glow: #00ff88;
            --text-primary: #fff;
            --text-secondary: #a0a0ff;
            --text-highlight: #d0d0e0;
        }
        
        body {
          margin: 0;
        }

        .portfolio-container {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--background-dark) 0%, var(--background-light) 100%);
          color: var(--text-primary);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          position: relative;
          overflow-x: hidden;
        }
        .background-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }
        .main-content {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .header {
          text-align: center;
          margin-bottom: 60px;
        }
        .main-title {
          font-size: 4rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--primary-glow), var(--secondary-glow), var(--accent-glow));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
          text-shadow: 0 0 40px rgba(0, 240, 255, 0.5);
        }
        .main-subtitle {
          font-size: 1.2rem;
          color: var(--text-secondary);
          opacity: 0.8;
        }
        .filter-section {
          margin-bottom: 50px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
        }
        .filter-icon {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--primary-glow);
          font-size: 1.1rem;
        }
        .category-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
        }
        .category-button {
          padding: 12px 24px;
          background: rgba(0, 240, 255, 0.05);
          border: 2px solid rgba(0, 240, 255, 0.3);
          border-radius: 25px;
          color: var(--text-primary);
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }
        .category-button:hover {
            transform: scale(1.05);
            background: rgba(0, 240, 255, 0.1);
        }
        .category-button.active {
          background: rgba(0, 240, 255, 0.15);
          transform: scale(1.05);
          border-color: var(--glow-color);
          box-shadow: 0 0 20px var(--glow-color-transparent);
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }
        .project-card {
          background: rgba(20, 20, 40, 0.6);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(0, 240, 255, 0.2);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          backdrop-filter: blur(10px);
          position: relative;
        }
        .project-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 50px var(--glow-color);
            border-color: var(--glow-color);
        }
        .card-image-container {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
        }
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .project-card:hover .card-image {
            transform: scale(1.1);
        }
        .card-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, rgba(0, 240, 255, 0.3), rgba(255, 0, 255, 0.3));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s ease;
          color: var(--text-primary);
        }
        .project-card:hover .card-overlay {
            opacity: 1;
        }
        .card-content { padding: 25px; }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
          gap: 10px;
        }
        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-glow);
          margin: 0;
          flex: 1;
        }
        .category-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.75rem;
          border: 1px solid;
          font-weight: 600;
          white-space: nowrap;
        }
        .card-subtitle {
          font-size: 0.95rem;
          color: #b0b0d0;
          margin-bottom: 15px;
          line-height: 1.5;
        }
        .card-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag {
          padding: 6px 12px;
          background: rgba(0, 255, 136, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.3);
          border-radius: 15px;
          font-size: 0.8rem;
          color: var(--accent-glow);
        }
        
        /* Detail View Styles */
        .detail-view {
          min-height: 100vh;
          padding: 30px 20px;
          position: relative;
          overflow: auto;
          z-index: 10;
        }
        .close-button {
        
         top: 30px;
          left: 30px;
          padding: 12px 24px;
          background: rgba(0, 240, 255, 0.15);
          border: 2px solid var(--primary-glow);
          border-radius: 25px;
          color: var(--primary-glow);
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 1000;
          transition: all 0.3s ease;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }
        .close-button:hover {
            box-shadow: 0 0 20px var(--primary-glow);
            transform: scale(1.05);
        }
        .detail-content {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 80px;
        }
        .detail-header {
          position: relative;
          width: 100%;
          height: 500px;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 50px;
          border: 2px solid rgba(0, 240, 255, 0.3);
          box-shadow: 0 0 40px rgba(0, 240, 255, 0.2);
        }
        .detail-image { width: 100%; height: 100%; object-fit: cover; }
        .detail-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 40px;
          background: linear-gradient(to top, rgba(10, 10, 20, 0.95) 0%, transparent 100%);
        }
        .detail-title {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--primary-glow), var(--secondary-glow));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }
        .detail-subtitle { font-size: 1.3rem; color: #b0b0d0; margin-bottom: 20px; }
        .detail-meta { display: flex; gap: 30px; font-size: 0.95rem; color: var(--accent-glow); flex-wrap: wrap; }
        .detail-body {
          background: rgba(20, 20, 40, 0.6);
          border-radius: 20px;
          padding: 50px;
          border: 1px solid rgba(0, 240, 255, 0.2);
          backdrop-filter: blur(10px);
        }
        .detail-section { margin-bottom: 40px; }
        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-glow);
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 10px;
          border-bottom: 2px solid rgba(0, 240, 255, 0.3);
        }
        .detail-text { font-size: 1.1rem; line-height: 1.8; color: var(--text-highlight); margin-bottom: 15px; }
        .client-info {
          padding: 15px 20px;
          background: rgba(0, 240, 255, 0.05);
          border: 1px solid rgba(0, 240, 255, 0.3);
          border-radius: 10px;
          color: var(--primary-glow);
          font-size: 1rem;
          margin-top: 15px;
        }
        .tags-container { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 40px; }
        .detail-tag {
          padding: 10px 20px;
          background: rgba(255, 0, 255, 0.1);
          border: 2px solid rgba(255, 0, 255, 0.4);
          border-radius: 20px;
          font-size: 0.95rem;
          color: var(--secondary-glow);
          font-weight: 600;
        }
        .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px; }
        .feature-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 15px; background: rgba(0, 255, 136, 0.05);
          border: 1px solid rgba(0, 255, 136, 0.2); border-radius: 10px;
          color: var(--text-highlight); font-size: 1rem;
        }
        .check-icon { color: var(--accent-glow); flex-shrink: 0; margin-top: 2px; }
        .tech-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 15px; }
        .tech-item {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 18px; background: rgba(68, 136, 255, 0.1);
          border: 1px solid rgba(68, 136, 255, 0.3); border-radius: 10px;
          color: #4488ff; font-size: 0.95rem; font-weight: 600;
        }
        .metrics-section { margin-top: 50px; margin-bottom: 40px; }
        .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px; }
        .metric-card {
          padding: 30px;
          background: linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(255, 0, 255, 0.1));
          border: 2px solid rgba(0, 240, 255, 0.3);
          border-radius: 15px; text-align: center; color: var(--primary-glow);
        }
        .metric-card h3 { margin: 10px 0; }
        .testimonial-section {
          margin-top: 50px; padding: 40px;
          background: linear-gradient(135deg, rgba(255, 0, 255, 0.05), rgba(0, 240, 255, 0.05));
          border: 2px solid rgba(255, 0, 255, 0.3); border-radius: 15px;
        }
        .testimonial { font-size: 1.2rem; font-style: italic; color: var(--text-highlight); line-height: 1.8; margin: 0; }
        .testimonial footer { margin-top: 15px; font-weight: bold; color: var(--primary-glow); }
        
        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-20px); }
        }
        .fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .fade-out { animation: fadeOut 0.3s ease-in forwards; }

        /* --- Responsive Design --- */
        @media (min-width: 1600px) {
            .main-content, .detail-content { max-width: 1500px; }
        }
        @media (min-width: 1800px) {
            .main-content, .detail-content { max-width: 1700px; }
        }
        @media (min-width: 2000px) {
            .main-content, .detail-content { max-width: 1900px; }
        }

        @media (max-width: 1024px) {
            .projects-grid { grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); }
        }

        @media (max-width: 768px) {
            .main-title { font-size: 3rem; }
            .main-subtitle { font-size: 1.1rem; }
            .projects-grid { grid-template-columns: 1fr; }
            .detail-header { height: 350px; }
            .detail-title { font-size: 2.2rem; }
            .detail-subtitle { font-size: 1.1rem; }
            .detail-body { padding: 30px; }
            .section-title { font-size: 1.6rem; }
            .detail-text { font-size: 1rem; }
            .close-button { top: 20px; left: 20px; padding: 10px 18px; font-size: 0.9rem;}
            .detail-content { padding-top: 100px; }
        }

        @media (max-width: 480px) {
            .main-content, .detail-view { padding: 20px 15px; }
            .main-title { font-size: 2.5rem; }
            .category-button { padding: 10px 18px; font-size: 0.9rem; }
            .detail-header { height: 250px; }
            .detail-overlay { padding: 25px; }
            .detail-title { font-size: 1.8rem; }
            .detail-meta { gap: 15px; font-size: 0.85rem; }
            .detail-body { padding: 25px; }
            .feature-grid, .tech-grid, .metrics-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;

