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
	let possibleRoundIds = [];
	let possibleRoundsSum = 0;

	const cleanedGameRounds = input.map((line) =>
		line
			.split(':')
			.pop()
			.split(';')
			.map((set) => {
				return set
					.trim()
					.split(',')
					.map((color) => {
						return {
							color: color.trim().split(' ')[1],
							amount: color.trim().split(' ')[0],
						};
					});
			})
	);

	cleanedGameRounds.forEach((round, index) => {
		let condition = true;

		if (condition) {
			round.forEach((set) => {
				set.forEach((color) => {
					if (color.amount > rules[color.color]) condition = false;
				});
			});
		}

		if (condition) {
			possibleRoundIds.push(index + 1);
		}
	});

	possibleRoundsSum = possibleRoundIds.reduce((acc, curr) => acc + curr);

	return possibleRoundsSum;
};

console.log(partOne(input));

// const partTwo = (input) => {};

// console.log(`Part One: ${partOne(input)}, Part Two: ${partTwo(input)}`);

// if (draw.number <= rules[draw.color]) {

// }
