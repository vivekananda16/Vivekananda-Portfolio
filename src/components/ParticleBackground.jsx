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
      mouseX = (event.clientX - windowHalfX) * 0.05;
      mouseY = (event.clientY - windowHalfY) * 0.05;
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
      
      const time = clock.getElapsedTime() * 0.5; // Global simulation time
      
      // Grab arrays to mutate
      const posArray = particles.geometry.attributes.position.array;
      const colArray = particles.geometry.attributes.color.array;

      // Mathematical logic for shaping the swarm
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Stable pseudo-random values
        const r1 = ((i * 13) % 1000) / 1000;
        const r2 = ((i * 17) % 1000) / 1000;
        const r3 = ((i * 19) % 1000) / 1000;

        // --- ELEGANT GALAXY SWIRL ---
        const arms = 5; // 5 spiral arms
        const radius = Math.pow(r1, 1.5) * 800; // Concentrate particles near the center
        const armOffset = (i % arms) * (Math.PI * 2 / arms);
        const spiralAngle = r1 * Math.PI * 4; // The twist of the galaxy
        
        // Rotate slowly over time
        const theta = armOffset + spiralAngle + time * 0.15;
        
        // Z-axis spread: thicker at the center, tapering at the edges
        const heightSpread = Math.pow(1 - r1, 2) * 150 * (r2 - 0.5);
        
        // Organic chaos / stardust drift
        const chaos = r3 * 40 * r1;

        const x = Math.cos(theta) * radius + Math.cos(time * 0.5 + i) * chaos;
        const z = Math.sin(theta) * radius + Math.sin(time * 0.5 + i) * chaos;
        const y = heightSpread + Math.sin(time * 0.3 + r1 * 10) * 15;

        posArray[i3] = x;
        posArray[i3 + 1] = y; // Y is up/down in ThreeJS
        posArray[i3 + 2] = z;

        // --- DYNAMIC COLORING ---
        // Core is cyan/teal (0.5), edges fade to deep blue/purple (0.7)
        const hue = 0.5 + r1 * 0.2 + Math.sin(time * 0.1 + r2) * 0.05;
        // Bright in center, darker at edges, with a soft pulse
        const lightness = 0.7 - (r1 * 0.5) + (Math.sin(time * 2 + i * 0.01) * 0.15);
        
        colorHelper.setHSL(hue, 0.9, lightness);
        
        colArray[i3] = colorHelper.r;
        colArray[i3 + 1] = colorHelper.g;
        colArray[i3 + 2] = colorHelper.b;
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.color.needsUpdate = true;

      // Smooth camera follow
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      // Global rotation
      particles.rotation.y = time * 0.1;
      particles.rotation.z = time * 0.05;

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
