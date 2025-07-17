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
        <p className="text-center text-gray-700 mb-2">Submit your resume to our database. You can use or resubmit your profile anytime.</p>
        <p className="text-center text-gray-700 mb-2">One-time registration/processing fee applies.</p>
        <p className="text-center text-gray-700 mb-2">Come direct to us and avoid middlemen fees in your country.</p>
        <div className="text-center text-blue-700 text-sm mb-4">
          <span>Check for yourself: </span>
          <a href="https://services.mom.gov.sg/eadirectory" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">MOM Agency Directory</a>
        </div>
        {/* TODO: Store all CVs by industries (sorted) into Google Docs for future integration */}
        <form
          action="https://formspree.io/f/mzzvzdgg" // TODO: Replace with real Formspree ID
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <label className="block mb-2 font-medium text-gray-800">Full Name *</label>
          <input name="name" required className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Full Name *" />

          <label className="block mb-2 font-medium text-gray-800">Country of Origin *</label>
          <input name="country" required className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Country of Origin *" />

          <label className="block mb-2 font-medium text-gray-800">Email *</label>
          <input name="email" type="email" required className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Email *" />

          <label className="block mb-2 font-medium text-gray-800">Phone Number</label>
          <input name="phone" className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Phone Number" />

          <label className="block mb-2 font-medium text-gray-800">Upload Resume/CV</label>
          <input name="resume" type="file" accept=".pdf,.doc,.docx" className="w-full mb-4 text-gray-900 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" />

          <label className="block mb-2 font-medium text-gray-800">Short Message</label>
          <textarea name="message" rows={3} className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Short Message" />

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