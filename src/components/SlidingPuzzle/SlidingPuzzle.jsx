import React, { useState } from "react";
import Board from "./Board";

const SlidingPuzzle = () => {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold">Sliding Puzzle</h2>
      <Board />
    </div>
  );
};

export default SlidingPuzzle;

