import React from "react";
import './GalleryCanvas.css';

export default function GalleryCanvas({ placedPieces }) {
  return (
    <div className="canvas">
      {placedPieces.map((piece, i) => (
        <img key={i} src={piece.src} className="piece" />
      ))}
    </div>
  );
}
