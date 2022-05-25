import React, { useState } from "react";
import gameboard from "./logic/gameboard";
import MainGame from "./components/MainGame";
import * as ai from "./logic/playerAi";
import GameSetup from "./components/GameSetup";
import Instructions from "./components/Instructions";


const GAME_MODES = {
  rules: "rules",
  setup: "setup",
  main: "main",
  gameOver: "game over",
};

function App() {
  // Muestra las tablas del jugador  y la IA
  const useBoardPlayer = useState(() => gameboard(10));

  const useBoardNpc = useState(() =>
    gameboard(10).addShips(ai.getShips(gameboard(10)))
  );

  const [gameScene, setGameScene] = useState({ mode: GAME_MODES.rules });

  // Inicia el juego
  const initializeGame = () => {
    const [, setPlayerBoard] = useBoardPlayer;
    const [, setNpcBoard] = useBoardNpc;

    setPlayerBoard(gameboard(10));
    setNpcBoard(gameboard(10).addShips(ai.getShips(gameboard(10))));
    setGameScene({ mode: GAME_MODES.setup });
  };

  const onGameOver = (winner) => {
    setGameScene({ mode: GAME_MODES.gameOver, winner });
  };

  // Muestra las instruciones
  const renderInstructions = () => (
    <Instructions onContinue={() => setGameScene({ mode: GAME_MODES.setup })} />
  );

  //
  const renderSetup = () => (
    <GameSetup
      useBoard={useBoardPlayer}
      onAllShipsPlaced={() => setGameScene({ mode: GAME_MODES.main })}
    />
  );

  const renderMainGame = () => (
    <MainGame
      useBoardPlayer={useBoardPlayer}
      useBoardNpc={useBoardNpc}
      onGameOver={onGameOver}
    />
  );

  // Muestra quien gana o pierda
  const renderGameOver = () => (
    <>
      {gameScene.winner === "Player" ? (
        <h2>
          congratulations! <br /> You won!
        </h2>
      ) : (
        <h2>
          Bad luck my friend! <br /> You lost!
        </h2>
      )}
      <button className="btn btn-dark mt-4" onClick={() => initializeGame()}>
        try again?
      </button>
    </>
  );

  const selectRenderMode = (mode) => {
    switch (mode) {
      case GAME_MODES.rules:
        return renderInstructions();
      case GAME_MODES.main:
        return renderMainGame();
      case GAME_MODES.setup:
        return renderSetup();
      case GAME_MODES.gameOver:
        return renderGameOver();
      default:
        throw new Error(`Unhandled game mode: ${mode}!`);
    }
  };

  return (
    <div className="text-center justify-content-center">
      <div className="title">
        <h1 className="title1">BATTLESHIP GAME</h1>
      </div>
      {selectRenderMode(gameScene.mode)}
    
    </div>
  );
}

export default App;
