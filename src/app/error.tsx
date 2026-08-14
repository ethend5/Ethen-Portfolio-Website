"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-6">
      <div className="text-6xl font-bold text-primary-500">500</div>
      <h1 className="text-2xl font-semibold text-white">Something went wrong</h1>
      <p className="text-text-secondary max-w-md">
        An unexpected error occurred. You can try again or head back home.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={unstable_retry}
          className="px-5 py-2.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-lg border border-white/20 hover:border-primary-500 text-white font-medium transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
