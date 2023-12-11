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
				[i - 1, j - 1],
				[i - 1, j],
				[i - 1, j + 1],
				[i, j - 1],
				[i, j + 1],
				[i + 1, j - 1],
				[i + 1, j],
				[i + 1, j + 1],
			];

			if (isNumber(char)) {
				currentNumber += char;
				for (let k = 0; k < directions.length; k++) {
					if (
						input[directions[k][0]] === undefined ||
						input[directions[k][0]][directions[k][1]] === undefined
					)
						continue;

					let currentCheckValue = input[directions[k][0]][directions[k][1]];

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

	return sum;
};

const partTwo = (input) => {
	const cols = input[0].length;
	const rows = input.length;

	let total = 1;
	let allNumbers = {};
	let gearRatioValues = [];

	const isNumber = (char) => {
		return !isNaN(parseInt(char));
	};

	const isDot = (char) => {
		return char === '.';
	};

	const isAsterisk = (char) => {
		return char === '*';
	};

	let currentNumber = '';
	let hasAsteriskNeighbour = false;
	let checkValueLocation;

	for (let i = 0; i < rows; i++) {
		if (currentNumber && hasAsteriskNeighbour)
			allNumbers[checkValueLocation] = allNumbers[checkValueLocation]
				? [...allNumbers[checkValueLocation], parseInt(currentNumber)]
				: [parseInt(currentNumber)];
		currentNumber = '';
		hasAsteriskNeighbour = false;

		for (let j = 0; j < cols; j++) {
			let char = input[i][j];
			let directions = [
				[i - 1, j - 1],
				[i - 1, j],
				[i - 1, j + 1],
				[i, j - 1],
				[i, j + 1],
				[i + 1, j - 1],
				[i + 1, j],
				[i + 1, j + 1],
			];

			if (isNumber(char)) {
				currentNumber += char;
				for (let k = 0; k < directions.length; k++) {
					if (
						input[directions[k][0]] === undefined ||
						input[directions[k][0]][directions[k][1]] === undefined
					)
						continue;

					let checkValue = input[directions[k][0]][directions[k][1]];

					if (isAsterisk(checkValue)) {
						checkValueLocation = `${directions[k][0]}-${directions[k][1]}`;
						hasAsteriskNeighbour = true;

						allNumbers[checkValueLocation] = allNumbers[checkValueLocation]
							? allNumbers[checkValueLocation]
							: [];
					}
				}
			} else {
				if (currentNumber && hasAsteriskNeighbour) {
					allNumbers[checkValueLocation] = allNumbers[checkValueLocation]
						? [...allNumbers[checkValueLocation], parseInt(currentNumber)]
						: [parseInt(currentNumber)];
				}
				currentNumber = '';
				hasAsteriskNeighbour = false;
			}
		}
	}

	for (const key in allNumbers) {
		if (allNumbers[key].length === 2) {
			gearRatioValues = [
				...gearRatioValues,
				allNumbers[key].reduce((a, b) => a * b),
			];
		}
	}

	total = gearRatioValues.reduce((a, b) => a + b);

	return total;
};

// console.log(partTwo(exampleOne));
console.log(`Part One: ${partOne(input)}, Part Two: ${partTwo(input)}`);
