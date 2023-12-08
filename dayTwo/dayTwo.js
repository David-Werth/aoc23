import fs from 'fs';

const exampleOne = fs
	.readFileSync('./exampleOne.txt', 'utf-8')
	.trim()
	.split('\n');

const exampleTwo = fs
	.readFileSync('./exampleTwo.txt', 'utf-8')
	.trim()
	.split('\n');

const input = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n');

const rules = {
	red: 12,
	green: 13,
	blue: 14,
};

const partOne = (input) => {
	let possibleRoundsSum = 0;

	const cleanedGameRounds = input.map((line) =>
		line
			.split(':')
			.pop()
			.replaceAll(',', ';')
			.split(';')
			.map((item) => {
				const splitItem = item.trim().split(' ');
				return { number: Number(splitItem[0]), color: splitItem[1] };
			})
	);

	let possibleRounds = cleanedGameRounds.filter((round) => round.);

	console.log(possibleRounds);
};

partOne(exampleOne);

// const partTwo = (input) => {};

// console.log(`Part One: ${partOne(input)}, Part Two: ${partTwo(input)}`);

// if (draw.number <= rules[draw.color]) {

// }
