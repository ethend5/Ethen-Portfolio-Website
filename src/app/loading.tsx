export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] animate-pulse">
      {/* Hero skeleton */}
      <div className="flex flex-col items-center justify-center min-h-[90vh] px-6 gap-6">
        <div className="h-4 w-32 rounded bg-white/10" />
        <div className="h-12 w-96 max-w-full rounded bg-white/10" />
        <div className="h-8 w-72 max-w-full rounded bg-white/10" />
        <div className="h-5 w-80 max-w-full rounded bg-white/10" />
        <div className="flex gap-4 mt-4">
          <div className="h-11 w-36 rounded-lg bg-white/10" />
          <div className="h-11 w-36 rounded-lg bg-white/10" />
        </div>
      </div>

      {/* Section skeleton */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-10">
        <div className="h-8 w-48 rounded bg-white/10 mx-auto" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 rounded-xl bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
