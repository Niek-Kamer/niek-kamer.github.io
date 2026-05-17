// Niek Kamer — CV
// Compile: typst compile cv/cv.typ public/cv.pdf
// Source of truth. Edit here, recompile, commit both files.

#set document(title: "Niek Kamer — CV", author: "Niek Kamer")
#set page(
  paper: "a4",
  margin: (top: 1.1cm, bottom: 1.1cm, left: 1.4cm, right: 1.4cm),
  numbering: none,
)

// Body in a clean sans, headings in a refined serif. Mirrors the portfolio's
// display/body separation (Fraunces+JetBrains in browser; here a system serif
// because Typst can't load woff2 fonts directly).
#set text(font: "Source Sans 3", size: 9pt, lang: "en")
#set par(justify: false, leading: 0.5em)
#show list: set block(spacing: 0.35em)
#show list: set par(leading: 0.45em)

// Warm copper accent from the portfolio's light theme (theme.css.ts: accent).
#let accent = rgb("#b07348")
#let muted = rgb("#5a554c")

#show link: it => underline(offset: 0.15em, stroke: 0.4pt, text(accent, it))

// Section heading: sentence case, serif, accent color, thin accent rule.
#let section(title) = {
  v(0.3em)
  block(below: 0.15em)[
    #text(font: "Libertinus Serif", size: 10.5pt, weight: "semibold", fill: accent)[#title]
  ]
  line(length: 100%, stroke: 0.3pt + rgb("#d3c9b0"))
  v(0.05em)
}

// Header
#align(center)[
  #text(font: "Libertinus Serif", size: 26pt, weight: "semibold", tracking: 0.5pt)[Niek Kamer]

  #v(0.1em)
  #box(width: 3em)[#line(length: 100%, stroke: 0.6pt + accent)]

  #v(0.05em)
  #text(font: "Libertinus Serif", size: 11pt, fill: muted)[Perf engineering on zk proof systems · Plonky3 maintainer]

  #v(0.1em)
  #text(size: 9pt, fill: muted)[
    Amsterdam, NL
    #h(0.4em) · #h(0.4em)
    #link("mailto:info@axobello.com")[info\@axobello.com]
    #h(0.4em) · #h(0.4em)
    #link("https://github.com/Niek-Kamer")[github.com/Niek-Kamer]
    #h(0.4em) · #h(0.4em)
    #link("https://niek-kamer.github.io")[niek-kamer.github.io]
  ]

  #v(0.2em)
  #text(font: "Libertinus Serif", size: 9.5pt, style: "italic", fill: muted)[Available for zk perf engineering contracts and senior IC roles.]
]

#section[Selected open-source work]

*Plonky3*, maintainer (May 2026 – present) #h(1fr) #text(size: 8.5pt, fill: muted)[#link("https://github.com/Plonky3/Plonky3")[Plonky3/Plonky3]]
- #link("https://github.com/Plonky3/Plonky3/pull/1623")[PR \#1623] (merged): `add_canonical_asm` skips redundant canonicalize on provably-canonical sites. −2.93% end-to-end Goldilocks Poseidon2 prove time on aarch64 NEON; −5.91% / −6.21% on external permute kernels.
- #link("https://github.com/Plonky3/Plonky3/issues/1642")[Issue \#1642] (audit) → #link("https://github.com/Plonky3/Plonky3/pull/1645")[PR \#1645] by \@Nashtare: packed AVX-2 Poseidon1 running 0.77× scalar due to missing Karatsuba back-port. 1.20× wall-time speedup post-fix.
- #link("https://github.com/Plonky3/Plonky3/pull/1656")[PR \#1656] (in review): packed-NEON Poseidon2 dispatch routed through generic. −16.4% Merkle wall time on Pi 5 Cortex-A76 across log₂ leaves ∈ \{14, 16, 18\}.
- #link("https://github.com/Plonky3/Plonky3/pull/1667")[PR \#1667] (in review): cross-permute batched Poseidon2 for widths 8 and 12. −27.2% Zen 5 AVX-2, −31.5% Zen 5 AVX-512, −10.82% Pi 5 NEON (per-permute, width 8).

*zkmcu*, author #h(1fr) #text(size: 8.5pt, fill: muted)[#link("https://github.com/Niek-Kamer/zkmcu")[Niek-Kamer/zkmcu]]
- `no_std` Rust Groth16/BN254 verifier for microcontrollers. Cortex-M33 and RISC-V Hazard3 targets. \~1 s verify on a \$7 RP2350.
- Pairing arithmetic, optimized BN254 G1/G2 ops, fits within RP2350 RAM budget.

*poseidon2-harness*, author #h(1fr) #text(size: 8.5pt, fill: muted)[#link("https://github.com/Niek-Kamer/poseidon2-harness")[Niek-Kamer/poseidon2-harness]]
- Dual-tree differential testing + PMU-cycle benches for Plonky3 Poseidon2 on aarch64 NEON.
- Pulls two Plonky3 commits side-by-side via cargo git deps. Bitwise + canonical oracles across both trees, per-layer + full-permute coverage, widths 8 / 12 / 16 / 20.
- Used during a Plonky3 Poseidon2 audit; turned up two correctness-adjacent findings.

*BNO055 driver fork*, maintainer #h(1fr) #text(size: 8.5pt, fill: muted)[#link("https://github.com/Niek-Kamer/BNO055")[Niek-Kamer/BNO055]]
- `no_std` Rust driver for the Bosch BNO055 9-axis IMU, `embedded-hal` 1.0.
- Removed two `unsafe` blocks in calibration serialization. Fixed a real bug: `AxisRemap::y()` returned the X axis, hidden behind a clippy allow.
- 27-36% per-read latency reduction (page-tracking + bulk-read API). Full sensor loop 9.83 ms → 6.28 ms on Pi 5. Added 206 integration tests where the upstream had zero.

#section[Selected writing]

All at #link("https://niek-kamer.github.io/writing")[niek-kamer.github.io/writing]. Methodology and measurement write-ups documenting the contributions above.

- _The trait-method boundary that cost Plonky3 Poseidon2 27%_ #h(1fr) #text(size: 8.5pt, fill: muted)[May 2026]
- _The AVX-512 kernel that was 1.79× slower than the compiler's_ #h(1fr) #text(size: 8.5pt, fill: muted)[May 2026]
- _The Poseidon2 regression my microbenchmark told me wasn't there_ #h(1fr) #text(size: 8.5pt, fill: muted)[May 2026]
- _The SIMD path that was 0.77× scalar_ #h(1fr) #text(size: 8.5pt, fill: muted)[May 2026]
- _The two instructions hiding in every Goldilocks Poseidon2 add_ #h(1fr) #text(size: 8.5pt, fill: muted)[May 2026]

#section[Skills]

*Languages.* Rust (primary). TypeScript, C, Solidity (reading).

*Architectures.* aarch64 NEON (Cortex-A76, Apple Silicon code-path via shared NEON kernels), x86 AVX-2 / AVX-512 (Zen 5), Cortex-M33, RISC-V Hazard3.

*Performance tooling.* `perf_event_open` with grouped counters, `perf annotate` / `perf stat`, criterion, cargo bench, objdump, GDB. Comfortable reading and writing inline NEON / x86 assembly.

*Domains.* Zero-knowledge cryptography (Groth16, STARKs, FRI, Poseidon1/2 / Goldilocks / Babybear / BN254), `no_std` embedded Rust, perf-counter analysis on superscalar OoO cores.

#section[Experience]

*Founder, Axobello* (2025 – present) #h(1fr) #text(size: 8.5pt, fill: muted)[Saint Martin / Amsterdam] \
Independent software work. Current focus: zero-knowledge proof system performance engineering, embedded ZK verification.

#section[Education]

MBO (Netherlands vocational secondary education). Self-taught in systems programming, cryptography, and zero-knowledge proof systems.
