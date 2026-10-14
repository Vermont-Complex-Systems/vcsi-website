// Helpers for reading people rows (members.csv, students.csv) as they come out
// of the SharePoint workbook. The sheet is edited by hand, so the same value can
// show up as "Alumni", "alumni" or " alumni ". These helpers decide what a cell
// means in one place, so components and scripts agree.
//
// Plain JS with no Vite imports: also used by scripts/ under Node.

/** Lowercased, trimmed status ("active", "alumni", "retired", or ""). */
export function statusOf(person) {
	return (person?.status || '').trim().toLowerCase();
}

export function isAlumni(person) {
	return statusOf(person) === 'alumni';
}

/**
 * The optional "show" column: 0 hides someone from the site without deleting
 * their row. Blank or 1 means shown. Excel checkboxes export as true/false,
 * so those work too.
 */
export function isShown(person) {
	const value = String(person?.show ?? '')
		.trim()
		.toLowerCase();
	return !['0', 'false', 'no'].includes(value);
}

/**
 * Group ids a person belongs to. The sheet allows several, comma separated:
 * "comp-ethics-lab, joint-lab".
 * @returns {string[]}
 */
export function affiliationsOf(person) {
	return (person?.primaryAffiliation || '')
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean);
}

export function belongsTo(person, groupId) {
	return affiliationsOf(person).includes(groupId);
}

/**
 * OpenAlex author ids are "A" followed by digits. The sheet sometimes has
 * "a5078442658" or a full https://openalex.org/ URL; normalize to "A5078442658".
 * @returns {string} normalized id, or "" when the cell is empty
 */
export function normalizeOpenAlexId(value) {
	return (value || '')
		.trim()
		.replace(/^https?:\/\/openalex\.org\//i, '')
		.toUpperCase();
}

/** Keep the first row for each id; later duplicates are dropped. */
export function uniqueById(rows) {
	const seen = new Set();
	return rows.filter((row) => {
		if (!row.id || seen.has(row.id)) return false;
		seen.add(row.id);
		return true;
	});
}
