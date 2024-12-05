import React, { useState } from "react";
import Board from "./Board";

const SlidingPuzzle = () => {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-bold">Sliding Puzzle</h2>
      <hr className="border-b-teal-400 border-b-2 border-t-0 w-32 mx-auto my-4"></hr>
      <Board />
    </div>
  );
};

export default SlidingPuzzle;

