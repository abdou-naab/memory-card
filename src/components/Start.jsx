import logo from "../assets/logo.png";
import "../styles/Start.css";

function handleButtonClick(setGameStarted) {
  setGameStarted(true);
}
export default function StartPage({ loaded, setGameStarted }) {
  return (
    <>
      <div className={`start-page ${loaded ? "loaded" : ""}`}>
        <img id="logo" src={logo} alt="remember the heros" />
        <h1>لعبة الذاكرة</h1>
        <div className="difficulties">
          <button onClick={() => handleButtonClick(setGameStarted)}>صعب</button>
          <button onClick={() => handleButtonClick(setGameStarted)}>
            عادي
          </button>
          <button onClick={() => handleButtonClick(setGameStarted)}>سهل</button>
        </div>
      </div>
    </>
  );
}
