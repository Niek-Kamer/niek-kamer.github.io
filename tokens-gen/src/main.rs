//! Codegen CLI.
//!
//! Usage:
//!   tokens-gen [output-path]
//!
//! Default output: `../src/generated/tokens.ts` (relative to crate root).

use std::env;
use std::fs;
use std::path::PathBuf;
use std::process::ExitCode;

use tokens_gen::{count, emit, spec};

const DEFAULT_OUTPUT: &str = "../src/generated/tokens.ts";

fn main() -> ExitCode {
	let args: Vec<String> = env::args().collect();
	let output_arg = args.get(1).map_or(DEFAULT_OUTPUT, String::as_str);
	let output = PathBuf::from(output_arg);

	let spec = spec();
	let ts = emit::typescript(&spec);

	if let Some(parent) = output.parent()
		&& let Err(e) = fs::create_dir_all(parent)
	{
		eprintln!("✗ create_dir_all({}): {e}", parent.display());
		return ExitCode::from(1);
	}

	if let Err(e) = fs::write(&output, &ts) {
		eprintln!("✗ write({}): {e}", output.display());
		return ExitCode::from(1);
	}

	eprintln!(
		"✓ wrote {tokens} tokens ({bytes} bytes) → {path}",
		tokens = count(&spec),
		bytes = ts.len(),
		path = output.display(),
	);

	ExitCode::SUCCESS
}
