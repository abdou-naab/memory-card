import "../styles/EndMsg.css";
export default function EndMsg({ hero, result, setGameStarted, setGPKey }) {
  function handleOnClick() {
    setGameStarted(false);
    setGPKey(Math.random().toString(36).substring(2));
  }
  return (
    <>
      <div className="end-message-bg">
        <div className={`end-message ${result == "win" ? "win" : "lose"}`}>
          <span className="game-result">
            {result == "win" ? "لقد فزت" : "لقد خسرت"}
          </span>
          <div className="description">
            <div dir="rtl">
              <p className="name">{hero.name}</p>
              <span>{hero.description}</span>
            </div>
          </div>
          <button onClick={handleOnClick} className="restart">
            إلعب مرة أخرى
          </button>
        </div>
      </div>
    </>
  );
}
