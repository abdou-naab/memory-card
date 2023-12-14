import "./App.css";
import bgVideo from "./assets/bg.mp4";
import Footer from "./components/Footer";
import StartPage from "./components/Start";
import GamePage from "./components/Game.jsx";
import { useEffect, useState } from "react";

import lamyya from "./assets/lamyya_A01.mp3";
import takeOurBlood from "./assets/takeOurBlood.mp3";
import betterLife from "./assets/betterLife.mp3";
import amjaduna from "./assets/amjaduna.mp3";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [score, setScore] = useState({ current: 0, best: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [GPKey, setGPKey] = useState(Math.random().toString(36).substring(2));

  const [volume, setVolume] = useState(() => {
    let hmc_volume = localStorage.getItem("hmc_volume");
    if (hmc_volume) return JSON.parse(hmc_volume);
    return true;
  });
  const [anasheed, setAnasheed] = useState(false);

  const audioList = [lamyya, takeOurBlood, betterLife, amjaduna];
  const [currentNasheed, setCurrentNasheed] = useState(null);
  const selectRandomAudio = () => {
    const randomIndex = Math.floor(Math.random() * audioList.length);
    setCurrentNasheed(audioList[randomIndex]);
  };
  useEffect(() => {
    selectRandomAudio();
  }, []);

  useEffect(() => {
    const audio = document.querySelector("audio#nasheed");
    if (anasheed) {
      audio.setAttribute("src", currentNasheed);
      audio.play();
      audio.volume = 0.9;
      audio.addEventListener("ended", selectRandomAudio);
      return () => {
        selectRandomAudio();
        audio.removeAttribute("src");
        audio.removeEventListener("ended", selectRandomAudio);
      };
    } else {
      audio.pause();
      audio.removeAttribute("src");
    }
  }, [anasheed, currentNasheed]);

  useEffect(() => {
    let loadedTimeOut = setTimeout(() => setLoaded(true), 1300);
    return () => clearTimeout(loadedTimeOut);
  }, []);

  const useClickAudio = (url) => {
    const toggle = () => {
      if (!volume) return;
      const audio = new Audio(url);
      audio.play();
      audio.addEventListener("ended", () => {
        audio.src = "";
      });
    };

    return toggle;
  };

  const [level, setLevel] = useState({});
  return (
    <>
      {!gameStarted ? (
        <StartPage
          loaded={loaded}
          setGameStarted={setGameStarted}
          setLevel={setLevel}
          useClickAudio={useClickAudio}
        />
      ) : (
        <GamePage
          key={GPKey}
          level={level}
          score={score}
          setScore={setScore}
          setGameStarted={setGameStarted}
          gameStarted={gameStarted}
          setGPKey={setGPKey}
          useClickAudio={useClickAudio}
        />
      )}
      <div id="info-popup">
        <p>لا تنقر على نفس البطاقة مرتين!</p>
        <p>سوف تحصل على وصف للبطل الأخير الذي قمت بالنقر عليه</p>
        <p>انقر على شعار اللعبة للعودة</p>
      </div>
      <Footer
        loaded={loaded}
        useClickAudio={useClickAudio}
        volume={volume}
        anasheed={anasheed}
        setVolume={setVolume}
        setAnasheed={setAnasheed}
      />
      <video
        id="bg-video"
        src={bgVideo}
        autoPlay
        loop={!gameStarted}
        muted
      ></video>
      <audio id="nasheed" autoPlay></audio>
    </>
  );
}

export default App;
