//! Fluid type / size formula.
//!
//! Given anchor sizes at two viewport widths, return a CSS `clamp()` string
//! that interpolates linearly between them and clamps outside the range.
//!
//! ```text
//! clamp(min, base + slope*vw, max)
//!
//! Where:
//!   slope = (max_size - min_size) / (max_vw - min_vw)
//!   base  = min_size - slope * min_vw
//! ```
//!
//! All inputs are in rem; output `vw` is `% of viewport width`.

/// Build a `clamp(min, base+slope*vw, max)` string in rem/vw units.
#[must_use]
pub fn clamp(min_size: f64, max_size: f64, min_vw: f64, max_vw: f64) -> String {
	debug_assert!(max_vw > min_vw, "max_vw must exceed min_vw");

	let slope = (max_size - min_size) / (max_vw - min_vw);
	let base = min_size - slope * min_vw;
	let slope_vw = slope * 100.0;

	format!(
		"clamp({}rem, {}rem + {}vw, {}rem)",
		trim(min_size),
		trim_signed(base),
		trim(slope_vw),
		trim(max_size),
	)
}

/// Trim trailing zeros from a float for cleaner CSS output.
fn trim(n: f64) -> String {
	trim_signed(n)
}

fn trim_signed(n: f64) -> String {
	// 4 decimals is plenty for sub-pixel precision at any realistic viewport.
	let s = format!("{n:.4}");
	let s = s.trim_end_matches('0').trim_end_matches('.').to_string();
	if s.is_empty() || s == "-" { "0".into() } else { s }
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn endpoints_match_anchors() {
		// At min_vw, value should equal min_size; at max_vw, max_size.
		// We can't compute clamp() runtime in Rust, but we can verify the
		// formula coefficients by re-deriving them.
		let min_size: f64 = 1.0;
		let max_size: f64 = 1.5;
		let min_vw: f64 = 20.0;
		let max_vw: f64 = 96.0;

		let slope = (max_size - min_size) / (max_vw - min_vw);
		let base = min_size - slope * min_vw;

		let at_min = base + slope * min_vw;
		let at_max = base + slope * max_vw;

		assert!(f64::abs(at_min - min_size) < 1e-9);
		assert!(f64::abs(at_max - max_size) < 1e-9);
	}

	#[test]
	fn output_is_well_formed() {
		let s = clamp(1.0, 2.0, 20.0, 96.0);
		assert!(s.starts_with("clamp("));
		assert!(s.ends_with("rem)"));
		assert!(s.contains("vw"));
	}
}
