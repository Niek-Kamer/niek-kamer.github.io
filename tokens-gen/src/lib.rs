//! Design token source-of-truth for the portfolio.
//!
//! The values here are authored in Rust and emitted to
//! `src/generated/tokens.ts` by the `tokens-gen` binary. The generated TS file
//! is consumed by `src/styles/theme.css.ts` (Vanilla Extract) and friends.
//!
//! Never hand-edit the generated TS — change the values here and run
//! `bun run codegen`.

pub mod emit;
pub mod fluid;

/// A single token entry: short key + CSS-valid value.
///
/// Insertion order is preserved end-to-end so generated objects come out
/// xs → sm → md → lg → ... rather than alphabetised.
pub type Pair = (&'static str, String);

/// The full design-token surface. Each field becomes one `export const` in TS.
pub struct Spec {
	pub breakpoints: Vec<Pair>,
	pub space: Vec<Pair>,
	pub font_size: Vec<Pair>,
	pub font_weight: Vec<Pair>,
	pub line_height: Vec<Pair>,
	pub letter_spacing: Vec<Pair>,
	pub radius: Vec<Pair>,
	pub shadow: Vec<Pair>,
	pub duration: Vec<Pair>,
	pub easing: Vec<Pair>,
	pub measure: Vec<Pair>,
	/// Fluid `clamp(min, base+vw, max)` strings. Keys mirror semantic
	/// type roles (body, h1, display, ...) so consumers don't need to know
	/// the formula.
	pub fluid: Vec<Pair>,
	/// `grid-template-columns` presets. `minmax(0, 1fr)` instead of plain
	/// `1fr` so children can shrink below their content size (fixes the
	/// classic "code block blows up the grid" overflow).
	pub columns: Vec<Pair>,
	/// Layering scale — semantic names so callers don't sprinkle integers.
	pub z_index: Vec<Pair>,
}

/// Build the complete spec.
#[must_use]
#[allow(clippy::too_many_lines)] // Intentionally one declarative blob — the spec reads top-to-bottom.
pub fn spec() -> Spec {
	// Fluid scale anchors: at 20rem (320px) viewport use the `min` size; at
	// 96rem (1536px) reach the `max`. Beyond 96rem the value is clamped at
	// `max` so very large monitors don't grow text indefinitely.
	let min_vw = 20.0;
	let max_vw = 96.0;
	let f = |min: f64, max: f64| fluid::clamp(min, max, min_vw, max_vw);

	Spec {
		// Breakpoints chosen to cover the full target range:
		//   xs  376px — large phones
		//   sm  640px — small tablets / landscape phones
		//   md  768px — tablets
		//   lg 1024px — small laptops (12–13")
		//   xl 1280px — standard laptops (14–15")
		//  2xl 1536px — large laptops (16–17") / small desktops
		//  3xl 1920px — full-HD desktops / 17" 4K
		//  4xl 2560px — QHD / ultrawide / 27"+
		breakpoints: pairs(&[
			("xs", "23.5rem"),
			("sm", "40rem"),
			("md", "48rem"),
			("lg", "64rem"),
			("xl", "80rem"),
			("2xl", "96rem"),
			("3xl", "120rem"),
			("4xl", "160rem"),
		]),

		// 4px-based spacing scale with halves at the small end.
		space: pairs(&[
			("3xs", "0.125rem"), // 2px
			("2xs", "0.25rem"),  // 4px
			("xs",  "0.5rem"),   // 8px
			("sm",  "0.75rem"),  // 12px
			("md",  "1rem"),     // 16px
			("lg",  "1.5rem"),   // 24px
			("xl",  "2rem"),     // 32px
			("2xl", "3rem"),     // 48px
			("3xl", "4rem"),     // 64px
			("4xl", "6rem"),     // 96px
			("5xl", "8rem"),     // 128px
		]),

		// Static type scale. For headings prefer the fluid versions below.
		font_size: pairs(&[
			("xs",   "0.75rem"),
			("sm",   "0.875rem"),
			("base", "1rem"),
			("lg",   "1.125rem"),
			("xl",   "1.25rem"),
			("2xl",  "1.5rem"),
			("3xl",  "1.875rem"),
			("4xl",  "2.25rem"),
			("5xl",  "3rem"),
			("6xl",  "3.75rem"),
		]),

		font_weight: pairs(&[
			("regular",  "400"),
			("medium",   "500"),
			("semibold", "600"),
			("bold",     "700"),
		]),

		line_height: pairs(&[
			("tight",   "1.1"),
			("snug",    "1.3"),
			("normal",  "1.5"),
			("relaxed", "1.7"),
		]),

		letter_spacing: pairs(&[
			("tight",  "-0.025em"),
			("normal", "0"),
			("wide",   "0.025em"),
		]),

		radius: pairs(&[
			("sm",   "0.25rem"),
			("md",   "0.5rem"),
			("lg",   "0.75rem"),
			("xl",   "1rem"),
			("full", "9999px"),
		]),

		shadow: pairs(&[
			("sm", "0 1px 2px rgb(0 0 0 / 0.08)"),
			("md", "0 4px 12px rgb(0 0 0 / 0.10)"),
			("lg", "0 12px 32px rgb(0 0 0 / 0.14)"),
		]),

		duration: pairs(&[
			("fast",   "120ms"),
			("normal", "220ms"),
			("slow",   "360ms"),
		]),

		easing: pairs(&[
			("standard",   "cubic-bezier(0.2, 0, 0, 1)"),
			("emphasized", "cubic-bezier(0.2, 0, 0, 1.2)"),
		]),

		// Maximum content widths for different reading contexts.
		measure: pairs(&[
			("narrow",    "45ch"),  // sidebar prose
			("prose",     "65ch"),  // long-form reading
			("wide",      "85ch"),  // technical content with figures
			("container", "80rem"), // page chrome
			("full",      "120rem"),// edge-to-edge on widescreens
		]),

		// Fluid roles. Use these for hero/display headings; static sizes above
		// are for body text and UI labels where exact rem values matter.
		fluid: vec![
			pair("xs",      f(0.75, 0.8125)),
			pair("sm",      f(0.875, 0.9375)),
			// Body bumps to 20px at widescreen (was 18px) — comfortable
			// reading at the desktop viewing distance most people sit at.
			pair("body",    f(1.0, 1.25)),
			pair("lg",      f(1.125, 1.375)),
			pair("xl",      f(1.25, 1.625)),
			pair("h4",      f(1.25, 1.75)),
			pair("h3",      f(1.5, 2.25)),
			pair("h2",      f(1.875, 2.75)),
			// Article-title scale. Old `f(2.25, 4.5)` peaked at 72px which
			// was hero-sized — fine for "Niek Kamer" on the homepage, too big
			// for a multi-line blog-post title that wraps to 4 lines on
			// desktop. 56px max keeps weight without overwhelming.
			pair("h1",      f(2.25, 3.5)),
			pair("display", f(3.0, 6.5)),
		],

		// Grid column presets. `minmax(0, 1fr)` rather than `1fr` so children
		// with intrinsic widths (code, pre, long words) can shrink instead of
		// blowing out the row.
		columns: pairs(&[
			("1",  "minmax(0, 1fr)"),
			("2",  "repeat(2, minmax(0, 1fr))"),
			("3",  "repeat(3, minmax(0, 1fr))"),
			("4",  "repeat(4, minmax(0, 1fr))"),
			("6",  "repeat(6, minmax(0, 1fr))"),
			("12", "repeat(12, minmax(0, 1fr))"),
		]),

		// Layering: bigger value = closer to user. Sticky < overlay < modal <
		// toast. `base`/`raised` cover in-flow stacking; `skipLink` is its
		// own thing so a11y always wins.
		z_index: pairs(&[
			("base",     "0"),
			("raised",   "1"),
			("sticky",   "10"),
			("overlay",  "20"),
			("modal",    "30"),
			("toast",    "40"),
			("skipLink", "100"),
		]),
	}
}

fn pairs(items: &[(&'static str, &'static str)]) -> Vec<Pair> {
	items.iter().map(|(k, v)| (*k, (*v).to_string())).collect()
}

fn pair(key: &'static str, value: String) -> Pair {
	(key, value)
}

/// Counts every token across every scale — used in CLI summary output.
#[must_use]
pub fn count(spec: &Spec) -> usize {
	spec.breakpoints.len()
		+ spec.space.len()
		+ spec.font_size.len()
		+ spec.font_weight.len()
		+ spec.line_height.len()
		+ spec.letter_spacing.len()
		+ spec.radius.len()
		+ spec.shadow.len()
		+ spec.duration.len()
		+ spec.easing.len()
		+ spec.measure.len()
		+ spec.fluid.len()
		+ spec.columns.len()
		+ spec.z_index.len()
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn every_scale_is_populated() {
		let s = spec();
		assert!(!s.breakpoints.is_empty());
		assert!(!s.space.is_empty());
		assert!(!s.font_size.is_empty());
		assert!(!s.font_weight.is_empty());
		assert!(!s.line_height.is_empty());
		assert!(!s.letter_spacing.is_empty());
		assert!(!s.radius.is_empty());
		assert!(!s.shadow.is_empty());
		assert!(!s.duration.is_empty());
		assert!(!s.easing.is_empty());
		assert!(!s.measure.is_empty());
		assert!(!s.fluid.is_empty());
		assert!(!s.columns.is_empty());
		assert!(!s.z_index.is_empty());
	}

	#[test]
	fn z_index_skiplink_above_everything() {
		let s = spec();
		let z: std::collections::HashMap<_, _> = s
			.z_index
			.iter()
			.map(|(k, v)| (*k, v.parse::<i32>().expect("z-index must be integer")))
			.collect();
		let skip = z["skipLink"];
		for (k, v) in &z {
			if *k != "skipLink" {
				assert!(skip > *v, "skipLink ({skip}) must outrank {k} ({v})");
			}
		}
	}
}
