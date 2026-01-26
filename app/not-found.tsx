// app/not-found.tsx
import Link from 'next/link';

export default function RootNotFound() {
  return (
    <div className="min-h-screen bg-stone-200 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-neutral-700 mb-8">Page not found</p>
        <Link
          href="/"
          className="inline-block bg-neutral-900 text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
