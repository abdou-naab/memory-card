import logo from "../assets/logo.png";
import "../styles/Game.css";
export default function GamePage() {
  return (
    <>
      <div className="game-page">
        <header>
          <div className="score">
            <span>
              <span id="curr-score"></span> : النتيجة
            </span>
            <span>
              <span id="best-score"></span> : أفضل نتيجة
            </span>
          </div>
          <img src={logo} alt="remember the heros" />
        </header>
        <main></main>
      </div>
    </>
  );
}