import { useRef, useEffect } from "react";
import { Container, Divider, Stack, Typography } from "@mui/material";
import backgroundImg from '../images/background.jpg';

// ----------------------------------------------------------------------

const Pendulum = () => {
  const appVersion = process.env.REACT_APP_VERSION;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId;

    const length = 200;
    const gravity = 9.8;
    const mass = 1;
    let radian = Math.PI / 2;
    let radianA = 0;
    let radianV = 0;
    let force;

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      force = mass * gravity * Math.sin(radian) * -1; // -mg sin(angle)

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
    const originX = 200;
    const originY = 50;
    const posX = originX + x;
    const posY = originY + y;
    ctx.beginPath(); // Start a new path
    ctx.moveTo(originX, originY); // Move the pen to
    ctx.lineTo(posX, posY); // Draw a line to
    ctx.stroke(); // Render the path
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(posX, posY, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke(); // Render the path
    ctx.closePath();
  };

  return (
    <Container maxWidth={false} disableGutters>
      <Stack
        sx={{ 
          alignItems: "center", 
          backgroundImage: `url(${backgroundImg})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '100%'
        }}
        divider={<Divider orientation="horizontal" flexItem />}
        >
        <Typography> Simple pendulum </Typography>
        <canvas ref={canvasRef} width={400} height={610} />
        <Typography variant='caption' sx={{ textAlign: 'center' }}>
          © 2024 Jonathan Dancette, all rights reserved. | v{appVersion}
        </Typography>
      </Stack>
    </Container>
  );
};

export default Pendulum;
