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
  const [form, setForm] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    localStorage.setItem("pendingFormData", JSON.stringify(form));
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem("pendingFile", reader.result as string);
        startStripe();
      };
      reader.readAsDataURL(file);
    } else {
      startStripe();
    }
    async function startStripe() {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const { id } = await res.json();
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: id });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10 px-4">
      <form className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-blue-900 mb-4 text-center">Submission Form</h1>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900">Full Name (As per passport): *</label>
          <input name="name" onChange={handleChange} className="w-full border rounded px-3 py-2 text-gray-900" required />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900">Country of Origin: *</label>
          <input name="country" onChange={handleChange} className="w-full border rounded px-3 py-2 text-gray-900" required />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900">Email: *</label>
          <input name="email" type="email" onChange={handleChange} className="w-full border rounded px-3 py-2 text-gray-900" required />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900">Phone Number (With Country Code): *</label>
          <input name="phone" onChange={handleChange} className="w-full border rounded px-3 py-2 text-gray-900" required />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900">Preferred Industry *</label>
          <select name="industry" defaultValue="" onChange={handleChange} className="w-full border rounded px-3 py-2 text-gray-900" required>
            <option value="" disabled>Select industry</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900">Your resume/CV: *</label>
          <input name="file" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="w-full border rounded px-3 py-2 text-gray-900" required />
          <div className="text-xs text-gray-700 mt-1">Size limit: 10 MB.</div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-900">Short description about yourself:</label>
          <textarea name="description" onChange={handleChange} className="w-full border rounded px-3 py-2 text-gray-900" rows={4} />
        </div>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full">
          {loading ? "Processing..." : "Submit & Pay"}
        </button>
      </form>
    </div>
  );
} 