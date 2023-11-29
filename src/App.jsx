import "./App.css";
import bgVideo from "./assets/bg.mp4";
function App() {
  return (
    <>
      <video id="bg-video" src={bgVideo} autoPlay loop muted></video>
    </>
  );
}

export default App;
