import React from "react";
import { getMatrixPosition, getVisualPosition } from "./helpers";

const Tile =  ({ tile, index, tileSize, handleClick }) => {
  const { row, col } = getMatrixPosition(index, 4);
  const { x, y } = getVisualPosition(row, col, tileSize);

  const style = {
    width: `${tileSize}px`,
    height: `${tileSize}px`,
    transform: `translate(${x}px, ${y}px)`,
    opacity: tile === 15 ? 0 : 1,
  };

  return (
    <li 
      className="flex items-center justify-center bg-blue-800 text-white rounded-md shadow-md cursor-pointer text-lg"
      style={style}
      onClick={() => handleClick(index)}
    >
      {tile + 1}
    </li>
  );
};

export default Tile;
