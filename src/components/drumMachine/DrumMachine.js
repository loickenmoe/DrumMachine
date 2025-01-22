import React, { useState, useEffect } from "react";
import "../../styles/drumMachine.css";
import { FaFreeCodeCamp } from "react-icons/fa";

const drumPads = [
  {
    key: "Q",
    id: "Heater-1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    key: "W",
    id: "Heater-2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    key: "E",
    id: "Heater-3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    key: "A",
    id: "Heater-4",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    key: "S",
    id: "Clap",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    key: "D",
    id: "Open-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    key: "Z",
    id: "Kick-n-Hat",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    key: "X",
    id: "Kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    key: "C",
    id: "Closed-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const bankOne = [
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
];

const bankTwo = [
  "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
];

function DrumMachine() {
  const [display, setDisplay] = useState("");
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(0.16);
  const [currentBank, setCurrentBank] = useState(bankOne);

  const handleKeyPress = (event) => {
    const drumPad = drumPads.find((pad) => pad.key === event.key.toUpperCase());
    if (drumPad) {
      playSound(drumPad.key, drumPad.src);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const playSound = (id, src) => {
    if (power) {
      const audio = document.getElementById(id);
      audio.play();
      setDisplay(id);
    }
  };

  const handleVolumeChange = (event) => {
    const volume = event.target.value;
    setVolume(volume);
    setDisplay(`Volume: ${Math.round(volume * 100)}%`);
  };

  useEffect(() => {
    const audioElements = document.getElementsByClassName("clip");
    Array.from(audioElements).forEach((audio) => {
      audio.volume = volume;
    });
  }, [volume]);

  const toggleBank = () => {
    if (power) {
      const newBank = currentBank === bankOne ? bankTwo : bankOne;
      setCurrentBank(newBank);
      setDisplay(newBank === bankOne ? "Heater Kit" : "Smooth Piano Kit");
    }
  };

  return (
    <div className="container">
      <div className="drum-machine-container" id="drum-machine">
        <div className="logo">
          {" "}
          FCC <FaFreeCodeCamp />{" "}
        </div>
        <div className="box">
          <div className="drum-pads">
            {drumPads.map((pad, index) => (
              <div
                key={pad.key}
                className="drum-pad"
                id={pad.id}
                onClick={() => {
                  playSound(pad.key, currentBank[index]);
                  setDisplay(pad.id);
                }}
              >
                {pad.key}
                <audio
                  className="clip"
                  id={pad.key}
                  src={currentBank[index]}
                  volume={volume}
                ></audio>
              </div>
            ))}
          </div>

          <div className="drum-control">
            <div className="power">
              <p>POWER</p>
              <button
                onClick={() => {
                  setPower(!power);
                  if (power) {
                    setDisplay("");
                  }
                }}
              >
                {power ? "ON" : "OFF"}
              </button>
            </div>
            <div id="display">{power ? display || "Drum Machine" : ""}</div>
            <div>
              <input
                type="range"
                name="volume"
                id="volume"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
            <div className="bank">
              <p style={{ margin: "0" }}>Bank</p>
              <button onClick={toggleBank} style={{ padding: "5px" }}>
                {currentBank === bankOne ? "Smooth Piano Kit" : "Heater Kit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrumMachine;
