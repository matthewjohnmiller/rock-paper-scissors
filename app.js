const handShapes = {
    1: 'rock',
    2: 'paper',
    3: 'scissors'
}

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
    // - the USER
    // - the COMPUTER
    // - it's a TIE

    let result;

    let strYouWin = 'You win! ' + titleCase(userShape) + ' beats ' + computerShape + '.';
    let strYouLose = 'You lose! ' + titleCase(computerShape) + ' beats ' + userShape + '.';
    let strTie = `It's a tie!`

    if (userShape === computerShape) {
        result = strTie;
    } else if (userShape === 'rock') {
        if (computerShape === 'scissors') {
            result = strYouWin;
        } else {
            result = strYouLose;
        }
    } else if (userShape === 'scissors') {
        if (computerShape === 'paper') {
            result = strYouWin;
        } else {
            result = strYouLose;
        }
    } else {
        if (computerShape === 'rock') {
            result = strYouWin;
        } else {
            result = strYouLose;
        }
    }

    return result;

}

function playRound(userShapeRaw) {
    let userShape = fixUserShape(userShapeRaw);

    if (!userShapeIsValid(userShape)) {
        console.log('Invalid input - try again');
        return;
    }

    return whoWins(userShape, computerPlay());   
}

function game() {
    let userScore = 0;
    let computerScore = 0;
    let numGames = 5;
    let winningGames = 3;

    let userShape;
    let roundResult;

    // Loop through the number of games, and increment the winner's score (assuming there is a winner)
    for (i = 0; i < numGames; i++) {
    
        // make sure roundResult always begins as undefined
        // this works, but could use cleaning up... could use numbers in the whoWins function
        roundResult = undefined;

        // don't let the script continue until the user enters a valid input
        while (typeof roundResult === 'undefined') {
            userShape = prompt('Round ' + (i + 1) + ', enter your play:');
            roundResult = playRound(userShape);
        }

        console.log(roundResult);

        if (roundResult.search('win') > -1) {
            userScore++;
        } else if (roundResult.search('lose') > -1) {
            computerScore++;
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