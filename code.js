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

    function addVisualBoard(){
        
        
        const mainContainer = document.getElementById("main");
        const gameContainer = document.createElement("div");
        gameContainer.classList.add('gameContainer');
        mainContainer.appendChild(gameContainer);

        const title = document.createElement("h1");
        title.classList.add("title");
        gameContainer.appendChild(title);

        const game = document.createElement("div");
        game.classList.add("game");
        gameContainer.appendChild(game);

            const turnX = document.createElement("div");
            turnX.classList.add("turn");
            game.appendChild(turnX);

                const pX = document.createElement("p");
                pX.textContent = "X";
                game.appendChild(pX);

            const board = document.createElement("div");
            board.classList.add("board");
            game.appendChild(board);

                for (let i = 0; i<9 ;i++){
                    const spot = document.createElement("p");
                    spot.dataset.array = i;
                    board.appendChild(spot)   
                }

            const turnO = document.createElement("div");
            turnO.classList.add("turn");
            game.appendChild(turnO);

                const pO = document.createElement("p");
                pO.textContent = "O";
                game.appendChild(pO);
        
        const state = document.createElement("h3");
        state.classList.add("state");
        gameContainer.appendChild(state);

        const restart = document.createElement("button");
        gameContainer.appendChild(restart);

        /*
        div.main
            div.gameContainer
                h1.title
                div.game
                    div.turnX X with red background
                        p
                    div.board
                        grid
                    div.turnO 0 X with blue background
                        p
                h3.gameState
                button.restart
                
                
        */
    };

    function removeVisualBoard(){
        const mainContainer = document.getElementById("main");
        const gameContainer = document.getElementsByClassName("gameContainer");
        if (gameContainer != null){
            mainContainer.removeChild(gameContainer);
        }

    };
    const visibleBoard = [];
    const playedBoard = [];
    const startGame = ()=>{

        if (visibleBoard.length !=0){
            visibleBoard.splice(0,(visibleBoard.length-1));
        }
        if (playedBoard.length !=0){
            visibleBoard.splice(0,(playedBoard.length-1));
        }
        
        for (let i = 0; i<9 ;i++){
            visibleBoard.push = "Touch Me";
            playedBoard.push = 0;
        }

        addVisualBoard();
    };

    const makeMove = (player,boardIndex) =>{

    };

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