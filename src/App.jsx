import './App.css';
import GalleryCanvas from './Components/GalleryCanvas/GalleryCanvas';

function App() {
  const images = [
    "./images/album_pieces/speakin_my_piece/Pieces__Blackbox_FarRight.png",
    "./images/album_pieces/speakin_my_piece/Pieces__Blackbox_FarRight2.png",
    "./images/album_pieces/speakin_my_piece/Pieces__MiddlePhotoBox.png",
    "./images/album_pieces/speakin_my_piece/Pieces__Blackbox_FarRight3.png",
    "./images/album_pieces/speakin_my_piece/Pieces__Blackbox_FarRight4.png",
    "./images/album_pieces/speakin_my_piece/Pieces__Blackbox_FarRight5.png",
    "./images/album_pieces/speakin_my_piece/Pieces__Blackbox_FarRight6.png",
    "./images/album_pieces/speakin_my_piece/Pieces__Speakin-Text.png",
    "./images/album_pieces/speakin_my_piece/Pieces__My_Piece-Text.png",
    "./images/album_pieces/speakin_my_piece/Pieces__Horace_Parlan_Quintet-Text.png",
    "./images/album_pieces/speakin_my_piece/Pieces_-14.png",
    "./images/album_pieces/speakin_my_piece/Pieces__BlueNoteLogo.png",
  ];

  const startingPositions = [
    { x: 60, y: 40 },
    { x: 200, y: 40 },
    { x: 40, y: 200 },
    { x: 200, y: 200 },
    { x: 100, y: 100 },
    { x: 260, y: 100 },
    { x: 100, y: 260 },
    { x: 260, y: 260 },
    { x: 120, y: 350 },
    { x: 300, y: 350 },
    { x: 180, y: 420 },
    { x: 250, y: 450 }
  ];

  return (
    <div className="grid-container">
      <div className="header">
        <h1>Speakin' My Piece - Interactive Album Cover</h1>
      </div>
      <div className='canvas'>
      </div>
      <div className="footer">
        <p>Jaden Mathews - CT Lab Assignment #3 - 2025</p>
      </div>
    </div>
  );
}

export default App;
