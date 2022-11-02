const handShapes = {
    1: 'rock',
    2: 'paper',
    3: 'scissors'
}

// global constants for game result
const YOU_WIN = 1;
const YOU_LOSE = 2;
const YOU_TIE = 3;

function computerPlay() {

    // Selects rock, paper, or scissors at random and returns it as the computer's play

    let shapeNum = Math.floor(Math.random() * 3) + 1;
    return handShapes[shapeNum.toString()];
}

function fixUserShape(userShapeRaw) {

    // Takes raw user input and performs two cleansing actions:
    // 1) makes the entire string lower case
    // 2) trims it (removes whitespace from both ends of the string)
    // This allows us to match it with the values available in const handShapes
    //
    // If the user passes a number by mistake, this throws a TypeError
    // We catch this by passing some non RPS value ('x') to fixedUserShape, which will
    //   return Invalid Guess

    let fixedUserShape;

    try {
        fixedUserShape = (userShapeRaw.toLowerCase()).trim();
    } catch (e) {
        if (e instanceof TypeError) {
            fixedUserShape = 'x';
        }
    }
    
    return fixedUserShape;
}

function userShapeIsValid(userShape) {

    // Takes user input and matches it against valid values ("rock", "paper", "scissors")
    // Returns a boolean representing whether the input is valid
    // Assumes input cleansing has already taken place

    let isValid = false;

    for (let i = 1; i <= 3; i++) {
        if (userShape === handShapes[i.toString()]) {
            isValid = true;
        }
    }

    return isValid;
}

function titleCase(anyString) {
    let firstLetter = anyString.charAt(0).toUpperCase();
    let restOfWord = anyString.substring(1).toLowerCase();
    return firstLetter + restOfWord;
}

function whoWins(userShape, computerShape) {

    // Determines who is the winner of an RPS game:
    // - the USER (1)
    // - the COMPUTER (2)
    // - it's a TIE (3)

    let result;

    if (userShape === computerShape) {
        result = YOU_TIE;
    } else if (userShape === 'rock') {
        if (computerShape === 'scissors') {
            result = YOU_WIN;
        } else {
            result = YOU_LOSE;
        }
    } else if (userShape === 'scissors') {
        if (computerShape === 'paper') {
            result = YOU_WIN;
        } else {
            result = YOU_LOSE;
        }
    } else {
        if (computerShape === 'rock') {
            result = YOU_WIN;
        } else {
            result = YOU_LOSE;
        }
    }

    return {
        rResult: result,
        rUserShape: userShape,
        rComputerShape: computerShape
    }
}

function playRound(roundNumber) {
    let userShape = fixUserShape(prompt('Round ' + roundNumber + ', enter your play:'));

    if (!userShapeIsValid(userShape)) {
        console.log('Invalid input - try again');
        return {
            rResult: -1,
            rUserShape: -1,
            rComputerShape: -1
        }
    }

    return whoWins(userShape, computerPlay());   
}

function game() {
    let userScore = 0;
    let computerScore = 0;
    let numGames = 5;
    let winningGames = 3;

    let roundResult;

    // Loop through the number of games, and increment the winner's score (assuming there is a winner)
    for (i = 0; i < numGames; i++) {
        
        // make sure roundResult always begins as undefined
        // this works, but could use cleaning up... could use numbers in the whoWins function
        roundResult = -1;
        let resultDetails;

        // don't let the script continue until the user enters a valid input
        while (roundResult === -1) {
            resultDetails = playRound(i + 1);
            roundResult = resultDetails.rResult;
        }

        console.log(roundResult);

        if (roundResult === YOU_WIN) {
            userScore++;
            console.log('You win! ' + titleCase(resultDetails.rUserShape) + ' beats ' + resultDetails.rComputerShape + '.');
        } else if (roundResult === YOU_LOSE) {
            computerScore++;
            console.log('You lose! ' + titleCase(resultDetails.rComputerShape) + ' beats ' + resultDetails.rUserShape + '.');
        } else if (roundResult === YOU_TIE) {
            console.log(`It's a tie!`);
        }

        // End the game if someone wins three rounds
        if (userScore === winningGames || computerScore === winningGames) {
            break;
        }
    }

    if (userScore > computerScore) {
        return `You win the game ${userScore} rounds to ${computerScore}.`;
    } else if (computerScore > userScore) {
        return `You lose the game ${computerScore} rounds to ${userScore}.`;
    } else {
        return `The game is tied ${userScore} rounds to ${computerScore}.`;
    }
}