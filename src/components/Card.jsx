import { useState, useEffect } from "react";
import "../styles/Card.css";

export default function Card() {
  const [tiltStyle, setTiltStyle] = useState({ transform: "", background: "" });
  const tiltToMouse = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const center = {
      x: mouseX - bounds.x - bounds.width / 2,
      y: mouseY - bounds.y - bounds.height / 2,
    };
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);
    setTiltStyle({
      transform: `
                rotate3d(
                    ${center.y / 100},
                        ${-center.x / 100},
                        0,
                        ${Math.log(distance) * 2.6}deg
                )
                `,
      background: `
                radial-gradient(
                    circle at
                    ${center.x * 2 + bounds.width / 2}px
                    ${center.y * 2 + bounds.height / 2}px,
                    #ffffff55,
                    #0000000f
                )
                `,
    });
  };
  useEffect(() => {
    const card = document.querySelector(".card-container");
    const cardGlow = document.querySelector(".card-container .card-glow ");

    const handleMouseEnter = () => {
      card.addEventListener("mousemove", (e) => {
        tiltToMouse(e);
      });
    };
    const handleTiltMouseLeave = () => {
      card.removeEventListener("mousemove", tiltToMouse);
      setTiltStyle({ ...tiltStyle, transform: "" });
    };
    const handleGlowMouseLeave = () => {
      card.removeEventListener("mousemove", tiltToMouse);
      setTiltStyle({ ...tiltStyle, background: "" });
    };
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleTiltMouseLeave);
    cardGlow.addEventListener("mouseleave", handleGlowMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleTiltMouseLeave);
      cardGlow.removeEventListener("mouseleave", handleGlowMouseLeave);
    };
  }, []);
  return (
    <>
      <div className="card-container">
        <div
          className="card-content"
          style={{ transitionDuration: "0.2s", transform: tiltStyle.transform }}
        >
          <div className="front">this is in front</div>
          <div className="back">this is in back</div>
          <div
            style={{ background: tiltStyle.background }}
            className="card-glow"
          />
        </div>
      </div>
    </>
  );
}
