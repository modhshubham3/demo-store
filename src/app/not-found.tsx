import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1 className="text-4xl font-extrabold">Page not found</h1>
      <p className="mt-4 text-muted">That page does not exist.</p>
      <Link href="/" className="mt-6 inline-block font-bold text-accent">
        Back to shop →
      </Link>
    </>
  );
}
