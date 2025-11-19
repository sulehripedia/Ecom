import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Smartphone, ShoppingCart, Layers, Award, TrendingUp, Users, Clock, ArrowLeft, ChevronDown, Zap, Rocket, Target } from 'lucide-react';

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const canvasRef = useRef(null);
  const blobsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced Blob Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
    };
    updateCanvasSize();

    class Blob {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : -100;
        this.size = Math.random() * 60 + 30;
        this.baseSpeed = Math.random() * 1.5 + 0.5;
        this.speedY = this.baseSpeed;
        this.speedX = (Math.random() - 0.5) * 2;
        this.zigzagAmplitude = Math.random() * 3 + 1;
        this.zigzagFrequency = Math.random() * 0.02 + 0.01;
        this.time = Math.random() * 1000;
        this.opacity = Math.random() * 0.3 + 0.2;
        this.hue = Math.random() * 60 + 200;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.03;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.bounceEnergyLoss = 0.7;
        this.isResting = false;
      }

      update() {
        this.time += 1;
        
        // Zigzag horizontal motion
        this.speedX = Math.sin(this.time * this.zigzagFrequency) * this.zigzagAmplitude;
        
        // Apply movement
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Rotation
        this.rotation += this.rotationSpeed;
        
        // Gravity
        if (!this.isResting) {
          this.speedY += 0.15;
        }
        
        // Wall bouncing
        if (this.x - this.size < 0) {
          this.x = this.size;
          this.speedX = Math.abs(this.speedX);
        } else if (this.x + this.size > canvas.width) {
          this.x = canvas.width - this.size;
          this.speedX = -Math.abs(this.speedX);
        }
        
        // Floor bouncing
        if (this.y + this.size >= canvas.height) {
          this.y = canvas.height - this.size;
          this.speedY = -this.speedY * this.bounceEnergyLoss;
          
          // Stop bouncing if energy is too low
          if (Math.abs(this.speedY) < 0.5) {
            this.speedY = 0;
            this.isResting = true;
            // Reset after resting for a while
            setTimeout(() => {
              this.reset();
            }, Math.random() * 3000 + 2000);
          }
        }
        
        // Reset if blob goes off screen
        if (this.y > canvas.height + 200) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Pulsing effect
        const pulse = Math.sin(this.time * this.pulseSpeed) * 0.1 + 1;
        const currentSize = this.size * pulse;
        
        // Gradient
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, currentSize);
        gradient.addColorStop(0, `hsla(${this.hue}, 80%, 65%, ${this.opacity})`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 70%, 55%, ${this.opacity * 0.6})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 60%, 45%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        
        // Organic blob shape
        const points = 12;
        for (let i = 0; i < points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const offset = Math.sin(angle * 3 + this.time * 0.02) * 0.15;
          const radius = currentSize * (0.85 + offset);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    // Create blobs
    blobsRef.current = Array.from({ length: 20 }, () => new Blob());

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      blobsRef.current.forEach(blob => {
        blob.update();
        blob.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      updateCanvasSize();
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Full Stack",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=800&fit=crop",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Redis", "AWS"],
      description: "A comprehensive e-commerce solution with real-time inventory management, secure payment processing, and advanced analytics dashboard. Features include multi-vendor support, dynamic pricing, automated email campaigns, and AI-powered product recommendations.",
      longDescription: "This enterprise-grade e-commerce platform revolutionizes online retail with cutting-edge technology and user-centric design. Built to scale, it handles millions of transactions while maintaining lightning-fast performance. The platform integrates seamlessly with major payment gateways, shipping providers, and marketing tools, offering a complete solution for modern businesses.",
      metrics: { users: "10K+", uptime: "99.9%", transactions: "50K+", revenue: "$2M+" },
      features: [
        "Real-time inventory synchronization across multiple warehouses",
        "AI-powered product recommendations increasing conversion by 35%",
        "Advanced analytics dashboard with customizable reports",
        "Multi-currency and multi-language support",
        "Automated email marketing campaigns with A/B testing",
        "Progressive Web App with offline capabilities"
      ],
      challenges: "Scaling the platform to handle Black Friday traffic spikes while maintaining sub-second response times.",
      solution: "Implemented Redis caching layer, CDN distribution, and horizontal scaling with auto-scaling groups.",
      type: "Web Application",
      github: "#",
      live: "#"
    },
    {
      id: 2,
      title: "SaaS Analytics Dashboard",
      category: "SaaS",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "D3.js", "Docker", "GraphQL"],
      description: "Advanced analytics platform with real-time data visualization, customizable reports, and AI-powered insights for business intelligence.",
      longDescription: "Transform raw data into actionable insights with this powerful analytics platform. Designed for enterprise teams, it provides real-time monitoring, predictive analytics, and collaborative features that drive data-driven decision making across organizations.",
      metrics: { clients: "500+", dataPoints: "1M+", response: "<100ms", satisfaction: "98%" },
      features: [
        "Real-time data streaming and processing",
        "Customizable dashboards with drag-and-drop widgets",
        "AI-powered anomaly detection and alerts",
        "Team collaboration with shared reports",
        "API integrations with 50+ data sources",
        "White-label solution for agencies"
      ],
      challenges: "Processing and visualizing millions of data points in real-time without performance degradation.",
      solution: "Built a microservices architecture with WebSocket connections and optimized PostgreSQL queries with materialized views.",
      type: "SaaS Platform",
      github: "#",
      live: "#"
    },
    {
      id: 3,
      title: "Mobile Fitness App",
      category: "Mobile",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=800&fit=crop",
      tech: ["React Native", "Firebase", "Redux", "TensorFlow", "HealthKit"],
      description: "Cross-platform fitness tracking app with AI-powered workout recommendations, nutrition planning, and social features.",
      longDescription: "A comprehensive fitness companion that adapts to your lifestyle. Using machine learning algorithms, the app creates personalized workout plans, tracks progress, and connects you with a community of fitness enthusiasts.",
      metrics: { downloads: "25K+", rating: "4.8/5", retention: "75%", active: "18K+" },
      features: [
        "AI-generated personalized workout plans",
        "Video demonstrations with form correction",
        "Nutrition tracking with barcode scanner",
        "Integration with Apple Health and Google Fit",
        "Social challenges and leaderboards",
        "Offline mode for gym sessions"
      ],
      challenges: "Maintaining smooth performance while processing video streams for form analysis.",
      solution: "Implemented on-device TensorFlow Lite models for real-time pose estimation with optimized frame processing.",
      type: "Mobile Application",
      github: "#",
      live: "#"
    },
    {
      id: 4,
      title: "Shopify Theme Customization",
      category: "Shopify",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=800&fit=crop",
      tech: ["Liquid", "JavaScript", "Shopify API", "CSS", "Webpack"],
      description: "Premium Shopify theme with advanced customization options, dynamic sections, and optimized for conversion rates.",
      longDescription: "A high-converting Shopify theme that combines stunning aesthetics with powerful functionality. Built with performance in mind, it achieves perfect scores on Google PageSpeed while delivering a rich, interactive shopping experience.",
      metrics: { stores: "200+", conversion: "+35%", speed: "95/100", sales: "+$5M" },
      features: [
        "Mega menu with product previews",
        "Quick view modal with variant selection",
        "Advanced product filtering and sorting",
        "Instagram feed integration",
        "Color and size swatches",
        "Mobile-first responsive design"
      ],
      challenges: "Achieving high PageSpeed scores while maintaining rich visual features and animations.",
      solution: "Implemented lazy loading, optimized images with WebP format, and code-split JavaScript bundles.",
      type: "E-Commerce Theme",
      github: "#",
      live: "#"
    },
    {
      id: 5,
      title: "Real Estate Management System",
      category: "Full Stack",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
      tech: ["Vue.js", "Laravel", "MySQL", "Google Maps API", "WebRTC"],
      description: "Complete property management solution with virtual tours, tenant management, payment processing, and maintenance tracking.",
      longDescription: "Streamline property management operations with this all-in-one platform. From listing properties to managing tenants and maintenance, everything is centralized in an intuitive interface that saves time and reduces operational costs.",
      metrics: { properties: "5K+", users: "15K+", satisfaction: "95%", savings: "40%" },
      features: [
        "360° virtual property tours with WebRTC",
        "Automated lease generation and e-signatures",
        "Tenant portal for payments and maintenance requests",
        "Financial reporting and expense tracking",
        "Document management system",
        "Mobile app for on-the-go management"
      ],
      challenges: "Implementing real-time video tours that work across all devices and connection speeds.",
      solution: "Built adaptive bitrate streaming with WebRTC fallback to recorded tours for low-bandwidth connections.",
      type: "Web Platform",
      github: "#",
      live: "#"
    },
    {
      id: 6,
      title: "AI-Powered Chatbot SaaS",
      category: "SaaS",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=800&fit=crop",
      tech: ["Python", "FastAPI", "OpenAI", "React", "WebSocket"],
      description: "Intelligent chatbot platform with natural language processing, multi-language support, and seamless integration capabilities.",
      longDescription: "Revolutionize customer support with AI-powered conversations. This platform uses advanced NLP to understand context, sentiment, and intent, delivering human-like interactions that resolve queries faster and improve customer satisfaction.",
      metrics: { conversations: "100K+", accuracy: "94%", clients: "300+", languages: "25+" },
      features: [
        "Custom training on company data",
        "Sentiment analysis and emotion detection",
        "Seamless human handoff when needed",
        "Multi-channel support (web, mobile, social)",
        "Conversation analytics and insights",
        "Integration with CRM systems"
      ],
      challenges: "Maintaining conversation context across multiple channels while handling high concurrency.",
      solution: "Implemented distributed session management with Redis and optimized prompt engineering for context retention.",
      type: "AI Platform",
      github: "#",
      live: "#"
    }
  ];

  const expertise = [
    { 
      icon: <Code size={40} />, 
      title: "Web Development", 
      desc: "Building lightning-fast, scalable web applications with React, Next.js, and Vue.js. Expertise in modern architecture patterns, state management, and performance optimization.",
      details: [
        "Responsive & Progressive Web Apps",
        "RESTful & GraphQL APIs",
        "Server-Side Rendering (SSR)",
        "Real-time Applications with WebSockets"
      ],
      color: "from-cyan-500 to-blue-500",
      projects: "50+ Projects"
    },
    { 
      icon: <Layers size={40} />, 
      title: "SaaS Development", 
      desc: "Creating cloud-native SaaS platforms with multi-tenancy, subscription billing, and enterprise-grade security. From MVP to scale-up.",
      details: [
        "Multi-tenant Architecture",
        "Subscription & Billing Integration",
        "Role-based Access Control",
        "Cloud Infrastructure (AWS, Azure)"
      ],
      color: "from-blue-500 to-purple-500",
      projects: "30+ Platforms"
    },
    { 
      icon: <Smartphone size={40} />, 
      title: "Mobile Apps", 
      desc: "Developing cross-platform mobile experiences with React Native. Native performance with shared codebase, offline support, and seamless integrations.",
      details: [
        "iOS & Android Development",
        "Native Module Integration",
        "Offline-First Architecture",
        "Push Notifications & Deep Linking"
      ],
      color: "from-purple-500 to-pink-500",
      projects: "25+ Apps"
    },
    { 
      icon: <ShoppingCart size={40} />, 
      title: "E-Commerce", 
      desc: "Crafting high-converting online stores with Shopify and custom solutions. Payment integration, inventory management, and conversion optimization.",
      details: [
        "Custom Shopify Themes & Apps",
        "Payment Gateway Integration",
        "Inventory Management Systems",
        "Conversion Rate Optimization"
      ],
      color: "from-pink-500 to-red-500",
      projects: "40+ Stores"
    }
  ];

  if (currentView === 'project' && selectedProject) {
    return (
      <div className="relative min-h-screen bg-black text-white">
        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
        
        {/* Header */}
        <header className="fixed top-0 w-full z-50 bg-black bg-opacity-60 backdrop-blur-2xl border-b border-white border-opacity-5">
          <nav className="container mx-auto px-6 py-5 flex justify-between items-center">
            <button 
              onClick={() => {
                setCurrentView('home');
                setSelectedProject(null);
                window.scrollTo(0, 0);
              }}
              className="flex items-center space-x-3 text-white hover:text-cyan-400 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:bg-opacity-20 transition-all">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              </div>
              <span className="text-lg font-semibold">Back</span>
            </button>
            <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Muhammad Saad
            </div>
          </nav>
        </header>

        <div className="relative z-10 pt-28 pb-20">
          <div className="container mx-auto max-w-7xl px-6">
            {/* Hero Section */}
            <div className="mb-20">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 bg-opacity-20 rounded-full border border-cyan-400 border-opacity-30 mb-6">
                <span className="text-sm font-semibold text-cyan-400">{selectedProject.type}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                {selectedProject.title}
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mb-8">{selectedProject.category}</p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <a 
                  href={selectedProject.live}
                  className="group flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 font-semibold"
                >
                  <ExternalLink size={20} className="group-hover:rotate-12 transition-transform" />
                  <span>View Live</span>
                </a>
                <a 
                  href={selectedProject.github}
                  className="group flex items-center space-x-2 px-8 py-4 bg-white bg-opacity-5 backdrop-blur-xl rounded-full border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300 font-semibold"
                >
                  <Github size={20} className="group-hover:rotate-12 transition-transform" />
                  <span>Source Code</span>
                </a>
              </div>

              {/* Hero Image */}
              <div className="relative h-[60vh] rounded-3xl overflow-hidden shadow-2xl group">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {Object.entries(selectedProject.metrics).map(([key, value], idx) => (
                <div 
                  key={key} 
                  className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                      {value}
                    </div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider font-semibold">{key}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Overview */}
                <div className="group">
                  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Overview
                  </h2>
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 group-hover:border-cyan-400/30 transition-all duration-300">
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                      {selectedProject.description}
                    </p>
                    <p className="text-lg text-gray-400 leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>
                </div>

                {/* Key Features */}
                <div className="group">
                  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Key Features
                  </h2>
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 group-hover:border-blue-400/30 transition-all duration-300">
                    <div className="space-y-4">
                      {selectedProject.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-4 group/item">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center mt-1">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <p className="text-gray-300 group-hover/item:text-white transition-colors">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <h3 className="text-2xl font-bold mb-4 text-orange-400">Challenge</h3>
                    <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-400/20 group-hover:border-orange-400/40 transition-all duration-300">
                      <p className="text-gray-300">{selectedProject.challenges}</p>
                    </div>
                  </div>
                  <div className="group">
                    <h3 className="text-2xl font-bold mb-4 text-green-400">Solution</h3>
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-2xl p-6 border border-green-400/20 group-hover:border-green-400/40 transition-all duration-300">
                      <p className="text-gray-300">{selectedProject.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Award, label: "Award Winning", color: "text-yellow-400" },
                    { icon: TrendingUp, label: "High Performance", color: "text-green-400" },
                    { icon: Users, label: "User Friendly", color: "text-blue-400" },
                    { icon: Clock, label: "On Time Delivery", color: "text-purple-400" }
                  ].map(({ icon: Icon, label, color }, idx) => (
                    <div key={idx} className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 flex flex-col items-center text-center">
                      <Icon className={`${color} mb-3 group-hover:scale-110 transition-transform`} size={32} />
                      <span className="text-sm font-semibold text-gray-300">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-8">
                <div className="sticky top-28">
                  {/* Technologies */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-8">
                    <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tech.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl text-sm font-semibold border border-cyan-400/30 hover:border-cyan-400/60 transition-colors backdrop-blur-xl"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-4">
                    <a 
                      href={selectedProject.live}
                      className="group block w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 text-center font-semibold flex items-center justify-center space-x-2"
                    >
                      <Rocket className="group-hover:translate-y-[-2px] transition-transform" size={20} />
                      <span>Launch Project</span>
                    </a>
                    <a 
                      href={selectedProject.github}
                      className="group block w-full px-6 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-center font-semibold flex items-center justify-center space-x-2"
                    >
                      <Github className="group-hover:rotate-12 transition-transform" size={20} />
                      <span>View Source</span>
                    </a>
                    <button
                      onClick={() => {
                        setCurrentView('home');
                        setSelectedProject(null);
                        setTimeout(() => {
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="group block w-full px-6 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 text-center font-semibold flex items-center justify-center space-x-2"
                    >
                      <Mail className="group-hover:scale-110 transition-transform" size={20} />
                      <span>Discuss Project</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Projects */}
            <div>
              <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                More Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.filter(p => p.id !== selectedProject.id).slice(0, 3).map(project => (
                  <button
                    key={project.id}
                    onClick={() => {
                      setSelectedProject(project);
                      window.scrollTo(0, 0);
                    }}
                    className="group text-left"
                  >
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                      <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-500 bg-opacity-90 rounded-full text-xs font-semibold">
                        {project.category}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <p className="text-sm text-gray-400">{project.description.slice(0, 100)}...</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
      
      {/* Header */}
      <header 
        className="fixed top-0 w-full z-50 transition-all duration-500"
        style={{
          backgroundColor: scrollY > 50 ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
          backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
          borderBottom: scrollY > 50 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
        }}
      >
        <nav className="container mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-2xl md:text-3xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Muhammad Saad
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Expertise', 'Projects', 'Contact'].map(item => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-300 group tracking-wide uppercase"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden z-50 w-10 h-10 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-all"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black bg-opacity-95 backdrop-blur-2xl border-b border-white border-opacity-5">
            <div className="flex flex-col px-6 py-8 space-y-6">
              {['Home', 'About', 'Expertise', 'Projects', 'Contact'].map(item => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-semibold hover:text-cyan-400 transition-colors uppercase tracking-wider"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <div 
          className="text-center z-10 max-w-6xl"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: 1 - scrollY / 600
          }}
        >
          <div className="mb-8 inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-full border border-cyan-400 border-opacity-30">
            <Zap className="text-cyan-400" size={20} />
            <span className="text-sm font-bold tracking-wider uppercase text-cyan-400">Full Stack Developer</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent mb-4">
              Crafting Digital
            </span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Experiences
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Transforming bold ideas into powerful SaaS platforms, seamless e-commerce experiences, and innovative mobile applications that drive real business growth
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="#projects"
              className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 font-bold text-lg flex items-center space-x-2"
            >
              <span>View Projects</span>
              <Rocket className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <a 
              href="#contact"
              className="px-10 py-5 bg-white bg-opacity-5 backdrop-blur-xl rounded-full border border-white border-opacity-20 hover:bg-opacity-10 transition-all duration-300 hover:scale-105 font-bold text-lg"
            >
              Let's Connect
            </a>
          </div>
        </div>
        
        <a 
          href="#about"
          className="absolute bottom-12 z-10 animate-bounce"
        >
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-10 flex items-center justify-center backdrop-blur-xl border border-white border-opacity-20">
            <ChevronDown size={24} className="text-cyan-400" />
          </div>
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6 z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-cyan-400/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Award size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-cyan-400">Education</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Bachelor's in Computer Science with honors, specializing in Software Engineering and Web Technologies. Deep expertise in system architecture, algorithms, and modern development practices.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-blue-500/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <TrendingUp size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-blue-400">Experience</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  5+ years building production applications for startups and enterprises. Proven track record of delivering scalable solutions that drive growth and exceed expectations.
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-10 border border-white/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
            <div className="relative">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                I'm passionate about turning complex challenges into elegant solutions. My approach blends technical excellence with creative problem-solving, ensuring every project not only works flawlessly but delivers exceptional user experiences.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                From conceptualization to deployment, I stay at the cutting edge of technology, continuously learning and adapting to deliver solutions that create real impact and drive measurable business results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="relative py-32 px-6 z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertise.map((item, idx) => (
              <div 
                key={idx}
                className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${item.color.includes('cyan') ? 'rgba(6, 182, 212, 0.1)' : item.color.includes('purple') ? 'rgba(168, 85, 247, 0.1)' : item.color.includes('pink') ? 'rgba(236, 72, 153, 0.1)' : 'rgba(59, 130, 246, 0.1)'}, transparent)`
                  }}
                ></div>
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-32 px-6 z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore my portfolio of cutting-edge applications that solve real problems and deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <button
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentView('project');
                  window.scrollTo(0, 0);
                }}
                className="group text-left relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-bold">
                    {project.category}
                  </div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white bg-opacity-10 backdrop-blur-xl flex items-center justify-center border border-white border-opacity-20 group-hover:bg-cyan-500 group-hover:scale-110 transition-all duration-300">
                    <ExternalLink size={20} />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-white bg-opacity-5 rounded-lg text-xs font-semibold text-gray-400 border border-white border-opacity-10"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-3 py-1 bg-cyan-500 bg-opacity-20 rounded-lg text-xs font-semibold text-cyan-400 border border-cyan-400 border-opacity-30">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6 z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Let's Work Together
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-400">
              Have a project in mind? Let's discuss how we can bring your vision to life
            </p>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-10 border border-white/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
              <a 
                href="mailto:your.email@example.com"
                className="group flex flex-col items-center p-8 bg-white bg-opacity-5 rounded-2xl hover:bg-opacity-10 transition-all duration-300 hover:scale-105 border border-white border-opacity-10 hover:border-cyan-400 hover:border-opacity-50"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-sm text-gray-400 text-center">your.email@example.com</p>
              </a>

              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-8 bg-white bg-opacity-5 rounded-2xl hover:bg-opacity-10 transition-all duration-300 hover:scale-105 border border-white border-opacity-10 hover:border-blue-400 hover:border-opacity-50"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Github size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">GitHub</h3>
                <p className="text-sm text-gray-400 text-center">@yourusername</p>
              </a>

              <a 
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-8 bg-white bg-opacity-5 rounded-2xl hover:bg-opacity-10 transition-all duration-300 hover:scale-105 border border-white border-opacity-10 hover:border-purple-400 hover:border-opacity-50"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Linkedin size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">LinkedIn</h3>
                <p className="text-sm text-gray-400 text-center">@yourusername</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 z-10 border-t border-white border-opacity-5">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-gray-400">
            © 2025 Muhammad Saad. Crafted with passion and code.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;