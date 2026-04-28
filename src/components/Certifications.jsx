import React from 'react';
import { FaCheckCircle, FaBarcode, FaCode } from 'react-icons/fa';
import certQspiders from '../assets/cert_qspiders.jpg';
import certTestYantra from '../assets/cert_testyantra.png';
import certClaude from '../assets/cert_claude.png';

const certData = [
  {
    title: "SDET Certification",
    issuer: "QSpiders",
    image: certQspiders,
    id: "QSP-9482-110",
    description: "Comprehensive training in software testing, test automation frameworks, and Quality Assurance methodologies.",
  },
  {
    title: "Certificate of Appreciation",
    issuer: "TestYantra Crowd",
    image: certTestYantra,
    id: "TYC-4819-204",
    description: "Awarded for outstanding contribution to crowd testing projects within the Logistics & Transportation domain.",
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    image: certClaude,
    id: "ANTH-7731-998",
    description: "Demonstrated proficiency in applying Claude Code and advanced AI tools to real-world development workflows.",
  },
  {
    title: "Full Stack Java Developer",
    issuer: "NareshIT",
    image: null,
    id: "NIT-1029-445",
    description: "Completed Full Stack Java Developer certification from NareshIT, covering end-to-end web development.",
  }
];

const Certifications = () => {
  return (
    <section id="certifications" className="section" style={styles.section}>
      <style>
        {`
          .vip-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 40px;
            margin-top: 50px;
          }

          /* VIP Pass Container */
          .vip-card {
            background: var(--bg-card);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 1;
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
            cursor: pointer;
          }

          /* The Holographic Foil layer */
          .vip-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(
              125deg, 
              transparent 20%, 
              rgba(255, 255, 255, 0.1) 40%, 
              rgba(26, 122, 74, 0.3) 50%, 
              rgba(255, 255, 255, 0.1) 60%, 
              transparent 80%
            );
            background-size: 200% 200%;
            z-index: 10;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            mix-blend-mode: overlay;
          }

          .vip-card:hover {
            transform: translateY(-15px) scale(1.02);
            box-shadow: 0 30px 60px rgba(0,0,0,0.4), 0 0 20px rgba(26, 122, 74, 0.3);
            border-color: var(--primary);
          }

          .vip-card:hover::before {
            opacity: 1;
            animation: holoShine 3s infinite linear;
          }

          @keyframes holoShine {
            0% { background-position: 200% 50%; }
            100% { background-position: -200% 50%; }
          }

          /* Pass Header (Lanyard Hole Area) */
          .vip-header {
            height: 40px;
            background: rgba(0, 0, 0, 0.3);
            border-bottom: 1px solid rgba(255,255,255,0.05);
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }
          .lanyard-hole {
            width: 60px;
            height: 12px;
            background: var(--bg);
            border-radius: 10px;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
          }

          /* Certificate Image */
          .vip-img-wrapper {
            width: 100%;
            height: 220px;
            background: #ffffff;
            position: relative;
            padding: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .vip-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 5px 15px rgba(0,0,0,0.1));
            transition: transform 0.5s ease;
          }
          .vip-card:hover .vip-img {
            transform: scale(1.08);
          }

          /* Placeholder Graphic */
          .placeholder-graphic {
            width: 85%;
            height: 85%;
            background: linear-gradient(135deg, var(--bg) 0%, var(--bg-card) 100%);
            border: 2px dashed rgba(26, 122, 74, 0.3);
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 15px;
            color: var(--primary);
            transition: all 0.5s ease;
          }
          .placeholder-graphic svg {
            font-size: 50px;
            filter: drop-shadow(0 0 10px rgba(26, 122, 74, 0.4));
          }
          .placeholder-graphic span {
            font-size: 0.8rem;
            font-weight: 700;
            letter-spacing: 2px;
            opacity: 0.7;
          }
          .vip-card:hover .placeholder-graphic {
            transform: scale(1.05);
            border-color: var(--primary);
            border-style: solid;
            box-shadow: inset 0 0 20px rgba(26, 122, 74, 0.2);
          }

          /* Authentic Badge */
          .authentic-badge {
            position: absolute;
            bottom: -15px;
            right: 20px;
            background: var(--bg-card);
            border: 2px solid var(--primary);
            color: var(--primary);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            z-index: 5;
          }

          /* VIP Details */
          .vip-details {
            padding: 30px 25px 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background: linear-gradient(to bottom, var(--bg-card) 0%, rgba(0,0,0,0.2) 100%);
            flex: 1;
          }
          
          .vip-issuer {
            font-size: 0.8rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 700;
          }
          
          .vip-title {
            font-size: 1.4rem;
            font-weight: 800;
            color: var(--text);
            line-height: 1.2;
          }
          .vip-card:hover .vip-title {
            color: var(--primary);
          }

          .vip-desc {
            font-size: 0.95rem;
            color: var(--text-muted);
            line-height: 1.6;
            margin-bottom: 10px;
          }

          /* Barcode Footer */
          .vip-footer {
            border-top: 1px dashed rgba(255,255,255,0.1);
            padding: 15px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .vip-id {
            font-family: monospace;
            font-size: 0.85rem;
            color: var(--primary);
            letter-spacing: 1px;
          }
          .barcode-icon {
            font-size: 28px;
            color: var(--text-muted);
            opacity: 0.5;
          }

        `}
      </style>

      <div className="container">
        <div className="fancy-title-wrapper" data-aos="zoom-in">
          <h2 className="section-title title-primary">Pra<span>mana</span></h2>
          <h2 className="section-title title-secondary">My <span>Certifications</span></h2>
        </div>
        <div className="section-line" data-aos="zoom-in" data-aos-delay="100"></div>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="200">
          Professional credentials verifying my expertise and continuous learning.
        </p>

        <div className="vip-grid">
          {certData.map((cert, index) => (
            <div 
              key={index} 
              className="vip-card"
              data-aos="flip-left"
              data-aos-delay={(index + 1) * 150}
            >
              <div className="vip-header">
                <div className="lanyard-hole"></div>
              </div>
              
              <div className="vip-img-wrapper">
                {cert.image ? (
                  <img src={cert.image} alt={cert.title} className="vip-img" />
                ) : (
                  <div className="placeholder-graphic">
                    <FaCode />
                    <span>VERIFIED CREDENTIAL</span>
                  </div>
                )}
                <div className="authentic-badge" title="Verified Credential">
                  <FaCheckCircle />
                </div>
              </div>
              
              <div className="vip-details">
                <span className="vip-issuer">{cert.issuer}</span>
                <h3 className="vip-title">{cert.title}</h3>
                <p className="vip-desc">{cert.description}</p>
              </div>

              <div className="vip-footer">
                <span className="vip-id">ID: {cert.id}</span>
                <FaBarcode className="barcode-icon" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: 'var(--bg)',
    position: 'relative',
  }
};

export default Certifications;