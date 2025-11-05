import { useEffect, useState, useRef } from "react";
import "./GalleryCanvas.css";

export default function GalleryCanvas({ images, startingPositions }) {
  const [placedPieces, setPlacedPieces] = useState([]);
  const [index, setIndex] = useState(0);
  const [readyToAdd, setReadyToAdd] = useState(true);

  // ✅ These refs allow audio loop to read real-time values
  const indexRef = useRef(index);
  const readyRef = useRef(readyToAdd);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    readyRef.current = readyToAdd;
  }, [readyToAdd]);

  // 🎤 Microphone setup runs once
  useEffect(() => {
    async function setupMic() {
      console.log("🎤 Requesting microphone...");

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        if (audioContext.state === "suspended") await audioContext.resume();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function checkVolume() {
          analyser.getByteFrequencyData(dataArray);
          const volume = dataArray.reduce((a, b) => a + b) / dataArray.length;

          // ✅ Now reads the *current* index & ready state
          if (volume > 40 && readyRef.current && indexRef.current < images.length) {
            addNextImage();
          }

          requestAnimationFrame(checkVolume);
        }

        checkVolume();
      } catch (err) {
        console.error("Mic access denied", err);
      }
    }

    setupMic();
  }, []); // ✅ Only run on mount!

  function addNextImage() {
    const nextIndex = indexRef.current;
    const { x, y } = startingPositions[nextIndex];

    setPlacedPieces(prev => [
      ...prev,
      { id: nextIndex, src: images[nextIndex], x, y }
    ]);

    setIndex(prev => prev + 1);

    // 🕒 1 second cooldown
    setReadyToAdd(false);
    setTimeout(() => setReadyToAdd(true), 250);
  }

  function resetCanvas() {
    setPlacedPieces([]);
    setIndex(0);
    setReadyToAdd(true);
  }

  return (
    <div className="canvas-wrapper">
      <div className="canvas">
        {placedPieces.map(piece => (
          <img
            key={piece.id}
            src={piece.src}
            className="piece"
            style={{ left: piece.x, top: piece.y }}
          />
        ))}
      </div>

      <button onClick={resetCanvas} className="reset-button">
        Reset
      </button>
    </div>
  );
}