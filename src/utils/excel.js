/**
 * Convert Excel serial date number to JavaScript Date
 * @param {number} serial - Excel serial date number
 * @returns {Date|null}
 */
export const excelToDate = (serial) => {
    if (!serial) return null;
    const excelEpoch = new Date(1899, 11, 30);
    return new Date(excelEpoch.getTime() + serial * 86400000);
};

/**
 * Format Excel serial date as readable string
 * @param {number} serial - Excel serial date number
 * @returns {string}
 */
export const formatDate = (serial) => {
    const date = excelToDate(serial);
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
 * Calculate days until an Excel serial date
 * @param {number} serial - Excel serial date number
 * @returns {number|null}
 */
export const getDaysUntil = (serial) => {
    const date = excelToDate(serial);
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
        const date = excelToDate(event.date);
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
