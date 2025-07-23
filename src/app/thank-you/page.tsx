"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function submitAfterPayment() {
      if (!sessionId || submitted) return;
      // Verify payment and submit form data
      const form = JSON.parse(localStorage.getItem("pendingFormData") || "{}");
      const fileDataUrl = localStorage.getItem("pendingFile");
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v as string));
      if (fileDataUrl) {
        // Convert DataURL back to File
        const arr = fileDataUrl.split(",");
        const mime = arr[0].match(/:(.*?);/)![1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        formData.append("file", new File([u8arr], "resume.pdf", { type: mime }));
      }
      formData.append("session_id", sessionId);

      const res = await fetch("/api/submit-application", { method: "POST", body: formData });
      if (res.ok) {
        localStorage.removeItem("pendingFormData");
        localStorage.removeItem("pendingFile");
        setSubmitted(true);
      }
    }
    submitAfterPayment();
  }, [sessionId, submitted]);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10 px-4 text-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        {submitted ? (
          <>
            <h1 className="text-2xl font-bold text-blue-900 mb-4">Thank You!</h1>
            <p className="text-gray-900 mb-2">Your payment has been processed successfully.</p>
            <p className="text-gray-900">Your application has been submitted, and you will receive a confirmation email shortly.</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-blue-900 mb-4">Verifying Payment...</h1>
            <p className="text-gray-900">Please wait while we verify your payment and submit your application.</p>
          </>
        )}
      </div>
    </div>
  );
} 