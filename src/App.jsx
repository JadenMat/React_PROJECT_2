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
    { x: 230, y: 0, rotate: 0 }, // images[0] - First black box
    { x: 160, y: 70, rotate: -2 }, // images[1] - Second black box
    { x: 75, y: 20, rotate: 6 }, // images[2] - Middle photo box
    { x: 10, y: -80, rotate: 0 }, // images[3] - Third black box
    { x: -75, y: -10, rotate: 2 }, // images[4] - Fourth black box
    { x: -155, y: -30, rotate: -2 }, // images[5] - Fifth black box
    { x: -235, y: 30, rotate: -2 }, // images[6] - Sixth black box

    { x: 315, y: 350, rotate: 0 }, // images[7] - "Speakin" text
    { x: 255, y: 385, rotate: 0 }, // images[8] - "My Piece" text
    { x: 240, y: 420, rotate: 0 }, // images[9] - "Horace Parlan Quintet" text
    { x: 25, y: 285, rotate: 0 }, // images[10] - "-14" text
    { x: -100, y: -105, rotate: 0 } // images[11] - Blue Note logo
  ];

  return (
    <div className="grid-container">
      <div className="header">
        <h1>Test - Interactive Album Cover</h1>
      </div>
      <div className='canvas-container'>
        <GalleryCanvas images={images} startingPositions={startingPositions} />
        {/* <GalleryCanvas images={images} /> */}
      </div>
      <div className="footer">
        <p>Jaden Mathews - CT Lab Assignment #3 - 2025</p>
      </div>
    </div>
  );
}

export default App;
