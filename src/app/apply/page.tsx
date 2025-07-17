"use client";
import { useState } from "react";

export default function ApplyPage() {
  const [refId, setRefId] = useState("");

  function handleSubmit() {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    setRefId(`SG2025-${randomId}`);
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-blue-900 mb-2 text-center">Apply to Work in Singapore</h1>
        <p className="text-center text-gray-600 mb-6">Submit your application below. We will contact you if you are shortlisted.</p>
        <form
          action="https://formspree.io/f/your-form-id" // TODO: Replace with real Formspree ID
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <label className="block mb-2 font-medium">Full Name *</label>
          <input name="name" required className="w-full mb-4 px-3 py-2 border rounded" />

          <label className="block mb-2 font-medium">Country of Origin *</label>
          <input name="country" required className="w-full mb-4 px-3 py-2 border rounded" />

          <label className="block mb-2 font-medium">Email *</label>
          <input name="email" type="email" required className="w-full mb-4 px-3 py-2 border rounded" />

          <label className="block mb-2 font-medium">Phone Number</label>
          <input name="phone" className="w-full mb-4 px-3 py-2 border rounded" />

          <label className="block mb-2 font-medium">Upload Resume/CV</label>
          <input name="resume" type="file" accept=".pdf,.doc,.docx" className="w-full mb-4" />

          <label className="block mb-2 font-medium">Short Message</label>
          <textarea name="message" rows={3} className="w-full mb-4 px-3 py-2 border rounded" />

          <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded font-semibold hover:bg-blue-800 transition">Submit Application</button>
        </form>
        {refId && (
          <div className="mt-6 text-green-700 text-center font-medium">
            Your application has been received. Reference ID: {refId}
          </div>
        )}
      </div>
    </div>
  );
} 