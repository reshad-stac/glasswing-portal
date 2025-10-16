import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Wireframe, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  char: string;
  color: THREE.Color;
  scale: number;
  rotationSpeed: number;
}

function AnimatedIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;

      const scale = 1 + time * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.3} />
      <Wireframe
        simplify={true}
        stroke="#00d4ff"
        thickness={0.02}
        fillOpacity={0}
      />
    </mesh>
  );
}

function CodeParticles() {
  const particlesRef = useRef<THREE.Group>(null);
  
  const particles = useMemo(() => {
    const codeChars = [
      '<', '>', '/', '{', '}', '[', ']', '(', ')', ';',
      'const', 'let', 'var', 'if', 'else', 'for', 'while',
      '===', '!==', '=>', '++', '--', '&&', '||',
      'function', 'class', 'return', 'import', 'export',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ];
    
    const colors = [
      new THREE.Color('#00d4ff'), // cyan
      new THREE.Color('#b844ff'), // purple
      new THREE.Color('#ff00ff'), // magenta
      new THREE.Color('#00ffff'), // bright cyan
      new THREE.Color('#ff00aa'), // pink
    ];
    
    const temp: Particle[] = [];
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const speed = 0.5 + Math.random() * 1.5;
      
      temp.push({
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.sin(phi) * Math.sin(theta) * speed,
          Math.cos(phi) * speed
        ),
        char: codeChars[Math.floor(Math.random() * codeChars.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: 0.2 + Math.random() * 0.3,
        rotationSpeed: (Math.random() - 0.5) * 2,
      });
    }
    
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;
    
    particlesRef.current.children.forEach((child, i) => {
      const particle = particles[i];
      
      // Update position
      particle.position.add(particle.velocity.clone().multiplyScalar(delta));
      child.position.copy(particle.position);
      
      // Rotate particle
      child.rotation.y += particle.rotationSpeed * delta;
      
      // Fade out as they move away
      const distance = particle.position.length();
      const opacity = Math.max(0, 1 - distance / 15);
      
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
        child.material.opacity = opacity;
      }
      
      // Reset particle when too far
      if (distance > 15) {
        particle.position.set(0, 0, 0);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const speed = 0.5 + Math.random() * 1.5;
        particle.velocity.set(
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.sin(phi) * Math.sin(theta) * speed,
          Math.cos(phi) * speed
        );
      }
    });
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <Text
          key={i}
          position={[0, 0, 0]}
          fontSize={particle.scale}
          color={particle.color}
          anchorX="center"
          anchorY="middle"
          material-transparent={true}
          material-opacity={1}
        >
          {particle.char}
        </Text>
      ))}
    </group>
  );
}

function CoreExplosion() {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Pulsating core
    if (coreRef.current) {
      const scale = 1 + Math.sin(time * 2) * 0.2;
      coreRef.current.scale.setScalar(scale);
    }
  });

  return (
    <>
      {/* Central core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
        <pointLight intensity={2} distance={10} decay={2} color="#00d4ff" />
      </mesh>
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#b844ff" />
        <pointLight position={[0, 10, -10]} intensity={1} color="#ff00ff" />
        
        <CoreExplosion />
        <AnimatedIcosahedron />
        <CodeParticles />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}
