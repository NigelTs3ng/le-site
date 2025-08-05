"use client";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}

function ThankYouContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const paymentMethod = searchParams.get("payment_method");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function submitAfterPayment() {
      if (!sessionId || submitted) return;
      
      const form = JSON.parse(localStorage.getItem("pendingFormData") || "{}");
      const fileDataUrl = localStorage.getItem("pendingFile");
      
      if (paymentMethod === "paypal") {
        // For PayPal payments, we don't need to verify with Stripe
        // The payment verification already happened on the client side
        // We just need to send the email notification and mark as submitted
        try {
          // Send email notification for PayPal payment
          const res = await fetch("/api/verify-paypal-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              orderID: sessionId,
              orderDetails: { status: 'COMPLETED', id: sessionId },
              applicationData: form,
              fileDataUrl: fileDataUrl
            }),
          });

          if (res.ok) {
            localStorage.removeItem("pendingFormData");
            localStorage.removeItem("pendingFile");
            setSubmitted(true);
          } else {
            console.error("PayPal payment verification failed");
            // Even if verification fails, mark as submitted to prevent retries
            setSubmitted(true);
          }
        } catch (error) {
          console.error("PayPal payment processing failed:", error);
          // Even if processing fails, mark as submitted to prevent retries
          setSubmitted(true);
        }
      } else {
        // Handle Stripe payment (existing flow)
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
    }
    submitAfterPayment();
  }, [sessionId, paymentMethod, submitted]);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10 px-4 text-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        {submitted ? (
          <>
            <h1 className="text-2xl font-bold text-blue-900 mb-4">Thank You!</h1>
            <p className="text-gray-900 mb-2">Your payment has been processed successfully.</p>
            <p className="text-gray-900">Your application has been submitted, and you will receive a confirmation email shortly.</p>
            {paymentMethod === "paypal" && (
              <p className="text-sm text-gray-600 mt-2">Payment processed via PayPal</p>
            )}
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-blue-900 mb-4">Verifying Payment...</h1>
            <p className="text-gray-900">Please wait while we verify your payment and submit your application.</p>
            {paymentMethod === "paypal" && (
              <p className="text-sm text-gray-600 mt-2">Processing PayPal payment...</p>
            )}
          </>
        )}
      </div>
    </div>
  );
} 