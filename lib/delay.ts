import type { CSSProperties } from "react";

/**
 * Helper stagger untuk animasi scroll-reveal.
 * Dipakai sebagai: <div className="reveal" style={delay(120)} />
 */
export function delay(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}
