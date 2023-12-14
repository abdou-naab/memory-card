import logo from "../assets/logo.png";
import "../styles/Start.css";
import heros from "../heros";
import clickAudio from "../assets/sword-click.mp3";
export default function StartPage({
  loaded,
  setGameStarted,
  setLevel,
  useClickAudio,
}) {
  const playSound = useClickAudio(clickAudio);
  return (
    <>
      <div className={`start-page ${loaded ? "loaded" : ""}`}>
        <img id="logo" src={logo} alt="remember the heros" />
        <h1>لعبة الذاكرة</h1>
        <div className="difficulties">
          <button
            onClick={() => {
              setGameStarted(true);
              setLevel({ show: 7, total: heros.length });
              playSound();
            }}
          >
            صعب
          </button>
          <button
            onClick={() => {
              setGameStarted(true);
              setLevel({ show: 5, total: 11 });
              playSound();
            }}
          >
            عادي
          </button>
          <button
            onClick={() => {
              setGameStarted(true);
              setLevel({ show: 3, total: 7 });
              playSound();
            }}
          >
            سهل
          </button>
        </div>
      </div>
    </>
  );
}
