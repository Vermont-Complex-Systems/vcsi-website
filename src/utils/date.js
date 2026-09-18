/**
 * Parse a date from the CSV data. The MS Graph export writes ISO dates
 * ("2026-02-19"), but older exports wrote raw Excel serial numbers, so both are
 * accepted. Dates are built in local time; parsing "2026-02-19" as UTC would
 * land on the previous evening in Vermont.
 * @param {string|number|Date|null|undefined} value
 * @returns {Date|null}
 */
export const parseDate = (value) => {
    if (!value) return null;
    if (value instanceof Date) return value;

    const iso = String(value).match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?$/);
    if (iso) {
        const [, year, month, day, hours, minutes] = iso;
        return new Date(+year, +month - 1, +day, +(hours ?? 0), +(minutes ?? 0));
    }

    // Legacy Excel serial: days since 1899-12-30
    const serial = Number(value);
    if (!Number.isFinite(serial)) return null;
    return new Date(new Date(1899, 11, 30).getTime() + serial * 86400000);
};

/**
 * Format a CSV date value as a readable string
 * @param {string|number|Date} value
 * @returns {string}
 */
export const formatDate = (value) => {
    const date = parseDate(value);
    if (!date) return 'TBD';
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
};

/**
 * Format JavaScript Date as readable string with weekday
 * @param {Date} date - JavaScript Date object
 * @returns {string}
 */
export const formatDateObj = (date) => {
    if (!date) return 'TBD';
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
};

/**
 * Calculate days until a CSV date value
 * @param {string|number|Date} value
 * @returns {number|null}
 */
export const getDaysUntil = (value) => {
    const date = parseDate(value);
    if (!date) return null;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const diff = date.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

/**
 * Group events by name and find next upcoming date
 * @param {Array} events - Array of event objects
 * @returns {Array} - Grouped events with nextDate and upcomingCount
 */
export const groupEventsByName = (events) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const grouped = {};
    for (const event of events) {
        if (!grouped[event.name]) {
            grouped[event.name] = {
                ...event,
                dates: [],
                isVariable: event.recurring_frequency === 'variable'
            };
        }
        const date = parseDate(event.date);
        if (date) {
            grouped[event.name].dates.push({
                date,
                day: event.day,
                time: event.time
            });
        }
    }

    return Object.values(grouped).map(event => {
        if (event.dates.length === 0) {
            return { ...event, nextDate: null, upcomingCount: 0 };
        }

        const futureDates = event.dates
            .filter(d => d.date >= today)
            .sort((a, b) => a.date - b.date);

        return {
            ...event,
            nextDate: futureDates[0] || null,
            upcomingCount: futureDates.length
        };
    });
};
