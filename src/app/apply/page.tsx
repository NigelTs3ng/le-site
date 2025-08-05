"use client";
import { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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

  const handleStripePayment = async (e: React.FormEvent) => {
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

  const paypalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: "SGD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10 px-4">
        <form className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
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
          <div className="mb-6">
            <label className="block font-semibold mb-1 text-gray-900">Short description about yourself:</label>
            <textarea name="description" onChange={handleChange} className="w-full border rounded px-3 py-2 text-gray-900" rows={4} />
          </div>
          
          {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
          
          {/* Payment Section */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Payment</h3>
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <div className="text-lg font-semibold text-gray-900 mb-1">Registration Fee: $6.99 SGD</div>
              <div className="text-sm text-gray-600">One-time registration fee. Your profile will be active and can be updated anytime.</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Stripe Payment Button */}
              <button 
                type="submit" 
                onClick={handleStripePayment}
                disabled={loading} 
                className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Pay with Card"
                )}
              </button>

              {/* PayPal Section */}
              <div className="space-y-2">
                <PayPalButtons
                  createOrder={(data, actions) => {
                    // Store form data before creating order
                    localStorage.setItem("pendingFormData", JSON.stringify(form));
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        localStorage.setItem("pendingFile", reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }

                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            value: '6.99',
                            currency_code: 'SGD'
                          },
                          description: 'Application Processing Fee'
                        }
                      ],
                      application_context: {
                        return_url: `${window.location.origin}/thank-you?payment_method=paypal`,
                        cancel_url: `${window.location.origin}/apply?canceled=1&payment_method=paypal`
                      }
                    });
                  }}
                  onApprove={async (data, actions) => {
                    console.log('PayPal payment approved...');
                    // Capture the order
                    const order = await actions.order?.capture();
                    
                    if (order) {
                      // Just redirect to thank-you page, let it handle the email
                      window.location.href = `/thank-you?payment_method=paypal&session_id=${order.id}`;
                    }
                  }}
                  onError={(err) => {
                    console.error('PayPal error:', err);
                    setError("PayPal payment failed. Please try again.");
                  }}
                  onCancel={() => {
                    console.log('PayPal payment cancelled');
                    setError("PayPal payment was cancelled.");
                  }}
                />
                <div className="text-xs text-gray-500 text-center">Powered by PayPal</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </PayPalScriptProvider>
  );
} 