import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const xSet = gsap.quickSetter(cursor, "x", "px");
        const ySet = gsap.quickSetter(cursor, "y", "px");
        const xSetFollower = gsap.quickSetter(follower, "x", "px");
        const ySetFollower = gsap.quickSetter(follower, "y", "px");

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;
            // Immediate update for the dot
            xSet(clientX);
            ySet(clientY);

            // Smooth follow for the ring (overwrite: 'auto' prevents memory buildup)
            gsap.to(follower, {
                x: clientX,
                y: clientY,
                duration: 0.25,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        };

        const onMouseEnter = () => {
            gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
        };

        const onMouseLeave = () => {
            gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
        };

        // Magnetic effect for buttons and links
        const onLinkHover = () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.2 });
            gsap.to(follower, { scale: 2.5, opacity: 0.2, duration: 0.2 });
        };

        const onLinkLeave = () => {
            gsap.to(cursor, { scale: 1, duration: 0.2 });
            gsap.to(follower, { scale: 1, opacity: 1, duration: 0.2 });
        };

        window.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseenter', onMouseEnter);
        document.body.addEventListener('mouseleave', onMouseLeave);

        const links = document.querySelectorAll('a, button');
        links.forEach(link => {
            link.addEventListener('mouseenter', onLinkHover);
            link.addEventListener('mouseleave', onLinkLeave);
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.body.removeEventListener('mouseenter', onMouseEnter);
            document.body.removeEventListener('mouseleave', onMouseLeave);
            links.forEach(link => {
                link.removeEventListener('mouseenter', onLinkHover);
                link.removeEventListener('mouseleave', onLinkLeave);
            });
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] opacity-0 -translate-x-1/2 -translate-y-1/2 hidden md:block"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full pointer-events-none z-[9998] opacity-0 -translate-x-1/2 -translate-y-1/2 hidden md:block"
            />
        </>
    );
};

export default CustomCursor;
