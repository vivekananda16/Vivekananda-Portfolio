import React, { useRef, useEffect } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particlesArray = [];
    
    // Resize
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Mouse Position
    let mouse = {
      x: null,
      y: null,
      radius: 120
    };
    
    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle Class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() * 1) - 0.5;
        this.speedY = (Math.random() * 1) - 0.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
      }
      draw() {
        ctx.fillStyle = 'rgba(26, 122, 74, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize
    const init = () => {
      particlesArray = [];
      // Adjust density based on screen size (less particles on mobile)
      let numberOfParticles = (canvas.width * canvas.height) / 12000;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };
    init();

    // Animate
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Check distance to mouse
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - particlesArray[i].x;
          let dy = mouse.y - particlesArray[i].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            ctx.beginPath();
            // Opacity fades as distance increases
            const opacity = (1 - distance / mouse.radius) * 0.4;
            ctx.strokeStyle = `rgba(26, 122, 74, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(particlesArray[i].x, particlesArray[i].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0, // Ensure it's behind everything
        pointerEvents: 'none' // Don't block clicks
      }} 
    />
  );
};

export default ParticleBackground;
