import { KeyGenerator } from './keyGenerator.js';
import { GameLogic } from './GameLogic.js';
import { HelpTableGenerator } from './HelpTableGenerator.js';
import readline from 'readline';
import chalk from 'chalk';

function main() {
    const args = process.argv.slice(2);
    const moves = args;

    if (moves.length < 3 || moves.length % 2 === 0 || new Set(moves).size !== moves.length) {
        console.error(chalk.red("Incorrect arguments! Please provide an odd number of arguments and non-repeating moves."));
        console.error(chalk.green("Example: node <file_name> rock paper scissors"));
        process.exit(1);
    }

    const key = KeyGenerator.generateKey(256);
    const game = new GameLogic(moves);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function showMenu() {
        console.log("Available moves:");
        moves.forEach((move, index) => console.log(`${index + 1} - ${move}`));
        console.log("0 - exit");
        console.log("? - help");

        rl.question("Enter your move: ", (input) => {
            if (input === "0") {
                console.log("Exiting game.");
                rl.close();
            } else if (input === "?") {
                HelpTableGenerator.generateHelpTable(moves);
                showMenu();
            } else if (!isNaN(input) && input > 0 && input <= moves.length) {
                const userMove = moves[input - 1];
                const computerMove = moves[Math.floor(Math.random() * moves.length)];
                console.log('');
                console.log(`Your move: ${userMove}`);
                console.log(`Computer move: ${computerMove}`);
                console.log(`Result: ${game.determineWinner(userMove, computerMove)}`);
                console.log('');
                console.log(chalk.cyan(`HMAC key: ${key}`));
                console.log('-'.repeat(key.length + 10));
                console.log('');
                showMenu();
            } else {
                console.log('');
                console.error(chalk.bgRed("Please enter valid input!"));
                console.log('');
                showMenu();
            }
        });
    }

    showMenu();
}

main();
