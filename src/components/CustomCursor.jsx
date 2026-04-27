import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrameId;
    let currentX = position.x;
    let currentY = position.y;
    
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over something clickable
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('clickable')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    // Smooth trailing animation loop
    const render = () => {
      currentX += (position.x - currentX) * 0.15;
      currentY += (position.y - currentY) * 0.15;
      
      setTrailingPos({
        x: currentX,
        y: currentY,
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y]);

  return (
    <>
      <style>
        {`
          body, a, button, .clickable {
            cursor: none;
          }
          
          /* The main solid dot */
          .cursor-dot {
            position: fixed;
            top: 0; left: 0;
            width: 8px; height: 8px;
            background-color: var(--primary, #1a7a4a);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s, opacity 0.2s;
          }
          
          /* The trailing ring */
          .cursor-ring {
            position: fixed;
            top: 0; left: 0;
            width: 34px; height: 34px;
            border: 2px solid var(--primary, #1a7a4a);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s, background-color 0.2s, border-width 0.2s;
          }
          
          /* Hover State */
          .cursor-dot.hover {
            width: 0; height: 0; opacity: 0;
          }
          .cursor-ring.hover {
            width: 54px; height: 54px;
            background-color: rgba(26, 122, 74, 0.1);
            border-width: 1px;
            box-shadow: 0 0 15px rgba(26, 122, 74, 0.4);
          }
          
          /* Hide on touch devices */
          @media (hover: none) and (pointer: coarse) {
            .cursor-dot, .cursor-ring {
              display: none !important;
            }
            body, a, button, .clickable {
              cursor: auto !important;
            }
          }
        `}
      </style>
      
      <div 
        className={`cursor-dot ${isHovering ? 'hover' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`cursor-ring ${isHovering ? 'hover' : ''}`}
        style={{ left: `${trailingPos.x}px`, top: `${trailingPos.y}px` }}
      />
    </>
  );
};

export default CustomCursor;
