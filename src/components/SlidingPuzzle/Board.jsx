import React, { useState } from "react";
import Tile from "./Tile";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "./constants";
import { canSwap, shuffle, swap, isSolved } from "./helpers";

const Board = ({ }) => {
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
            handleClick={handleTileClick}
          />
        ))}
      </ul>
      {hasWon && isStarted && <p className="mt-4 text-green-600 font-semibold">Congrats! Puzzle Solved 🎉</p>}
      <div className="flex justify-center mt-10">
        {!isStarted ? (
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={() => handleStartClick()}
          >
            Start Game
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
