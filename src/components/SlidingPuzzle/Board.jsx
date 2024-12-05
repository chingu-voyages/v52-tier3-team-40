import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "./constants";
import { shuffle, swap, isSolved, canSwap } from "./helpers";

const Board = ({ isStarted }) => {
  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);

  // Shuffle tiles when the game starts
  useEffect(() => {
    if (!isStarted) {
      setTiles(shuffle([...Array(TILE_COUNT).keys()]));
    }
  }, [isStarted]);

  const handleTileClick = (index) => {
    if (canSwap(index, tiles.indexOf(tiles.length - 1))) {
      setTiles(swap(tiles, index, tiles.indexOf(tiles.length - 1)));
    }
  };

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
    </div>
  );
};

export default Board;
