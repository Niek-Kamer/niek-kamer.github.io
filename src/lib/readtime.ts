const WORDS_PER_MINUTE = 200;

export function computeReadTime(body: string): number {
	const stripped = body
		.replace(/```[\s\S]*?```/g, '')
		.replace(/<[A-Z][^>]*\/>/g, '')
		.replace(/^import\s.+$/gm, '')
		.replace(/`[^`]+`/g, 'code')
		.replace(/!\[[^\]]*\]\([^)]+\)/g, '')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/<\/?[a-zA-Z][^>]*>/g, '')
		.replace(/[*_~`#>|]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

	const words = stripped.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
