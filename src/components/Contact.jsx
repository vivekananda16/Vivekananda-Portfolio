import React from 'react';
import { 
  FaEnvelope, 
  FaPhoneAlt, 
  FaLinkedinIn, 
  FaGithub, 
  FaInstagram, 
  FaFacebookF,
  FaPaperPlane
} from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="section" style={styles.section}>
      <style>
        {`
          .contact-container {
            display: grid;
            grid-template-columns: 1fr 1.5fr;
            gap: 50px;
            margin-top: 40px;
          }
          @media (max-width: 800px) {
            .contact-container {
              grid-template-columns: 1fr;
            }
          }
          
          /* Contact Info Cards */
          .info-card {
            display: flex;
            align-items: center;
            gap: 20px;
            padding: 20px 24px;
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: 16px;
            margin-bottom: 20px;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            text-decoration: none;
            color: var(--text);
            position: relative;
            overflow: hidden;
            z-index: 1;
          }
          .info-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 4px; height: 100%;
            background: var(--primary);
            transition: width 0.3s ease;
            z-index: -1;
            opacity: 0;
          }
          .info-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            border-color: var(--primary);
          }
          .info-card:hover::before {
            opacity: 1;
          }
          .info-icon {
            width: 55px;
            height: 55px;
            border-radius: 50%;
            background: rgba(26, 122, 74, 0.1);
            color: var(--primary);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            transition: all 0.3s ease;
          }
          .info-card:hover .info-icon {
            background: var(--primary);
            color: #fff;
            transform: scale(1.1) rotate(5deg);
          }
          .info-details h4 {
            font-size: 1.05rem;
            margin-bottom: 6px;
            font-weight: 700;
          }
          .info-details p {
            font-size: 0.95rem;
            color: var(--text-muted);
            margin: 0;
            word-break: break-all;
            transition: color 0.3s ease;
          }
          .info-card:hover .info-details p {
            color: var(--text);
          }

          /* Social Grid */
          .social-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-top: 20px;
          }
          .social-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 14px;
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: 12px;
            color: var(--text);
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 600;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .social-btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }
          .social-btn.linkedin:hover { background: #0077b5; color: #fff; border-color: #0077b5; }
          .social-btn.github:hover { background: #333; color: #fff; border-color: #333; }
          .social-btn.instagram:hover { 
            background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
            color: #fff; 
            border-color: transparent; 
          }
          .social-btn.facebook:hover { background: #1877f2; color: #fff; border-color: #1877f2; }

          /* Call to Action Block */
          .cta-container {
            background: linear-gradient(135deg, rgba(26, 122, 74, 0.1) 0%, rgba(26, 122, 74, 0.02) 100%);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 50px 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: relative;
            overflow: hidden;
            z-index: 1;
            height: 100%;
          }
          .cta-container::before {
            content: '';
            position: absolute;
            top: -50px; right: -50px; width: 200px; height: 200px;
            background: var(--primary);
            filter: blur(80px);
            opacity: 0.4;
            z-index: -1;
            animation: pulse-blob 6s infinite alternate;
          }
          @keyframes pulse-blob {
            0% { transform: scale(1); opacity: 0.2; }
            100% { transform: scale(1.5); opacity: 0.5; }
          }
          .cta-content h3 {
            font-size: 2.2rem;
            font-weight: 800;
            color: var(--text);
            margin-bottom: 20px;
            line-height: 1.25;
            position: relative;
            z-index: 2;
          }
          .cta-content h3 span {
            color: var(--primary);
          }
          .cta-content p {
            font-size: 1.05rem;
            color: var(--text-muted);
            line-height: 1.7;
            margin-bottom: 35px;
            position: relative;
            z-index: 2;
          }
          .cta-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 16px 36px;
            background: var(--primary);
            color: #fff;
            border-radius: 30px;
            font-size: 1.1rem;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 10px 20px rgba(26, 122, 74, 0.3);
            position: relative;
            z-index: 2;
          }
          .cta-btn:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 15px 25px rgba(26, 122, 74, 0.5);
            background: var(--primary-light);
          }
          
          /* Floating Icons */
          .float-icon {
            position: absolute;
            color: var(--primary);
            opacity: 0.15;
            z-index: 0;
            animation: floating-socials 10s ease-in-out infinite;
          }
          .float-icon-1 { top: 15%; left: 10%; font-size: 50px; animation-delay: 0s; }
          .float-icon-2 { top: 20%; right: 12%; font-size: 60px; animation-delay: 2s; }
          .float-icon-3 { bottom: 15%; left: 18%; font-size: 45px; animation-delay: 4s; }
          .float-icon-4 { bottom: 20%; right: 15%; font-size: 55px; animation-delay: 6s; }

          @keyframes floating-socials {
            0% { transform: translateY(0px) rotate(0deg) scale(1); }
            33% { transform: translateY(-25px) rotate(15deg) scale(1.1); }
            66% { transform: translateY(15px) rotate(-15deg) scale(0.9); }
            100% { transform: translateY(0px) rotate(0deg) scale(1); }
          }
        `}
      </style>

      <div className="container">
        <div className="fancy-title-wrapper" data-aos="zoom-in">
          <h2 className="section-title title-primary">Sam<span>parka</span></h2>
          <h2 className="section-title title-secondary">Get In <span>Touch</span></h2>
        </div>
        <div className="section-line" data-aos="zoom-in" data-aos-delay="100"></div>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="200">
          Have a project in mind, a job opportunity, or just want to say hi? Feel free to reach out!
        </p>

        <div className="contact-container">
          
          {/* Left Side: Contact Info */}
          <div data-aos="fade-right" data-aos-delay="300">
            <a href="mailto:vivekanandamohanty7@gmail.com" className="info-card">
              <div className="info-icon"><FaEnvelope /></div>
              <div className="info-details">
                <h4>Email</h4>
                <p>vivekanandamohanty7@gmail.com</p>
              </div>
            </a>
            
            <a href="tel:+917978011886" className="info-card">
              <div className="info-icon"><FaPhoneAlt /></div>
              <div className="info-details">
                <h4>Phone</h4>
                <p>+91 7978011886</p>
              </div>
            </a>

            <h3 style={{ marginTop: '40px', marginBottom: '20px', fontSize: '1.3rem', fontWeight: '700' }}>Connect Socially</h3>
            <div className="social-grid">
              <a href="https://www.linkedin.com/in/vivekananda-mohanty-2a0956209" target="_blank" rel="noreferrer" className="social-btn linkedin">
                <FaLinkedinIn /> LinkedIn
              </a>
              <a href="https://github.com/vivekananda16" target="_blank" rel="noreferrer" className="social-btn github">
                <FaGithub /> GitHub
              </a>
              <a href="https://www.instagram.com/vi_vekanand._/" target="_blank" rel="noreferrer" className="social-btn instagram">
                <FaInstagram /> Instagram
              </a>
              <a href="https://www.facebook.com/vivekanandamohanty.mohanty" target="_blank" rel="noreferrer" className="social-btn facebook">
                <FaFacebookF /> Facebook
              </a>
            </div>
          </div>

          {/* Right Side: Call to Action */}
          <div data-aos="fade-left" data-aos-delay="400">
            <div className="cta-container">
              
              {/* Floating Social Background Elements */}
              <FaLinkedinIn className="float-icon float-icon-1" />
              <FaGithub className="float-icon float-icon-2" />
              <FaInstagram className="float-icon float-icon-3" />
              <FaFacebookF className="float-icon float-icon-4" />

              <div className="cta-content">
                <h3>Let's Build Something <span>Amazing</span> Together!</h3>
                <p>
                  Whether you have a specific project in mind, need a quality assurance expert to test your application, or just want to connect, I'm always open to discussing new opportunities.
                </p>
                <a href="mailto:vivekanandamohanty7@gmail.com" className="cta-btn">
                  Say Hello <FaPaperPlane />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: 'transparent',
  }
};

export default Contact;