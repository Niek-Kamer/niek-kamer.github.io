// Niek Kamer — CV
// Compile: typst compile cv/cv.typ public/cv.pdf
// Source of truth. Edit here, recompile, commit both files.

#set document(title: "Niek Kamer — CV", author: "Niek Kamer")
#set page(
  paper: "a4",
  margin: (top: 1.3cm, bottom: 1.3cm, left: 1.5cm, right: 1.5cm),
  numbering: none,
)
#set text(font: "Noto Sans", size: 9.5pt, lang: "en")
#set par(justify: false, leading: 0.5em)
#show link: it => underline(text(rgb("#0a4cc4"), it))
#show list: set block(spacing: 0.5em)
#show list: set par(leading: 0.5em)

// Section heading helper
#let section(title) = {
  v(0.3em)
  block(below: 0.2em)[
    #text(size: 10pt, weight: "bold", upper(title))
  ]
  line(length: 100%, stroke: 0.4pt)
  v(0.1em)
}

// Header
#align(center)[
  #text(size: 20pt, weight: "bold")[Niek Kamer]

  #text(size: 10.5pt)[Perf engineering on zk proof systems. Plonky3 maintainer.]

  #v(-0.3em)
  #text(size: 9pt)[
    Amsterdam, NL
    #h(0.4em) · #h(0.4em)
    #link("mailto:info@axobello.com")[info\@axobello.com]
    #h(0.4em) · #h(0.4em)
    #link("https://github.com/Niek-Kamer")[github.com/Niek-Kamer]
    #h(0.4em) · #h(0.4em)
    #link("https://niek-kamer.github.io")[niek-kamer.github.io]
  ]

  #v(-0.4em)
  #text(size: 9pt, style: "italic")[Available for zk perf engineering contracts and senior IC roles.]
]

#section[Selected open-source work]

*Plonky3 — maintainer* (May 2026 – present) #h(1fr) #link("https://github.com/Plonky3/Plonky3")[github.com/Plonky3/Plonky3]
- #link("https://github.com/Plonky3/Plonky3/pull/1623")[PR \#1623] (merged): `add_canonical_asm` skips redundant canonicalize on provably-canonical sites. −2.93% end-to-end Goldilocks Poseidon2 prove time on aarch64 NEON; −5.91% / −6.21% on external permute kernels.
- #link("https://github.com/Plonky3/Plonky3/issues/1642")[Issue \#1642] (audit) → #link("https://github.com/Plonky3/Plonky3/pull/1645")[PR \#1645] by \@Nashtare: packed AVX-2 Poseidon1 running 0.77× scalar due to missing Karatsuba back-port. 1.20× wall-time speedup post-fix.
- #link("https://github.com/Plonky3/Plonky3/pull/1656")[PR \#1656] (in review): packed-NEON Poseidon2 dispatch routed through generic. −16.4% Merkle wall time on Pi 5 Cortex-A76 across log₂ leaves ∈ \{14, 16, 18\}.
- #link("https://github.com/Plonky3/Plonky3/pull/1667")[PR \#1667] (in review): cross-permute batched Poseidon2 for widths 8 and 12. −27.2% Zen 5 AVX-2, −31.5% Zen 5 AVX-512, −10.82% Pi 5 NEON (per-permute, width 8).

*zkmcu — author* #h(1fr) #link("https://github.com/Niek-Kamer/zkmcu")[github.com/Niek-Kamer/zkmcu]
- `no_std` Rust Groth16/BN254 verifier for microcontrollers. Cortex-M33 and RISC-V Hazard3 targets. \~1 s verify on a \$7 RP2350.
- Pairing arithmetic, optimized BN254 G1/G2 ops, fits within RP2350 RAM budget.

*poseidon2-harness — author* #h(1fr) #link("https://github.com/Niek-Kamer/poseidon2-harness")[github.com/Niek-Kamer/poseidon2-harness]
- Dual-tree differential testing + PMU-cycle benches for Plonky3 Poseidon2 on aarch64 NEON.
- Pulls two Plonky3 commits side-by-side via cargo git deps. Bitwise + canonical oracles across both trees, per-layer + full-permute coverage, widths 8 / 12 / 16 / 20.
- Used during a Plonky3 Poseidon2 audit; turned up two correctness-adjacent findings.

#section[Selected writing]

All at #link("https://niek-kamer.github.io/writing")[niek-kamer.github.io/writing]. Methodology + measurement write-ups documenting the contributions above.

- The trait-method boundary that cost Plonky3 Poseidon2 27% (2026-05-17)
- The AVX-512 kernel that was 1.79× slower than the compiler's (2026-05-16)
- The Poseidon2 regression my microbenchmark told me wasn't there (2026-05-15)
- The SIMD path that was 0.77× scalar (2026-05-13)
- The two instructions hiding in every Goldilocks Poseidon2 add (2026-05-13)

#section[Skills]

*Languages.* Rust (primary). TypeScript, C, Solidity (reading).

*Architectures.* aarch64 NEON (Cortex-A76, Apple Silicon code-path via shared NEON kernels), x86 AVX-2 / AVX-512 (Zen 5), Cortex-M33, RISC-V Hazard3.

*Performance tooling.* `perf_event_open` with grouped counters, `perf annotate` / `perf stat`, criterion, cargo bench, objdump, GDB. Comfortable reading and writing inline NEON / x86 assembly.

*Domains.* Zero-knowledge cryptography (Groth16, STARKs, FRI, Poseidon1/2 / Goldilocks / Babybear / BN254), `no_std` embedded Rust, perf-counter analysis on superscalar OoO cores.

#section[Experience]

*Founder, Axobello* (2025 – present) #h(1fr) Saint Martin / Amsterdam \
Independent software work. Current focus: zero-knowledge proof system performance engineering, embedded ZK verification.

#section[Education]

MBO (Netherlands vocational secondary education). Self-taught in systems programming, cryptography, and zero-knowledge proof systems.
