import React, { useState } from 'react';
import { FaLaptopCode, FaServer, FaDatabase, FaLayerGroup, FaRocket, FaCodeBranch } from 'react-icons/fa';

const DevLab = () => {
    const [activePanel, setActivePanel] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
        <section id="dev-lab" className="section" onMouseMove={handleMouseMove} style={{ backgroundColor: 'transparent', position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '80px', borderBottom: '1px solid rgba(0, 243, 255, 0.1)' }}>
            <style>
                {`
                  .dev-lab-bg {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: radial-gradient(circle at 50% 100%, rgba(0, 243, 255, 0.08) 0%, transparent 80%);
                    z-index: 1;
                  }
                  .neon-grid {
                    position: absolute;
                    bottom: 0; left: -50%; width: 200%; height: 50%;
                    background-image: 
                        linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px);
                    background-size: 50px 50px;
                    transform: perspective(500px) rotateX(60deg) translateY(100px) translateZ(200px);
                    animation: gridMove 10s linear infinite;
                    z-index: 1;
                  }
                  @keyframes gridMove {
                    0% { transform: perspective(500px) rotateX(60deg) translateY(0) translateZ(200px); }
                    100% { transform: perspective(500px) rotateX(60deg) translateY(50px) translateZ(200px); }
                  }
                  .code-particles {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background-image: radial-gradient(rgba(0, 243, 255, 0.3) 1px, transparent 1px);
                    background-size: 60px 60px;
                    opacity: 0.1;
                    z-index: 1;
                    animation: panBg 30s linear infinite;
                  }

                  .lab-header {
                    text-align: center;
                    margin-bottom: 50px;
                    z-index: 3;
                    position: relative;
                  }
                  .lab-layout {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    gap: 50px;
                    max-width: 1300px;
                    margin: 0 auto;
                    width: 100%;
                    padding: 0 20px;
                    z-index: 3;
                    flex: 1;
                    position: relative;
                  }

                  /* Holographic Monitors Setup */
                  .workstation {
                    perspective: 1200px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 500px;
                    height: 400px;
                  }
                  .monitor-setup {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transform-style: preserve-3d;
                    transition: transform 0.5s ease-out;
                  }
                  .monitor {
                    position: absolute;
                    background: rgba(10, 15, 20, 0.9);
                    border: 1px solid #333;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.8);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    transition: all 0.5s ease;
                  }
                  .monitor::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; height: 5px;
                    background: var(--monitor-color);
                    box-shadow: var(--monitor-glow);
                    opacity: 0.8;
                    transition: all 0.5s ease;
                  }
                  /* Center Monitor */
                  .monitor-center {
                    width: 320px; height: 200px;
                    top: 80px; left: 90px;
                    z-index: 5;
                    transform: translateZ(50px);
                  }
                  /* Left Monitor */
                  .monitor-left {
                    width: 240px; height: 320px;
                    top: 20px; left: -100px;
                    transform: rotateY(25deg) translateZ(-50px);
                    opacity: 0.7;
                  }
                  /* Right Monitor */
                  .monitor-right {
                    width: 240px; height: 320px;
                    top: 20px; right: -100px;
                    transform: rotateY(-25deg) translateZ(-50px);
                    opacity: 0.7;
                  }
                  
                  .monitor-icon {
                    font-size: 5rem;
                    color: var(--monitor-color);
                    filter: drop-shadow(0 0 15px var(--monitor-color));
                    animation: floatIcon 3s ease-in-out infinite;
                  }
                  @keyframes floatIcon {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                  }

                  /* Glass Content Panel */
                  .dev-glass-panel {
                    flex: 1;
                    min-width: 350px;
                    max-width: 550px;
                    background: rgba(15, 15, 20, 0.7);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-left: 4px solid;
                    backdrop-filter: blur(20px);
                    border-radius: 15px;
                    padding: 40px;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.6);
                    position: relative;
                    transition: all 0.5s ease;
                  }
                  .dev-glass-panel::after {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%);
                    pointer-events: none;
                  }

                  .dev-title {
                    font-size: 2.2rem;
                    margin-bottom: 10px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    transition: color 0.5s ease;
                  }
                  .dev-tagline {
                    font-size: 1.1rem;
                    color: #aaa;
                    margin-bottom: 25px;
                    font-style: italic;
                  }
                  .dev-desc {
                    color: #ddd;
                    line-height: 1.7;
                    margin-bottom: 30px;
                    font-size: 1.05rem;
                  }
                  .dev-tech-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                  }
                  .tech-pill {
                    background: rgba(0,0,0,0.5);
                    border: 1px solid;
                    padding: 8px 18px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    color: #fff;
                    transition: all 0.5s ease;
                  }

                  /* Workspace Controls */
                  .workspace-controls {
                    display: flex;
                    gap: 20px;
                    margin-top: 50px;
                    justify-content: center;
                    width: 100%;
                    z-index: 5;
                  }
                  .dev-btn {
                    background: rgba(20,20,20,0.8);
                    border: 1px solid #333;
                    color: #777;
                    padding: 12px 24px;
                    border-radius: 30px;
                    cursor: pointer;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                  }
                  .dev-btn:hover {
                    background: rgba(40,40,40,0.8);
                    color: #fff;
                    transform: translateY(-3px);
                  }
                  .dev-btn.active {
                    color: #fff;
                    transform: scale(1.05);
                  }

                  /* Final Dev Lab Panel */
                  .dev-final-panel {
                    text-align: center;
                    margin-top: 80px;
                    padding: 30px 40px;
                    background: transparent;
                    border-left: 3px solid #00f3ff;
                    position: relative;
                    z-index: 3;
                    max-width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                  }
                  .dev-final-panel:hover {
                    transform: scale(1.05) translateY(-5px);
                    background: rgba(0, 243, 255, 0.05);
                    box-shadow: 0 15px 30px rgba(0, 243, 255, 0.1);
                    border-left: 5px solid #00f3ff;
                    border-radius: 0 20px 20px 0;
                  }
                  .dev-final-text {
                    font-size: 1.2rem;
                    color: #ccc;
                    font-weight: 400;
                    letter-spacing: 1.5px;
                    font-style: italic;
                    position: relative;
                    display: inline-block;
                  }
                  .dev-final-text::before {
                    content: '"';
                    font-size: 3rem;
                    color: rgba(0, 243, 255, 0.3);
                    position: absolute;
                    top: -15px; left: -25px;
                    font-family: serif;
                  }
                  .dev-final-text::after {
                    content: '"';
                    font-size: 3rem;
                    color: rgba(0, 243, 255, 0.3);
                    position: absolute;
                    bottom: -30px; right: -25px;
                    font-family: serif;
                  }
                  .highlight-text {
                    background: linear-gradient(90deg, #00f3ff, #bc00ff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-weight: 600;
                    font-style: normal;
                  }
                `}
            </style>

            <div className="dev-lab-bg"></div>
            <div className="neon-grid"></div>
            <div className="code-particles"></div>

            <div className="lab-header" data-aos="fade-down">
                <p className="section-subtitle" style={{ color: '#00f3ff' }}>Creative Engineering</p>
                <h2 className="section-title">Development <span style={{ color: '#00f3ff' }}>Lab</span></h2>
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
                            <div className="monitor-icon">
                                {currentContent.icon}
                            </div>
                        </div>
                    </div>
                </div>

                {/* GLASS PANEL */}
                <div 
                    className="dev-glass-panel" 
                    data-aos="fade-left"
                    style={{ borderColor: currentContent.color, boxShadow: `0 20px 50px ${currentContent.color}22` }}
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
