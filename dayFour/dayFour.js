import { constants } from 'buffer';
import fs from 'fs';

const exampleOne = fs.readFileSync('./exampleOne.txt', 'utf-8').split(/\r?\n/);

const exampleTwo = fs.readFileSync('./exampleTwo.txt', 'utf-8').split(/\r?\n/);

const input = fs.readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

const partOne = (input) => {
	let totalWorth = 0;
	const scratchCards = input;
	const numberOfCards = input.length;

	let sortedCards = [];

	for (let i = 0; i < numberOfCards; i++) {
		let cardId = i + 1;

		let cardNumbers = scratchCards[i]
			.split('|')[0]
			.split(':')
			.pop()
			.split(' ')
			.map((number) => number.trim())
			.filter((number) => number);

		let winningNumbers = scratchCards[i]
			.split('|')
			.pop()
			.split(' ')
			.map((number) => number.trim())
			.filter((number) => number);

		sortedCards.push({
			cardId: cardId,
			cardNumbers: cardNumbers,
			winningNumbers: winningNumbers,
		});
	}

	for (let i = 0; i < numberOfCards; i++) {
		let card = sortedCards[i];
		let matches = 0;

		for (let j = 0; j < card.cardNumbers.length; j++) {
			let cardNumber = card.cardNumbers[j];

			for (let k = 0; k < card.winningNumbers.length; k++) {
				let winningNumber = card.winningNumbers[k];

				if (cardNumber === winningNumber) {
					if (matches >= 1) {
						matches = matches * 2;
					} else {
						matches = 1;
					}
				}
			}
		}

		totalWorth += matches;
	}

	return totalWorth;
};

const partTwo = (input) => {};

// partOne(exampleOne);
console.log(`Part One: ${partOne(exampleOne)}, Part Two: ${partTwo(input)}`);
