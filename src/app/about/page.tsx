import Image from "next/image";
import Link from "next/link";

const PRIMARY_BLUE = "#2563a6";
const LIGHT_BLUE = "#eaf2fb";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(
              135deg,
              rgba(37, 99, 166, 0.95) 0%,
              rgba(37, 99, 166, 0.85) 100%
            ),
            url('/images/ref.jpg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="text-center text-white z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Gateway to Singapore Employment</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90">
            Bridging international talent with Singapore&apos;s thriving job market since 2015
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      {/* Why Choose Us Cards */}
      <section className="py-16 px-4" style={{ background: LIGHT_BLUE }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: PRIMARY_BLUE }}>Why Choose Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <Image
                  src="/images/why-choose-us/card1.avif"
                  alt="Government Registered"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: PRIMARY_BLUE }}>Government Registered</h3>
              <p className="text-gray-600">Licensed by Ministry of Manpower (MOM) with proven compliance record</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <Image
                  src="/images/why-choose-us/card2.avif"
                  alt="Trusted Network"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: PRIMARY_BLUE }}>Trusted Network</h3>
              <p className="text-gray-600">Strong partnerships with Singapore SMEs across various industries</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <Image
                  src="/images/why-choose-us/card3.avif"
                  alt="Simple Process"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: PRIMARY_BLUE }}>Simple Process</h3>
              <p className="text-gray-600">Streamlined application and secure payment system</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <Image
                  src="/globe.svg"
                  alt="Global Reach"
                  fill
                  className="object-cover rounded-full p-2"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: PRIMARY_BLUE }}>Global Reach</h3>
              <p className="text-gray-600">Connecting talent from Bangladesh, India, Vietnam, Malaysia, and China</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: PRIMARY_BLUE }}>Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <p className="text-gray-700 italic mb-4">
                &quot;Leading-Edge helped me secure a job in Singapore&apos;s F&amp;B industry. Their process was transparent 
                and professional from start to finish.&quot;
              </p>
              <div className="font-medium" style={{ color: PRIMARY_BLUE }}>Rahul Kumar</div>
              <div className="text-sm text-gray-600">From India - Now working in Singapore</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <p className="text-gray-700 italic mb-4">
                &quot;As a business owner, I appreciate Leading-Edge&apos;s thorough screening process. They&apos;ve helped us 
                find reliable staff multiple times.&quot;
              </p>
              <div className="font-medium" style={{ color: PRIMARY_BLUE }}>Michael Tan</div>
              <div className="text-sm text-gray-600">Restaurant Owner in Singapore</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4" style={{ background: LIGHT_BLUE }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: PRIMARY_BLUE }}>Ready to Start Your Journey?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Join thousands of workers who have successfully started their career in Singapore through Leading-Edge
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold shadow-md hover:bg-green-700 transition"
            >
              Submit Your Resume
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-blue-900 rounded-full font-semibold shadow-md hover:bg-gray-50 transition border-2 border-blue-900"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}