
export default function GameOver({winner, restart}) {
  return (
    <div id="game-over">
        <h2>GameOver</h2>
        {winner && <p>{winner} won!</p>}
        {!winner && <p>It&apos;s a draw!</p>}
        <p>
            <button onClick={restart}>Rematch!</button>
        </p>
    </div>
  )
}
