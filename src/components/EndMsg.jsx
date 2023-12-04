import "../styles/EndMsg.css";
export default function EndMsg({ hero }) {
  return (
    <>
      <div className="end-message">
        <span className="game-result">You Losed</span>
        <div className="description">
          <div dir="rtl">
            <p className="name">{hero.name}</p>
            <span>{hero.description}</span>
          </div>
        </div>
        <button className="restart">إلعب مرة أخرى</button>
      </div>
    </>
  );
}
