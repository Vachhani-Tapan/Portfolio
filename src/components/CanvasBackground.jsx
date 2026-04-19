import React, { useRef, useEffect } from 'react';

const CanvasBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animationFrameId;
        let particles = [];

        const mouse = {
            x: null,
            y: null,
            radius: 150 // Distance within which lines/dots repulse
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        window.addEventListener('resize', resize);

        const handleMouseMove = (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        };

        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);

        class Particle {
            constructor(x, y, dx, dy, size) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.size = size;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.fill();
                ctx.closePath();
            }

            update() {
                if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                    this.dx = -this.dx;
                }
                if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                    this.dy = -this.dy;
                }

                this.x += this.dx;
                this.y += this.dy;

                // Repulse mouse interaction
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        let forceDirectionX = dx / distance;
                        let forceDirectionY = dy / distance;
                        let force = (mouse.radius - distance) / mouse.radius;
                        let directionX = forceDirectionX * force * 5;
                        let directionY = forceDirectionY * force * 5;

                        // Push away
                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }

                this.draw();
            }
        }

        const init = () => {
            particles = [];
            // Reduced density to lower TBT: from 12000 to 25000
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 25000); 
            for (let i = 0; i < numberOfParticles; i++) {
                let size = Math.random() * 1.5 + 0.5;
                let x = Math.random() * (canvas.width - size * 2) + size;
                let y = Math.random() * (canvas.height - size * 2) + size;
                let dx = (Math.random() - 0.5) * 0.8;
                let dy = (Math.random() - 0.5) * 0.8;
                particles.push(new Particle(x, y, dx, dy, size));
            }
        };

        const connect = () => {
            // Reduced connection distance from 18000 to 10000 for performance
            const maxDistance = 10000;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = (dx * dx) + (dy * dy);

                    if (distance < maxDistance) {
                        let opacity = 1 - (distance / maxDistance);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            connect();
            animationFrameId = requestAnimationFrame(animate);
        };

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ background: '#000' }}
        />
    );
};

export default CanvasBackground;
