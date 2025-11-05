import { useEffect, useState } from "react";
import "./GalleryCanvas.css";

export default function GalleryCanvas({ images, startingPositions }) {
  const [placedPieces, setPlacedPieces] = useState([]);
  const [index, setIndex] = useState(0);
  const [readyToAdd, setReadyToAdd] = useState(true); // cooldown control

  useEffect(() => {
    async function setupMic() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function checkVolume() {
          analyser.getByteFrequencyData(dataArray);
          const volume = dataArray.reduce((a, b) => a + b) / dataArray.length;

          if (volume > 40 && readyToAdd && index < images.length) {
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
  }, []); // ✅ only run once

  function addNextImage() {
    const { x, y } = startingPositions[index];

    setPlacedPieces(prev => [
      ...prev,
      { id: index, src: images[index], x, y }
    ]);

    setIndex(prev => prev + 1);

    // 🕒 1s cooldown
    setReadyToAdd(false);
    setTimeout(() => setReadyToAdd(true), 1000);
  }

  function resetCanvas() {
    setPlacedPieces([]);
    setIndex(0);
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
