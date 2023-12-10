import fs from 'fs';

const exampleOne = fs.readFileSync('./exampleOne.txt', 'utf-8').split(/\r?\n/);

const exampleTwo = fs.readFileSync('./exampleTwo.txt', 'utf-8').split(/\r?\n/);

const input = fs.readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

const partOne = (input) => {
	const cols = input[0].length;
	const rows = input.length;

	let sum = 0;

	const isNumber = (char) => {
		return !isNaN(parseInt(char));
	};

	const isDot = (char) => {
		return char === '.';
	};

	let currentNumber = '';
	let hasSymbolNeigbour = false;

	for (let i = 0; i < rows; i++) {
		if (currentNumber && hasSymbolNeigbour) sum += parseInt(currentNumber);
		currentNumber = '';
		hasSymbolNeigbour = false;

		for (let j = 0; j < cols; j++) {
			let char = input[i][j];
			let directions = [
				[[i - 1], [j - 1]],
				[[i - 1], [j]],
				[[i - 1], [j + 1]],
				[[i], [j - 1]],
				[[i], [j + 1]],
				[[i + 1], [j - 1]],
				[[i + 1], [j]],
				[[i + 1], [j + 1]],
			];

			if (isNumber(char)) {
				currentNumber += char;
				for (let k = 0; k < directions.length; k++) {
					if (
						input[directions[k][0][0]] === undefined ||
						input[directions[k][0][0]][directions[k][1][0]] === undefined
					)
						continue;

					let currentCheckValue = input[directions[k][0][0]][directions[k][1][0]];

					if (!isDot(currentCheckValue) && !isNumber(currentCheckValue)) {
						hasSymbolNeigbour = true;
						break;
					}
				}
			} else {
				if (currentNumber && hasSymbolNeigbour) sum += parseInt(currentNumber);

				currentNumber = '';
				hasSymbolNeigbour = false;
			}
		}
	}

	console.log(sum);
};

partOne(input);

// const partTwo = (input) => {};

// console.log(`Part One: ${partOne(input)}, Part Two: ${partTwo(input)}`);
