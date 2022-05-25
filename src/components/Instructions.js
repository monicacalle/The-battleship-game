export default function Instructions({ onContinue }) {
  return (
    <div>
      <h2 className="title2 mb-2">How to play?</h2>
      <p className="text">
        Battleship is a strategy type guessing game for two players.{" "}
      </p>
      <p className="text">
        It is played on ruled grids on which each player's
        fleet of warships are marked. The locations of the fleets are concealed
        from the other player.
      </p>

      <button onClick={onContinue} className="btn btn-dark mt-5 mb-5 ps-3 pe-3">
        press to play
      </button>
    </div>
  );
}
