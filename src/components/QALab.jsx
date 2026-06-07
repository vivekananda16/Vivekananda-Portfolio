import React, { useState, useEffect, useRef } from 'react';
import { FaBug, FaRobot, FaServer, FaDatabase, FaCodeBranch } from 'react-icons/fa';
import './QALab.css';

const QALab = () => {
  const [activeFace, setActiveFace] = useState(0);
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
    <section ref={sectionRef} id="qa-lab" className="section" onMouseMove={handleMouseMove} style={{ backgroundColor: 'transparent', position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '80px' }}>
      <div className="qa-lab-bg"></div>
      <div className={`lab-particles ${!inView ? 'paused' : ''}`}></div>

      <div className="lab-header" data-aos="fade-down">
        <p className="section-subtitle" style={{ color: 'var(--primary)' }}>Engineering Excellence</p>
        <div className="fancy-title-wrapper">
          <h2 className="section-title title-primary">Parīkṣaṇa<span>śālā</span></h2>
          <h2 className="section-title title-secondary">Testing <span>Lab</span></h2>
        </div>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>Where I design, break and improve software to deliver reliable user experiences.</p>
      </div>

      <div className="lab-layout">
        {/* 3D CUBE */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', marginTop: '40px' }}>
          <div className={`holographic-base ${!inView ? 'paused' : ''}`}></div>
          <div className={`holographic-ring ${!inView ? 'paused' : ''}`}></div>
          <div className="scene" data-aos="zoom-in">
            <div
              className="cube"
              style={{
                transform: `translateZ(calc(var(--tz) * -1)) ${currentContent.rotation} rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`
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
        <div
          className="glass-panel"
          data-aos="fade-left"
          style={{
            border: `2px solid ${currentContent.color}`,
            boxShadow: `0 0 30px ${currentContent.color}40, inset 0 0 20px ${currentContent.color}11`
          }}
        >
          <h3 className="panel-title" style={{ color: currentContent.color }}>{currentContent.title}</h3>
          <p className="panel-tagline">{currentContent.tagline}</p>
          <p className="panel-desc">{currentContent.description}</p>

          <div className="skills-grid">
            {currentContent.skills.map((skill, i) => (
              <span key={i} className="skill-pill" style={{ borderColor: currentContent.color }}>{skill}</span>
            ))}
          </div>

          <div className="mini-anim-box">
            <div className={`typing-anim ${!inView ? 'paused' : ''}`} style={{ color: currentContent.color }}></div>
          </div>
        </div>
      </div>

      {/* FINAL MISSION PANEL */}
      <div className="mission-panel" data-aos="zoom-in">
        <p className="mission-text">To build <span className="mission-highlight">reliable</span>, <span className="mission-highlight">scalable</span> and high-quality software while delivering seamless user experiences.</p>
      </div>
    </section>
  );
};

export default QALab;
