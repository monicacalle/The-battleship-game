import React from "react";

export default function RenderShip({
  ship,
  customStyle = { background: "grey", border: "1px solid black" },
}) {
  const getGridPosition = () => {
    const xStart =
      ship.rotation.x >= 0
        ? ship.origin.x + 1
        : Math.max(1, ship.origin.x - ship.length + 2);

    const yStart =
      ship.rotation.y >= 0
        ? ship.origin.y + 1
        : Math.max(1, ship.origin.y - ship.length + 2);

    const getSpan = (rotation, origin) =>
      rotation === 0
        ? 1 // if 0, span 1
        : rotation > 0
        ? ship.length // else, if > 0, span = length
        : Math.min(origin + 1, ship.length); // BUT if < 0, min is origin

    const xSpan = getSpan(ship.rotation.x, ship.origin.x);
    const ySpan = getSpan(ship.rotation.y, ship.origin.y);

    return {
      gridColumn: `${xStart} / span ${xSpan}`,
      gridRow: `${yStart} / span ${ySpan}`,
    };
  };

  const sunkStyle = () => (ship.isSunk() ? { background: "red" } : {});

  return (
    <>
      <div
        style={{
          ...customStyle,
          ...sunkStyle(),
          ...getGridPosition(),
          pointerEvents: "none",
        }}
      ></div>
      <div
        style={{
          gridColumn: ship.origin.x + 1,
          gridRow: ship.origin.y + 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      ></div>
    </>
  );
}
