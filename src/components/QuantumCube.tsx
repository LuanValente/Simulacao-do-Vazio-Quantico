import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import './QuantumCube.css';

const QuantumCube: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredParticle, setHoveredParticle] = useState<{ energy: number, movement: number, index: number } | null>(null);

  useEffect(() => {
    if (mountRef.current) {
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      // Create a dark background
      scene.background = new THREE.Color(0x000000);

      // Particle system
      const particleCount = 1000;
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesPositions = new Float32Array(particleCount * 3);
      const particlesColors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        particlesPositions[i * 3] = (Math.random() - 0.5) * 20; // x
        particlesPositions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
        particlesPositions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z

        // Initial color: blue
        particlesColors[i * 3] = 0;
        particlesColors[i * 3 + 1] = 0;
        particlesColors[i * 3 + 2] = 1;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(particlesColors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending, // Melhor blending para partículas
      });

      const particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
      scene.add(particleSystem);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);

      camera.position.z = 30;

      // Postprocessing
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5, 0.4, 0.85
      );
      bloomPass.threshold = 0;
      bloomPass.strength = 1.5;
      bloomPass.radius = 0;
      composer.addPass(bloomPass);

      // Raycaster
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const onMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };

      window.addEventListener('mousemove', onMouseMove);

      // Animation loop
      let time = 0;

      const animate = () => {
        requestAnimationFrame(animate);

        // Update particles
        const positions = particlesGeometry.attributes.position.array;
        const colors = particlesGeometry.attributes.color.array;

        for (let i = 0; i < positions.length; i += 3) {
          // Random movement
          positions[i] += (Math.random() - 0.5) * 0.1;
          positions[i + 1] += (Math.random() - 0.5) * 0.1;
          positions[i + 2] += (Math.random() - 0.5) * 0.1;

          // Heat effect
          const distance = Math.sqrt(positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2);
          const heat = Math.max(0, 1 - distance / 20);
          colors[i] = heat;
          colors[i + 1] = 0;
          colors[i + 2] = 1 - heat;
        }

        particlesGeometry.attributes.position.needsUpdate = true;
        particlesGeometry.attributes.color.needsUpdate = true;

        // Raycasting
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(particleSystem);

        if (intersects.length > 0) {
          const intersect = intersects[0];
          const index = intersect.index;
          if (index !== undefined) {
            const energy = colors[index * 3];
            const movement = Math.sqrt(
              (positions[index * 3] - (Math.random() - 0.5) * 0.1) ** 2 +
              (positions[index * 3 + 1] - (Math.random() - 0.5) * 0.1) ** 2 +
              (positions[index * 3 + 2] - (Math.random() - 0.5) * 0.1) ** 2
            );
            setHoveredParticle({ energy, movement, index });
          }
        } else {
          setHoveredParticle(null);
        }

        // Render the scene
        composer.render();
      };

      animate();

      // Cleanup on component unmount
      return () => {
        if (mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
        window.removeEventListener('mousemove', onMouseMove);
      };
    }
  }, []);

  return (
    <div className="quantum-cube-container">
      <div ref={mountRef} className="quantum-cube-mount" />
      {hoveredParticle && (
        <div className="info-box">
          <h3>Partícula Quântica</h3>
          <p>Energia: {hoveredParticle.energy.toFixed(2)}</p>
          <p>Movimento: {hoveredParticle.movement.toFixed(2)}</p>
          <p>Molécula: {`Molécula de ${hoveredParticle.energy > 0.5 ? 'Alta' : 'Baixa'} Energia`}</p>
        </div>
      )}
    </div>
  );
};

export default QuantumCube;
