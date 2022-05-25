function ship(
  length,
  origin,
  rotation,
  localHits = Array(length).fill(false)
) {
  // Para atacar
  const getHits = () =>
    localHits.reduce(
      (acc, hit, i) => (hit ? [...acc, getBoardSpaceCoord(i)] : acc),
      []
    );

  const getBoardSpaceCoord = (segmentIndex) =>
    rotation.multiply(segmentIndex).add(origin);

  const getBoardSpaceCoords = () => {
    const boardSpaceCoords = [];
    for (let i = 0; i < length; i++) {
      boardSpaceCoords.push(getBoardSpaceCoord(i));
    }
    return boardSpaceCoords;
  };
    
  // Acierto
  const hit = (hitPos) => {
    if (hitPos > length - 1 || hitPos < 0) {
      throw new Error(`Tried to hit a ship at illegal position ${hitPos}`);
    }
    const newHits = [...localHits];
    newHits[hitPos] = true;
    return ship(length, origin, rotation, newHits);
  };

  // Hundido
  const isSunk = () => !localHits.includes(false);

  return {
    length,
    origin,
    rotation,
    get hits() {
      return getHits();
    },
    hit,
    isSunk,
    getBoardSpaceCoords,
  };
}

export default ship;
