import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-white text-gray-900">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Welcome to StudyShare!</h1>
        <p className="text-lg text-gray-600">
          Your collaborative platform for sharing learning resources.
        </p>
        <div className="flex flex-col items-center space-y-4">
          <Link
            href="/dashboard"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/login"
            className="inline-block px-6 py-3 bg-gray-100 text-gray-800 rounded-lg shadow hover:bg-gray-200 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}