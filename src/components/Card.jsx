import { useState, useEffect, useRef } from "react";
import "../styles/Card.css";
// import { setClickedValue, resetClickedValue } from "../helpers";

export default function Card({ hero, onclick }) {
  const [tiltStyle, setTiltStyle] = useState({ transform: "", background: "" });
  const cardRef = useRef(null);

  function handleCardClicked() {
    onclick(cardRef);
  }

  const tiltToMouse = (e) => {
    const bounds = cardRef.current.getBoundingClientRect();
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
                        ${Math.log(distance) * 3.9}deg
                )
                `,
      background: `
                radial-gradient(
                    circle at
                    ${center.x * 2 + bounds.width / 2}px
                    ${center.y * 2 + bounds.height / 2}px,
                    #ffffff4c,
                    #0000000f
                )
                `,
    });
  };

  useEffect(() => {
    const card = cardRef.current;
    const cardGlow = cardRef.current.querySelector(".card-glow ");
    cardRef.current.style.transitionDuration = "";
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
  const [bgPos, setBgPos] = useState("");
  useEffect(() => {
    setBgPos(
      `${Math.floor(Math.random() * 80)}% ${Math.floor(Math.random() * 80)}%`
    );
  }, []);

  return (
    <>
      <div
        data-id={hero.id}
        data-name={hero.name}
        className="card-container"
        ref={cardRef}
        style={{ transform: tiltStyle.transform }}
        onClick={handleCardClicked}
      >
        <div className="card-content">
          <div style={{ backgroundPosition: bgPos }} className="front">
            <img className="bg" src={hero.img} alt={hero.name} />

            <span>{hero.name}</span>
          </div>
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
