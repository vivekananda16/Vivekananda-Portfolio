import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0d0d0d, 0.001); // Dark fog to blend edges

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
    
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 2. Setup 20,000+ Particle Swarm
    const particleCount = 20000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3); // NEW: For fluid dynamics

    // Initial fill
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;
      
      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
      
      colors[i * 3] = 0;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom glowing material
    const material = new THREE.PointsMaterial({
      size: 2.0,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
      depthWrite: false, // Prevents particles from occluding each other weirdly
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 3. Interaction & Resizing
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event) => {
      // Scale mouse coordinates to match the 3D terrain space
      targetMouseX = (event.clientX - windowHalfX) * 3;
      targetMouseY = (event.clientY - windowHalfY) * 3;
    };
    document.addEventListener('mousemove', onDocumentMouseMove);

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // 4. High-Performance Animation Loop (The Computational Art)
    let animationFrameId;
    const clock = new THREE.Clock();
    const colorHelper = new THREE.Color();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime(); // Global simulation time
      
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;
      
      const posArray = particles.geometry.attributes.position.array;
      const colArray = particles.geometry.attributes.color.array;

      // --- REAL MAGIC: Bioluminescent Fluid Vortex ---
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        let x = posArray[i3];
        let y = posArray[i3 + 1];
        let z = posArray[i3 + 2];
        
        let vx = velocities[i3];
        let vy = velocities[i3 + 1];
        let vz = velocities[i3 + 2];
        
        // 1. Fluid Flow Field (Fake 3D Curl Noise for organic drift)
        const flowX = Math.sin(y * 0.002 + time * 0.5) * Math.cos(z * 0.002);
        const flowY = Math.sin(z * 0.002 + time * 0.4) * Math.cos(x * 0.002);
        const flowZ = Math.sin(x * 0.002 + time * 0.6) * Math.cos(y * 0.002);
        
        // 2. The Magic: Mouse Vortex Interaction
        const dx = mouseX - x;
        const dy = -mouseY - y; // Y is flipped
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 400) {
          const force = (400 - dist) / 400;
          // Create a swirling tornado/vortex around the mouse
          vx += dy * force * 0.003;
          vy -= dx * force * 0.003;
          vz += (Math.random() - 0.5) * force * 2; // Sparkle outward
        }
        
        // 3. Gentle gravity to bring them back to the center
        vx += -x * 0.00005;
        vy += -y * 0.00005;
        vz += -z * 0.00005;

        // Apply flow field forces
        vx += flowX * 0.15;
        vy += flowY * 0.15;
        vz += flowZ * 0.15;
        
        // 4. Friction/Viscosity (fluid feels thick and smooth)
        vx *= 0.94;
        vy *= 0.94;
        vz *= 0.94;
        
        // Apply velocity to position
        x += vx;
        y += vy;
        z += vz;
        
        // Save state
        posArray[i3] = x;
        posArray[i3 + 1] = y;
        posArray[i3 + 2] = z;
        velocities[i3] = vx;
        velocities[i3 + 1] = vy;
        velocities[i3 + 2] = vz;

        // 5. Bioluminescent Coloring
        // Velocity dictates energy (brightness)
        const speed = Math.sqrt(vx*vx + vy*vy + vz*vz);
        
        // Shift from deep space blue/cyan to bright emerald green when energized
        const hue = 0.55 - speed * 0.04; 
        const lightness = Math.min(0.9, 0.1 + speed * 0.2); // Glow intensely when swirling
        
        colorHelper.setHSL(hue, 1.0, lightness);
        
        colArray[i3] = colorHelper.r;
        colArray[i3 + 1] = colorHelper.g;
        colArray[i3 + 2] = colorHelper.b;
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.color.needsUpdate = true;

      // Slow cinematic camera drift
      camera.position.x = Math.sin(time * 0.1) * 200;
      camera.position.y = 200 + Math.cos(time * 0.1) * 100;
      camera.lookAt(0, -200, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 5. Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      cancelAnimationFrame(animationFrameId);
      
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0, 
        pointerEvents: 'none' // Allows clicking through the canvas to the UI below
      }} 
    />
  );
};

export default ParticleBackground;
