export default function gameboardCaller(length) {
  return gameboard(length);
}

function gameboard(size, ships = [], misses = []) {
  // Tamaño baord...
  const isOutOfBounds = (pos) =>
    pos.x < 0 || pos.x > size - 1 || pos.y < 0 || pos.y > size - 1;

  const posContainsShip = (pos) =>
    ships.some((ship) => ship.getBoardSpaceCoords().some((v) => v.equals(pos)));

  // Falla Hit
  const isMissPos = (pos) => misses.some((miss) => miss.equals(pos));

  // Acierta Hit
  const isHitPos = (pos) =>
    ships.some((ship) => ship.hits.some((hitPos) => hitPos.equals(pos)));

  const getHits = () => ships.reduce((acc, ship) => [...acc, ...ship.hits], []);

  // Colocar Flota
  const isValidShip = (ship) =>
    ship
      .getBoardSpaceCoords()
      .every((pos) => !isOutOfBounds(pos) && !posContainsShip(pos));

  const isValidMovePos = (pos) => {
    return !isOutOfBounds(pos) && !isMissPos(pos) && !isHitPos(pos);
  };

  const addShip = (ship) => {
    if (!isValidShip(ship)) {
      throw new Error(
        `Tried to add ship at illegal board position ${ship
          .getBoardSpaceCoords()
          .map((coord) => `(${coord.x},${coord.y})`)}`
      );
    }

    return gameboard(size, [...ships, ship], misses);
  };

  const addShips = (newShips) => {
    return newShips.reduce(
      (newBoard, ship) => newBoard.addShip(ship),
      gameboard(size, ships, misses)
    );
  };

  const receiveHit = (hitPos) => {
    if (isOutOfBounds(hitPos)) {
      throw new Error(
        `Tried to receive hit at illegal position (${hitPos.x}, ${hitPos.y})`
      );
    }

    // Trata de encontrar la nave con el hit
    const hitShip = ships.find((ship) =>
      ship.getBoardSpaceCoords().some((position) => position.equals(hitPos))
    );

    if (hitShip) {
      const hitSegment = hitShip
        .getBoardSpaceCoords()
        .findIndex((pos) => pos.equals(hitPos));

      // Quitqa el hit de la nave  y la reemplaza por nueva nave
      const newShip = hitShip.hit(hitSegment);
      const newShips = ships.map((ship) => (ship === hitShip ? newShip : ship));

      return gameboard(size, newShips, misses);
    } else {
      const newMisses = [...misses, hitPos];
      return gameboard(size, ships, newMisses);
    }
  };

  const isEveryShipSunk = () => ships.every((ship) => ship.isSunk());

  return {
    size,
    ships,
    misses,
    get hits() {
      return getHits();
    },
    addShip,
    addShips,
    receiveHit,
    isEveryShipSunk,
    isValidShip,
    isValidMovePos,
  };
}
