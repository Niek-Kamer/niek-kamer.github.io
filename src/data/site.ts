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
	cloudflareAnalyticsToken?: string;
};

export const site: SiteConfig = {
	name: 'Niek Kamer',
	title: 'Niek Kamer | Embedded ZK & low-level performance',
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
			{ platform: 'telegram', url: 'https://t.me/NiekK01', handle: '@NiekK01' },
			{
				platform: 'hackernews',
				url: 'https://news.ycombinator.com/user?id=niekkamer',
				handle: 'niekkamer',
			},
		],
	},
	nav: [
		{ label: 'Work', href: '/projects' },
		{ label: 'Writing', href: '/writing' },
		{ label: 'About', href: '/about' },
		{ label: 'Contact', href: '/contact' },
	],
	ogImage: '/og/default.svg',
	now: 'Plonky3 maintainer focused on Goldilocks Poseidon2 perf across aarch64 NEON and Zen 5 AVX-2/-512. Recently shipped cross-permute batching (PR #1667) and open-sourced the differential harness it was built on.',
	featured: [
		{
			label: 'Featured project',
			name: 'Plonky3 Goldilocks performance',
			url: '/projects/plonky3-goldilocks-perf',
			summary:
				'Plonky3 maintainer. Goldilocks Poseidon perf work on aarch64 NEON and x86 AVX — 26-31% per-permute speedups across architectures.',
		},
	],
	cloudflareAnalyticsToken: 'a649319688e04742a47da5fd8a42ddba',
};
