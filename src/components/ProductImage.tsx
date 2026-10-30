import Image from "next/image";
import type { Garment as GarmentType, Product } from "@/data/products";
import Garment from "./Garment";

type Look = Pick<Product, "garment" | "color" | "tint"> & { image?: string; name?: string };

/** Real photo when `image` is set, otherwise a garment illustration on a tinted background. */
export default function ProductImage({
  item,
  className = "",
  sizes = "(max-width: 768px) 50vw, 25vw",
}: {
  item: Look;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `radial-gradient(circle at 50% 38%, #ffffffaa, ${item.tint} 70%)`, backgroundColor: item.tint }}
    >
      {item.image ? (
        <Image src={item.image} alt={item.name ?? ""} fill sizes={sizes} className="object-cover" />
      ) : (
        <Garment type={item.garment as GarmentType} color={item.color} className="h-[78%] w-auto" />
      )}
    </div>
  );
}
