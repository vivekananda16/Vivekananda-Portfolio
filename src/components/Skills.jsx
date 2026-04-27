import React, { useState } from 'react';
import { 
  FaReact, FaHtml5, FaCss3Alt, FaJs, FaJava, 
  FaNodeJs, FaDatabase, FaGitAlt, FaGithub, FaCheckCircle, FaLaptopCode
} from 'react-icons/fa';
import { 
  SiSpringboot, SiSelenium, SiPostman, SiJunit5, 
  SiJenkins, SiApachemaven, SiMysql, SiTailwindcss 
} from 'react-icons/si';

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <FaLaptopCode />,
    skills: [
      { name: "React.js", icon: <FaReact color="#61DAFB" /> },
      { name: "JavaScript", icon: <FaJs color="#F7DF1E" /> },
      { name: "HTML5", icon: <FaHtml5 color="#E34F26" /> },
      { name: "CSS3", icon: <FaCss3Alt color="#1572B6" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss color="#06B6D4" /> },
    ]
  },
  {
    title: "Backend Development",
    icon: <FaJava />,
    skills: [
      { name: "Java", icon: <FaJava color="#007396" /> },
      { name: "Spring Boot", icon: <SiSpringboot color="#6DB33F" /> },
      { name: "Node.js", icon: <FaNodeJs color="#339933" /> },
      { name: "SQL", icon: <FaDatabase color="#003B57" /> },
      { name: "MySQL", icon: <SiMysql color="#4479A1" /> },
    ]
  },
  {
    title: "QA & Automation",
    icon: <SiSelenium />,
    skills: [
      { name: "Selenium", icon: <SiSelenium color="#43B02A" /> },
      { name: "JUnit", icon: <SiJunit5 color="#25A162" /> },
      { name: "API Testing", icon: <SiPostman color="#FF6C37" /> },
      { name: "Manual Testing", icon: <FaCheckCircle color="#f39c12" /> },
    ]
  },
  {
    title: "Tools & Others",
    icon: <FaGitAlt />,
    skills: [
      { name: "Git", icon: <FaGitAlt color="#F05032" /> },
      { name: "GitHub", icon: <FaGithub color="var(--text)" /> },
      { name: "Postman", icon: <SiPostman color="#FF6C37" /> },
      { name: "Jenkins", icon: <SiJenkins color="#D24939" /> },
      { name: "Maven", icon: <SiApachemaven color="#C71A22" /> },
    ]
  }
];

const codeSnippets = {
  0: [
    `const [state, setState] = useState(null);`,
    `useEffect(() => { fetchData() }, []);`,
    `<div className="app-container">`,
    `function render() { return <UI /> }`,
    `--primary-color: #1a7a4a;`
  ],
  1: [
    `@RestController\n@RequestMapping("/api")`,
    `SELECT * FROM users WHERE active = true;`,
    `SpringApplication.run(App.class, args);`,
    `app.get('/', (req, res) => res.send());`,
    `public class UserService implements Serializable`
  ],
  2: [
    `driver.findElement(By.id("login")).click();`,
    `@Test\npublic void verifyUserLogin() { ... }`,
    `assertEquals(expected, actual);`,
    `cy.visit('https://app.example.com')`,
    `wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("...")));`
  ],
  3: [
    `git commit -m "Initial commit"`,
    `git push origin main`,
    `npm install --save-dev`,
    `mvn clean test`,
    `docker build -t app:latest .`
  ]
};

const CodeBackground = ({ activeTab }) => {
  const snippets = codeSnippets[activeTab] || [];
  return (
    <div className="code-background" key={`bg-${activeTab}`}>
      {snippets.map((snippet, idx) => {
        // Randomize positioning and animation timing to create a chaotic, natural matrix feel
        const top = Math.random() * 70 + 10; // 10% to 80%
        const left = Math.random() * 70 + 10;
        const delay = Math.random() * 5;
        const duration = 12 + Math.random() * 8; // 12s to 20s
        
        return (
          <pre 
            key={`${activeTab}-${idx}`} 
            className="floating-code"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`
            }}
          >
            {snippet}
          </pre>
        );
      })}
    </div>
  );
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="section" style={styles.section}>
      <style>
        {`
          .console-container {
            display: flex;
            flex-direction: column;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 50px rgba(0,0,0,0.15);
            margin-top: 40px;
          }
          
          @media (min-width: 900px) {
            .console-container {
              flex-direction: row;
              min-height: 450px;
            }
          }

          /* Tabs Sidebar */
          .console-sidebar {
            flex: 0 0 280px;
            background: rgba(0,0,0,0.2);
            border-bottom: 1px solid var(--border);
            padding: 30px 0;
            display: flex;
            flex-direction: column;
            z-index: 2;
          }
          @media (min-width: 900px) {
            .console-sidebar {
              border-bottom: none;
              border-right: 1px solid var(--border);
            }
          }

          .sidebar-header {
            padding: 0 25px 20px;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: var(--text-muted);
            font-weight: 700;
          }

          .console-tab {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 16px 25px;
            background: transparent;
            border: none;
            color: var(--text-muted);
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: left;
            position: relative;
            font-family: inherit;
          }
          .console-tab::before {
            content: '';
            position: absolute;
            left: 0; top: 0; height: 100%; width: 4px;
            background: var(--primary);
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .console-tab:hover {
            color: var(--text);
            background: rgba(255,255,255,0.03);
          }
          .console-tab.active {
            color: var(--primary);
            background: rgba(26, 122, 74, 0.08);
          }
          .console-tab.active::before {
            opacity: 1;
          }
          .tab-icon {
            font-size: 1.3rem;
            display: flex;
          }

          /* Main Display Area */
          .console-display {
            flex: 1;
            padding: 40px;
            position: relative;
            background: radial-gradient(circle at center, rgba(26, 122, 74, 0.05) 0%, transparent 80%);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          /* Holographic Background Grid */
          .console-display::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: 
              linear-gradient(rgba(26, 122, 74, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(26, 122, 74, 0.1) 1px, transparent 1px);
            background-size: 30px 30px;
            z-index: 0;
            opacity: 0.5;
            pointer-events: none;
          }

          /* Animated Code Background */
          .code-background {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            overflow: hidden;
            z-index: 0;
            pointer-events: none;
          }
          .floating-code {
            position: absolute;
            color: var(--primary);
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.95rem;
            opacity: 0;
            white-space: pre-wrap;
            animation: driftUp linear infinite;
            filter: blur(0.5px);
          }
          @keyframes driftUp {
            0% { transform: translateY(80px); opacity: 0; }
            20% { opacity: 0.2; }
            80% { opacity: 0.2; }
            100% { transform: translateY(-80px); opacity: 0; }
          }

          .skills-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
            align-items: center;
            max-width: 600px;
            position: relative;
            z-index: 1;
          }

          /* Glass Pill Styles */
          .skill-pill {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 14px 24px;
            background: rgba(26, 26, 26, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 50px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            color: var(--text);
            font-weight: 600;
            font-size: 1.05rem;
            cursor: default;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) backwards, floatPill 6s ease-in-out infinite alternate;
          }

          .skill-pill:hover {
            transform: scale(1.1) translateY(-5px) !important;
            border-color: var(--primary);
            box-shadow: 0 15px 30px rgba(26, 122, 74, 0.3), inset 0 0 15px rgba(26, 122, 74, 0.2);
            background: rgba(26, 122, 74, 0.1);
            color: #fff;
          }

          .skill-pill-icon {
            font-size: 24px;
            display: flex;
            filter: drop-shadow(0 0 5px rgba(255,255,255,0.2));
            transition: transform 0.3s ease;
          }
          .skill-pill:hover .skill-pill-icon {
            transform: scale(1.2) rotate(10deg);
          }

          @keyframes popIn {
            0% { transform: scale(0) translateY(50px); opacity: 0; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
          }
          
          @keyframes floatPill {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-10px); }
          }
          
        `}
      </style>

      <div className="container">
        <div className="fancy-title-wrapper" data-aos="fade-up">
          <h2 className="section-title title-primary">Kau<span>shalam</span></h2>
          <h2 className="section-title title-secondary">My <span>Skills</span></h2>
        </div>
        <div className="section-line" data-aos="fade-up" data-aos-delay="100"></div>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="200">
          Technologies and tools I work with to build and test software.
        </p>

        <div className="console-container" data-aos="zoom-in" data-aos-delay="300">
          
          {/* Sidebar Tabs */}
          <div className="console-sidebar">
            <div className="sidebar-header">// Select Stack</div>
            {skillCategories.map((category, index) => (
              <button 
                key={index}
                className={`console-tab ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                <span className="tab-icon">{category.icon}</span>
                {category.title}
              </button>
            ))}
          </div>

          {/* Main Holographic Display */}
          <div className="console-display">
            
            {/* Dynamic Animated Code Background */}
            <CodeBackground activeTab={activeTab} />

            <div className="skills-wrapper" key={activeTab}>
              {skillCategories[activeTab].skills.map((skill, idx) => {
                const delay = Math.random() * 0.5;
                const duration = 4 + Math.random() * 3;
                
                return (
                  <div 
                    key={idx} 
                    className="skill-pill"
                    style={{ 
                      animationDelay: `${idx * 0.1}s, ${delay}s`,
                      animationDuration: `0.6s, ${duration}s`
                    }}
                  >
                    <span className="skill-pill-icon">{skill.icon}</span>
                    <span>{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: 'var(--bg)',
  }
};

export default Skills;