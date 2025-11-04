import { useState } from 'react';
import './App.css';
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
    { id: 8, src: "./images/album_pieces/speakin_my_piece/Pieces__Speakin-Text.png" },
    { id: 9, src: "./images/album_pieces/speakin_my_piece/Pieces__My_Piece-Text.png" },
    { id: 10, src: "./images/album_pieces/speakin_my_piece/Pieces__Horace_Parlan_Quintet-Text.png" },
    { id: 11, src: "./images/album_pieces/speakin_my_piece/Pieces_-14.png" },
    { id: 12, src: "./images/album_pieces/speakin_my_piece/Pieces__BlueNoteLogo.png" },
  ];

  function handleAdd(piece) {
    setPlacedPieces([...placedPieces, piece]);
  }

  return (
    <div className="grid-container">
      <div className="header">
        <h1>Speakin' My Piece - Interactive Album Art</h1>
      </div>
      <div className="canvas">
        <GalleryCanvas placedPieces={placedPieces} />
        <ImagePalette pieces={availablePieces} onAdd={handleAdd} />
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;