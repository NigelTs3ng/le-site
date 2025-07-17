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
          <label className="block mb-2 font-medium">Name *</label>
          <input name="name" required className="w-full mb-4 px-3 py-2 border rounded" />

          <label className="block mb-2 font-medium">Email *</label>
          <input name="email" type="email" required className="w-full mb-4 px-3 py-2 border rounded" />

          <label className="block mb-2 font-medium">Message *</label>
          <textarea name="message" rows={3} required className="w-full mb-4 px-3 py-2 border rounded" />

          <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded font-semibold hover:bg-blue-800 transition">Send Message</button>
        </form>
        <div className="mt-8 text-center text-gray-700">
          <div className="font-bold">Leading-Edge Consultancy Services Pte Ltd</div>
          <div>60 Paya Lebar Road, #07-54 Paya Lebar Square, Singapore 409051</div>
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