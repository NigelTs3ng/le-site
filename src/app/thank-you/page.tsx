import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10 px-4 text-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">Thank You!</h1>
        <p className="text-gray-700 mb-2">
          Your payment has been processed successfully.
        </p>
        <p className="text-gray-700">
          Your application has been submitted, and you will receive a confirmation email shortly.
        </p>
      </div>
    </div>
  );
} 