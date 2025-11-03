import { useState } from 'react';
import GalleryCanvas from './Components/GalleryCanvas/GalleryCanvas';
import ImagePalette from './Components/ImagePalette/ImagePalette';

function App() {
  const [placedPieces, setPlacedPieces] = useState([]);

  const availablePieces = [
    { id: 1, src: "./images/album_pieces/speakin_my_piece/Pieces__Blackbox_FarRight.png" },
    { id: 2, src: "./images/album_pieces/speakin_my_piece/Pieces__Blackbox_FarRight2.png" },
    { id: 3, src: "./images/album_pieces/speakin_my_piece/Pieces__MiddlePhotoBox.png" },
    { id: 4, src: "./images/album_pieces/speakin_my_piece/Pieces__Blackbox_FarRight3.png" },
    { id: 5, src: "./images/album_pieces/speakin_my_piece/Pieces__Blackbox_FarRight4.png" },
    { id: 6, src: "./images/album_pieces/speakin_my_piece/Pieces__Blackbox_FarRight5.png" },
    { id: 7, src: "./images/album_pieces/speakin_my_piece/Pieces__Blackbox_FarRight6.png" },
  ];

  function handleAdd(piece) {
    setPlacedPieces([...placedPieces, piece]);
  }

  return (
    <div className="layout">
      <GalleryCanvas placedPieces={placedPieces} />
      <ImagePalette pieces={availablePieces} onAdd={handleAdd} />
    </div>
  );
}

export default App;