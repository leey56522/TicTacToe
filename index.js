const player = (() => {
    // Create players
    const playerMaker = (name, mark, turn, turnMade) => {
        return {name, mark, turn, turnMade};
    };

    const player1 = playerMaker('Player 1', 'X', true , []);
    const player2 = playerMaker('Player 2', 'O', false, []);

    return {player1, player2}
})();

const gameBoard = (() => {

    let board = ['', '', '', '', '', '', '', '', ''];

    let turn = 1;
    let winner = false;
    
    const eachBox = document.querySelectorAll('.gameBox');
    const message = document.querySelector('.message');
    const resetBtn = document.querySelector('button');
  
    // Links board array content with each box's content
    const updateBoard = () => {
        for (let i = 0; i < eachBox.length; i++) {
            eachBox[i].setAttribute('id', i);
            eachBox[i].textContent = board[i];
        }
    };

    // Clicking box puts X or O
    eachBox.forEach((box) => {
        box.addEventListener('click', (e) => {
            gameProg(box.id);
            box.style.pointerEvents = 'none';
        });
    });

    // Progresses the game based on turns and winner
    const gameProg = (id) => {
        if (turn < 10 && !winner) {
            if (turn % 2 !== 0) {
                message.innerHTML = `Turn ${turn}: Player 1`
                chooseMarkX(id);
            } else {
                message.innerHTML = `Turn ${turn}: Player 2`
                chooseMarkO(id);
            };
        } 
    };

    // Creates X mark on designated area
    const chooseMarkX = (id) => {
        board[id] = player.player1.mark;
        updateBoard();
        playHistory(player.player1, id);
        determineWinner(player.player1);
        turnWinner();
    };

    // Creates O mark on designated area
    const chooseMarkO = (id) => {
        board[id] = player.player2.mark;
        updateBoard();
        playHistory(player.player2, id);
        determineWinner(player.player2);
        turnWinner();
    };

    // increases turn and changes message based on winner or draw
    const turnWinner = () => {
        turn++
        if (winner) {
            message.innerHTML = `The winner is ${winner}!`
        } else if (turn >= 11 && !winner) {
            message.innerHTML = "It's a Draw!"
        }
    };

    // History of where moves are made by each player
    const playHistory = (who, id) => {
        who.turnMade.push(id);
    };

    // List of winning combinations
    const winCondition = [
        [0, 1, 2],
        [0, 5, 6],
        [2, 5, 8],
        [6, 7, 8],
        [3, 4, 5],
        [1, 4, 7],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Counts winning condition
    const winCount = (player, winCheck) => {
        let count = 0;
        for (let i = 0; i < player.length; i++) {
            if (winCheck.includes(Number(player[i]))) {
                count++
            };
            if (count === 3) {
                return true;
            }
        }
    };

    // Determines if there is a winner
    const determineWinner = (player) => {
        for (let i = 0; i < winCondition.length; i++) {
            let current = winCount(player.turnMade, winCondition[i]);
            if (current) {
                winner = player.name;
            }
        }
    };

    // Resets all the boxe and array contents to empty string
    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        };
        eachBox.forEach((box) => {
                box.style.pointerEvents = 'auto';
        });
    };

    // Gives reset button the reset function
    resetBtn.addEventListener('click', function() {
        location.reload();
        // reset();
        // updateBoard();
        // player.player1.turnMade = [];
        // player.player1.turnMade = [];
        // message.innerHTML = "Turn 1: Player 1";
        // winner = false;
        // turn = 1;
    })
    return {updateBoard, reset}
})();

gameBoard.updateBoard();