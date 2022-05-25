import StyledHit from "../styled-components/styled-hit";
import StyledMiss from "../styled-components/styled-miss";

export default function BoardHitsMisses({ hits, misses }) {
  // Muestra si acierta o falla el hit
  const getKey = (pos) => `(${pos.x}, ${pos.y})`;
  return (
    <>
      {hits.map((hit) => (
        <StyledHit pos={hit} key={getKey(hit)} />
      ))}
      {misses.map((miss) => (
        <StyledMiss pos={miss} key={getKey(miss)} />
      ))}
    </>
  );
}
