import { parseDate } from './date.js';

/** Events are held in Vermont */
const TIME_ZONE = 'America/New_York';

/**
 * Minutes that `tz` is offset from UTC at the given instant
 * @param {Date} date
 * @param {string} tz
 * @returns {number}
 */
const tzOffsetMinutes = (date, tz) => {
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone: tz,
		hour12: false,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	})
		.formatToParts(date)
		.reduce((acc, p) => ({ ...acc, [p.type]: p.value }), {});

	const asUtc = Date.UTC(
		+parts.year,
		+parts.month - 1,
		+parts.day,
		+parts.hour % 24,
		+parts.minute,
		+parts.second
	);
	return (asUtc - date.getTime()) / 60000;
};

/**
 * Convert a wall-clock time in `tz` to a real UTC instant
 * @returns {Date}
 */
const zonedTimeToUtc = (year, month, day, hours, minutes, tz) => {
	const guess = Date.UTC(year, month, day, hours, minutes);
	const offset = tzOffsetMinutes(new Date(guess), tz);
	// Re-check in case the naive guess landed on the other side of a DST switch
	const corrected = tzOffsetMinutes(new Date(guess - offset * 60000), tz);
	return new Date(guess - corrected * 60000);
};

/**
 * Parse one side of a time range, e.g. "9:00 AM", "1:00pm", "13:00pm"
 * @param {string} part
 * @returns {{ hours: number, minutes: number, meridiem: string | null } | null}
 */
const parseTime = (part) => {
	const match = part.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
	if (!match) return null;
	return {
		hours: +match[1],
		minutes: match[2] ? +match[2] : 0,
		meridiem: match[3] ? match[3].toLowerCase() : null
	};
};

/**
 * Apply am/pm, ignoring it when the hour is already in 24h form ("13:00pm")
 * @returns {{ hours: number, minutes: number }}
 */
const to24Hour = ({ hours, minutes }, meridiem) => {
	if (hours <= 12 && meridiem === 'pm' && hours !== 12) return { hours: hours + 12, minutes };
	if (hours === 12 && meridiem === 'am') return { hours: 0, minutes };
	return { hours, minutes };
};

/**
 * Parse the CSV `time` column, which comes in several shapes:
 * "10:00 AM - 11:00 AM", "1:00pm-2:00pm", "12:00pm - 13:00pm", "11:30 am - 12:30 pm"
 * @param {string} time
 * @returns {{ start: { hours: number, minutes: number }, end: { hours: number, minutes: number } | null } | null}
 */
export const parseTimeRange = (time) => {
	if (!time) return null;
	const [rawStart, rawEnd] = time.split(/\s*[-–—]\s*/);
	const start = parseTime(rawStart || '');
	if (!start) return null;
	const end = rawEnd ? parseTime(rawEnd) : null;

	// "1:00-2:00pm": the start inherits the meridiem the end spells out
	const startMeridiem = start.meridiem || end?.meridiem || null;
	return {
		start: to24Hour(start, startMeridiem),
		end: end ? to24Hour(end, end.meridiem || startMeridiem) : null
	};
};

/** @param {Date} date */
const formatUtcStamp = (date) => date.toISOString().replace(/[-:]|\.\d{3}/g, '');

/** @param {Date} date */
const formatDateStamp = (date) =>
	[
		date.getFullYear(),
		String(date.getMonth() + 1).padStart(2, '0'),
		String(date.getDate()).padStart(2, '0')
	].join('');

/** @param {string} value */
const escapeText = (value) =>
	String(value)
		.replace(/\\/g, '\\\\')
		.replace(/;/g, '\\;')
		.replace(/,/g, '\\,')
		.replace(/\r?\n/g, '\\n');

/**
 * Fold long lines as required by RFC 5545
 * @param {string} line
 */
const foldLine = (line) => {
	const chunks = [];
	let remaining = line;
	while (remaining.length > 75) {
		chunks.push(remaining.slice(0, 75));
		remaining = ' ' + remaining.slice(75);
	}
	chunks.push(remaining);
	return chunks.join('\r\n');
};

/** Stable id so re-downloading updates the same entry instead of duplicating it */
const slugify = (value) =>
	String(value)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')
		.slice(0, 60);

/**
 * Build an iCalendar file for a single event
 * `date` is an ISO date string, or a Date for events whose next occurrence is
 * already resolved (ongoing events).
 * @param {{ name: string, date: string | Date, time?: string, location?: string, description?: string, link?: string, teams?: string }} event
 * @returns {string | null} - .ics file contents, or null if the event has no date
 */
export const buildIcs = (event) => {
	const day = parseDate(event.date);
	if (!day) return null;

	const [year, month, date] = [day.getFullYear(), day.getMonth(), day.getDate()];
	const range = parseTimeRange(event.time);

	let dtStart;
	let dtEnd;
	if (range) {
		const { hours, minutes } = range.start;
		const start = zonedTimeToUtc(year, month, date, hours, minutes, TIME_ZONE);
		const end = range.end
			? zonedTimeToUtc(year, month, date, range.end.hours, range.end.minutes, TIME_ZONE)
			: new Date(start.getTime() + 3600000);
		dtStart = `DTSTART:${formatUtcStamp(start)}`;
		dtEnd = `DTEND:${formatUtcStamp(end)}`;
	} else {
		// No time given: an all-day entry, which ends on the following day
		const next = new Date(year, month, date + 1);
		dtStart = `DTSTART;VALUE=DATE:${formatDateStamp(day)}`;
		dtEnd = `DTEND;VALUE=DATE:${formatDateStamp(next)}`;
	}

	const url = event.link || event.teams;
	const lines = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//Vermont Complex Systems Institute//Events//EN',
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		'BEGIN:VEVENT',
		`UID:${slugify(event.name)}-${formatDateStamp(day)}@vermontcomplexsystems.org`,
		`DTSTAMP:${formatUtcStamp(day)}`,
		dtStart,
		dtEnd,
		`SUMMARY:${escapeText(event.name)}`,
		event.location ? `LOCATION:${escapeText(event.location)}` : null,
		event.description ? `DESCRIPTION:${escapeText(event.description)}` : null,
		url ? `URL:${escapeText(url)}` : null,
		'END:VEVENT',
		'END:VCALENDAR'
	].filter(Boolean);

	return lines.map(foldLine).join('\r\n') + '\r\n';
};

/**
 * Suggested filename for an event's .ics download
 * @param {{ name: string }} event
 */
export const icsFilename = (event) => `${slugify(event.name) || 'event'}.ics`;
