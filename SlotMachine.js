// Tech With Tim's Learn JavaScript With This ONE Project!

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

const deposit = () => {

    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again.")
        }
        else {
            return numberDepositAmount;
        }

    }

};

const getLines = () => {

    while (true) {
        const numLines = prompt("Enter the number of lines to bet on (1-3): ");
        const lines = parseFloat(numLines);

        if (isNaN(lines) || lines <= 0 || lines > 3) {
            console.log("Invalid number of lines, try again.");
        }
        else {
            return lines;
        }

    }

};

const getBet = (balance, lines) => {

    while (true) {
        const bet = prompt("Enter amount to bet on each line: ");
        const numberBet = parseFloat(bet);

        let lineBet = balance / lines;
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > lineBet) {
            console.log("Invalid bet amount, try again.");
        }
        else {
            return numberBet;
        }

    }

};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {

        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }

    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];

        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }

    }

    return reels;
};

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);

        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }

    }

    return rows;
};

const printRows = (rows) => {

    for (const row of rows) {
        let rowString = "";

        for (const [i, symbol] of row.entries()) {
            rowString += symbol

            if (i != row.length-1) {
                rowString += " | "
            }

        }
        console.log(rowString);
    }

};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {

            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }

        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }

    }

    return winnings;
};

const main = (balance) => {

    while (true) {
        console.log("Your total balance is $" + balance);

        const lines = getLines();
        const bet = getBet(balance, lines);
        balance -= bet * lines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, lines)
        balance += winnings;

        console.log("You won $" + winnings);

        if (balance <= 0) {
            console.log("Out of money...");
            break;
        }

        const playAgain = prompt("Would you like to play again? (y/n): ");

        if (playAgain != "y") break;

    }

    return balance;
}

let balance = deposit();
balance = main(balance);
console.log("You left with a total of $" + balance);
console.log("Thanks for playing");
