import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to TechNova</h1>
        <p className="text-lg text-gray-600 mb-8">
          A full-stack application for managing products and users with role-based access.
        </p>
        <Link
          href="/dashboard/login"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
