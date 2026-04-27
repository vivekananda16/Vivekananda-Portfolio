import React, { useState, useEffect } from 'react';

const Preloader = ({ onLoaded }) => {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const texts = [
      "[ SYSTEM INITIALIZING... ]", 
      "[ LOADING VIVEKANANDA_PORTFOLIO ]", 
      "[ ACCESS GRANTED ]"
    ];
    let currentTextIndex = 0;
    let charIndex = 0;

    const type = () => {
      if (charIndex < texts[currentTextIndex].length) {
        setText(texts[currentTextIndex].substring(0, charIndex + 1));
        charIndex++;
        setTimeout(type, 30);
      } else {
        setTimeout(() => {
          if (currentTextIndex < texts.length - 1) {
            currentTextIndex++;
            charIndex = 0;
            setText('');
            type();
          } else {
            setPhase(1);
            setTimeout(onLoaded, 500); // Trigger fade out
          }
        }, 400);
      }
    };
    
    setTimeout(type, 300);
  }, [onLoaded]);

  return (
    <div className={`preloader-container ${phase === 1 ? 'fade-out' : ''}`}>
      <style>
        {`
          .preloader-container {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: #0d0d0d;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: opacity 0.5s ease, transform 0.5s ease;
          }
          .preloader-container.fade-out {
            opacity: 0;
            pointer-events: none;
            transform: translateY(-30px);
          }
          
          /* Logo Glitch */
          .preloader-logo {
            font-family: 'Poppins', sans-serif;
            font-size: 60px;
            font-weight: 800;
            color: #fff;
            line-height: 1;
            letter-spacing: -3px;
            margin-bottom: 20px;
            animation: glitch 1.5s infinite;
          }
          .preloader-dot {
            color: var(--primary, #1a7a4a);
          }
          
          @keyframes glitch {
            0% { text-shadow: 2px 0 0 red, -2px 0 0 cyan; transform: skewX(0deg); }
            5% { text-shadow: -2px 0 0 red, 2px 0 0 cyan; transform: skewX(5deg); }
            10% { text-shadow: 2px 0 0 red, -2px 0 0 cyan; transform: skewX(-5deg); }
            15% { text-shadow: none; transform: skewX(0deg); }
            100% { text-shadow: none; transform: skewX(0deg); }
          }

          .preloader-text {
            font-family: 'Courier New', monospace;
            font-size: 14px;
            color: var(--primary, #1a7a4a);
            letter-spacing: 2px;
          }
          .cursor-blink {
            display: inline-block;
            width: 8px;
            height: 14px;
            background: var(--primary, #1a7a4a);
            margin-left: 4px;
            animation: blink 0.8s infinite;
            vertical-align: middle;
          }
          @keyframes blink { 50% { opacity: 0; } }
        `}
      </style>
      <div className="preloader-logo">
        du<span className="preloader-dot">.</span>
      </div>
      <div className="preloader-text">
        {text}<span className="cursor-blink"></span>
      </div>
    </div>
  );
};

export default Preloader;
