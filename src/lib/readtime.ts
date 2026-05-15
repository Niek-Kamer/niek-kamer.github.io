/**
 * Build-time read time estimation from raw MDX body strings.
 *
 * Strips code blocks, JSX components (self-closing or paired wrapper tags
 * that don't carry prose like `<details>`), import statements, and markdown
 * syntax characters, then counts what's left and divides by an assumed
 * reading speed for technical content.
 *
 * 220 WPM is a calibrated middle ground: pure-prose adult reading sits
 * around 250-300 WPM, but writing posts here are code- / table- / math-
 * heavy, which slows readers down. Bumping it lower than 220 starts to
 * overstate short posts; higher starts to understate long ones.
 *
 * Returns an integer minute count, minimum 1.
 */

const WORDS_PER_MINUTE = 220;

export function computeReadTime(body: string): number {
	const stripped = body
		// Fenced code blocks — readers skim, not read.
		.replace(/```[\s\S]*?```/g, '')
		// Self-closing JSX components (`<Foo ... />`). Multi-line props
		// allowed because `[^>]` admits newlines. Caps the open with `[A-Z]`
		// so we don't accidentally strip native HTML self-closing like `<br/>`.
		.replace(/<[A-Z][^>]*\/>/g, '')
		// Import statements that MDX hoists to the top of the file.
		.replace(/^import\s.+$/gm, '')
		// Inline code → keep as a single word token rather than each
		// punctuation char counting separately.
		.replace(/`[^`]+`/g, 'code')
		// Markdown images.
		.replace(/!\[[^\]]*\]\([^)]+\)/g, '')
		// Markdown links: keep the visible text, drop the URL.
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		// Remaining HTML / JSX tags (keep their content, drop the markup).
		// This handles things like `<details>`, `<summary>`, paired
		// components — readers still read the prose inside them.
		.replace(/<\/?[a-zA-Z][^>]*>/g, '')
		// Markdown syntax characters (headings, emphasis, blockquote
		// markers, list pipes). Replaced with spaces so words don't fuse.
		.replace(/[*_~`#>|]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

	const words = stripped.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
