import React, { useState, useEffect, useRef } from 'react';
import { X, Filter, ExternalLink, Calendar, Users, Clock, Award, Code, CheckCircle, ArrowLeft, Zap, Target, TrendingUp } from 'lucide-react';

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const cubesRef = useRef([]);

  const categories = [
    { id: 'all', name: 'All Projects', color: '#00f0ff', icon: '🚀' },
    { id: 'game', name: 'Game Dev', color: '#ff00ff', icon: '🎮' },
    { id: 'app', name: 'Mobile Apps', color: '#00ff88', icon: '📱' },
    { id: 'ecommerce', name: 'E-Commerce', color: '#ffaa00', icon: '🛒' },
    { id: 'shopify', name: 'Shopify', color: '#95bf47', icon: '🛍️' },
    { id: 'devops', name: 'DevOps', color: '#ff4444', icon: '⚙️' },
    { id: 'cloud', name: 'Cloud', color: '#4488ff', icon: '☁️' },
    { id: 'ai', name: 'AI Agents', color: '#ff66ff', icon: '🤖' }
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

  // 3D Blueprint Cubes Animation with scroll and mouse interaction
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();

    // Initialize cubes only once
    if (cubesRef.current.length === 0) {
      const numCubes = 20;
      for (let i = 0; i < numCubes; i++) {
        cubesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 500 + 200,
          size: Math.random() * 100 + 50,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.015,
          opacity: Math.random() * 0.4 + 0.15,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: i % 3 === 0 ? '#00f0ff' : i % 3 === 1 ? '#ff00ff' : '#00ff88'
        });
      }
    }

    const drawCube = (cube) => {
      ctx.save();
      
      // Apply mouse interaction
      const mouseInfluence = 30;
      const dx = (mousePos.x - cube.x) / canvas.width;
      const dy = (mousePos.y - cube.y) / canvas.height;
      const offsetX = dx * mouseInfluence;
      const offsetY = dy * mouseInfluence;
      
      // Apply scroll-based depth and rotation
      const scrollInfluence = scrollY * 0.1;
      const scale = cube.z / (cube.z + scrollInfluence);
      const perspective = 600;
      const depth = perspective / (perspective + cube.z - scrollInfluence);
      
      ctx.translate(cube.x + offsetX, cube.y + offsetY);
      ctx.scale(depth, depth);
      ctx.rotate(cube.rotation + scrollInfluence * 0.001);
      
      const s = cube.size;
      ctx.lineWidth = 2;

      // Front face
      ctx.strokeStyle = `rgba(${cube.color === '#00f0ff' ? '0, 240, 255' : cube.color === '#ff00ff' ? '255, 0, 255' : '0, 255, 136'}, ${cube.opacity})`;
      ctx.beginPath();
      ctx.moveTo(-s/2, -s/2);
      ctx.lineTo(s/2, -s/2);
      ctx.lineTo(s/2, s/2);
      ctx.lineTo(-s/2, s/2);
      ctx.closePath();
      ctx.stroke();

      // Back face (with perspective)
      ctx.strokeStyle = `rgba(${cube.color === '#00f0ff' ? '0, 240, 255' : cube.color === '#ff00ff' ? '255, 0, 255' : '0, 255, 136'}, ${cube.opacity * 0.5})`;
      const offset = s * 0.3;
      ctx.beginPath();
      ctx.moveTo(-s/2 + offset, -s/2 + offset);
      ctx.lineTo(s/2 - offset, -s/2 + offset);
      ctx.lineTo(s/2 - offset, s/2 - offset);
      ctx.lineTo(-s/2 + offset, s/2 - offset);
      ctx.closePath();
      ctx.stroke();

      // Connecting lines
      ctx.strokeStyle = `rgba(${cube.color === '#00f0ff' ? '0, 240, 255' : cube.color === '#ff00ff' ? '255, 0, 255' : '0, 255, 136'}, ${cube.opacity * 0.3})`;
      ctx.beginPath();
      ctx.moveTo(-s/2, -s/2);
      ctx.lineTo(-s/2 + offset, -s/2 + offset);
      ctx.moveTo(s/2, -s/2);
      ctx.lineTo(s/2 - offset, -s/2 + offset);
      ctx.moveTo(s/2, s/2);
      ctx.lineTo(s/2 - offset, s/2 - offset);
      ctx.moveTo(-s/2, s/2);
      ctx.lineTo(-s/2 + offset, s/2 - offset);
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(8, 8, 18, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      cubesRef.current.forEach(cube => {
        cube.rotation += cube.rotationSpeed;
        cube.x += cube.speedX;
        cube.y += cube.speedY;

        if (cube.x < -150) cube.x = canvas.width + 150;
        if (cube.x > canvas.width + 150) cube.x = -150;
        if (cube.y < -150) cube.y = canvas.height + 150;
        if (cube.y > canvas.height + 150) cube.y = -150;

        drawCube(cube);
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => updateCanvasSize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [scrollY, mousePos]);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const handleProjectClick = (project) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProject(project);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  const handleCloseProject = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  if (selectedProject) {
    return (
      <div style={styles.container}>
        <canvas ref={canvasRef} style={styles.canvas} />
        
        <div style={styles.detailView} className={isTransitioning ? 'fade-out' : 'fade-in'}>
          <button onClick={handleCloseProject} style={styles.closeButton} className="close-btn">
            <ArrowLeft size={20} /> Back to Projects
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
                <h2 style={styles.sectionTitle}>
                  <Target size={24} style={{marginRight: '10px'}} />
                  Project Overview
                </h2>
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

              <div style={styles.twoColumnSection}>
                <div style={styles.detailSection}>
                  <h2 style={styles.sectionTitle}>
                    <Zap size={24} style={{marginRight: '10px'}} />
                    Challenges
                  </h2>
                  <p style={styles.detailText}>{selectedProject.challenges}</p>
                </div>

                <div style={styles.detailSection}>
                  <h2 style={styles.sectionTitle}>
                    <CheckCircle size={24} style={{marginRight: '10px'}} />
                    Our Solution
                  </h2>
                  <p style={styles.detailText}>{selectedProject.solution}</p>
                </div>
              </div>

              <div style={styles.detailSection}>
                <h2 style={styles.sectionTitle}>
                  <Award size={24} style={{marginRight: '10px'}} />
                  Key Features
                </h2>
                <div style={styles.featureGrid}>
                  {selectedProject.features.map((feature, idx) => (
                    <div key={idx} style={styles.featureItem} className="feature-item">
                      <CheckCircle size={20} style={styles.checkIcon} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.detailSection}>
                <h2 style={styles.sectionTitle}>
                  <Code size={24} style={{marginRight: '10px'}} />
                  Technology Stack
                </h2>
                <div style={styles.techGrid}>
                  {selectedProject.techStack.map((tech, idx) => (
                    <div key={idx} style={styles.techItem} className="tech-item">
                      <div style={styles.techDot}></div>
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.metricsSection}>
                <h2 style={styles.sectionTitle}>
                  <TrendingUp size={24} style={{marginRight: '10px'}} />
                  Impact & Metrics
                </h2>
                <div style={styles.metricsGrid}>
                  <div style={styles.metricCard} className="metric-card">
                    <Users size={40} style={{color: '#00f0ff'}} />
                    <h3>User Base</h3>
                    <p>{selectedProject.metrics.users}</p>
                  </div>
                  <div style={styles.metricCard} className="metric-card">
                    <Award size={40} style={{color: '#ff00ff'}} />
                    <h3>Rating</h3>
                    <p>{selectedProject.metrics.rating}</p>
                  </div>
                  <div style={styles.metricCard} className="metric-card">
                    <CheckCircle size={40} style={{color: '#00ff88'}} />
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

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-30px); }
          }
          .fade-in { animation: fadeIn 0.4s ease-out; }
          .fade-out { animation: fadeOut 0.4s ease-out; }
          
          .close-btn:hover {
            background: rgba(0, 240, 255, 0.25) !important;
            box-shadow: 0 0 30px rgba(0, 240, 255, 0.5) !important;
            transform: translateX(-5px) !important;
          }
          
          .feature-item:hover {
            background: rgba(0, 255, 136, 0.15) !important;
            transform: translateX(5px) !important;
          }
          
          .tech-item:hover {
            background: rgba(100, 150, 255, 0.2) !important;
            transform: scale(1.05) !important;
          }
          
          .metric-card:hover {
            transform: translateY(-10px) scale(1.05) !important;
            box-shadow: 0 20px 60px rgba(0, 240, 255, 0.4) !important;
          }
        `}</style>
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

        <div style={styles.floatingFilterContainer}>
          <div style={styles.filterLabel}>
            <Filter size={18} />
            <span>Filter Projects</span>
          </div>
          <div style={styles.categoryGrid}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="category-btn"
                style={{
                  ...styles.categoryButton,
                  ...(selectedCategory === cat.id ? {
                    background: `linear-gradient(135deg, ${cat.color}20, ${cat.color}10)`,
                    borderColor: cat.color,
                    boxShadow: `0 0 30px ${cat.color}60, inset 0 0 20px ${cat.color}20`
                  } : {})
                }}
              >
                <span style={styles.categoryIcon}>{cat.icon}</span>
                <span>{cat.name}</span>
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
                className="project-card"
                onClick={() => handleProjectClick(project)}
              >
                <div style={styles.cardImageContainer}>
                  <img src={project.image} alt={project.title} style={styles.cardImage} />
                  <div style={styles.cardOverlay}>
                    <ExternalLink size={28} />
                    <span style={styles.overlayText}>View Project</span>
                  </div>
                </div>
                <div style={styles.cardContent}>
                  <div style={styles.cardHeader}>
                    <h3 style={styles.cardTitle}>{project.title}</h3>
                    <span 
                      style={{
                        ...styles.categoryBadge, 
                        borderColor: category.color, 
                        color: category.color,
                        boxShadow: `0 0 15px ${category.color}40`
                      }}
                    >
                      {category.icon}
                    </span>
                  </div>
                  <p style={styles.cardSubtitle}>{project.subtitle}</p>
                  <div style={styles.cardTags}>
                    {project.tags.slice(0, 4).map((tag, idx) => (
                      <span key={idx} style={styles.tag}>{tag}</span>
                    ))}
                  </div>
                  <div style={styles.cardFooter}>
                    <span style={styles.clientBadge}>
                      <Users size={14} /> {project.client}
                    </span>
                    <span style={styles.durationBadge}>
                      <Clock size={14} /> {project.duration}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-30px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 240, 255, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 240, 255, 0.6); }
        }
        
        .fade-in { animation: fadeIn 0.4s ease-out; }
        .fade-out { animation: fadeOut 0.4s ease-out; }
        
        .category-btn {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .category-btn:hover {
          transform: translateY(-5px) scale(1.05) !important;
          box-shadow: 0 15px 40px rgba(0, 240, 255, 0.4) !important;
        }
        
        .project-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .project-card:hover {
          transform: translateY(-15px) scale(1.02) !important;
          box-shadow: 0 25px 60px rgba(0, 240, 255, 0.3), 
                      0 0 40px rgba(255, 0, 255, 0.2) !important;
          border-color: rgba(0, 240, 255, 0.6) !important;
        }
        
        .project-card:hover img {
          transform: scale(1.1) rotate(2deg) !important;
        }
        
        .project-card:hover .card-overlay {
          opacity: 1 !important;
        }
        
        .close-btn:hover {
          background: rgba(0, 240, 255, 0.25) !important;
          box-shadow: 0 0 30px rgba(0, 240, 255, 0.5) !important;
          transform: translateX(-5px) !important;
        }
        
        .feature-item:hover {
          background: rgba(0, 255, 136, 0.15) !important;
          transform: translateX(5px) !important;
          border-color: rgba(0, 255, 136, 0.5) !important;
        }
        
        .tech-item:hover {
          background: rgba(100, 150, 255, 0.25) !important;
          transform: scale(1.08) !important;
          border-color: rgba(100, 150, 255, 0.6) !important;
        }
        
        .metric-card:hover {
          transform: translateY(-10px) scale(1.05) !important;
          box-shadow: 0 20px 60px rgba(0, 240, 255, 0.4) !important;
        }
        
        @media (max-width: 768px) {
          .category-btn {
            padding: 10px 18px !important;
            font-size: 0.85rem !important;
          }
          
          .project-card:hover {
            transform: translateY(-8px) scale(1.01) !important;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #080812 0%, #1a0a2e 50%, #0f0820 100%)',
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
    maxWidth: '1600px',
    margin: '0 auto',
    padding: '60px 30px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '80px'
  },
  mainTitle: {
    fontSize: 'clamp(3rem, 8vw, 5rem)',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #00f0ff 0%, #ff00ff 50%, #00ff88 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '15px',
    letterSpacing: '-2px',
    textShadow: '0 0 60px rgba(0, 240, 255, 0.6)'
  },
  mainSubtitle: {
    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
    color: '#a0a0ff',
    opacity: 0.9,
    fontWeight: '300',
    letterSpacing: '1px'
  },
  floatingFilterContainer: {
    position: 'sticky',
    top: '20px',
    zIndex: 100,
    background: 'rgba(15, 15, 35, 0.85)',
    backdropFilter: 'blur(20px)',
    borderRadius: '25px',
    padding: '25px 30px',
    marginBottom: '60px',
    border: '2px solid rgba(0, 240, 255, 0.3)',
    boxShadow: '0 10px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 240, 255, 0.2)',
    animation: 'float 6s ease-in-out infinite'
  },
  filterLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#00f0ff',
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '15px'
  },
  categoryButton: {
    padding: '14px 20px',
    background: 'rgba(20, 20, 50, 0.6)',
    border: '2px solid rgba(100, 100, 150, 0.3)',
    borderRadius: '18px',
    color: '#fff',
    fontSize: '0.9rem',
    cursor: 'pointer',
    fontWeight: '600',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    whiteSpace: 'nowrap'
  },
  categoryIcon: {
    fontSize: '1.2rem'
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '40px',
    marginBottom: '60px'
  },
  projectCard: {
    background: 'rgba(20, 20, 45, 0.7)',
    borderRadius: '25px',
    overflow: 'hidden',
    border: '2px solid rgba(0, 240, 255, 0.25)',
    cursor: 'pointer',
    backdropFilter: 'blur(15px)',
    position: 'relative'
  },
  cardImageContainer: {
    position: 'relative',
    width: '100%',
    height: '260px',
    overflow: 'hidden'
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.4), rgba(255, 0, 255, 0.4))',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    opacity: 0,
    transition: 'opacity 0.4s ease',
    color: '#fff',
    fontWeight: '700',
    fontSize: '1.1rem'
  },
  overlayText: {
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
  },
  cardContent: {
    padding: '30px'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px',
    gap: '15px'
  },
  cardTitle: {
    fontSize: '1.6rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #00f0ff, #00ff88)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0,
    flex: 1,
    lineHeight: '1.3'
  },
  categoryBadge: {
    padding: '8px 14px',
    borderRadius: '15px',
    fontSize: '1.2rem',
    border: '2px solid',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    flexShrink: 0
  },
  cardSubtitle: {
    fontSize: '1rem',
    color: '#b0b5d0',
    marginBottom: '20px',
    lineHeight: '1.6',
    fontWeight: '400'
  },
  cardTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px'
  },
  tag: {
    padding: '8px 16px',
    background: 'rgba(0, 255, 136, 0.1)',
    border: '1.5px solid rgba(0, 255, 136, 0.4)',
    borderRadius: '18px',
    fontSize: '0.85rem',
    color: '#00ff88',
    fontWeight: '500'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '15px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(100, 100, 150, 0.2)',
    fontSize: '0.85rem',
    flexWrap: 'wrap'
  },
  clientBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#00f0ff',
    fontWeight: '500'
  },
  durationBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#ff00ff',
    fontWeight: '500'
  },
  detailView: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1600px',
    margin: '0 auto',
    padding: '30px 20px',
    minHeight: '100vh'
  },
  closeButton: {
    position: 'fixed',
    top: '30px',
    left: '30px',
    padding: '14px 28px',
    background: 'rgba(0, 240, 255, 0.15)',
    border: '2px solid #00f0ff',
    borderRadius: '30px',
    color: '#00f0ff',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    zIndex: 1000,
    transition: 'all 0.3s ease',
    fontWeight: '700',
    backdropFilter: 'blur(15px)',
    boxShadow: '0 5px 25px rgba(0, 240, 255, 0.3)'
  },
  detailContent: {
    paddingTop: '100px'
  },
  detailHeader: {
    position: 'relative',
    width: '100%',
    height: 'clamp(400px, 50vh, 600px)',
    borderRadius: '30px',
    overflow: 'hidden',
    marginBottom: '60px',
    border: '3px solid rgba(0, 240, 255, 0.4)',
    boxShadow: '0 0 60px rgba(0, 240, 255, 0.3)'
  },
  detailImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  detailOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '50px',
    background: 'linear-gradient(to top, rgba(8, 8, 18, 0.98) 0%, rgba(8, 8, 18, 0.7) 70%, transparent 100%)',
    backdropFilter: 'blur(10px)'
  },
  detailTitle: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #00f0ff 0%, #ff00ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '15px',
    letterSpacing: '-1px'
  },
  detailSubtitle: {
    fontSize: 'clamp(1rem, 2vw, 1.4rem)',
    color: '#c0c5e0',
    marginBottom: '25px',
    fontWeight: '400'
  },
  detailMeta: {
    display: 'flex',
    gap: '35px',
    fontSize: '1rem',
    color: '#00ff88',
    flexWrap: 'wrap',
    fontWeight: '500'
  },
  detailBody: {
    background: 'rgba(20, 20, 45, 0.7)',
    borderRadius: '30px',
    padding: 'clamp(30px, 5vw, 60px)',
    border: '2px solid rgba(0, 240, 255, 0.25)',
    backdropFilter: 'blur(15px)',
    boxShadow: '0 10px 50px rgba(0, 0, 0, 0.3)'
  },
  detailSection: {
    marginBottom: '50px'
  },
  sectionTitle: {
    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
    fontWeight: '800',
    color: '#00f0ff',
    marginBottom: '25px',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '15px',
    borderBottom: '2px solid rgba(0, 240, 255, 0.3)'
  },
  detailText: {
    fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
    lineHeight: '1.9',
    color: '#d5d8f0',
    marginBottom: '20px',
    fontWeight: '400'
  },
  clientInfo: {
    padding: '20px 25px',
    background: 'rgba(0, 240, 255, 0.08)',
    border: '2px solid rgba(0, 240, 255, 0.3)',
    borderRadius: '15px',
    color: '#00f0ff',
    fontSize: '1.05rem',
    marginTop: '20px',
    fontWeight: '600'
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '50px'
  },
  detailTag: {
    padding: '12px 24px',
    background: 'rgba(255, 0, 255, 0.12)',
    border: '2px solid rgba(255, 0, 255, 0.5)',
    borderRadius: '25px',
    fontSize: '1rem',
    color: '#ff00ff',
    fontWeight: '700',
    boxShadow: '0 0 20px rgba(255, 0, 255, 0.3)'
  },
  twoColumnSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
    marginBottom: '50px'
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '18px'
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    padding: '18px 20px',
    background: 'rgba(0, 255, 136, 0.08)',
    border: '2px solid rgba(0, 255, 136, 0.25)',
    borderRadius: '12px',
    color: '#d5d8f0',
    fontSize: '1rem',
    transition: 'all 0.3s ease'
  },
  checkIcon: {
    color: '#00ff88',
    flexShrink: 0,
    marginTop: '3px'
  },
  techGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '18px'
  },
  techItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 22px',
    background: 'rgba(68, 136, 255, 0.12)',
    border: '2px solid rgba(68, 136, 255, 0.35)',
    borderRadius: '15px',
    color: '#6495ff',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  },
  techDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #4488ff, #00f0ff)',
    boxShadow: '0 0 10px #4488ff'
  },
  metricsSection: {
    marginTop: '60px',
    marginBottom: '50px'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px'
  },
  metricCard: {
    padding: '40px 30px',
    background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.12), rgba(255, 0, 255, 0.12))',
    border: '2px solid rgba(0, 240, 255, 0.4)',
    borderRadius: '20px',
    textAlign: 'center',
    transition: 'all 0.4s ease',
    boxShadow: '0 10px 40px rgba(0, 240, 255, 0.2)'
  },
  testimonialSection: {
    marginTop: '60px',
    padding: '50px',
    background: 'linear-gradient(135deg, rgba(255, 0, 255, 0.08), rgba(0, 240, 255, 0.08))',
    border: '2px solid rgba(255, 0, 255, 0.35)',
    borderRadius: '20px',
    boxShadow: '0 0 40px rgba(255, 0, 255, 0.2)'
  },
  testimonial: {
    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
    fontStyle: 'italic',
    color: '#d5d8f0',
    lineHeight: '1.9',
    margin: 0,
    fontWeight: '400'
  }
};

export default ProjectsPage;