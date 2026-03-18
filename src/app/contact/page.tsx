export default function ContactPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-blue-900 mb-2 text-center">Contact Us</h1>
        <p className="text-center text-gray-600 mb-6">We are here to help. Reach out to us for any enquiries.</p>
        <form
          action="https://formspree.io/f/your-form-id" // TODO: Replace with real Formspree ID
          method="POST"
        >
          <div className="mb-4">
            <label className="block font-medium mb-2 text-gray-700">Name *</label>
            <input 
              name="name" 
              required 
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2 text-gray-700">Email *</label>
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="Enter your email address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-2 text-gray-700">Message *</label>
            <textarea 
              name="message" 
              rows={4} 
              required 
              placeholder="Enter your message"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Send Message
          </button>
        </form>
        
        <div className="mt-8 text-center text-gray-700">
          <div className="font-bold">Leading-Edge Consultancy Services Pte Ltd</div>
          <div>
            60 Paya Lebar Road<br />
            #06-28 Paya Lebar Square<br />
            Singapore 409051
          </div>
          <div>Phone: <a href="tel:+6590026161" className="underline">+65 90026161</a></div>
          <div>WhatsApp: <a href="https://wa.me/6590026161" className="underline">+65 90026161</a></div>
          <div>Email: <a href="mailto:stleading@gmail.com" className="underline">stleading@gmail.com</a></div>
        </div>
        <div className="mt-6 w-full h-40 bg-gray-200 rounded flex items-center justify-center">
          {/* Google Maps iframe placeholder */}
          <span className="text-gray-500">[Google Maps Location]</span>
        </div>
      </div>
    </div>
  );
} 