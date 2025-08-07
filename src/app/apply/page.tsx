"use client";
import { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Link from "next/link";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const PRIMARY_BLUE = "#2563a6"; // Same as home page header

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
    
    // Store form data with separate countryCode and phone fields
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
      <div className="min-h-screen bg-blue-50">
        {/* Professional Team Section */}
        <section className="w-full py-16 px-4" style={{ background: PRIMARY_BLUE }}>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-blue-200 text-sm mb-4">Professional team</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Advance Your Career with<br />
              <span className="text-blue-200">Leading Edge</span>
            </h1>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Submit your application and let us connect you with top opportunities worldwide.
            </p>
            <Link
              href="#application-form"
              className="inline-block px-8 py-4 bg-white text-blue-900 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              Apply Now
            </Link>
          </div>
        </section>

        {/* Application Form Section */}
        <section id="application-form" className="flex flex-col items-center justify-center py-10 px-4">
          <form className="bg-white rounded-xl shadow-lg p-8 w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Application Form</h2>
            
            {/* Personal Information Section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2 text-gray-700">Full Name *</label>
                  <input 
                    name="name" 
                    onChange={handleChange} 
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    required 
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2 text-gray-700">Email Address *</label>
                  <input 
                    name="email" 
                    type="email" 
                    onChange={handleChange} 
                    placeholder="Enter your email address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    required 
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2 text-gray-700">Phone Number *</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <select 
                      name="countryCode" 
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg px-3 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:w-32"
                    >
                      <option value="">Code</option>
                      <option value="+65">+65 (SG)</option>
                      <option value="+60">+60 (MY)</option>
                      <option value="+62">+62 (ID)</option>
                      <option value="+66">+66 (TH)</option>
                      <option value="+84">+84 (VN)</option>
                      <option value="+91">+91 (IN)</option>
                      <option value="+880">+880 (BD)</option>
                      <option value="+86">+86 (CN)</option>
                      <option value="+852">+852 (HK)</option>
                      <option value="+886">+886 (TW)</option>
                      <option value="+81">+81 (JP)</option>
                      <option value="+82">+82 (KR)</option>
                      <option value="+1">+1 (US/CA)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+61">+61 (AU)</option>
                      <option value="+64">+64 (NZ)</option>
                    </select>
                    <input 
                      name="phone" 
                      onChange={handleChange} 
                      placeholder="Enter your phone number"
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium mb-2 text-gray-700">Country of Origin *</label>
                  <select 
                    name="country" 
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select your country</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Philippines">Philippines</option>
                    <option value="India">India</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="China">China</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Taiwan">Taiwan</option>
                    <option value="Japan">Japan</option>
                    <option value="South Korea">South Korea</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Professional Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-2 text-gray-700">Industry/Field *</label>
                  <select 
                    name="industry" 
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select your industry</option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-2 text-gray-700">Tell us about yourself</label>
                  <textarea 
                    name="description" 
                    onChange={handleChange} 
                    placeholder="Describe your skills, experience, and what you're looking for..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
                    rows={4} 
                  />
                </div>
                <div>
                  <label className="block font-medium mb-2 text-gray-700">Your resume/CV: *</label>
                  <input 
                    name="file" 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleFileChange} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    required 
                  />
                  <div className="text-xs text-gray-600 mt-1">Size limit: 10 MB.</div>
                </div>
              </div>
            </div>
          
            {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
            
            {/* Payment Section */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Payment</h3>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
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
                      // Store form data with separate fields
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
      </section>
    </div>
    </PayPalScriptProvider>
  );
} 