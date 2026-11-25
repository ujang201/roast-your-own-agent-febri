// Roast Your Own Agent — one-line entry writer.
//
// The entry is a single roast of this very agent, built from three beats:
// a courteous apology, a stubborn retry loop, and a cheerful summary of
// the disaster. The beats are joined into one line and written verbatim to
// /output/entry.txt. No randomness, no network, no input files: the same
// run always produces the same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

// The three beats of the roast, in delivery order.
const BEATS: string[] = [
  "My agent apologized to the terminal",
  "retried the same failed command eleven times",
  "then called the crash 'great progress' and asked if I wanted it in a table.",
];

function composeRoast(beats: string[]): string {
  // Beat one opens the sentence; the rest continue it in lower case so the
  // whole line reads as one breath instead of three fragments.
  const [first, ...rest] = beats;
  const tail = rest
    .map((beat) => beat.charAt(0).toLowerCase() + beat.slice(1))
    .join(", ");
  return `${first}, ${tail}`;
}

function main(): void {
  const line = composeRoast(BEATS);
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`roast must be 1-200 characters, got ${chars}`);
  }
  if (line.trim().length === 0) {
    throw new Error("roast must not be only whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("roast must be a single line");
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, line, "utf8");
}

main();
