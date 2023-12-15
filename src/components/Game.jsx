import Card from "./Card";
import { getNRandomElement, getHerosIds } from "../helpers";
import {
  setClickedValue,
  resetClickedValue,
  getChooosedHerosList,
  getHerosFromIds,
} from "../helpers";
import clickAudio from "../assets/sword-click.mp3";
import cardFlipAudio from "../assets/cardFlipAudio.mp3";
import endAudio from "../assets/endAudio.wav";
import heros from "../heros";
import EndMsg from "./EndMsg";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "../styles/Game.css";

export default function GamePage({
  level,
  score,
  setScore,
  setGameStarted,
  gameStarted,
  setGPKey,
  useClickAudio,
}) {
  const playFlipAudio = useClickAudio(cardFlipAudio);
  const playSwordClickAudio = useClickAudio(clickAudio);
  const playEndAudio = useClickAudio(endAudio);
  const startHeros = getNRandomElement(heros, level.show);
  const [clickPermission, setClickPermission] = useState(true);
  const [clickedCardsIds, setClickedCardsIds] = useState([]);
  const [viewedCardsIds, setViewedCardsIds] = useState(
    new Set(getHerosIds(startHeros))
  );

  const cards = Array.from({ length: level.show }, (_, i) => i);
  const [cardsAreFlipped, setCardsAreFlipped] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [choosedHeros, setChoosedHeros] = useState(startHeros);
  const [endGame, setEndGame] = useState({
    value: false,
    result: "",
    hero: {},
  });

  useEffect(() => {
    if (!gameStarted) {
      setClickedCardsIds([]);
      let newStartHeros = getNRandomElement(heros, level.show);
      setViewedCardsIds(new Set(getHerosIds(newStartHeros)));
      setCardsAreFlipped(false);
      setChoosedHeros(newStartHeros);
      setEndGame({
        value: false,
        result: "",
        hero: {},
      });
    }
  }, [gameStarted]);
  useEffect(() => {
    if (choosedHeros != startHeros) {
      let newViewedCardsIds = new Set(viewedCardsIds);
      choosedHeros.forEach((hero) => newViewedCardsIds.add(hero.id));
      setViewedCardsIds(newViewedCardsIds);
    }
  }, [choosedHeros]);

  useEffect(() => {
    if (clickedCardsIds.length) {
      playFlipAudio();
      document.querySelectorAll(".card-container").forEach((card) => {
        card.querySelector(".card-content").style.transform = "rotateY(180deg)";
      });

      setTimeout(() => {
        setCardsAreFlipped(false);
        setClickPermission(true);
      }, 4000);
      setTimeout(() => {
        setScore(() => {
          const newCurrent = score.current + 1;
          const newBest = newCurrent > score.best ? newCurrent : score.best;
          return { current: newCurrent, best: newBest };
        });
        playFlipAudio();
        setCardsAreFlipped(true);
        document.querySelectorAll(".card-container").forEach((card) => {
          card.querySelector(".card-content").style.transform = "rotateY(0deg)";
        });
      }, 2000);
    }
  }, [clickedCardsIds]);

  useEffect(() => {
    if (cardsAreFlipped) {
      const nextRoundHeros = getChooosedHerosList(
        level.show,
        clickedCardsIds,
        viewedCardsIds
      );
      setChoosedHeros(nextRoundHeros);
    }
  }, [cardsAreFlipped]);

  function handleCardClicked(cardRef) {
    if (!clickPermission) return;
    setClickPermission(false);
    if (!clickedCardsIds.includes(cardRef.current.dataset.id)) {
      setClickedCardsIds([...clickedCardsIds, cardRef.current.dataset.id]);
      setClickedValue(cardRef.current.dataset.id, true);
      if (level.total == score.current + 1) {
        setEndGame({
          value: true,
          result: "win",
          hero: getHerosFromIds([cardRef.current.dataset.id])[0],
        });
        playEndAudio();
        setScore({ best: score.current + 1, current: 0 });
        resetClickedValue();
      }
    } else {
      setEndGame({
        value: true,
        result: "loose",
        hero: getHerosFromIds([cardRef.current.dataset.id])[0],
      });
      playEndAudio();
      setScore({ ...score, current: 0 });
      resetClickedValue();
    }
  }
  function handleLogoClick() {
    playSwordClickAudio();
    setScore({ ...score, current: 0 });
    resetClickedValue();
    setGameStarted(false);
    setGPKey(Math.random().toString(36).substring(2));
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
          <img onClick={handleLogoClick} src={logo} alt="remember the heros" />
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
          <div className="score-to-win">
            {" "}
            {score.current} / {level.total}{" "}
          </div>
          {endGame.value && (
            <EndMsg
              hero={endGame.hero}
              result={endGame.result}
              setGameStarted={setGameStarted}
              setGPKey={setGPKey}
            />
          )}
        </main>
      </div>
    </>
  );
}
