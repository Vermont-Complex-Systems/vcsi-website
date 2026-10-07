// For every course in src/data/electives.js, fetch its description from the UVM
// catalogue and its sections in the terms currently listed on the Schedule of
// Classes (soc.uvm.edu). Writes src/data/courses.json. Re-run each
// semester once the next term is published.
import { writeFileSync } from 'fs';
import { aListCourses, bListCourses, csdsElectives } from '../src/data/electives.js';
import { primaryCode } from '../src/lib/catalogue.js';

const OUTPUT = 'src/data/courses.json';

function decodeEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

async function fetchDescription(code) {
  const url = `https://catalogue.uvm.edu/ribbit/?page=getcourse.rjs&code=${encodeURIComponent(code)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const xml = await response.text();

  const match = xml.match(/<p class="courseblockdesc">([\s\S]*?)<div class="notinpdf">/);
  if (!match) return null;
  return decodeEntities(match[1].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

// Terms offered in the Schedule of Classes term picker, e.g. [{ srcdb: '202609', name: 'Fall 2026' }]
async function fetchTerms() {
  const html = await (await fetch('https://soc.uvm.edu/')).text();
  return [...html.matchAll(/<option value="(\d{6})"[^>]*>([^<]+)/g)].map(([, srcdb, name]) => ({ srcdb, name: name.trim() }));
}

async function fetchSections(code, term) {
  const response = await fetch(`https://soc.uvm.edu/api/?page=fose&route=search&alias=${encodeURIComponent(code)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ other: { srcdb: term.srcdb }, criteria: [{ field: 'alias', value: code }] })
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const { results = [] } = await response.json();
  return results
    .filter((s) => s.code === code && !s.isCancelled)
    .map((s) => ({ term: term.name, srcdb: term.srcdb, crn: s.crn, meets: s.meets, instructor: s.instr }));
}

const codes = [...new Set([...aListCourses, ...bListCourses, ...csdsElectives].map(primaryCode).filter(Boolean))].sort();
const terms = await fetchTerms();
console.log(`Schedule of Classes terms: ${terms.map((t) => t.name).join(', ') || 'none'}`);

const courses = {};
const missing = [];
for (const code of codes) {
  try {
    const description = await fetchDescription(code);
    if (!description) {
      missing.push(code);
      continue;
    }
    const sections = (await Promise.all(terms.map((term) => fetchSections(code, term)))).flat();
    courses[code] = { description, sections };
  } catch (error) {
    missing.push(`${code} (${error.message})`);
  }
}

writeFileSync(OUTPUT, JSON.stringify(courses, null, 2) + '\n');
const offered = Object.values(courses).filter((c) => c.sections.length).length;
console.log(`Wrote ${Object.keys(courses).length}/${codes.length} courses to ${OUTPUT} (${offered} scheduled)`);
if (missing.length) console.warn(`Not found in catalogue: ${missing.join(', ')}`);
