import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-6">
      <div className="text-8xl font-bold text-primary-500 leading-none">404</div>
      <h1 className="text-2xl font-semibold text-white">Page not found</h1>
      <p className="text-text-secondary max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
