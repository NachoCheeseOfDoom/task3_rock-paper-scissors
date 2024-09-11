import chalk from 'chalk';

export class GameLogic {
    constructor(moves) {
        this.moves = moves;
    }

    determineWinner(userMove, computerMove) {
        const userIndex = this.moves.indexOf(userMove);
        const computerIndex = this.moves.indexOf(computerMove);
        const half = Math.floor(this.moves.length / 2);

        if (userIndex === computerIndex) return chalk.yellow("Draw :|");

        if (
            (userIndex > computerIndex && (userIndex - computerIndex) <= half) ||
            (userIndex < computerIndex && (computerIndex - userIndex) > half)
        ) {
            return chalk.green("You win! :)");
        } else {
            return chalk.red("You lose! :(");
        }
    }
}
