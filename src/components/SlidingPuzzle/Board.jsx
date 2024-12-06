import React, { useState } from "react";
import Tile from "./Tile";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "./constants";
import { canSwap, shuffle, swap, isSolved } from "./helpers";

const Board = ({ imgUrl }) => {
  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
  const [isStarted, setIsStarted] = useState(false);

  const shuffleTiles = () => {
    const shuffleTiles = shuffle(tiles)
    setTiles(shuffleTiles);
  }

  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
      setTiles(swappedTiles);
    }
  }

  const handleTileClick = (index) => {
    swapTiles(index);
  }

  const handleShuffleClick = () => {{
    shuffleTiles();
  }}

  const handleStartClick = () => {
    shuffleTiles();
    setIsStarted(true);
  }

  const hasWon = isSolved(tiles);
  const pieceSize = BOARD_SIZE / GRID_SIZE;

  return (
    <div>
      <ul 
        className="grid gap-1 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: `${BOARD_SIZE}px`,
          height: `${BOARD_SIZE}px`,
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
            boardSize={BOARD_SIZE}
            handleClick={handleTileClick}
          />
        ))}
      </ul>
      {hasWon && isStarted && <p className="mt-4 text-teal-400 font-bold text-2xl">Congrats! Puzzle Solved 🎉</p>}
      <div className="flex justify-center mt-10">
        {!isStarted ? (
          <button
            className="border-slate-600 border-2 px-5 py-2 w-max self-center hover:border-teal-400"
            onClick={() => handleStartClick()}
          >
            Start Game
          </button>
        ) : (
          <button
            className="border-slate-600 border-2 px-5 py-2 w-max self-center hover:border-teal-400"
            onClick={() => handleShuffleClick()}
          >
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
};

export default Board;
