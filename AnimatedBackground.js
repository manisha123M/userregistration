import React, { useEffect, useRef } from 'react';

function AnimatedBackground() {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      let circles = [];
      const numCircles = 50;
      const colors = [
        'rgba(61, 127, 202, 0.41)',
        'rgba(194, 75, 228, 0.41)',
        'rgba(87, 74, 205, 0.41)',
      ];
  
      function createCircle(x, y, radius, color) {
        return {
          x,
          y,
          radius,
          color,
          opacity: 0,
          fadeSpeed: 0.05,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
        };
      }
  
      function initCircles() {
        circles = [];
        for (let i = 0; i < numCircles; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const radius = Math.random() * 60 + 20;
          const color = colors[i % colors.length];
          circles.push(createCircle(x, y, radius, color));
        }
      }
  
      function drawCircles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles.forEach((circle) => {
          if (circle.opacity < 1) {
            circle.opacity += circle.fadeSpeed;
          }
          ctx.beginPath();
          ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
          ctx.fillStyle = circle.color.replace(/, \d\.\d+\)$/, `, ${circle.opacity})`);
          ctx.fill();
          ctx.closePath();
        });
      }
  
      function updateCircles() {
        circles.forEach((circle) => {
          circle.x += circle.vx;
          circle.y += circle.vy;
  
          if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
            circle.vx *= -1;
          }
          if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
            circle.vy *= -1;
          }
        });
      }
  
      function animate() {
        drawCircles();
        updateCircles();
        requestAnimationFrame(animate);
      }
  
      initCircles();
      animate();
  
      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initCircles();
      });
  
      let mouseX = 0;
      let mouseY = 0;
  
      window.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
      });
  
      function handleInteraction() {
        circles.forEach((circle) => {
          const dx = mouseX - circle.x;
          const dy = mouseY - circle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          if (distance < 100) {
            const force = (100 - distance) / 5;
            circle.x -= (dx / distance) * force;
            circle.y -= (dy / distance) * force;
          }
        });
      }
  
      const intervalId = setInterval(handleInteraction, 20);
  
      return () => {
        clearInterval(intervalId);
        window.removeEventListener('resize', () => {});
      };
    }, []);
  
    return (
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    );
  }
  
  export default AnimatedBackground;
  