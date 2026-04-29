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

    // Initial fill (will be immediately overwritten in animation loop)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;
      
      colors[i * 3] = 0;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom glowing material
    const material = new THREE.PointsMaterial({
      size: 1.5,
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
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event) => {
      // Scale mouse coordinates to match the 3D terrain space
      mouseX = (event.clientX - windowHalfX) * 3;
      mouseY = (event.clientY - windowHalfY) * 3;
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
      
      const time = clock.getElapsedTime() * 0.8; // Global simulation time
      
      const posArray = particles.geometry.attributes.position.array;
      const colArray = particles.geometry.attributes.color.array;

      // --- MAGICAL CYBER SEA ---
      // A vast, undulating ocean of data that reacts to the mouse
      const gridSize = Math.ceil(Math.sqrt(particleCount)); // ~142
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // 2D Grid coordinates mapped to a massive 3D plane
        const ix = i % gridSize;
        const iz = Math.floor(i / gridSize);
        
        // Spread particles out from -1500 to +1500
        const x = (ix / gridSize - 0.5) * 3000;
        const z = (iz / gridSize - 0.5) * 3000;
        
        // Complex mathematical waves
        const distFromCenter = Math.sqrt(x*x + z*z);
        const wave1 = Math.sin(x * 0.003 + time) * 80;
        const wave2 = Math.cos(z * 0.002 - time * 0.5) * 100;
        const wave3 = Math.sin(distFromCenter * 0.005 - time) * 120;
        
        // --- THE MAGIC (Interactive Mouse Magnet) ---
        // Mouse pulls the glowing terrain up like a magnetic field
        // Note: Y is flipped in 2D mouse space vs 3D
        const dx = x - mouseX;
        const dz = z - mouseY;
        const distToMouse = Math.sqrt(dx*dx + dz*dz);
        const magneticLift = Math.max(0, 400 - distToMouse) * 0.8;
        
        // Final Y position combining waves and mouse interaction
        const y = wave1 + wave2 + wave3 + magneticLift - 300;

        posArray[i3] = x;
        posArray[i3 + 1] = y;
        posArray[i3 + 2] = z;

        // --- MAGICAL COLORING ---
        // Color shifts from Matrix Green to Holographic Cyan based on height
        const heightRatio = Math.max(0, Math.min(1, (y + 500) / 800)); // Normalize height
        
        const hue = 0.35 + heightRatio * 0.15; // 0.35 = Green, 0.5 = Cyan
        
        // Brighten significantly if lifted by the mouse
        const isLifted = magneticLift > 10;
        const lightness = 0.2 + (heightRatio * 0.5) + (isLifted ? 0.3 : 0) + (Math.sin(time * 3 + i) * 0.1);
        
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
