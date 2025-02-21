import { Link } from "react-router";

export default function NotFound() {
  return (
    <div
        className="flex flex-col items-center justify-center min-h-screen"
        onClick={(e) => e.preventDefault()}
    >
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Oops! Pag not found.</p>
      <Link 
        to="/" 
        className="mt-6 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}