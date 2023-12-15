import fs from 'fs';

const exampleOne = fs.readFileSync('./exampleOne.txt', 'utf-8');

const input = fs.readFileSync('./input.txt', 'utf-8');

const partOne = (input) => {
	const seeds = input
		.split(/\r/)[0]
		.split(':')
		.pop()
		.trim()
		.split(' ')
		.map((seed) => parseInt(seed));
	const maps = input
		.replace(input.split(/\r/)[0], '')
		.trim()
		.split(/\r\n\r\n/)
		.map((map) => {
			return {
				mapName: map.split(':')[0],
				mapValues: map
					.split(':')[1]
					.trim()
					.split(/\r\n/)
					.map((valueGroup) =>
						valueGroup.split(' ').map((mapValue) => parseInt(mapValue))
					),
			};
		});

	const isInRange = (rangeStart, rangeLength, value) => {
		const rangeEnd = rangeStart + rangeLength - 1;

		return value >= rangeStart && value <= rangeEnd;
	};

	const getDestinationValue = (
		sourceRangeStart,
		destinationRangeStart,
		value
	) => {
		const rangeModifier = value - sourceRangeStart;

		return destinationRangeStart + rangeModifier;
	};

	let locationNumbers = [];

	// per seed
	for (let i = 0; i < seeds.length; i++) {
		const currentSeed = seeds[i];
		let currentSourceValue = currentSeed;

		// per map
		for (let j = 0; j < maps.length; j++) {
			const currentMap = maps[j];

			// per map values
			for (let k = 0; k < currentMap.mapValues.length; k++) {
				const currentMapValues = currentMap.mapValues[k];

				if (
					isInRange(currentMapValues[1], currentMapValues[2], currentSourceValue)
				) {
					currentSourceValue = getDestinationValue(
						currentMapValues[1],
						currentMapValues[0],
						currentSourceValue
					);

					break;
				} else {
					currentSourceValue = currentSourceValue;
				}
			}
		}
		locationNumbers.push(currentSourceValue);
	}

	return Math.min(...locationNumbers);
};

const partTwo = (input) => {
	const seedRanges = input
		.split(/\r/)[0]
		.split(':')
		.pop()
		.trim()
		.split(' ')
		.map((seed) => parseInt(seed));

	console.log(seedRanges);

	let seeds = [];

	for (let i = 0; i < seedRanges.length; i += 2) {
		const rangeStart = seedRanges[i];
		const rangeLength = seedRanges[i + 1];

		for (let j = 0; j < rangeLength; j++) {
			console.log(rangeStart + j);
			seeds = [...seeds, rangeStart + j];
		}
	}

	const maps = input
		.replace(input.split(/\r/)[0], '')
		.trim()
		.split(/\r\n\r\n/)
		.map((map) => {
			return {
				mapName: map.split(':')[0],
				mapValues: map
					.split(':')[1]
					.trim()
					.split(/\r\n/)
					.map((valueGroup) =>
						valueGroup.split(' ').map((mapValue) => parseInt(mapValue))
					),
			};
		});

	const isInRange = (rangeStart, rangeLength, value) => {
		const rangeEnd = rangeStart + rangeLength - 1;

		return value >= rangeStart && value <= rangeEnd;
	};

	const getDestinationValue = (
		sourceRangeStart,
		destinationRangeStart,
		value
	) => {
		const rangeModifier = value - sourceRangeStart;

		return destinationRangeStart + rangeModifier;
	};

	let locationNumbers = [];

	// per seed
	for (let i = 0; i < seeds.length; i++) {
		const currentSeed = seeds[i];

		console.log(currentSeed);
		let currentSourceValue = currentSeed;

		// per map
		for (let j = 0; j < maps.length; j++) {
			const currentMap = maps[j];

			// per map values
			for (let k = 0; k < currentMap.mapValues.length; k++) {
				const currentMapValues = currentMap.mapValues[k];

				if (
					isInRange(currentMapValues[1], currentMapValues[2], currentSourceValue)
				) {
					currentSourceValue = getDestinationValue(
						currentMapValues[1],
						currentMapValues[0],
						currentSourceValue
					);

					break;
				} else {
					currentSourceValue = currentSourceValue;
				}
			}
		}
		locationNumbers.push(currentSourceValue);
	}

	return Math.min(...locationNumbers);
};

// partOne(exampleOne);
console.log(`Part One: ${partOne(input)}, Part Two: ${partTwo(input)}`);
