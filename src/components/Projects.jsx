import React, { useState } from 'react';
import { FaExternalLinkAlt, FaGithub, FaCode, FaVial, FaCheckCircle } from 'react-icons/fa';

const projectsData = {
  development: [
    {
      title: "Test Case Management Tool",
      badge: "Live Project",
      techStack: ["React.js", "Spring Boot", "PostgreSQL", "REST API"],
      description: [
        "Developed a full stack web application using React.js frontend and Spring Boot RESTful backend, following MVC Architecture and OOP principles.",
        "Designed REST API endpoints with full CRUD operations and integrated PostgreSQL cloud database using Spring Data JPA and Hibernate ORM.",
        "Built interactive UI with search, filter by status/priority, and modal form components using Axios for seamless API communication."
      ],
      liveLink: "https://testcase-manager-frontend.vercel.app/",
      githubLink: "https://github.com/vivekananda16",
    },
    {
      title: "AI Resume Analyzer",
      badge: "Academic Project",
      techStack: ["HTML", "CSS", "JavaScript", "Python"],
      description: [
        "Built a web application that parses uploaded resumes and evaluates them against job-relevant criteria.",
        "Developed an interactive frontend using HTML, CSS, and JavaScript following MVC Architecture principles.",
        "Designed a Python-based backend to parse resume content and generate a structured score for users."
      ],
      liveLink: "",
      githubLink: "https://github.com/vivekananda16",
    }
  ],
  qa: [
    {
      title: "Demo Web Shop Testing",
      badge: "Automation Testing",
      date: "Dec 2025 – Jan 2026",
      techStack: ["Selenium", "Java", "TestNG", "Maven", "POM"],
      description: [
        "Automated end-to-end test cases using Selenium WebDriver (Java) and TestNG; implemented Page Object Model (POM) framework.",
        "Configured Maven for build management; executed regression suites and analyzed HTML test reports to identify failures."
      ]
    },
    {
      title: "Web Application QA",
      badge: "Manual QA",
      date: "Oct 2025",
      techStack: ["Manual Testing", "Jira", "Cross-browser", "Test Planning"],
      description: [
        "Prepared test plans and test cases; executed Functional, Regression, Smoke, and Integration Testing across modules.",
        "Performed cross-browser testing and UI validation; tracked defects in Jira with severity, steps to reproduce, and expected vs actual results."
      ]
    }
  ]
};

const BinaryRain = () => {
  // Static array to avoid hydration mismatches, though CRA is client-side mostly
  const columns = [
    { left: 5, duration: 6, delay: 0 },
    { left: 15, duration: 5, delay: 1.5 },
    { left: 25, duration: 8, delay: 0.2 },
    { left: 35, duration: 4, delay: 2.1 },
    { left: 45, duration: 7, delay: 0.8 },
    { left: 55, duration: 5.5, delay: 1.1 },
    { left: 65, duration: 6.5, delay: 0.5 },
    { left: 75, duration: 4.5, delay: 2.5 },
    { left: 85, duration: 7.5, delay: 0.3 },
    { left: 95, duration: 5, delay: 1.8 }
  ];

  return (
    <div className="binary-rain">
      {columns.map((col, i) => (
        <div 
          key={i} 
          className="binary-col"
          style={{ 
            left: `${col.left}%`, 
            animationDuration: `${col.duration}s`,
            animationDelay: `${col.delay}s`
          }}
        >
          01<br/>10<br/>00<br/>11<br/>01<br/>10<br/>11<br/>00<br/>10<br/>01<br/>11<br/>00<br/>10<br/>01<br/>11
        </div>
      ))}
    </div>
  );
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState('development');

  return (
    <section id="projects" className="section" style={styles.section}>
      <style>
        {`
          .tab-btn {
            background: transparent;
            color: var(--text-muted);
            border: none;
            padding: 12px 24px;
            font-size: 1.05rem;
            font-weight: 700;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: inherit;
          }
          .tab-btn.active {
            color: var(--primary);
            border-bottom: 2px solid var(--primary);
          }
          .tab-btn:hover:not(.active) {
            color: var(--text);
          }

          .projects-wrapper {
            display: flex;
            flex-direction: column;
            gap: 50px;
          }

          .project-card-wide {
            display: flex;
            flex-direction: column;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            z-index: 1;
          }
          .project-card-wide:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
            border-color: var(--primary);
          }

          @media (min-width: 900px) {
            .project-card-wide {
              flex-direction: row;
              min-height: 380px;
            }
            .project-card-wide.reverse {
              flex-direction: row-reverse;
            }
          }

          /* Visual Half */
          .project-visual {
            flex: 1;
            min-height: 250px;
            background: var(--bg);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            border-bottom: 1px solid var(--border);
          }
          @media (min-width: 900px) {
            .project-visual {
              border-bottom: none;
              border-right: 1px solid var(--border);
            }
            .project-card-wide.reverse .project-visual {
              border-right: none;
              border-left: 1px solid var(--border);
            }
          }

          .visual-blob {
            position: absolute;
            width: 300px;
            height: 300px;
            background: var(--primary);
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.25;
            animation: pulseBlob 8s infinite alternate;
            z-index: 0;
          }
          .visual-blob.secondary {
            background: #3b82f6;
            right: -50px;
            bottom: -50px;
            animation-delay: 2s;
            opacity: 0.15;
          }
          @keyframes pulseBlob {
            0% { transform: scale(1) translate(0, 0); }
            100% { transform: scale(1.2) translate(20px, -20px); }
          }

          /* Binary Rain Animation */
          .binary-rain {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            overflow: hidden;
            z-index: 1;
            opacity: 0;
            transition: opacity 0.6s ease;
            pointer-events: none;
          }
          .project-card-wide:hover .binary-rain {
            opacity: 1;
          }
          .binary-col {
            position: absolute;
            top: -100%;
            color: var(--primary);
            font-family: monospace;
            font-size: 1.2rem;
            font-weight: bold;
            line-height: 1.5;
            text-align: center;
            text-shadow: 0 0 5px var(--primary);
            opacity: 0.6;
            animation: fall linear infinite;
          }
          @keyframes fall {
            0% { top: -100%; }
            100% { top: 100%; }
          }

          /* Mockup Graphic */
          .mockup-window {
            width: 65%;
            height: 60%;
            min-height: 180px;
            background: rgba(26, 26, 26, 0.6);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            display: flex;
            flex-direction: column;
            z-index: 2;
            transform: rotate(-3deg) translateY(0);
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .project-card-wide.reverse .mockup-window {
            transform: rotate(3deg);
          }
          .project-card-wide:hover .mockup-window {
            transform: rotate(0deg) translateY(-10px) scale(1.05);
            box-shadow: 0 30px 50px rgba(26, 122, 74, 0.4);
            border-color: rgba(26, 122, 74, 0.5);
          }

          .mockup-header {
            height: 32px;
            background: rgba(0, 0, 0, 0.2);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            display: flex;
            align-items: center;
            padding: 0 12px;
            gap: 8px;
          }
          .dot { width: 12px; height: 12px; border-radius: 50%; }
          .dot.red { background: #ff5f56; }
          .dot.yellow { background: #ffbd2e; }
          .dot.green { background: #27c93f; }

          .mockup-body {
            padding: 20px;
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 14px;
            justify-content: center;
          }
          .code-line {
            height: 8px;
            border-radius: 4px;
            background: rgba(255, 255, 255, 0.1);
            position: relative;
            overflow: hidden;
          }
          .code-line::after {
            content: '';
            position: absolute;
            top: 0; left: -100%; width: 50%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            animation: shimmer 3s infinite;
          }
          .code-line:nth-child(2)::after { animation-delay: 0.5s; }
          .code-line:nth-child(3)::after { animation-delay: 1s; }

          @keyframes shimmer {
            100% { left: 200%; }
          }
          .code-line.short { width: 40%; background: var(--primary); opacity: 0.7;}
          .code-line.mid { width: 70%; }
          .code-line.long { width: 90%; }

          /* Content Half */
          .project-content {
            flex: 1.2;
            padding: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: var(--bg-card);
          }
          
          .tech-pill {
            background: var(--bg);
            color: var(--primary);
            font-size: 0.85rem;
            padding: 6px 14px;
            border-radius: 20px;
            font-weight: 600;
            border: 1px solid var(--border);
            transition: all 0.3s ease;
          }
          .project-card-wide:hover .tech-pill {
            border-color: rgba(26, 122, 74, 0.3);
            background: rgba(26, 122, 74, 0.05);
          }
          .project-bullet {
            position: relative;
            padding-left: 22px;
            color: var(--text-muted);
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 12px;
          }
          .project-bullet::before {
            content: '▹';
            position: absolute;
            left: 0;
            top: 0;
            color: var(--primary);
            font-size: 1.2rem;
          }
          .link-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 18px;
            background: transparent;
            color: var(--text);
            border: 1px solid var(--border);
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            transition: all 0.3s ease;
          }
          .link-btn:hover {
            background: var(--primary);
            color: #fff;
            border-color: var(--primary);
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          }
        `}
      </style>

      <div className="container">
        <div className="fancy-title-wrapper" data-aos="zoom-in">
          <h2 className="section-title title-primary">Sru<span>jana</span></h2>
          <h2 className="section-title title-secondary">Featured <span>Projects</span></h2>
        </div>
        <div className="section-line" data-aos="zoom-in" data-aos-delay="100"></div>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="200">
          A showcase of my full stack development and quality assurance work.
        </p>

        {/* Tabs */}
        <div style={styles.tabsContainer} data-aos="fade-up" data-aos-delay="300">
          <button 
            className={`tab-btn ${activeTab === 'development' ? 'active' : ''}`}
            onClick={() => setActiveTab('development')}
          >
            <FaCode /> Full Stack Dev
          </button>
          <button 
            className={`tab-btn ${activeTab === 'qa' ? 'active' : ''}`}
            onClick={() => setActiveTab('qa')}
          >
            <FaVial /> QA & Testing
          </button>
        </div>

        {/* Projects List */}
        <div className="projects-wrapper">
          {projectsData[activeTab].map((project, index) => {
            // Alternate layout for even/odd cards
            const isReverse = index % 2 !== 0;
            return (
              <div 
                key={index + activeTab} 
                className={`project-card-wide ${isReverse ? 'reverse' : ''}`}
                data-aos={isReverse ? "fade-left" : "fade-right"}
                data-aos-delay={100}
              >
                {/* Abstract Visual Graphic */}
                <div className="project-visual">
                  <div className="visual-blob"></div>
                  <div className="visual-blob secondary"></div>
                  
                  <BinaryRain />
                  
                  <div className="mockup-window">
                    <div className="mockup-header">
                      <div className="dot red"></div>
                      <div className="dot yellow"></div>
                      <div className="dot green"></div>
                    </div>
                    <div className="mockup-body">
                      <div className="code-line long"></div>
                      <div className="code-line mid"></div>
                      <div className="code-line short"></div>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="project-content">
                  <div style={styles.metaRow}>
                    <span style={styles.badge}>
                      {activeTab === 'qa' ? <FaCheckCircle style={{ marginRight: '6px' }}/> : null}
                      {project.badge}
                    </span>
                    {project.date && <span style={styles.date}>{project.date}</span>}
                  </div>
                  
                  <h3 style={styles.title}>{project.title}</h3>
                  
                  <div style={styles.description}>
                    {project.description.map((point, idx) => (
                      <div key={idx} className="project-bullet">{point}</div>
                    ))}
                  </div>

                  <div style={styles.techStack}>
                    {project.techStack.map((tech, idx) => (
                      <span key={idx} className="tech-pill">{tech}</span>
                    ))}
                  </div>

                  <div style={styles.linksContainer}>
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="link-btn" title="View Source">
                        <FaGithub /> Code
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noreferrer" className="link-btn" title="Live Preview">
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: 'var(--bg-card)',
  },
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginBottom: '50px',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '2px',
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 122, 74, 0.1)',
    color: 'var(--primary)',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: '700',
    border: '1px solid rgba(26, 122, 74, 0.3)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  date: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    fontWeight: '600',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    color: 'var(--text)',
    lineHeight: 1.2,
    marginBottom: '20px',
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '25px',
  },
  techStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '30px',
  },
  linksContainer: {
    display: 'flex',
    gap: '15px',
    marginTop: 'auto',
  }
};

export default Projects;