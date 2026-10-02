import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-start justify-center px-4 py-24 sm:px-6">
      <p className="kicker text-teal">404</p>
      <h1 className="display mt-3 text-6xl text-white">Nothing here.</h1>
      <p className="mt-4 text-lg text-chalk">That page does not exist, or it moved. The rest of the site is one tap away.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-teal">
          Back to the start
        </Link>
        <Link href="/be-the-guy" className="btn btn-ghost">
          Be the guy
        </Link>
      </div>
    </div>
  );
}
