import { useEffect, useState, useRef } from "react";
import "./GalleryCanvas.css";

export default function GalleryCanvas({ images, startingPositions }) {
  const [placedPieces, setPlacedPieces] = useState([]);
  const [index, setIndex] = useState(0);
  const [readyToAdd, setReadyToAdd] = useState(true);

  // These refs let the audio loop access current state values
  const indexRef = useRef(index);
  const readyRef = useRef(readyToAdd);

  // Keep refs in sync with state
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    readyRef.current = readyToAdd;
  }, [readyToAdd]);

  // Setup microphone once on mount
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

          // Check if volume threshold met and ready to add
          if (volume > 70 && readyRef.current && indexRef.current < images.length) {
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
  }, []); // Empty array = run once on mount

  function addNextImage() {
    // IMMEDIATELY set to false to prevent rapid-fire calls
    setReadyToAdd(false);
    readyRef.current = false; // Update ref immediately too!
    
    const nextIndex = indexRef.current;
    
    // Safety check
    if (nextIndex >= images.length) {
      return;
    }
    
    const { x, y, rotate } = startingPositions[nextIndex];

    setPlacedPieces(prev => [
      ...prev,
      { id: nextIndex, src: images[nextIndex], x, y, rotate }
    ]);

    setIndex(prev => prev + 1);
  
    // Cooldown before allowing next piece
    setTimeout(() => {
      setReadyToAdd(true);
      readyRef.current = true; // Update ref when ready again
    }, 500);
  }

  function resetCanvas() {
    setPlacedPieces([]);
    setIndex(0);
    setReadyToAdd(true);
  }

  return (
    <>
      <div className="canvas">
        {placedPieces.map(piece => (
          <img
          key={piece.id}
          src={piece.src}
          className={`piece piece-${piece.id}`}
          style={{ 
            left: piece.x, 
            top: piece.y,
            '--rotation': `${piece.rotate}deg`  // CHANGED: from transform to CSS variable
          }}
          alt={`Album piece ${piece.id}`}
        />
        ))}
      </div>
  
      <button onClick={resetCanvas} className="reset-button">
        Reset Canvas
      </button>
    </>
  );
}