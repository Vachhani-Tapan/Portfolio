import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const InteractiveBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Scene Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Particle System
        const particlesCount = 100;
        const particles = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particlesCount * 3);
        const particleVelocities = [];

        for (let i = 0; i < particlesCount; i++) {
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 50;

            particlePositions[i * 3] = x;
            particlePositions[i * 3 + 1] = y;
            particlePositions[i * 3 + 2] = z;

            particleVelocities.push({
                x: (Math.random() - 0.5) * 0.1,
                y: (Math.random() - 0.5) * 0.1,
                z: (Math.random() - 0.5) * 0.05
            });
        }

        particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

        const particleMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.5,
            transparent: true,
            opacity: 0.8
        });

        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);

        // Lines Setup (Optimized to avoid memory leak)
        const linesGeometry = new THREE.BufferGeometry();
        const maxConnections = particlesCount * particlesCount; // Worst case
        const linesPositions = new Float32Array(maxConnections * 6); // 2 points per connection, 3 coords per point
        linesGeometry.setAttribute('position', new THREE.BufferAttribute(linesPositions, 3));

        const linesMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.2
        });
        const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
        scene.add(lines);

        // Interaction
        const mouse = new THREE.Vector2(0, 0);
        const raycaster = new THREE.Raycaster();
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

        const handleMouseMove = (e) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation Loop
        let animationFrameId; // To store request ID for cleanup
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            // Update Particle Positions
            const positions = particleSystem.geometry.attributes.position.array;

            // Mouse interaction logic
            raycaster.setFromCamera(mouse, camera);
            const mousePoint = new THREE.Vector3();
            raycaster.ray.intersectPlane(plane, mousePoint);

            for (let i = 0; i < particlesCount; i++) {
                // Movement
                positions[i * 3] += particleVelocities[i].x;
                positions[i * 3 + 1] += particleVelocities[i].y;
                positions[i * 3 + 2] += particleVelocities[i].z;

                // Bounce off boundaries
                if (positions[i * 3] > 60 || positions[i * 3] < -60) particleVelocities[i].x *= -1;
                if (positions[i * 3 + 1] > 40 || positions[i * 3 + 1] < -40) particleVelocities[i].y *= -1;
                if (positions[i * 3 + 2] > 30 || positions[i * 3 + 2] < -30) particleVelocities[i].z *= -1;

                // Mouse repulsion
                if (mousePoint) {
                    const dx = positions[i * 3] - mousePoint.x;
                    const dy = positions[i * 3 + 1] - mousePoint.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 10) {
                        const force = (10 - dist) / 10;
                        positions[i * 3] += dx * force * 0.05;
                        positions[i * 3 + 1] += dy * force * 0.05;
                    }
                }
            }
            particleSystem.geometry.attributes.position.needsUpdate = true;

            // Update Lines
            let vertexIndex = 0;
            const connectDistance = 15;

            // Connect particles
            for (let i = 0; i < particlesCount; i++) {
                for (let j = i + 1; j < particlesCount; j++) {
                    const dx = positions[i * 3] - positions[j * 3];
                    const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                    const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < connectDistance) {
                        linesPositions[vertexIndex++] = positions[i * 3];
                        linesPositions[vertexIndex++] = positions[i * 3 + 1];
                        linesPositions[vertexIndex++] = positions[i * 3 + 2];

                        linesPositions[vertexIndex++] = positions[j * 3];
                        linesPositions[vertexIndex++] = positions[j * 3 + 1];
                        linesPositions[vertexIndex++] = positions[j * 3 + 2];
                    }
                }

                // Connect to mouse
                if (mousePoint) {
                    const dx = positions[i * 3] - mousePoint.x;
                    const dy = positions[i * 3 + 1] - mousePoint.y;
                    const dz = positions[i * 3 + 2] - 0;
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < 15) {
                        linesPositions[vertexIndex++] = positions[i * 3];
                        linesPositions[vertexIndex++] = positions[i * 3 + 1];
                        linesPositions[vertexIndex++] = positions[i * 3 + 2];

                        linesPositions[vertexIndex++] = mousePoint.x;
                        linesPositions[vertexIndex++] = mousePoint.y;
                        linesPositions[vertexIndex++] = 0;
                    }
                }
            }

            linesGeometry.attributes.position.needsUpdate = true;
            linesGeometry.setDrawRange(0, vertexIndex / 3);

            // Parallax - Removed to keep background visible
            // const scrollY = window.scrollY;
            // particleSystem.position.y = scrollY * 0.02;
            // lines.position.y = scrollY * 0.02;

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId); // Stop loop
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);

            // Dispose everything
            scene.remove(particleSystem);
            scene.remove(lines);
            particles.dispose();
            particleMaterial.dispose();
            linesGeometry.dispose();
            linesMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 bg-black overflow-hidden pointer-events-none">
            <canvas ref={canvasRef} className="block w-full h-full opacity-100" />
        </div>
    );
};

export default InteractiveBackground;
