import Icon from "@mdi/react";
import { useState, useEffect } from "react";
import {
  mdiHelp,
  mdiMusic,
  mdiMusicOff,
  mdiVolumeHigh,
  mdiVolumeMute,
  mdiWindowClose,
} from "@mdi/js";
import "../styles/Footer.css";
import clickAudio from "../assets/sword-click.mp3";

export default function Footer({
  loaded,
  useClickAudio,
  volume,
  anasheed,
  setVolume,
  setAnasheed,
}) {
  // sounds
  const playSound = useClickAudio(clickAudio);
  function handleClick(state, setState) {
    setState(!state);
    playSound();
  }

  useEffect(() => {
    localStorage.setItem("hmc_volume", JSON.stringify(volume));
  }, [volume]);

  const [help, setHelp] = useState(false);
  useEffect(() => {
    if (help) document.getElementById("info-popup").classList.add("active");
    else document.getElementById("info-popup").classList.remove("active");
  }, [help]);
  return (
    <>
      <footer className={loaded ? "loaded" : ""}>
        <div className="sounds">
          <button onClick={() => handleClick(volume, setVolume)}>
            {volume ? (
              <Icon path={mdiVolumeHigh} size={0.9} title="volume on" />
            ) : (
              <Icon path={mdiVolumeMute} size={0.9} title="volume muted" />
            )}
          </button>
          <button onClick={() => handleClick(anasheed, setAnasheed)}>
            {anasheed ? (
              <Icon path={mdiMusic} size={0.9} title="music on" />
            ) : (
              <Icon path={mdiMusicOff} size={0.9} title="music off" />
            )}
          </button>
        </div>
        <button onClick={() => handleClick(help, setHelp)}>
          {!help ? (
            <Icon path={mdiHelp} size={0.9} title="open help" />
          ) : (
            <Icon path={mdiWindowClose} size={0.9} title="close help" />
          )}
        </button>
      </footer>
    </>
  );
}
