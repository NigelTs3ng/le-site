import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">Thank You!</h1>
        <p className="text-gray-700 mb-6">Thank you for submitting your application. We will contact you shortly if you are shortlisted.</p>
        <Link href="/" className="inline-block mt-4 px-6 py-3 bg-blue-700 text-white rounded-full font-semibold shadow hover:bg-blue-800 transition">Back to Home</Link>
      </div>
    </div>
  );
} 