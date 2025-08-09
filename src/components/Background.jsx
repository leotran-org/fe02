import '../css/Background.css';
import React, { useEffect, useRef, useState } from 'react';

const Background = () => {
  const movingPoints = useRef([]);
  const velocities = useRef([]);

  useEffect(() => {
    const colors = ['red', 'orange', 'yellow', 'amber'];

    // Initialize points
    colors.forEach((color, i) => {
      const div = document.createElement('div');
      div.className = 'moving-point';
      div.style.background = `radial-gradient(circle, ${color}, transparent)`;
      div.style.left = `${Math.random() * window.innerWidth}px`;
      div.style.top = `${Math.random() * window.innerHeight}px`;

      document.body.appendChild(div);
      movingPoints.current.push(div);

      // Assign random direction/speed
      velocities.current.push({
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
      });
    });

    const animate = () => {
      movingPoints.current.forEach((point, i) => {
        const vel = velocities.current[i];
        const rect = point.getBoundingClientRect();

        let x = rect.left + vel.dx;
        let y = rect.top + vel.dy;

        if (x < 0 || x > window.innerWidth - 100) vel.dx *= -1;
        if (y < 0 || y > window.innerHeight - 100) vel.dy *= -1;

        point.style.left = `${rect.left + vel.dx}px`;
        point.style.top = `${rect.top + vel.dy}px`;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      movingPoints.current.forEach(p => document.body.removeChild(p));
    };
  }, []);

  // Center pulsing point
  const centerRef = useRef(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const position = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animateCenter = () => {
      position.current.x += (mouse.current.x - position.current.x) * 0.01;
      position.current.y += (mouse.current.y - position.current.y) * 0.01;

      if (centerRef.current) {
        centerRef.current.style.left = `${position.current.x}px`;
        centerRef.current.style.top = `${position.current.y}px`;
      }

      requestAnimationFrame(animateCenter);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animateCenter();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div className="color-point" ref={centerRef} />;
};

export default Background;

