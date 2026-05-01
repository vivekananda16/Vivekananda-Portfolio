import React, { useState } from 'react';
import { FaBug, FaRobot, FaServer, FaDatabase, FaCodeBranch } from 'react-icons/fa';

const QALab = () => {
    const [activeFace, setActiveFace] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20; // max 20deg tilt
        const y = (e.clientY / window.innerHeight - 0.5) * -20;
        setMousePos({ x, y });
    };

    const faces = [
        {
            id: 0,
            title: "Manual Testing",
            tagline: "Finding issues before users do.",
            description: "I design detailed test scenarios and perform exploratory testing to uncover hidden defects and ensure seamless user journeys.",
            skills: ["Test Case Design", "Exploratory Testing", "Regression Testing", "User Acceptance Testing (UAT)"],
            icon: <FaBug />,
            rotation: "rotateY(0deg)",
            color: "#e74c3c"
        },
        {
            id: 1,
            title: "Automation Testing",
            tagline: "Fast, repeatable and reliable.",
            description: "I build automated test suites to reduce manual effort and ensure faster and consistent regression testing.",
            skills: ["Java", "Selenium", "TestNG", "Maven"],
            icon: <FaRobot />,
            rotation: "rotateY(-90deg)",
            color: "#3498db"
        },
        {
            id: 2,
            title: "API Testing",
            tagline: "Ensuring systems talk perfectly.",
            description: "I validate backend services by testing REST APIs, verifying responses, status codes and data accuracy.",
            skills: ["Postman", "REST Assured", "JSON"],
            icon: <FaServer />,
            rotation: "rotateY(-180deg)",
            color: "#2ecc71"
        },
        {
            id: 3,
            title: "Database Testing",
            tagline: "Validating data integrity.",
            description: "I verify backend data by writing SQL queries and validating stored data against application behavior.",
            skills: ["MySQL", "SQL Queries", "Data Validation"],
            icon: <FaDatabase />,
            rotation: "rotateY(90deg)",
            color: "#f1c40f"
        },
        {
            id: 4,
            title: "Continuous Integration",
            tagline: "Delivering quality faster.",
            description: "I integrate testing into CI/CD pipelines to ensure every build is tested and deployment ready.",
            skills: ["Git", "GitHub", "Jenkins", "Pipelines"],
            icon: <FaCodeBranch />,
            rotation: "rotateX(-90deg)",
            color: "#9b59b6"
        }
    ];

    const currentContent = faces[activeFace];

    return (
        <section id="qa-lab" className="section" onMouseMove={handleMouseMove} style={{ backgroundColor: 'transparent', position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '80px' }}>
            <style>
                {`
                  .qa-lab-bg {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: radial-gradient(circle at center, #111 0%, #000 100%);
                    z-index: -2;
                  }
                  .lab-particles {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background-image: radial-gradient(rgba(26, 122, 74, 0.2) 1px, transparent 1px);
                    background-size: 40px 40px;
                    opacity: 0.3;
                    z-index: -1;
                    animation: panBg 20s linear infinite;
                  }
                  @keyframes panBg {
                    0% { background-position: 0 0; }
                    100% { background-position: 40px 40px; }
                  }
                  .lab-header {
                    text-align: center;
                    margin-bottom: 60px;
                    z-index: 2;
                  }
                  .lab-layout {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    gap: 50px;
                    max-width: 1200px;
                    margin: 0 auto;
                    width: 100%;
                    padding: 0 20px;
                    z-index: 2;
                    flex: 1;
                  }
                  
                  /* 3D Cube Container */
                  .scene {
                    width: 300px;
                    height: 300px;
                    perspective: 1000px;
                  }
                  .cube {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    transform-style: preserve-3d;
                    transition: transform 1s cubic-bezier(0.25, 1, 0.5, 1);
                  }
                  .cube-face {
                    position: absolute;
                    width: 300px;
                    height: 300px;
                    background: rgba(20, 20, 20, 0.85);
                    border: 2px solid var(--primary);
                    box-shadow: 0 0 20px rgba(26, 122, 74, 0.4), inset 0 0 40px rgba(0,0,0,0.8);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    color: white;
                    border-radius: 10px;
                    backdrop-filter: blur(5px);
                  }
                  .face-icon {
                    font-size: 4rem;
                    margin-bottom: 20px;
                    text-shadow: 0 0 20px currentColor;
                  }
                  .face-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    text-align: center;
                  }
                  .cube-face.front  { transform: rotateY(0deg) translateZ(150px); }
                  .cube-face.right  { transform: rotateY(90deg) translateZ(150px); }
                  .cube-face.back   { transform: rotateY(180deg) translateZ(150px); }
                  .cube-face.left   { transform: rotateY(-90deg) translateZ(150px); }
                  .cube-face.top    { transform: rotateX(90deg) translateZ(150px); }
                  .cube-face.bottom { transform: rotateX(-90deg) translateZ(150px); }
                  
                  /* Glass Panel */
                  .glass-panel {
                    flex: 1;
                    min-width: 320px;
                    max-width: 500px;
                    background: rgba(25, 25, 25, 0.6);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(15px);
                    border-radius: 20px;
                    padding: 40px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                    position: relative;
                    overflow: hidden;
                  }
                  .glass-panel::before {
                    content: '';
                    position: absolute;
                    top: -50%; left: -50%;
                    width: 200%; height: 200%;
                    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.03), transparent);
                    transform: rotate(45deg);
                    animation: glassShine 6s infinite;
                  }
                  @keyframes glassShine {
                    0% { transform: translateX(-100%) rotate(45deg); }
                    100% { transform: translateX(100%) rotate(45deg); }
                  }
                  
                  .panel-title {
                    font-size: 2.2rem;
                    color: var(--primary);
                    margin-bottom: 10px;
                    font-weight: 800;
                  }
                  .panel-tagline {
                    font-size: 1.1rem;
                    color: #fff;
                    margin-bottom: 25px;
                    font-style: italic;
                    opacity: 0.8;
                  }
                  .panel-desc {
                    color: var(--text-muted);
                    line-height: 1.7;
                    margin-bottom: 30px;
                  }
                  .skills-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                  }
                  .skill-pill {
                    background: rgba(26, 122, 74, 0.2);
                    border: 1px solid var(--primary);
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    color: #fff;
                  }
                  
                  /* Controls */
                  .cube-controls {
                    display: flex;
                    gap: 15px;
                    margin-top: 40px;
                    justify-content: center;
                  }
                  .ctrl-btn {
                    background: transparent;
                    border: 1px solid var(--primary);
                    color: var(--primary);
                    width: 40px; height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    transition: all 0.3s;
                  }
                  .ctrl-btn:hover, .ctrl-btn.active {
                    background: var(--primary);
                    color: #fff;
                    box-shadow: 0 0 15px var(--primary);
                  }
                  
                  /* Mini Animations inside Glass Panel */
                  .mini-anim-box {
                    margin-top: 30px;
                    height: 100px;
                    background: #111;
                    border-radius: 10px;
                    border: 1px solid #333;
                    position: relative;
                    overflow: hidden;
                    display: flex; align-items: center; justify-content: center;
                  }
                  .typing-anim::after {
                    content: 'Running Tests...';
                    color: #2ecc71;
                    font-family: monospace;
                    animation: typing 2s steps(15) infinite;
                    white-space: nowrap;
                    overflow: hidden;
                    border-right: 2px solid #2ecc71;
                  }
                  @keyframes typing {
                    0% { width: 0; }
                    50% { width: 140px; }
                    100% { width: 0; }
                  }
                  
                  .mission-panel {
                    text-align: center;
                    margin-top: 80px;
                    padding: 30px;
                    background: rgba(26, 122, 74, 0.1);
                    border-top: 1px solid rgba(26, 122, 74, 0.3);
                    border-bottom: 1px solid rgba(26, 122, 74, 0.3);
                    z-index: 2;
                  }
                `}
            </style>

            <div className="qa-lab-bg"></div>
            <div className="lab-particles"></div>

            <div className="lab-header" data-aos="fade-down">
                <p className="section-subtitle">Engineering Excellence</p>
                <h2 className="section-title">Quality Engineering <span style={{ color: 'var(--primary)' }}>Lab</span></h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Where I design, break and improve software to deliver reliable user experiences.</p>
            </div>

            <div className="lab-layout">
                {/* 3D CUBE */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="scene" data-aos="zoom-in">
                        <div 
                            className="cube" 
                            style={{ 
                                transform: `translateZ(-150px) ${currentContent.rotation} rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`
                            }}
                        >
                            <div className="cube-face front">
                                <div className="face-icon" style={{ color: faces[0].color }}>{faces[0].icon}</div>
                                <div className="face-title">{faces[0].title}</div>
                            </div>
                            <div className="cube-face right">
                                <div className="face-icon" style={{ color: faces[1].color }}>{faces[1].icon}</div>
                                <div className="face-title">{faces[1].title}</div>
                            </div>
                            <div className="cube-face back">
                                <div className="face-icon" style={{ color: faces[2].color }}>{faces[2].icon}</div>
                                <div className="face-title">{faces[2].title}</div>
                            </div>
                            <div className="cube-face left">
                                <div className="face-icon" style={{ color: faces[3].color }}>{faces[3].icon}</div>
                                <div className="face-title">{faces[3].title}</div>
                            </div>
                            <div className="cube-face top">
                                <div className="face-icon" style={{ color: faces[4].color }}>{faces[4].icon}</div>
                                <div className="face-title">{faces[4].title}</div>
                            </div>
                            <div className="cube-face bottom">
                                <div className="face-icon" style={{ color: '#fff' }}>🛡️</div>
                                <div className="face-title">Quality First</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="cube-controls" data-aos="fade-up">
                        {faces.map((face, index) => (
                            <button 
                                key={index} 
                                className={`ctrl-btn ${activeFace === index ? 'active' : ''}`}
                                onClick={() => setActiveFace(index)}
                                title={face.title}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* GLASS PANEL */}
                <div className="glass-panel" data-aos="fade-left">
                    <h3 className="panel-title" style={{ color: currentContent.color }}>{currentContent.title}</h3>
                    <p className="panel-tagline">{currentContent.tagline}</p>
                    <p className="panel-desc">{currentContent.description}</p>
                    
                    <div className="skills-grid">
                        {currentContent.skills.map((skill, i) => (
                            <span key={i} className="skill-pill" style={{ borderColor: currentContent.color }}>{skill}</span>
                        ))}
                    </div>
                    
                    <div className="mini-anim-box">
                        <div className="typing-anim" style={{ color: currentContent.color }}></div>
                    </div>
                </div>
            </div>

            {/* FINAL MISSION PANEL */}
            <div className="mission-panel" data-aos="fade-up">
                <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '10px' }}>🎯 My Mission</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>To build reliable, scalable and high-quality software while delivering seamless user experiences.</p>
            </div>
        </section>
    );
};

export default QALab;
