import { useState, useEffect, useRef } from "react";
import "../styles/Card.css";
import { isMobile } from "react-device-detect";
// import { setClickedValue, resetClickedValue } from "../helpers";

export default function Card({ hero, onclick }) {
  const [tiltStyle, setTiltStyle] = useState({ transform: "", background: "" });
  const cardRef = useRef(null);

  function handleCardClicked() {
    onclick(cardRef);
  }

  const tiltToMouse = (e) => {
    const bounds = cardRef.current.getBoundingClientRect();
    let mouseX, mouseY;
    if (isMobile) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
    } else {
      mouseX = e.clientX;
      mouseY = e.clientY;
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
                    #0000000c
                )
                `,
      });
    }
  };
  useEffect(() => {
    const card = cardRef.current;
    const cardGlow = cardRef.current.querySelector(".card-glow ");
    cardRef.current.style.transitionDuration = "";
    const handleMouseEnter = () => {
      if (!isMobile) card.addEventListener("mousemove", (e) => tiltToMouse(e));
      else card.addEventListener("touchmove", (e) => tiltToMouse(e));
    };
    const handleTiltMouseLeave = () => {
      if (!isMobile)
        card.removeEventListener("mousemove", (e) => tiltToMouse(e));
      else card.removeEventListener("touchmove", (e) => tiltToMouse(e));
      setTiltStyle({ ...tiltStyle, transform: "" });
    };
    const handleGlowMouseLeave = () => {
      if (!isMobile) card.removeEventListener("mousemove", tiltToMouse);
      else card.removeEventListener("touchmove", tiltToMouse);
      setTiltStyle({ ...tiltStyle, background: "" });
    };

    if (isMobile) {
      card.addEventListener("touchstart", handleMouseEnter);
      card.addEventListener("touchend", handleTiltMouseLeave);
      cardGlow.addEventListener("touchend", handleGlowMouseLeave);
    } else {
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleTiltMouseLeave);
      cardGlow.addEventListener("mouseleave", handleGlowMouseLeave);
    }

    return () => {
      if (isMobile) {
        card.removeEventListener("touchstart", handleMouseEnter);
        card.removeEventListener("touchend", handleTiltMouseLeave);
        cardGlow.removeEventListener("touchend", handleGlowMouseLeave);
      } else {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleTiltMouseLeave);
        cardGlow.removeEventListener("mouseleave", handleGlowMouseLeave);
      }
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
        onClick={(e) => handleCardClicked(e)}
      >
        <div className="card-content">
          <div style={{ backgroundPosition: bgPos }} className="front">
            <img className="bg" src={hero.img} alt={hero.name} />

            <span>{hero.name}</span>
          </div>
          <div className="back"></div>
          <div
            style={{ background: tiltStyle.background }}
            className="card-glow"
          />
        </div>
      </div>
    </>
  );
}
