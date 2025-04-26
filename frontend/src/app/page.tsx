// src/app/page.tsx

export default function LandingPage() {
    return (
      <main className="flex items-center justify-center min-h-screen bg-white text-gray-900">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Welcome to StudyShare!</h1>
          <p className="text-lg text-gray-600">Your collaborative platform for sharing learning resources.</p>
          <a
            href="/dashboard"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </a>
        </div>
      </main>
    );
  }
  