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
        title.textContent = "Tic-Tac-Toe Battle Royale";
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

        /*
        div.main
            div.gameContainer
                h1.title
                div.game
                    div.turnX X with red background
                        div
                    div.board
                        grid
                    div.turnO 0 X with blue background
                        div
                h3.gameState
                button.restart
                
                
        */
    };

    
    function cleanBoard(){
        const spotList = [...document.getElementsByClassName("spot")];
        spotList.forEach((spot)=>{
            spot.textContent = "";
            spot.style.backgroundColor = "aquamarine";
        });
        const state = document.getElementById("state");
        state.textContent = "Click on the board to play";
        state.style.color = "black";
        const turns = [...document.getElementsByClassName("turn")];
        if (turns[0].classList != "turn mine"){
            turns[0].classList.toggle("mine");
            turns[1].classList.toggle("mine");
        }

    };
    function endGameState(winner){
        const congratulations = document.getElementById("state");
        if (winner != "None"){
            congratulations.textContent = `The winner is ${whosTurn}`;
            if (whosTurn == "X"){
                congratulations.style.color = "red";
            }else{
                congratulations.style.color = "blue";
            }
            gameWinCount.push = whosTurn;
        }else{
            congratulations.textContent = `The winner is friendship, cos you tied, try harder!`;
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

