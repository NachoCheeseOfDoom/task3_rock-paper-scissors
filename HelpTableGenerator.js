import chalk from 'chalk';

export class HelpTableGenerator {
    static generateHelpTable(moves) {
        const header = `| v PC\\User > | ${moves.map(move => chalk.bold(move)).join(' | ')} |`;
        const separator = `+${'-'.repeat(header.length - 2)}+`;
        const tableRows = moves.map((move, i) => {
            const results = moves.map((opponentMove, j) => {
                if (i === j) return "Draw";
                const half = Math.floor(moves.length / 2);
                const winCondition = (i < j && (j - i <= half)) || (i > j && (i - j > half));
                return winCondition ? "Win" : "Lose";
            });
            return `| ${chalk.bold(move.padEnd(12))} | ${results.join(' | ')} |`;
        });

        console.log("Results are from the user’s point of view. Here's an example:");
        console.log(separator);
        console.log(header);
        console.log(separator);
        console.log(tableRows.join(`\n${separator}\n`));
        console.log(separator);
    }
}
