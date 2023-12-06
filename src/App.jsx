import "./App.css";
import bgVideo from "./assets/bg.mp4";
import Footer from "./components/Footer";
import StartPage from "./components/Start";
import GamePage from "./components/Game.jsx";
import { useEffect, useState } from "react";
function App() {
  const [loaded, setLoaded] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  useEffect(() => {
    window.addEventListener("load", () =>
      setTimeout(() => setLoaded(true), 1300)
    );
    return () =>
      window.removeEventListener("load", () =>
        setTimeout(() => setLoaded(true), 1300)
      );
  }, []);

  const [level, setLevel] = useState({});
  return (
    <>
      {!gameStarted ? (
        <StartPage
          loaded={loaded}
          setGameStarted={setGameStarted}
          setLevel={setLevel}
        />
      ) : (
        <GamePage level={level} setGameStarted={setGameStarted} />
      )}
      <Footer loaded={loaded} />
      <video id="bg-video" src={bgVideo} autoPlay loop={!loaded} muted></video>
    </>
  );
}

export default App;
