import logo from "../assets/logo.png";
import "../styles/Start.css";

export default function StartPage({ loaded, setGameStarted, setLevel }) {
  return (
    <>
      <div className={`start-page ${loaded ? "loaded" : ""}`}>
        <img id="logo" src={logo} alt="remember the heros" />
        <h1>لعبة الذاكرة</h1>
        <div className="difficulties">
          <button
            onClick={() => {
              setGameStarted(true);
              setLevel({ show: 7, total: 18 });
            }}
          >
            صعب
          </button>
          <button
            onClick={() => {
              setGameStarted(true);
              setLevel({ show: 5, total: 10 });
            }}
          >
            عادي
          </button>
          <button
            onClick={() => {
              setGameStarted(true);
              setLevel({ show: 3, total: 6 });
            }}
          >
            سهل
          </button>
        </div>
      </div>
    </>
  );
}
