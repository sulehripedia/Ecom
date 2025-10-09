import React, { useState, useEffect, useRef } from 'react';
import { X, Filter, ExternalLink, Calendar, Users, Clock, Award, Code, CheckCircle, ArrowLeft } from 'lucide-react';

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const canvasRef = useRef(null);

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
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
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
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
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
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
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
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800',
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
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
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
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
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
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
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
      image: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800',
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

  // 3D Blueprint Cubes Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cubes = [];
    const numCubes = 15;

    for (let i = 0; i < numCubes; i++) {
      cubes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 80 + 40,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.3 + 0.1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
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
      ctx.moveTo(-s/2, -s/2);
      ctx.lineTo(s/2, -s/2);
      ctx.lineTo(s/2, s/2);
      ctx.lineTo(-s/2, s/2);
      ctx.closePath();
      ctx.stroke();

      // Back face
      ctx.strokeStyle = `rgba(255, 0, 255, ${cube.opacity * 0.6})`;
      ctx.beginPath();
      ctx.moveTo(-s/3, -s/3);
      ctx.lineTo(s/3, -s/3);
      ctx.lineTo(s/3, s/3);
      ctx.lineTo(-s/3, s/3);
      ctx.closePath();
      ctx.stroke();

      // Connecting lines
      ctx.strokeStyle = `rgba(0, 255, 136, ${cube.opacity * 0.4})`;
      ctx.beginPath();
      ctx.moveTo(-s/2, -s/2);
      ctx.lineTo(-s/3, -s/3);
      ctx.moveTo(s/2, -s/2);
      ctx.lineTo(s/3, -s/3);
      ctx.moveTo(s/2, s/2);
      ctx.lineTo(s/3, s/3);
      ctx.moveTo(-s/2, s/2);
      ctx.lineTo(-s/3, s/3);
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      cubes.forEach(cube => {
        cube.rotation += cube.rotationSpeed;
        cube.x += cube.speedX;
        cube.y += cube.speedY;

        if (cube.x < -100) cube.x = canvas.width + 100;
        if (cube.x > canvas.width + 100) cube.x = -100;
        if (cube.y < -100) cube.y = canvas.height + 100;
        if (cube.y > canvas.height + 100) cube.y = -100;

        drawCube(cube);
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const handleProjectClick = (project) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProject(project);
      setIsTransitioning(false);
    }, 300);
  };

  const handleCloseProject = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsTransitioning(false);
    }, 300);
  };

  if (selectedProject) {
    return (
      <div style={styles.detailView} className={isTransitioning ? 'fade-out' : 'fade-in'}>
        <button onClick={handleCloseProject} style={styles.closeButton}>
          <ArrowLeft size={24} /> Back to Projects
        </button>
        
        <div style={styles.detailContent}>
          <div style={styles.detailHeader}>
            <img src={selectedProject.image} alt={selectedProject.title} style={styles.detailImage} />
            <div style={styles.detailOverlay}>
              <h1 style={styles.detailTitle}>{selectedProject.title}</h1>
              <p style={styles.detailSubtitle}>{selectedProject.subtitle}</p>
              <div style={styles.detailMeta}>
                <span><Calendar size={16} /> {selectedProject.completionDate}</span>
                <span><Users size={16} /> {selectedProject.team}</span>
                <span><Clock size={16} /> {selectedProject.duration}</span>
              </div>
            </div>
          </div>

          <div style={styles.detailBody}>
            <div style={styles.detailSection}>
              <h2 style={styles.sectionTitle}>Project Overview</h2>
              <p style={styles.detailText}>{selectedProject.description}</p>
              <div style={styles.clientInfo}>
                <strong>Client:</strong> {selectedProject.client}
              </div>
            </div>

            <div style={styles.tagsContainer}>
              {selectedProject.tags.map((tag, idx) => (
                <span key={idx} style={styles.detailTag}>{tag}</span>
              ))}
            </div>

            <div style={styles.detailSection}>
              <h2 style={styles.sectionTitle}>Challenges</h2>
              <p style={styles.detailText}>{selectedProject.challenges}</p>
            </div>

            <div style={styles.detailSection}>
              <h2 style={styles.sectionTitle}>Our Solution</h2>
              <p style={styles.detailText}>{selectedProject.solution}</p>
            </div>

            <div style={styles.detailSection}>
              <h2 style={styles.sectionTitle}>Key Features</h2>
              <div style={styles.featureGrid}>
                {selectedProject.features.map((feature, idx) => (
                  <div key={idx} style={styles.featureItem}>
                    <CheckCircle size={20} style={styles.checkIcon} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.detailSection}>
              <h2 style={styles.sectionTitle}>Technology Stack</h2>
              <div style={styles.techGrid}>
                {selectedProject.techStack.map((tech, idx) => (
                  <div key={idx} style={styles.techItem}>
                    <Code size={18} />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.metricsSection}>
              <h2 style={styles.sectionTitle}>Impact & Metrics</h2>
              <div style={styles.metricsGrid}>
                <div style={styles.metricCard}>
                  <Users size={32} />
                  <h3>User Base</h3>
                  <p>{selectedProject.metrics.users}</p>
                </div>
                <div style={styles.metricCard}>
                  <Award size={32} />
                  <h3>Rating</h3>
                  <p>{selectedProject.metrics.rating}</p>
                </div>
                <div style={styles.metricCard}>
                  <CheckCircle size={32} />
                  <h3>Performance</h3>
                  <p>{selectedProject.metrics.performance}</p>
                </div>
              </div>
            </div>

            <div style={styles.testimonialSection}>
              <h2 style={styles.sectionTitle}>Client Testimonial</h2>
              <blockquote style={styles.testimonial}>
                <p>"{selectedProject.testimonial}"</p>
                <footer>— {selectedProject.testimonialAuthor}</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <canvas ref={canvasRef} style={styles.canvas} />
      
      <div style={styles.content}>
        <header style={styles.header}>
          <h1 style={styles.mainTitle}>Our Projects</h1>
          <p style={styles.mainSubtitle}>Innovative solutions across multiple domains</p>
        </header>

        <div style={styles.filterSection}>
          <div style={styles.filterIcon}>
            <Filter size={20} />
            <span>Filter by:</span>
          </div>
          <div style={styles.categoryButtons}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  ...styles.categoryButton,
                  ...(selectedCategory === cat.id ? {
                    ...styles.categoryButtonActive,
                    borderColor: cat.color,
                    boxShadow: `0 0 20px ${cat.color}80`
                  } : {})
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.projectsGrid} className={isTransitioning ? 'fade-out' : 'fade-in'}>
          {filteredProjects.map(project => {
            const category = categories.find(c => c.id === project.category);
            return (
              <div
                key={project.id}
                style={styles.projectCard}
                onClick={() => handleProjectClick(project)}
              >
                <div style={styles.cardImageContainer}>
                  <img src={project.image} alt={project.title} style={styles.cardImage} />
                  <div style={styles.cardOverlay}>
                    <ExternalLink size={24} />
                  </div>
                </div>
                <div style={styles.cardContent}>
                  <div style={styles.cardHeader}>
                    <h3 style={styles.cardTitle}>{project.title}</h3>
                    <span style={{...styles.categoryBadge, borderColor: category.color, color: category.color}}>
                      {category.name}
                    </span>
                  </div>
                  <p style={styles.cardSubtitle}>{project.subtitle}</p>
                  <div style={styles.cardTags}>
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} style={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-20px); }
        }
        .fade-in { animation: fadeIn 0.3s ease-out; }
        .fade-out { animation: fadeOut 0.3s ease-out; }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a14 0%, #1a0a28 100%)',
    color: '#fff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative',
    overflow: 'hidden'
  },
  canvas: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    pointerEvents: 'none'
  },
  content: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 20px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px'
  },
  mainTitle: {
    fontSize: '4rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #00f0ff, #ff00ff, #00ff88)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '10px',
    textShadow: '0 0 40px rgba(0, 240, 255, 0.5)'
  },
  mainSubtitle: {
    fontSize: '1.2rem',
    color: '#a0a0ff',
    opacity: 0.8
  },
  filterSection: {
    marginBottom: '50px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center'
  },
  filterIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#00f0ff',
    fontSize: '1.1rem'
  },
  categoryButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    justifyContent: 'center'
  },
  categoryButton: {
    padding: '12px 24px',
    background: 'rgba(0, 240, 255, 0.05)',
    border: '2px solid rgba(0, 240, 255, 0.3)',
    borderRadius: '25px',
    color: '#fff',
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    backdropFilter: 'blur(10px)'
  },
  categoryButtonActive: {
    background: 'rgba(0, 240, 255, 0.15)',
    transform: 'scale(1.05)'
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '30px',
    marginBottom: '40px'
  },
  projectCard: {
    background: 'rgba(20, 20, 40, 0.6)',
    borderRadius: '20px',
    overflow: 'hidden',
    border: '1px solid rgba(0, 240, 255, 0.2)',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    backdropFilter: 'blur(10px)',
    position: 'relative'
  },
  cardImageContainer: {
    position: 'relative',
    width: '100%',
    height: '220px',
    overflow: 'hidden'
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease'
  },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.3), rgba(