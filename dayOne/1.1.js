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

const partOne = (input) => {
	const inputArray = input;
	let totalSum = 0;

	const combinedNumbers = inputArray.map((item) => {
		const firstNum = item.split('').find((char) => {
			return parseInt(char);
		});
		const lastNum = item.split('').findLast((char) => {
			return parseInt(char);
		});

		return firstNum + lastNum;
	});

	combinedNumbers.forEach((num) => {
		totalSum += parseInt(num);
	});

	return totalSum;
};

const filterValues = {
	one: 'one1one',
	two: 'two2two',
	three: 'three3three',
	four: 'four4four',
	five: 'five5five',
	six: 'six6six',
	seven: 'seven7seven',
	eight: 'eight8eight',
	nine: 'nine9nine',
};

const partTwo = (input) => {
	let combinedNumbers = input.map((line) => {
		for (let num of Object.keys(filterValues)) {
			line = line.replaceAll(num, filterValues[num]);
		}

		const firstNum = line.split('').find((char) => {
			return parseInt(char);
		});
		const lastNum = line.split('').findLast((char) => {
			return parseInt(char);
		});

		return firstNum + lastNum;
	});

	let sum = combinedNumbers.reduce(
		(accumulator, currentValue) => Number(accumulator) + Number(currentValue)
	);
	return sum;
};

console.log(`Part One: ${partOne(input)}, Part Two: ${partTwo(input)}`);
