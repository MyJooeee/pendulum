import { useRef, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function Pendulum() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrameId;

    const length = 50;
    const gravity = 9.8;
    const mass = 1;
    let radian = Math.PI/2;
    let radianA = 0;
    let radianV = 0;
    let force;

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      force = mass * gravity * Math.sin(radian) * (-1); // -mg sin(angle)
      
      /* Calcul de l'accélération de l'angle
       en fonction de la force de rappel du
       pendule et de la longueur du fil */
      radianA = force / length;

      // Accélération de l'angle (variation de vitesse)
      radianV += radianA;
      // Vitesse de l'angle (variation de l'angle)
      radian += radianV;

      // Exemple de la résistance de l'air
      radian *= 0.98;

      const x = length * Math.sin(radian);
      const y = length * Math.cos(radian);

      draw(context, x, y);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const draw = (ctx, x, y) => {
    const originX = 150;
    const originY = 50;
    ctx.beginPath(); // Start a new path
    ctx.moveTo(originX, originY); // Move the pen to
    ctx.lineTo(originX + x, originY + y); // Draw a line to
    ctx.stroke(); // Render the path
    ctx.closePath();

  };

  return <canvas style={{ width: '700px',  height: '500px', border: '1px solid blue'}} ref={canvasRef} />;
}
