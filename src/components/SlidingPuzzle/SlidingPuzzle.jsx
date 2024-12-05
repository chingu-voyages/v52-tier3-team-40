import React, { useState } from "react";
import Board from "./Board";

const SlidingPuzzle = () => {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold">Sliding Puzzle</h2>
      <Board isStarted={isStarted} />
      <div className="space-x-4">
        {!isStarted ? (
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={() => setIsStarted(true)}
          >
            Start Game
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => setIsStarted(false)}
          >
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
};

export default SlidingPuzzle;
