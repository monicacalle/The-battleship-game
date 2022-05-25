import { useState } from "react";
import ship from "../logic/ship";
import Gameboard from "./Gameboard";
import RenderShips from "./RenderShips";
import RenderShipPreview from "./RenderShipPreview";
import vec2, { direction } from "../vec2";

export default function GameSetup({ useBoard, onAllShipsPlaced }) {
  const shipLengths = [5, 4, 3, 3, 2];
  const [shipIndex, setShipIndex] = useState(0);
  const [currentShip, setCurrentShip] = useState(
    ship(shipLengths[shipIndex], vec2(-10, -10), direction.right)
  );

  const [board, setBoard] = useBoard;

  const setShipPos = (_ship, pos) => ship(_ship.length, pos, _ship.rotation);

  const incrementShipRotation = (_ship, incrementQuantity = 1) =>
    ship(
      _ship.length,
      _ship.origin,
      direction.increment(_ship.rotation, incrementQuantity)
    );

  const isValidPos = (_ship) => useBoard[0].isValidShip(_ship);

  const setCurrentShipPos = (pos) => {
    setCurrentShip((prevShip) => setShipPos(prevShip, pos));
  };

  const placeShip = (pos) => {
    const mostCurrentShip = setShipPos(currentShip, pos);

    if (!isValidPos(mostCurrentShip)) {
      console.log("Oops! Can't place ship there!");
      return;
    }

    setBoard((prevBoard) => prevBoard.addShip(mostCurrentShip));

    if (shipIndex < shipLengths.length - 1) {
      setCurrentShip(
        ship(shipLengths[shipIndex + 1], pos, mostCurrentShip.rotation)
      );
      setShipIndex((prevIndex) => prevIndex + 1);
    } else {
      onAllShipsPlaced();
    }
  };

  return (
    <div>
      <h2>place your ships!</h2>
      <div
        className="board"
        onWheel={(e) =>
          e.deltaY > 0
            ? setCurrentShip((prevShip) => incrementShipRotation(prevShip))
            : setCurrentShip((prevShip) => incrementShipRotation(prevShip, 3))
        }
      >
        <Gameboard
          gameboard={board}
          onCellMouseEnter={setCurrentShipPos}
          onCellClick={placeShip}
        >
          <RenderShipPreview
            ship={currentShip}
            isValidPos={isValidPos(currentShip)}
          />
          <RenderShips ships={board.ships} />
        </Gameboard>
      </div>
      <p>Spin your ships by pressing the button</p>
      <button
        className="btn btn-dark"
        onClick={() =>
          setCurrentShip((prevShip) => incrementShipRotation(prevShip))
        }
      >
        Spin
      </button>
    </div>
  );
}
