import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, PointMaterial, Points, Float, Icosahedron, TorusKnot, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Global morphing states based on scroll progression
const SECTION_STATES = [
    { 
        id: 'hero', 
        fogColor: new THREE.Color('#0a0510'), 
        lightColor: new THREE.Color('#bc00ff'), 
        particleColor: new THREE.Color('#ffffff'), 
        geometryColor: new THREE.Color('#3a0088'),
        particleSize: 0.05,
        speed: 1
    },
    { 
        id: 'about', 
        fogColor: new THREE.Color('#051020'), 
        lightColor: new THREE.Color('#00f3ff'), 
        particleColor: new THREE.Color('#00f3ff'), 
        geometryColor: new THREE.Color('#004488'),
        particleSize: 0.03,
        speed: 0.5
    },
    { 
        id: 'skills', 
        fogColor: new THREE.Color('#100020'), 
        lightColor: new THREE.Color('#ff003c'), 
        particleColor: new THREE.Color('#bc00ff'), 
        geometryColor: new THREE.Color('#880022'),
        particleSize: 0.08,
        speed: 2
    },
    { 
        id: 'projects', 
        fogColor: new THREE.Color('#050505'), 
        lightColor: new THREE.Color('#f39c12'), 
        particleColor: new THREE.Color('#f39c12'), 
        geometryColor: new THREE.Color('#884400'),
        particleSize: 0.02,
        speed: 0.3
    },
    { 
        id: 'dev-lab', 
        fogColor: new THREE.Color('#021008'), 
        lightColor: new THREE.Color('#00ff88'), 
        particleColor: new THREE.Color('#00ff88'), 
        geometryColor: new THREE.Color('#008844'),
        particleSize: 0.04,
        speed: 1.5
    },
    { 
        id: 'qa-lab', 
        fogColor: new THREE.Color('#151520'), 
        lightColor: new THREE.Color('#ffffff'), 
        particleColor: new THREE.Color('#00f3ff'), 
        geometryColor: new THREE.Color('#222244'),
        particleSize: 0.06,
        speed: 1
    },
    { 
        id: 'contact', 
        fogColor: new THREE.Color('#000000'), 
        lightColor: new THREE.Color('#ffffff'), 
        particleColor: new THREE.Color('#ffffff'), 
        geometryColor: new THREE.Color('#222222'),
        particleSize: 0.05,
        speed: 0.5
    }
];

const DynamicEnvironment = () => {
    const { scene, camera } = useThree();
    const particlesRef = useRef();
    const lightRef = useRef();
    
    // Refs for our new 3D floating geometries
    const geoMatRef1 = useRef();
    const geoMatRef2 = useRef();
    const mainGroupRef = useRef();
    
    // Create random particles globally distributed
    const particleCount = 2000;
    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
        return pos;
    }, [particleCount]);

    useEffect(() => {
        scene.fog = new THREE.FogExp2('#0a0510', 0.03);
    }, [scene]);

    useFrame((state) => {
        // Calculate scroll progress (0 to 1)
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(1, maxScroll > 0 ? scrollY / maxScroll : 0));
        
        // Map progress to section indices smoothly
        const sectionsCount = SECTION_STATES.length;
        const rawIndex = progress * (sectionsCount - 1);
        const index1 = Math.floor(rawIndex);
        const index2 = Math.min(sectionsCount - 1, index1 + 1);
        const lerpFactor = rawIndex - index1;

        const state1 = SECTION_STATES[index1];
        const state2 = SECTION_STATES[index2];

        // Interpolate Background Fog & Lighting
        if (scene.fog) {
            scene.fog.color.lerpColors(state1.fogColor, state2.fogColor, lerpFactor);
        }
        if (lightRef.current) {
            lightRef.current.color.lerpColors(state1.lightColor, state2.lightColor, lerpFactor);
        }
        
        if (particlesRef.current && particlesRef.current.material) {
            // Interpolate Particle Color
            particlesRef.current.material.color.lerpColors(state1.particleColor, state2.particleColor, lerpFactor);
            
            // Interpolate Particle Size
            const currentSize = THREE.MathUtils.lerp(state1.particleSize, state2.particleSize, lerpFactor);
            particlesRef.current.material.size = currentSize;
            
            // Interpolate speed and move particles in an infinite vortex
            const currentSpeed = THREE.MathUtils.lerp(state1.speed, state2.speed, lerpFactor);
            particlesRef.current.rotation.y -= 0.001 * currentSpeed;
            particlesRef.current.rotation.x -= 0.0005 * currentSpeed;
        }

        // Interpolate Geometry Colors
        if (geoMatRef1.current) {
            geoMatRef1.current.color.lerpColors(state1.geometryColor, state2.geometryColor, lerpFactor);
        }
        if (geoMatRef2.current) {
            geoMatRef2.current.color.lerpColors(state1.geometryColor, state2.geometryColor, lerpFactor);
            geoMatRef2.current.emissive.lerpColors(state1.geometryColor, state2.geometryColor, lerpFactor);
        }

        // Rotate the entire geometry group slightly based on scroll
        if (mainGroupRef.current) {
            mainGroupRef.current.rotation.y = progress * Math.PI * 2;
            mainGroupRef.current.rotation.x = progress * Math.PI;
        }

        // Camera movement logic: Fly deeply into the scene as we scroll
        const t = state.clock.getElapsedTime();
        const targetZ = 5 - progress * 20; // Dive deeper into the space
        const targetY = Math.sin(t * 0.5) * 0.5; // Natural floating bob
        
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    });

    return (
        <>
            <ambientLight intensity={0.2} />
            <directionalLight ref={lightRef} position={[10, 10, 5]} intensity={2} />
            <pointLight position={[-10, -10, -5]} intensity={1} color="#00f3ff" />
            
            {/* Morphing Floating Geometries Group */}
            <group ref={mainGroupRef}>
                <Float speed={2} rotationIntensity={1.5} floatIntensity={2} position={[-4, 2, -8]}>
                    <Icosahedron args={[1.5, 0]}>
                        <meshStandardMaterial ref={geoMatRef1} wireframe color="#3a0088" transparent opacity={0.6} />
                    </Icosahedron>
                </Float>
                <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5} position={[5, -2, -12]}>
                    <TorusKnot args={[1.2, 0.3, 100, 16]}>
                        <MeshDistortMaterial 
                            ref={geoMatRef2} 
                            distort={0.4} 
                            speed={2} 
                            color="#3a0088" 
                            emissive="#3a0088" 
                            emissiveIntensity={0.5} 
                            roughness={0.2} 
                            metalness={0.8} 
                        />
                    </TorusKnot>
                </Float>
                <Float speed={1} rotationIntensity={1} floatIntensity={3} position={[0, -5, -16]}>
                    <Icosahedron args={[4, 1]}>
                        <meshStandardMaterial wireframe color="#ffffff" transparent opacity={0.05} />
                    </Icosahedron>
                </Float>
                <Float speed={2.5} rotationIntensity={3} floatIntensity={2} position={[-6, -4, -20]}>
                    <TorusKnot args={[2, 0.1, 64, 8]}>
                        <meshStandardMaterial wireframe color="#00f3ff" transparent opacity={0.2} />
                    </TorusKnot>
                </Float>
            </group>

            <Points ref={particlesRef} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial transparent color="#ffffff" size={0.05} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} />
            </Points>
            
            {/* Infinite Base Stars Layer */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </>
    );
};

const Global3DEnvironment = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -100, background: '#000', pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <DynamicEnvironment />
            </Canvas>
        </div>
    );
};

export default Global3DEnvironment;
