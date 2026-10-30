import { useId } from "react";
import type { Garment as GarmentType } from "@/data/products";

const EDGE = "rgba(0,0,0,0.22)";
const SHINE = "rgba(255,255,255,0.16)";

/** Flat vector garment, used until a product has a real photo. */
export default function Garment({ type, color, className }: { type: GarmentType; color: string; className?: string }) {
  const clipId = useId();
  const bodies: string[] = [];
  const body = { fill: color, stroke: EDGE, strokeWidth: 1.4, strokeLinejoin: "round" as const };
  const line = { fill: "none", stroke: EDGE, strokeWidth: 1.4, strokeLinecap: "round" as const };

  const rec = (d: string) => {
    bodies.push(d);
    return d;
  };

  let shape: React.ReactNode;
  switch (type) {
    case "tee":
      shape = (
        <>
          <path {...body} d={rec("M32 14 L10 30 L19 46 L29 40 L29 104 L71 104 L71 40 L81 46 L90 30 L68 14 Q50 28 32 14 Z")} />
          <path {...line} d="M32 14 Q50 28 68 14" />
        </>
      );
      break;
    case "shirt":
      shape = (
        <>
          <path {...body} d={rec("M32 12 L8 34 L16 76 L27 73 L29 44 L29 106 L71 106 L71 44 L73 73 L84 76 L92 34 L68 12 Q50 24 32 12 Z")} />
          <path {...line} d="M32 12 L50 34 L68 12" />
          <path {...line} d="M50 34 V106" />
          {[48, 62, 76, 90].map((y) => (
            <circle key={y} cx="50" cy={y} r="1.4" fill={EDGE} />
          ))}
        </>
      );
      break;
    case "hoodie":
      shape = (
        <>
          <path {...body} d={rec("M32 20 L8 40 L14 90 L26 88 L28 108 L72 108 L74 88 L86 90 L92 40 L68 20 Q50 36 32 20 Z")} />
          <path {...body} d={rec("M34 20 Q34 2 50 2 Q66 2 66 20 Q50 34 34 20 Z")} />
          <path {...line} d="M44 30 V48 M56 30 V48" />
          <path {...line} d="M34 84 H66 L70 100 H30 Z" />
        </>
      );
      break;
    case "jacket":
      shape = (
        <>
          <path {...body} d={rec("M32 12 L8 34 L14 88 L26 86 L28 108 L72 108 L74 86 L86 88 L92 34 L68 12 Q50 22 32 12 Z")} />
          <path {...line} d="M32 12 L44 30 V108 M68 12 L56 30 V108" />
          <path {...line} d="M34 80 H44 M56 80 H66" />
        </>
      );
      break;
    case "kurta":
      shape = (
        <>
          <path {...body} d={rec("M34 10 L12 28 L18 48 L30 43 L24 116 L76 116 L70 43 L82 48 L88 28 L66 10 Q50 22 34 10 Z")} />
          <path {...line} d="M50 20 V66" />
          <circle cx="50" cy="30" r="1.4" fill={EDGE} />
          <circle cx="50" cy="42" r="1.4" fill={EDGE} />
          <path {...line} d="M24 116 L30 92 M76 116 L70 92" />
        </>
      );
      break;
    case "dress":
      shape = (
        <>
          <path {...body} d={rec("M38 8 L29 44 L12 116 L88 116 L71 44 L62 8 Q50 22 38 8 Z")} />
          <path {...line} d="M29 44 Q50 54 71 44" />
          <path {...line} d="M20 92 Q50 104 80 92" />
        </>
      );
      break;
    case "jeans":
      shape = (
        <>
          <path {...body} d={rec("M26 8 H74 L80 116 H55 L50 46 L45 116 H20 Z")} />
          <path {...line} d="M26 18 H74 M50 18 V46" />
          <path {...line} d="M32 22 Q36 30 34 36 M68 22 Q64 30 66 36" />
        </>
      );
      break;
    case "saree":
      shape = (
        <>
          <path {...body} d={rec("M36 8 L28 42 L14 116 L86 116 L72 42 L64 8 Q50 20 36 8 Z")} />
          <path d="M64 8 L72 42 L60 116 L40 116 L58 30 Z" fill="rgba(0,0,0,0.14)" />
          <path {...line} d="M26 100 H76" />
          <path {...line} d="M22 108 H80" />
        </>
      );
      break;
    case "stole":
      shape = (
        <path {...body} d={rec("M8 28 Q29 8 50 28 T92 28 L92 96 Q71 76 50 96 T8 96 Z")} />
      );
      break;
  }

  return (
    <svg viewBox="0 0 100 124" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="50" cy="120" rx="30" ry="3" fill="rgba(0,0,0,0.12)" />
      {shape}
      <clipPath id={clipId}>
        {bodies.map((d) => (
          <path key={d} d={d} />
        ))}
      </clipPath>
      <path d="M44 0 L66 0 L50 124 L28 124 Z" fill={SHINE} clipPath={`url(#${clipId})`} />
    </svg>
  );
}
