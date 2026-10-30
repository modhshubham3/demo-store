import { compactCount } from "@/lib/format";

export default function Rating({ value, count }: { value: number; count: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs">
      <span className="rounded bg-good px-1.5 py-0.5 font-bold text-white">{value.toFixed(1)} ★</span>
      <span className="text-muted">({compactCount(count)})</span>
    </span>
  );
}
