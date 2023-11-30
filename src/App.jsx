import "./App.css";
import bgVideo from "./assets/bg.mp4";
import Footer from "./components/Footer";
import Start from "./components/Start";
function App() {
  return (
    <>
      <Start></Start>
      <Footer />
      <video id="bg-video" src={bgVideo} autoPlay loop muted></video>
    </>
  );
}

export default App;
