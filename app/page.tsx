import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
      <div className="z-10 max-w-500px w-full items-center justify-center font-mono text-sm flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-th-blue italic">dee insights</h1>
        <p className="text-center text-gray-600">
          AI-powered advertising analytics for high-growth teams.
        </p>
        <Link 
          href="/dashboard"
          className="px-6 py-3 bg-th-blue text-white rounded-md hover:bg-opacity-90 transition-all font-semibold"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
