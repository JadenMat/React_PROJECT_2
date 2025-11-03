export default function ImagePalette({ pieces, onAdd }) {
    return (
      <div className="palette">
        {pieces.map(piece => (
          <img
            key={piece.id}
            src={piece.src}
            className="thumb"
            onClick={() => onAdd(piece)}
          />
        ))}
      </div>
    );
  }
  