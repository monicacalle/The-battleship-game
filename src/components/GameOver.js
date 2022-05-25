import React from "react";

const GameOver = ({ winner, initializeGame }) => {
  return (
    <>
      {winner === "Player" ? (
        <h2>
          congratulations! <br /> You won!
        </h2>
      ) : (
        <h2>
          Bad luck my friend! <br /> You lost!
        </h2>
      )}
      <button className="btn btn-dark mt-4" onClick={initializeGame}>
        try again?
      </button>
    </>
  );
};

export default GameOver;
