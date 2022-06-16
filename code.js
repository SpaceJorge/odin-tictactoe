/*
General Idea:
-Define an Array as the Game Board
Choose:
    -Let each player assign it's own simbol
    -Assign a player X and the other O
-Define a PlayerFactory with appropiate functions
    -Define 2 players.
-Define a Turn System/Game Flow
-Define a Point System
-Define a Function for Rendering the Board to the HTML
-Define an interface that allows players to click the GRID and place their simbol
while not allowing placing where its already been done
*/

const board = ((player,boardIndex) => {
    const visibleBoard = [];
    const playedBoard = [];
    const gameWinCount = [];
    let boardActive = false;
    let whosTurn = "X";
    let againstIA = "local";
    for (let i = 0; i<9 ;i++){
        visibleBoard.push = "Touch Me";
        playedBoard.push = false;
    }

    const startGame = ()=>{
        whosTurn = "X";
        for (let i = 0; i<9 ;i++){
            visibleBoard[i] = "Touch Me";
            playedBoard[i] = false;
        }
        if (boardActive == false){
            addVisualBoard();
            boardActive = true;
        }
        
    };


    function addVisualBoard(){
        
        
        const mainContainer = document.getElementById("main");
        const gameContainer = document.createElement("div");
        gameContainer.classList.add('gameContainer');
        mainContainer.appendChild(gameContainer);

        const title = document.createElement("h1");
        title.textContent = "Tic-Tac-Toe Couch Battle Royale";
        title.classList.add("title");
        gameContainer.appendChild(title);

        const game = document.createElement("div");
        game.classList.add("game");
        game.setAttribute("id", "gameContainer");
        gameContainer.appendChild(game);

            const turnX = document.createElement("div");
            turnX.classList.add("turn");
            turnX.classList.add("mine");
            game.appendChild(turnX);

                const pX = document.createElement("p");
                pX.textContent = "X";
                turnX.appendChild(pX);

                const nameX = document.createElement("input");
                nameX.placeholder = "George";
                nameX.id = "nameX";
                nameX.name = "nameX";
                nameX.type="text";
                nameX.style.borderColor = "#f95353";
                turnX.appendChild(nameX);

            const board = document.createElement("div");
            board.classList.add("board");
            game.appendChild(board);

                for (let i = 0; i<9 ;i++){
                    const spot = document.createElement("div");
                    spot.classList.add("spot");
                    spot.dataset.array = i;
                    spot.style.fontSize = "4rem";
                    spot.style.color = "white";
                    spot.style.fontWeight = "bold";
                    //board button functionality
                    spot.addEventListener("mouseover",()=>{
                        if (playedBoard[spot.dataset.array] == false){
                            spot.textContent = whosTurn;
                            spot.style.backgroundColor = "mediumslateblue";
                        }
                    });
                    spot.addEventListener("mouseout",()=>{
                        if (playedBoard[spot.dataset.array] == false){
                            spot.textContent = "";
                            spot.style.backgroundColor = "aquamarine";
                        }
                    });
                    spot.addEventListener("click", ()=>{
                        if (playedBoard[spot.dataset.array] == false){
                            playedBoard[spot.dataset.array] = true;
                            visibleBoard[spot.dataset.array] = whosTurn;
                            let end = checkWinner();
                            if (whosTurn == "X"){
                                spot.textContent = "X";
                                spot.style.backgroundColor = "red";
                                whosTurn = "O";
                                
                            }else{
                                spot.textContent = "O";
                                spot.style.backgroundColor = "blue";
                                whosTurn = "X";
                            }
                            if (end != true) {
                                turnX.classList.toggle("mine");
                                turnO.classList.toggle("mine");

                                //IA Mode Extention
                                
                                if (againstIA == "random"){
                                    
                                    end = moveRandomAI();
                                    
                                    if (end != true) {
                                        turnX.classList.toggle("mine");
                                        turnO.classList.toggle("mine");
                                    }

                                }else if (againstIA == "unbeatable"){
                                    //unbeatable code
                                    end = moveUnbeatableAI();
                                    
                                    if (end != true) {
                                        turnX.classList.toggle("mine");
                                        turnO.classList.toggle("mine");
                                    }
                                }
                                
                            }
                            
                        }
                    });


                    board.appendChild(spot);
                }

            const turnO = document.createElement("div");
            turnO.classList.add("turn");
            game.appendChild(turnO);

                const pO = document.createElement("p");
                pO.textContent = "O";
                turnO.appendChild(pO);

                const nameO = document.createElement("input");
                nameO.placeholder = "Shorsh";
                nameO.id = "nameO";
                nameO.name = "nameO";
                nameO.type="text";
                nameO.style.borderColor = "#5c5cff";
                turnO.appendChild(nameO);

        const state = document.createElement("h3");
        state.textContent = "Click on the board to play";
        state.classList.add("state");
        state.setAttribute("id","state");
        gameContainer.appendChild(state);

        const restart = document.createElement("button");
        restart.textContent = "Restart Battle";
        restart.classList.add("restart");
        restart.addEventListener("click", ()=>{
            cleanBoard();
            startGame();
        });
        gameContainer.appendChild(restart);

        const modeContainer = document.createElement("div");
        modeContainer.classList.add("modeContainer");
        gameContainer.appendChild(modeContainer);

            const modeLocal = document.createElement("button");
            modeLocal.textContent = "Local Mode";
            modeLocal.classList.add("mode");
            modeLocal.classList.add("local");
            modeLocal.disabled = true;
            modeLocal.addEventListener("click", ()=>{
                againstIA = "local";
                
                cleanBoard();
                startGame();
                

                modeLocal.disabled = true;
                modeRandom.disabled = false;
                modeUnbeatable.disabled = false;
            });
            modeContainer.appendChild(modeLocal);    

            const modeRandom = document.createElement("button");
            modeRandom.textContent = "Easy AI Mode";
            modeRandom.classList.add("mode");
            modeRandom.classList.add("easy");
            modeRandom.disabled = false;
            modeRandom.addEventListener("click", ()=>{
                againstIA = "random";
                
                cleanBoard();
                startGame();
                
                modeLocal.disabled = false;
                modeRandom.disabled = true;
                modeUnbeatable.disabled = false;
            });
            modeContainer.appendChild(modeRandom);
        
            const modeUnbeatable = document.createElement("button");
            modeUnbeatable.textContent = "Unbeatable AI Mode";
            modeUnbeatable.classList.add("mode");
            modeUnbeatable.classList.add("unbeatable");
            modeUnbeatable.disabled = false;
            modeUnbeatable.addEventListener("click", ()=>{
                againstIA = "unbeatable";
                
                cleanBoard();
                startGame();
                
                modeLocal.disabled = false;
                modeRandom.disabled = false;
                modeUnbeatable.disabled = true;
            });
            modeContainer.appendChild(modeUnbeatable);

    };
    function moveRandomAI(){
        whosTurn = "O";
        let selectedPlay = 0;
        do {
            selectedPlay = Math.floor((Math.random())*9);
            
        } while (visibleBoard[selectedPlay] != "Touch Me");
        playedBoard[selectedPlay] = true;
        visibleBoard[selectedPlay] = whosTurn;
        end = checkWinner();
        const boardSpots = [...document.getElementsByClassName("spot")];
        boardSpots[selectedPlay].textContent = "O";
        boardSpots[selectedPlay].style.backgroundColor = "blue";
        whosTurn = "X";
        return end;
    }
    
    function moveUnbeatableAI(){
        whosTurn = "O";
        let selectedPlay = 0;
        do {
            selectedPlay = Math.floor((Math.random())*9);
            
        } while (visibleBoard[selectedPlay] != "Touch Me");
        playedBoard[selectedPlay] = true;
        visibleBoard[selectedPlay] = whosTurn;
        end = checkWinner();
        const boardSpots = [...document.getElementsByClassName("spot")];
        boardSpots[selectedPlay].textContent = "O";
        boardSpots[selectedPlay].style.backgroundColor = "blue";
        whosTurn = "X";
        return end;
    }

    function cleanBoard(){
        const spotList = [...document.getElementsByClassName("spot")];
        spotList.forEach((spot)=>{
            spot.textContent = "";
            spot.style.backgroundColor = "aquamarine";
        });
        const state = document.getElementById("state");
        state.textContent = "Click on the board to play";
        state.style.backgroundColor = "rgb(0 20 255 / 0%)";
        const turns = [...document.getElementsByClassName("turn")];
        if (turns[0].classList != "turn mine"){
            turns[0].classList.toggle("mine");
            turns[1].classList.toggle("mine");
        }

    };
    function endGameState(winner){
        const names = [...document.getElementsByTagName("input")];
        let nameX = "";
        let nameO = "";
        if (names[0].getAttribute("placeholder") && names[0].value == ""){
            nameX="The X Fighter";
        }else{
            nameX = names[0].value;
        }
        if (names[1].getAttribute("placeholder") && names[1].value == ""){
            if (againstIA == "random") {
                nameO="The Easy AI";
            }else if(againstIA == "unbeatable"){
                nameO="The Unbeatable AI! Don't be sad, as it was foretold in it's name.";
            }else{
                nameO="The O Fighter";
            }
        }else{
            nameO = names[1].value;
        }
        const congratulations = document.getElementById("state");
        if (winner != "None"){
            
            if (whosTurn == "X"){
                congratulations.style.backgroundColor = "#ff000052";
                congratulations.textContent = `The winner is ${nameX}`;
            }else{
                congratulations.style.backgroundColor = "#0014ff52";
                congratulations.textContent = `The winner is ${nameO}`;
            }
            gameWinCount.push = whosTurn;
        }else{
            congratulations.textContent = `The true winner today is friendship, cos you tied, try harder!`;
            gameWinCount.push = "None";
        }
        const spotList = [...document.getElementsByClassName("spot")];
        for (let j = 0; j<9; j++){
            if (playedBoard[j] == false){
                spotList[j].style.backgroundColor = "grey";
                spotList[j].textContent = "-";
                playedBoard[j] = true;
            }
        }
    }
    function checkWinner(){
        let endGameFlag = true;
        const congratulations = document.getElementById("state");
        
        for (let j = 0; j<9;j++){
            if (visibleBoard[j] != "Touch Me"){

                if ((visibleBoard[j] == visibleBoard [j+1]) && (visibleBoard[j+1] == visibleBoard[j+2])){
                    if ((j == 0)||(j == 3)||(j==6)){ // Horizontals
                        /*
                        congratulations.textContent = `The winner is ${whosTurn}`;
                        
                        if (whosTurn == "X"){
                            congratulations.style.color = "red";

                        }else{
                            congratulations.style.color = "blue";
                        }*/
                        endGameState(whosTurn);
                        return true;
                    }
                }
                if ((visibleBoard[j] == visibleBoard [j+4]) && (visibleBoard[j+4] == visibleBoard[j+8])){
                    if (j == 0){ // left-top to right-bottom
                        
                        /*congratulations.textContent = (`The winner is ${whosTurn}`);*/
                        endGameState(whosTurn);
                        return true;
                    }
                }
                if ((visibleBoard[j] == visibleBoard [j+3]) && (visibleBoard[j+3] == visibleBoard[j+6])){
                    if ((j == 0)||(j == 1) || (j==2)){ // Verticals
                        
                        /*congratulations.textContent = (`The winner is ${whosTurn}`);*/
                        endGameState(whosTurn);
                        return true;
                    }
                }
                if ((visibleBoard[j] == visibleBoard [j+2]) && (visibleBoard[j+2] == visibleBoard[j+4])){
                    if (j == 2){ // right-top to left-bottom
                        
                        /*congratulations.textContent = (`The winner is ${whosTurn}`);*/
                        endGameState(whosTurn);
                        return true;
                    }
                }
            }
            
            if (playedBoard[j] == false){
                endGameFlag = false;
            }
        }

        if (endGameFlag == true){
            
            /*state.textContent = `The winner is friendship, cos you tied, try harder!`;*/
            endGameState("None");
            return true;
        }
    
        
    }

    return{
        visibleBoard,
        startGame
    }
})();

const playerFactory = (name,symbol) =>{
    /*const setSymbol = (name) => {
        
    }*/
    return{
        name,
        symbol,

    }
};

/*const playerOne = playerFactory(name, "X");*/

board.startGame();

