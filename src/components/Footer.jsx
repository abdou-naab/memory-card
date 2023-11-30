import Icon from "@mdi/react";
import { useState, useEffect } from "react";
import {
  mdiHelp,
  mdiMusic,
  mdiMusicOff,
  mdiVolumeHigh,
  mdiVolumeMute,
} from "@mdi/js";
import "../styles/Footer.css";

function handleClick(state, setState, help) {
  setState(!state);
  if (help && help == "help") {
    //
  }
}
export default function Footer() {
  const [volume, setVolume] = useState(() => {
    let hmc_volume = localStorage.getItem("hmc_volume");
    if (hmc_volume) return JSON.parse(hmc_volume);
    return true;
  });
  const [anasheed, setAnasheed] = useState(() => {
    let hmc_anasheed = localStorage.getItem("hmc_anasheed");
    if (hmc_anasheed) return JSON.parse(hmc_anasheed);
    return true;
  });
  useEffect(() => {
    localStorage.setItem("hmc_volume", JSON.stringify(volume));
  }, [volume]);
  useEffect(() => {
    localStorage.setItem("hmc_anasheed", JSON.stringify(anasheed));
  }, [anasheed]);

  const [help, setHelp] = useState(false);
  return (
    <>
      <footer>
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
        <button onClick={() => handleClick(help, setHelp, "help")}>
          <Icon path={mdiHelp} size={0.9} title="help" />
        </button>
      </footer>
    </>
  );
}
