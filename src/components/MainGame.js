import { useState, useEffect } from "react";
import EnemyBoard from "./AttackableBoard";
import Gameboard from "./Gameboard";
import { getSmartPos } from "../logic/playerAi";
import BoardHitsMisses from "./BoardHitsMisses";
import RenderShips from "./RenderShips";
import StyledBoardContainer from "../styled-components/styled-gameboards-container";

function MainGame({ useBoardPlayer, useBoardNpc, onGameOver }) {
  const [playerBoard, setPlayerBoard] = useBoardPlayer;
  const [npcBoard, setNpcBoard] = useBoardNpc;
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    if (npcBoard.isEveryShipSunk()) {
      onGameOver("Player");
    } else if (playerBoard.isEveryShipSunk()) {
      onGameOver("NPC");
    }
  }, [playerBoard, npcBoard, onGameOver]);

  // Turno
  const npcTurn = () => {
    setPlayerBoard((prev) => prev.receiveHit(getSmartPos(prev)));
  };

  // Aumenta en 1 el contador
  const incrementTurn = () => {
    npcTurn();
    setTurn((prev) => prev + 1);
  };

  // Muestra el daño del barco impactado
  const getSunkCount = (gameBoard) =>
    gameBoard.ships.reduce(
      (acc, ship) => (ship.isSunk() ? acc - 1 : acc),
      gameBoard.ships.length
    );

  return (
    <div>
      <div>Turn: {turn}</div>
      <div className="boardgame">
        <StyledBoardContainer>
          <div>
            <h2>Enemy Fleet</h2>
            <EnemyBoard
              gameboard={npcBoard}
              setGameboard={setNpcBoard}
              onAttack={incrementTurn}
            />
            <p>Remaining enemy ships: {getSunkCount(npcBoard)}</p>
          </div>
          <div>
            <h2>Your Fleet</h2>
            <Gameboard gameboard={playerBoard}>
              <BoardHitsMisses
                hits={playerBoard.hits}
                misses={playerBoard.misses}
              />
              <RenderShips ships={playerBoard.ships} />
            </Gameboard>
            <p>Your remaining ships: {getSunkCount(playerBoard)}</p>
          </div>
        </StyledBoardContainer>
      </div>
    </div>
  );
}

export default MainGame;
