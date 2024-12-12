import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE, SMALL_BOARD_SIZE } from "./constants";
import { canSwap, shuffle, swap, isSolved } from "./helpers";

// For responsive design
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};


const Board = ({ imgUrl }) => {
  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
  const [isStarted, setIsStarted] = useState(false);
  const [numOfMoves, setNumOfMoves] = useState(0)

  const isMobile = useIsMobile()

  const shuffleTiles = () => {
    const shuffleTiles = shuffle(tiles)
    setTiles(shuffleTiles);
  }

  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
      setTiles(swappedTiles);
      setNumOfMoves((numOfMoves)=> numOfMoves + 1)
    }
  }

  const handleTileClick = (index) => {
    if (isStarted) {
      swapTiles(index);
    }
  }

  const handleShuffleClick = () => {{
    shuffleTiles();
  }}

  const handleStartClick = () => {
    shuffleTiles();
    setIsStarted(true);
  }

  const boardSize = isMobile ? SMALL_BOARD_SIZE : BOARD_SIZE

  const hasWon = isSolved(tiles);
  const pieceSize = boardSize / GRID_SIZE;

  return (
    <div>
      <ul 
        className="grid gap-1 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: `${boardSize}px`,
          height: `${boardSize}px`,
        }}
      >
        {tiles.map((tile, index) => (
          <Tile
            key={tile}
            index={index}
            tile={tile}
            pieceSize={pieceSize}
            imgUrl={imgUrl}
            gridSize={GRID_SIZE}
            boardSize={boardSize}
            handleClick={handleTileClick}
          />
        ))}
      </ul>
      {hasWon && isStarted && <p className="mt-4 text-teal-400 font-bold text-2xl">Congrats! Puzzle Solved 🎉 You used {numOfMoves} Moves</p>}
      <div className="flex flex-col gap-3 justify-center">
        {!isStarted ? (
          <button
            className="border-slate-600 border-2 px-5 py-2 mt-12 w-max self-center hover:border-teal-400"
            onClick={() => handleStartClick()}
          >
            Start Game
          </button>
        ) : (
          <>
          <p className="mt-6">{numOfMoves} Moves Taken</p>
          <button
            className="border-slate-600 border-2 px-5 py-2 w-max self-center hover:border-teal-400"
            onClick={() => {
              handleShuffleClick()
              setNumOfMoves(0)
            }}
          >
            Restart Game
          </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Board;
