"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const INDUSTRIES = [
  "Healthcare",
  "Engineering",
  "IT",
  "Education",
  "Hospitality",
  "Construction",
  "Other",
];

export default function ApplyPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const fileInput = e.currentTarget.file;
    if (fileInput.files[0] && fileInput.files[0].size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/submit-application', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.error || "Submission failed");
      }

      const { id: sessionId } = await res.json();
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId });

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10 px-4">
      <form className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">Submission Form</h1>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Full Name (As per passport): *</label>
          <input name="name" className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Country of Origin: *</label>
          <input name="country" className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Email: *</label>
          <input name="email" type="email" className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Phone Number (With Country Code): *</label>
          <input name="phone" className="w-full border rounded px-3 py-2" required />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Preferred Industry *</label>
          <select name="industry" defaultValue="" className="w-full border rounded px-3 py-2" required>
            <option value="" disabled>Select industry</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Your resume/CV: *</label>
          <input name="file" type="file" accept=".pdf,.doc,.docx" className="w-full border rounded px-3 py-2" required />
          <div className="text-xs text-gray-500 mt-1">Size limit: 10 MB.</div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Short description about yourself:</label>
          <textarea name="description" className="w-full border rounded px-3 py-2" rows={4} />
        </div>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full">
          {loading ? "Processing..." : "Submit & Pay $6.99 SGD"}
        </button>
      </form>
    </div>
  );
} 