import React, { useState } from "react";
import gameboard from "./logic/gameboard";
import MainGame from "./components/MainGame";
import * as ai from "./logic/playerAi";
import GameSetup from "./components/GameSetup";
import Instructions from "./components/Instructions";
import GameOver from "./components/GameOver";

const GAME_MODES = {
  rules: "rules",
  setup: "setup",
  main: "main",
  gameOver: "game over",
};

const App = () => {
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

  const selectRenderMode = (mode) => {
    switch (mode) {
      case GAME_MODES.rules:
        return (
          <Instructions
            onContinue={() => setGameScene({ mode: GAME_MODES.setup })}
          />
        );
      case GAME_MODES.main:
        return (
          <MainGame
            useBoardPlayer={useBoardPlayer}
            useBoardNpc={useBoardNpc}
            onGameOver={onGameOver}
          />
        );
      case GAME_MODES.setup:
        return (
          <GameSetup
            useBoard={useBoardPlayer}
            onAllShipsPlaced={() => setGameScene({ mode: GAME_MODES.main })}
          />
        );
      case GAME_MODES.gameOver:
        return (
          <GameOver winner={gameScene.winner} initializeGame={initializeGame} />
        );
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
};

export default App;
