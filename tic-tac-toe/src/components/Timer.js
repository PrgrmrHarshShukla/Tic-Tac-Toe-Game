export default function Timer({ setWaitTime, setShowBoard }) {
    return (
        <div className="timer-container">
            <h1
                className="timer-header"
            >
                Set Thinking Time for Agent (in milliseconds)
            </h1>

            <input type="number" id="time" name="time" />


            <button
                className="start-game"
                onClick={() => {
                    if(document.getElementById("time").value === ""){
                        alert("Please enter a time");
                        return;
                    }
                    setWaitTime(document.getElementById("time").value);
                    setShowBoard(true);
                }}
            >
                Start Game
            </button>


        </div>
    );
}