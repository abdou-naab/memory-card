import logoGif from "../assets/logo.gif";
import "../styles/Start.css";
export default function Start() {
  return (
    <>
      <main className="start-page">
        <img id="logoGif" src={logoGif} alt="remember the heros" />
        <h1>لعبة الذاكرة</h1>
        <div className="difficulties">
          <button>سهل</button>
          <button>عادي</button>
          <button>صعب</button>
        </div>
      </main>
    </>
  );
}
