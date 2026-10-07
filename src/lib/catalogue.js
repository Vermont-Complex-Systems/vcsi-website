/**
 * Primary catalogue code for a course string, using the first listed subject and
 * number: "CSYS/CS 5060: Advanced Evolutionary Robotics" -> "CSYS 5060".
 * Special topics (no stable catalogue entry) return null.
 * @param {string} course
 * @returns {string | null}
 */
export function primaryCode(course) {
    if (course.includes("(special topic)")) return null;
    const match = course.match(/^([A-Z]+)[A-Z/]*\s+(\d{4})/);
    return match ? `${match[1]} ${match[2]}` : null;
}

/**
 * Link a course string to its entry in the UVM catalogue.
 * @param {string} course
 * @returns {string | null}
 */
export function catalogueUrl(course) {
    const code = primaryCode(course);
    return code ? `https://catalogue.uvm.edu/search/?P=${encodeURIComponent(code)}` : null;
}

/**
 * Link a section to its page in the Schedule of Classes.
 * @param {{ srcdb: string, crn: string }} section
 * @returns {string}
 */
export function scheduleUrl({ srcdb, crn }) {
    return `https://soc.uvm.edu/?details&srcdb=${srcdb}&crn=${crn}`;
}
