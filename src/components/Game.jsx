/* eslint-disable no-unused-vars */
import Card from "./Card";
import { getNewHero, getHerosIds } from "../helpers";
// import EndMsg from "./EndMsg";
import heros from "../heros";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import "../styles/Game.css";

export default function GamePage({ level }) {
  // eslint-disable-next-line no-unused-vars
  const [score, setScore] = useState(() => {
    let scoreObj = { current: 0, best: 0 };
    let score = localStorage.getItem("score");
    if (score) {
      score = JSON.parse(score);
      scoreObj.current = score.current;
      scoreObj.best = score.best;
    }

    return scoreObj;
  });
  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(score));
  }, [score]);

  // show, total
  // eslint-disable-next-line no-unused-vars
  const [choosedHeros, setChoosedHeros] = useState(() => {
    let array = [];
    for (let i = 0; i < level.show; i++) {
      array.push(getNewHero(getHerosIds(array)));
    }
    return array;
  });

  const [clickedCardsIds, setClickedCardsIds] = useState([]);
  const [viewedCardsIds, setViewedCardsIds] = useState([]);
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
            {choosedHeros.map((hero) => (
              <Card
                key={hero.id}
                hero={hero}
                clickedCardsIds={clickedCardsIds}
                setClickedCardsIds={setClickedCardsIds}
                setChoosedHeros={setChoosedHeros}
              />
            ))}
          </div>
          {/* <EndMsg hero={heros[0]} /> */}
        </main>
      </div>
    </>
  );
}
