import React from "react";
import { getMatrixPosition, getVisualPosition } from "./helpers";
import { GRID_SIZE, BOARD_SIZE } from "./constants"

const Tile =  ({ tile, index, tileSize, handleClick }) => {
  const { row, col } = getMatrixPosition(index, 4);
  const { x, y } = getVisualPosition(row, col, tileSize);

  // const imgUrl = 'https://images.unsplash.com/photo-1515705576963-95cad62945b6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const imgUrl = "/src/assets/images/puzzle/square.jpg"

  const style = {
    width: `${tileSize}px`,
    height: `${tileSize}px`,
    transform: `translate(${x}px, ${y}px)`,
    opacity: tile === 15 ? 0 : 1,
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: `${BOARD_SIZE}px`,
    backgroundPosition: `${(100 / (GRID_SIZE - 1)) * (tile % GRID_SIZE)}% ${(100 / (GRID_SIZE - 1)) * (Math.floor(tile / GRID_SIZE))}%`,
  };

  return (
    <li 
      className="flex items-center justify-center text-white shadow-sm shadow-white cursor-pointer text-lg"
      style={style}
      onClick={() => handleClick(index)}
    >
      {tile + 1}
    </li>
  );
};

export default Tile;
