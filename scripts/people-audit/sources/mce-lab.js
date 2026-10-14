// Morphology, Evolution & Cognition Lab (https://www.meclab.org/people)
//
// Wix site: the page HTML has no names, the browser fills them in from a page
// JSON file. The HTML does name that file, so we read it directly. People are
// photos in a single gallery, each with a title (the name) and a description
// like "PhD student (2019-2024)". There are no current/former headings, so the
// description decides: "present" or an open year range ("(2023-)") means
// current, anything else means alumni.
//
// Wix writes a new JSON file only when this page is edited (its name ends in
// the site revision), so the file's Last-Modified is the page's edit date.
//
// Photos are Wix media files. We ask Wix's image service for a centred square
// JPEG of at most 600px (never larger than the upload, to avoid upscaling).

const PAGE = 'https://www.meclab.org/people';
const PAGE_JSON = (file) => `https://static.wixstatic.com/sites/${file}.json.z?v=3`;
const MEDIA = 'https://static.wixstatic.com/media/';

export default {
	group: 'mce-lab',
	url: PAGE,

	async fetch() {
		const page = await fetch(PAGE);
		if (!page.ok) throw new Error(`${PAGE} responded ${page.status}`);
		const html = await page.text();
		const file = html.match(/"pageUriSEO":"people","pageJsonFileName":"([^"]+)"/)?.[1];
		if (!file) throw new Error(`${PAGE} no longer names its page JSON`);

		const res = await fetch(PAGE_JSON(file));
		if (!res.ok) throw new Error(`${PAGE_JSON(file)} responded ${res.status}`);
		const items = (await res.json()).data.document_data;
		const ref = (id) => items[id?.replace(/^#/, '')];

		const people = [];
		// Every gallery on the page, photos in page order
		for (const gallery of Object.values(items).filter((i) => i.type === 'ImageList')) {
			for (const photo of gallery.items.map(ref)) {
				const description = (photo?.description || '').trim();
				// The starfish and the roboctopus are lab mascots
				if (!photo?.title || /mascot/i.test(description)) continue;

				people.push({
					// "Krishna Srinivasan (PhD student, 2021 - present)", "Sean Beaulieu."
					name: photo.title
						.replace(/\(.*\)/, '')
						.replace(/\.\s*$/, '')
						.trim(),
					role: description.replace(/\.$/, ''),
					status: isCurrent(description) ? 'current' : 'alumni',
					url: ref(photo.link)?.url || '',
					photo: photoUrl(photo)
				});
			}
		}

		const modified = res.headers.get('last-modified');
		return { lastChanged: modified ? new Date(modified) : null, people };
	}
};

function isCurrent(description) {
	if (/director/i.test(description)) return true;
	if (/present/i.test(description)) return true;
	// "(2020--)", "(2023-)", "PhD (2026-)"
	return /\d{4}\s*-+\s*\)?\.?$/.test(description);
}

function photoUrl({ uri, width, height }) {
	if (!uri) return '';
	const side = Math.min(600, width || 600, height || 600);
	const name = uri.replace(/\.\w+$/, '.jpg');
	return `${MEDIA}${uri}/v1/fill/w_${side},h_${side},al_c,q_85/${name}`;
}
