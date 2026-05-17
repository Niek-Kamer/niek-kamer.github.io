export type SocialPlatform =
	| 'github'
	| 'mastodon'
	| 'x'
	| 'linkedin'
	| 'telegram'
	| 'email'
	| 'website'
	| 'hackernews'
	| 'reddit';

export type SocialLink = {
	platform: SocialPlatform;
	url: string;
	handle?: string;
};

export type NavLink = {
	label: string;
	href: string;
	external?: boolean;
};

export type Author = {
	name: string;
	location: string;
	bio: string;
	socials: SocialLink[];
};

export type FeaturedProject = {
	name: string;
	url: string;
	summary: string;
	label?: string;
};

export type SiteConfig = {
	name: string;
	title: string;
	description: string;
	url: string;
	locale: string;
	author: Author;
	nav: NavLink[];
	ogImage: string;
	now: string;
	featured: FeaturedProject[];
};

export const site: SiteConfig = {
	name: 'Niek Kamer',
	title: 'Niek Kamer — Embedded ZK & low-level performance',
	description:
		'Engineer focused on zero-knowledge cryptography for resource-constrained devices and Rust performance work.',
	url: 'https://niek-kamer.github.io',
	locale: 'en',
	author: {
		name: 'Niek Kamer',
		location: 'Amsterdam, NL',
		bio: "Zero-knowledge cryptography on hardware that's too small or too slow to be taken seriously. Turns out the hardware can usually be persuaded.",
		socials: [
			{ platform: 'github', url: 'https://github.com/Niek-Kamer', handle: '@Niek-Kamer' },
			{ platform: 'x', url: 'https://x.com/Niek0105', handle: '@Niek0105' },
			{
				platform: 'linkedin',
				url: 'https://www.linkedin.com/in/niek-kamer-061bb2344/',
			},
			{ platform: 'telegram', url: 'https://t.me/Niek01', handle: '@Niek01' },
			{
				platform: 'hackernews',
				url: 'https://news.ycombinator.com/user?id=niekkamer',
				handle: 'niekkamer',
			},
			{
				platform: 'reddit',
				url: 'https://www.reddit.com/user/niekkamer01/',
				handle: 'u/niekkamer01',
			},
		],
	},
	nav: [
		{ label: 'Work', href: '/projects' },
		{ label: 'Writing', href: '/writing' },
		{ label: 'About', href: '/about' },
	],
	ogImage: '/og/default.svg',
	now: 'Shipping perf contributions to Plonky3 (Goldilocks Poseidon2 on Pi 5 NEON) and polishing zkmcu for v0.2.',
	featured: [
		{
			label: 'Featured project',
			name: 'zkmcu',
			url: 'https://zkmcu.dev/',
			summary:
				'A no_std Rust Groth16/BN254 verifier that runs on a $7 RP2350 microcontroller in ~1 second.',
		},
	],
};
