export default function Log({turns, players}) {

    return <ol id="log">
        {turns.map(turn => <li key={`${turn.square.row}${turn.square.col}`}>
            {players[turn.player]} selected at row {turn.square.row + 1}, column {turn.square.col + 1}
            </li>
        )}
    </ol>
}