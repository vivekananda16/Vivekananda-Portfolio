import React, { useState, useEffect, useRef } from 'react';
import { FaLaptopCode, FaServer, FaDatabase, FaLayerGroup, FaRocket, FaCodeBranch } from 'react-icons/fa';
import './DevLab.css';

const DevLab = () => {
    const [activePanel, setActivePanel] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const currentRef = sectionRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );
        if (currentRef) observer.observe(currentRef);
        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 15; // subtle tilt
        const y = (e.clientY / window.innerHeight - 0.5) * -15;
        setMousePos({ x, y });
    };

    const panels = [
        {
            id: 0,
            title: "Frontend Development",
            tagline: "Crafting beautiful and interactive user experiences.",
            description: "I build modern, responsive and high-performance interfaces using React and modern JavaScript.",
            tech: ["React", "JavaScript", "HTML", "CSS", "Responsive Design"],
            icon: <FaLaptopCode />,
            color: "#00f3ff",
            glow: "0 0 20px rgba(0, 243, 255, 0.6)"
        },
        {
            id: 1,
            title: "Backend Development",
            tagline: "Building robust and scalable server-side systems.",
            description: "I develop secure REST APIs and business logic using Java and Spring Boot.",
            tech: ["Java", "Spring Boot", "REST APIs", "MVC Architecture"],
            icon: <FaServer />,
            color: "#ff003c",
            glow: "0 0 20px rgba(255, 0, 60, 0.6)"
        },
        {
            id: 2,
            title: "Database Engineering",
            tagline: "Designing structured and efficient data systems.",
            description: "I design relational databases and optimize queries for performance and scalability.",
            tech: ["MySQL", "Database Design", "SQL", "Joins & Relationships"],
            icon: <FaDatabase />,
            color: "#f39c12",
            glow: "0 0 20px rgba(243, 156, 18, 0.6)"
        },
        {
            id: 3,
            title: "Full Stack Integration",
            tagline: "Connecting frontend, backend and database into one ecosystem.",
            description: "I integrate all layers of the application to create complete production-ready systems.",
            tech: ["System Architecture", "Integration Testing", "API Connections"],
            icon: <FaLayerGroup />,
            color: "#bc00ff",
            glow: "0 0 20px rgba(188, 0, 255, 0.6)"
        },
        {
            id: 4,
            title: "Deployment & Version Control",
            tagline: "Shipping applications to the real world.",
            description: "I use modern version control and CI/CD tools to deliver scalable web applications safely.",
            tech: ["Git", "GitHub", "Deployment", "Version Control"],
            icon: <FaRocket />,
            color: "#00ff88",
            glow: "0 0 20px rgba(0, 255, 136, 0.6)"
        }
    ];

    const currentContent = panels[activePanel];

    return (
        <section ref={sectionRef} id="dev-lab" className="section" onMouseMove={handleMouseMove} style={{ backgroundColor: 'transparent', position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '80px', borderBottom: '1px solid rgba(0, 243, 255, 0.1)' }}>
            <div className="dev-lab-bg"></div>
            <div className={`neon-grid ${!inView ? 'paused' : ''}`}></div>
            <div className={`code-particles ${!inView ? 'paused' : ''}`}></div>

            <div className="lab-header" data-aos="fade-down">
                <p className="section-subtitle" style={{ color: 'var(--primary)' }}>Creative Engineering</p>
                <div className="fancy-title-wrapper">
                    <h2 className="section-title title-primary">Tantrāṃśa-vikāś<span>śālā</span></h2>
                    <h2 className="section-title title-secondary">Development <span>Lab</span></h2>
                </div>
                <p style={{ color: '#aaa', marginTop: '10px' }}>Where ideas turn into scalable web applications.</p>
            </div>

            <div className="lab-layout">
                {/* 3D WORKSTATION */}
                <div className="workstation" data-aos="zoom-in">
                    <div 
                        className="monitor-setup"
                        style={{ transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)` }}
                    >
                        {/* Left Monitor (Dimmed) */}
                        <div className="monitor monitor-left" style={{ '--monitor-color': '#333' }}>
                            <div style={{ opacity: 0.2, fontSize: '3rem', color: '#fff' }}><FaCodeBranch /></div>
                        </div>
                        
                        {/* Right Monitor (Dimmed) */}
                        <div className="monitor monitor-right" style={{ '--monitor-color': '#333' }}>
                            <div style={{ opacity: 0.2, fontSize: '3rem', color: '#fff' }}><FaDatabase /></div>
                        </div>
                        
                        {/* Center Monitor (Active) */}
                        <div className="monitor monitor-center" style={{ '--monitor-color': currentContent.color, '--monitor-glow': currentContent.glow }}>
                            <div className={`monitor-icon ${!inView ? 'paused' : ''}`}>
                                {currentContent.icon}
                            </div>
                        </div>
                    </div>
                </div>

                {/* GLASS PANEL */}
                <div 
                    className="dev-glass-panel" 
                    data-aos="fade-left"
                    style={{ 
                        border: `2px solid ${currentContent.color}`, 
                        boxShadow: `0 0 30px ${currentContent.color}40, inset 0 0 20px ${currentContent.color}11`
                    }}
                >
                    <h3 className="dev-title" style={{ color: currentContent.color }}>{currentContent.title}</h3>
                    <p className="dev-tagline">{currentContent.tagline}</p>
                    <p className="dev-desc">{currentContent.description}</p>
                    
                    <div className="dev-tech-grid">
                        {currentContent.tech.map((tech, i) => (
                            <span 
                                key={i} 
                                className="tech-pill" 
                                style={{ borderColor: currentContent.color, boxShadow: `0 0 10px ${currentContent.color}33` }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* WORKSPACE CONTROLS */}
            <div className="workspace-controls" data-aos="fade-up">
                {panels.map((panel, index) => (
                    <button 
                        key={index} 
                        className={`dev-btn ${activePanel === index ? 'active' : ''}`}
                        onClick={() => setActivePanel(index)}
                        style={activePanel === index ? { borderColor: panel.color, boxShadow: panel.glow, background: 'rgba(20,20,20,1)' } : {}}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* FINAL DEV MESSAGE PANEL */}
            <div className="dev-final-panel" data-aos="fade-up">
                <p className="dev-final-text">
                    From concept to deployment — <span className="highlight-text">I build complete web solutions.</span>
                </p>
            </div>
        </section>
    );
};

export default DevLab;
