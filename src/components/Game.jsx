import Card from "./Card";
import { getNRandomElement, getHerosIds } from "../helpers";
import { setClickedValue, resetClickedValue } from "../helpers";

import heros from "../heros";
// import EndMsg from "./EndMsg";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "../styles/Game.css";

export default function GamePage({ level }) {
  const startHeros = getNRandomElement(heros, level.show);
  const [score, setScore] = useState({ current: 0, best: 0 });
  const [clickedCardsIds, setClickedCardsIds] = useState([]);
  const [viewedCardsIds, setViewedCardsIds] = useState(
    new Set(getHerosIds(startHeros))
  );
  const cards = Array.from({ length: level.show }, (_, i) => i);
  const [cardsAreFlipped, setCardsAreFlipped] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [choosedHeros, setChoosedHeros] = useState(startHeros);
  useEffect(() => {
    if (choosedHeros != startHeros) {
      console.log("%cInside choosedHeros useEffect", "color:green;");
      let newViewedCardsIds = new Set(viewedCardsIds);
      choosedHeros.forEach((hero) => newViewedCardsIds.add(hero.id));
      setViewedCardsIds(newViewedCardsIds);
    }
  }, [choosedHeros]);

  useEffect(() => {
    if (clickedCardsIds.length) {
      document.querySelectorAll(".card-container").forEach((card) => {
        card.querySelector(".card-content").style.transform = "rotateY(180deg)";
      });

      // let nextRoundHeros = getChooosedHerosList(
      //   level.show,
      //   clickedCardsIds,
      //   viewedCardsIds
      // );
      // console.log("nextRoundHeros", nextRoundHeros);
      setTimeout(() => {
        setCardsAreFlipped(false);
      }, 4000);
      setTimeout(() => {
        setScore(() => {
          const newCurrent = score.current + 1;
          const newBest = newCurrent > score.best ? newCurrent : score.best;
          return { current: newCurrent, best: newBest };
        });

        setCardsAreFlipped(true);
        document.querySelectorAll(".card-container").forEach((card) => {
          card.querySelector(".card-content").style.transform = "rotateY(0deg)";
        });
      }, 2000);
    }
  }, [clickedCardsIds]);
  useEffect(() => {
    if (cardsAreFlipped) {
      let threeHeros = [];
      let i = 0;
      for (let hero of heros) {
        if (!viewedCardsIds.has(hero.id) && i < 3) {
          threeHeros.push(hero);
          i++;
        }
      }
      setChoosedHeros(threeHeros);
    }
  }, [cardsAreFlipped]);
  function handleCardClicked(cardRef) {
    if (!clickedCardsIds.includes(cardRef.current.dataset.id)) {
      setClickedCardsIds([...clickedCardsIds, cardRef.current.dataset.id]);
      console.log(
        `${cardRef.current.dataset.name}; cardsClicked changed:`,
        clickedCardsIds
      );
      setClickedValue(cardRef.current.dataset.id, true);
    } else {
      resetClickedValue();
      console.log("we reset the heros");
    }
  }
  return (
    <>
      <div className="game-page">
        <header>
          <div className="score">
            <span>
              <span id="curr-score">{score.current}</span> : النتيجة
            </span>
            <span>
              <span id="best-score">{score.best}</span> : أفضل نتيجة
            </span>
          </div>
          <img src={logo} alt="remember the heros" />
        </header>
        <main>
          <div className="cards-container">
            {cards.map((i) => (
              <Card
                key={i}
                hero={choosedHeros[i]}
                onclick={(cardRef) => handleCardClicked(cardRef)}
              />
            ))}
          </div>
          {/* <EndMsg hero={heros[0]} /> */}
        </main>
      </div>
    </>
  );
}
