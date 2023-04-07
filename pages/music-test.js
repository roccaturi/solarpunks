import { useEffect, useState } from "react";
import * as Tone from "tone";
import { BsPauseFill, BsPlayFill, BsArrowRepeat } from "react-icons/bs";

const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
const durations = ["4n", "8n", "2n"];

function getRandomNote() {
  const noteIndex = Math.floor(Math.random() * notes.length);
  const durationIndex = Math.floor(Math.random() * durations.length);
  const note = notes[noteIndex];
  const duration = durations[durationIndex];
  return { note, duration };
}

function generateMelody() {
  const melody = [];
  for (let i = 0; i < 16; i++) {
    const { note, duration } = getRandomNote();
    melody.push({ note, duration });
  }
  return melody;
}

const MusicTest = () => {
  const [playing, setPlaying] = useState(false);
  const [melody, setMelody] = useState(generateMelody());

  useEffect(() => {
    Tone.Master.volume.value = 0.5;
    const synth = new Tone.Synth().toDestination();
    const sequence = new Tone.Sequence(
      (time, { note, duration }) => {
        synth.triggerAttackRelease(note, duration, time);
      },
      melody,
      "4n"
    );
    if (playing) {
      Tone.start();
      Tone.Transport.start();
      sequence.start(0);
      Tone.Transport.stop("+4n");
    }
    return () => {
      sequence.stop(0);
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, [playing, melody]);

  const handlePlayPause = () => {
    if (!playing) {
      Tone.start();
    }
    if (playing) {
      Tone.Transport.pause();
    } else {
      Tone.Transport.start();
    }
    setPlaying(!playing);
  };

  const handleRestart = () => {
    Tone.Transport.stop();
    setMelody(generateMelody());
    Tone.Transport.start();
  };

  return (
    <div>
      <h1>Music Test</h1>
      <div className="controls">
        <button onClick={handlePlayPause}>
          {playing ? <BsPauseFill /> : <BsPlayFill />}
        </button>
        <button onClick={handleRestart}>
          <BsArrowRepeat />
        </button>
      </div>
    </div>
  );
};

export default MusicTest;
