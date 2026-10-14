// Name matching between group websites and our sheets. Ids can't be used:
// every site has its own slugs ("will-thompson" vs our "william-thompson").

/** "Jonathan St. Onge" and "Jonathan St-Onge" both become "jonathan st onge". */
export function normalizeName(name) {
	return (name || '')
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '') // accents
		.replace(/['’]/g, '') // D'Iorio -> DIorio
		.toLowerCase()
		.replace(/[^a-z]+/g, ' ')
		.trim();
}

/** Suggested sheet id for a new person: "Jack D'Iorio" -> "jack-diorio". */
export function slugify(name) {
	return normalizeName(name).replace(/ /g, '-');
}

// Short forms that aren't a prefix of the full name (Will/William already is).
// Add pairs here when a lab page and our sheets disagree this way.
const NICKNAMES = {
	jim: 'james',
	bill: 'william',
	bob: 'robert',
	mike: 'michael',
	dick: 'richard',
	liz: 'elizabeth',
	beth: 'elizabeth',
	kate: 'katherine',
	katie: 'katherine',
	izzy: 'isabelle',
	peggy: 'margaret',
	maggie: 'margaret',
	ted: 'edward',
	tony: 'anthony',
	andi: 'andrea'
};

function editDistance(a, b) {
	const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
	for (let j = 1; j <= b.length; j++) dp[0][j] = j;
	for (let i = 1; i <= a.length; i++) {
		for (let j = 1; j <= b.length; j++) {
			dp[i][j] = Math.min(
				dp[i - 1][j] + 1,
				dp[i][j - 1] + 1,
				dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
			);
		}
	}
	return dp[a.length][b.length];
}

/**
 * How confident are we that two names are the same person?
 *   'same'     identical, or same first and last name with a middle name or a
 *              short form on one side (Tabia Prama / Tabia Tanzin Prama,
 *              Will / William, Jim / James). Treated as a match.
 *   'possible' worth asking a person (Erik Weis / Erik Weiss).
 *   null       different people.
 */
export function compareNames(a, b) {
	const x = normalizeName(a);
	const y = normalizeName(b);
	if (!x || !y) return null;
	if (x === y) return 'same';

	const [xFirst, xLast] = [x.split(' ')[0], x.split(' ').at(-1)];
	const [yFirst, yLast] = [y.split(' ')[0], y.split(' ').at(-1)];
	const shortForm = (p, q) =>
		(p.length >= 3 && q.startsWith(p)) || NICKNAMES[p] === q || NICKNAMES[q] === p;

	if (xLast === yLast) {
		if (xFirst === yFirst || shortForm(xFirst, yFirst)) return 'same';
		// Andi / Andrea, but not Sam / Shun
		if (xFirst.slice(0, 3) === yFirst.slice(0, 3)) return 'possible';
	}
	if (xFirst === yFirst && editDistance(xLast, yLast) <= 1) return 'possible';
	return null;
}

/**
 * Rows whose name matches, keeping only the most confident level found.
 * @template {{name: string}} T
 * @param {string} name
 * @param {T[]} rows
 * @returns {{level: 'same' | 'possible' | null, rows: T[]}}
 */
export function findMatches(name, rows) {
	const same = rows.filter((row) => compareNames(name, row.name) === 'same');
	if (same.length > 0) return { level: 'same', rows: same };
	const possible = rows.filter((row) => compareNames(name, row.name) === 'possible');
	if (possible.length > 0) return { level: 'possible', rows: possible };
	return { level: null, rows: [] };
}
