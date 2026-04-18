import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    // Use motion values to completely bypass React state re-renders on mouse events
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Apply smoother, snappier spring physics for the trailing outer ring effect
    const springConfig = { damping: 28, stiffness: 600, mass: 0.2 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        let isCurrentlyHovering = false;

        const updateMousePosition = (e) => {
            // Update motion values directly without triggering a re-render
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            try {
                // Determine if we're hovering over a clickable element
                const target = e.target;
                const isInteractable =
                    target.tagName?.toLowerCase() === 'a' ||
                    target.tagName?.toLowerCase() === 'button' ||
                    target.closest('a') !== null ||
                    target.closest('button') !== null ||
                    window.getComputedStyle(target).cursor === 'pointer' ||
                    window.getComputedStyle(target).cursor === 'crosshair';

                const newHoveringState = !!isInteractable;
                
                // Only trigger a state update if the hover status actually changed
                // This prevents massive re-render cycles when dragging over complex DOMs
                if (isCurrentlyHovering !== newHoveringState) {
                    isCurrentlyHovering = newHoveringState;
                    setIsHovering(newHoveringState);
                }
            } catch (err) {
                // Failsafe for SVG/custom elements
                if (isCurrentlyHovering !== false) {
                    isCurrentlyHovering = false;
                    setIsHovering(false);
                }
            }
        };

        window.addEventListener('mousemove', updateMousePosition, { passive: true });
        window.addEventListener('mouseover', handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Hide native cursor globally */}
            <style dangerouslySetInnerHTML={{ __html: `* { cursor: none !important; }` }} />

            {/* Outer Circle (Trails) */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[10000] will-change-transform"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    borderColor: isHovering ? 'rgba(29, 205, 159, 1)' : 'rgba(156, 163, 175, 0.6)',
                    backgroundColor: isHovering ? 'rgba(29, 205, 159, 0.1)' : 'transparent',
                }}
                transition={{ duration: 0.15 }}
            />

            {/* Inner Dot (Instant) */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10001] will-change-transform"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    backgroundColor: isHovering ? '#1DCD9F' : '#ffffff',
                    scale: isHovering ? 0 : 1,
                }}
                transition={{ duration: 0.15 }}
            />
        </>
    );
};

export default CustomCursor;
