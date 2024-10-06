import { useState } from "react"

export default function Player({initialName, symbol, isActive, onNameChange}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);


    function handleClick(){
        setIsEditing((editing) => !editing);
        if(isEditing){
            onNameChange(symbol, playerName);
        }
    }

    function handleChange(e){
        setPlayerName(e.target.value);
    }

    return(
        <li className={isActive? "active" : undefined}>
            <span className="player">
                {isEditing ? 
                    <input type="text" value={playerName} 
                    onChange={handleChange} required/>
                    : <span className="player-name">{playerName}</span>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick} > {isEditing ? "save" : "Edit"}</button>
        
      </li>
    )
}