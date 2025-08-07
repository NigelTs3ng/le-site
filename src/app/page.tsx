import Image from "next/image";
import Link from "next/link";

const PRIMARY_BLUE = "#2563a6";
const LIGHT_BLUE = "#eaf2fb";

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      {/* Hero Section */}
      <section
        className="w-full flex flex-col items-center justify-center text-center py-16 px-4"
        style={{
          background: PRIMARY_BLUE,
        }}
      >
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-3">
            <Image src="/le-logo.png" alt="Leading-Edge Logo" width={90} height={90} />
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white" style={{ letterSpacing: "0.01em" }}>LEADING-EDGE</h1>
          <div className="text-lg sm:text-xl font-medium mt-2 mb-4 text-white" style={{ letterSpacing: "0.04em" }}>
            A TOTAL SOLUTION FOR EMPLOYMENT
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link
            href="#employers"
            className="px-7 py-3 rounded-full font-semibold shadow-md text-white bg-[#2563a6] hover:bg-[#17406b] transition border-2 border-[#2563a6] text-lg"
          >
            I&apos;m Hiring
          </Link>
          <Link
            href="/apply"
            className="px-7 py-3 rounded-full font-semibold shadow-md text-[#2563a6] bg-white hover:bg-[#eaf2fb] transition border-2 border-[#2563a6] text-lg"
          >
            I&apos;m Looking for Work
          </Link>
        </div>
      </section>

      {/* Employers Section */}
      <section id="employers" className="py-12 px-4 w-full flex justify-center" style={{ background: LIGHT_BLUE }}>
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-8 border border-blue-100">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: PRIMARY_BLUE }}>For Employers</h2>
          <p className="mb-4 text-gray-700">We help Singapore SMEs hire reliable foreign workers in:</p>
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            <span className="bg-[#eaf2fb] text-[#2563a6] px-4 py-2 rounded-full font-medium border border-[#c6d6ea]">F&amp;B</span>
            <span className="bg-[#eaf2fb] text-[#2563a6] px-4 py-2 rounded-full font-medium border border-[#c6d6ea]">Construction</span>
            <span className="bg-[#eaf2fb] text-[#2563a6] px-4 py-2 rounded-full font-medium border border-[#c6d6ea]">Caregivers</span>
            <span className="bg-[#eaf2fb] text-[#2563a6] px-4 py-2 rounded-full font-medium border border-[#c6d6ea]">Domestic Helpers</span>
          </div>
          <Link
            href="/contact"
            className="inline-block px-7 py-3 bg-[#2563a6] text-white rounded-full font-semibold shadow hover:bg-[#17406b] transition border-2 border-[#2563a6] text-lg"
          >
            Contact Us to Hire Workers
          </Link>
        </div>
      </section>

      {/* Job Seekers Section */}
      <section className="py-12 px-4 w-full flex justify-center">
        <div className="max-w-4xl w-full">
          {/* Top Section - Outside the Main Card */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: PRIMARY_BLUE }}>Want a Job Fast in Singapore?</h2>
            <p className="text-lg text-gray-700">Get started with just $6.99 - your gateway to Singapore employment opportunities</p>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-200">
            <h3 className="text-xl font-bold mb-6" style={{ color: PRIMARY_BLUE }}>What Your Registration Fee Covers:</h3>
            
            {/* Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              {/* Left Column - Document Processing */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-amber-200 rounded mr-3 flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold" style={{ color: PRIMARY_BLUE }}>Document Processing</h4>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Resume review and optimization
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Format conversion for different client requirements
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    CV strengthening for Singapore employers
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Document verification and validation
                  </li>
                </ul>
              </div>

              {/* Right Column - Professional Enhancement */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-red-200 rounded mr-3 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold" style={{ color: PRIMARY_BLUE }}>Professional Enhancement</h4>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Profile optimization for better visibility
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Skills and experience highlighting
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Singapore market-specific formatting
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Ongoing profile maintenance
                  </li>
                </ul>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-gray-700">
                <span className="font-bold">Important:</span> This is a one-time, non-refundable registration fee. Your profile remains active and can be updated anytime without additional charges.
              </p>
            </div>

            {/* Call to Action Button */}
            <div className="text-center">
              <Link
                href="/apply"
                className="inline-block px-8 py-4 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-lg"
              >
                Register Now - $6.99
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 px-4 w-full flex justify-center" style={{ background: LIGHT_BLUE }}>
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ color: PRIMARY_BLUE }}>Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Easy Application Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-blue-100">
              <div className="w-full h-40 mb-4 flex items-center justify-center">
                <Image 
                  src="/images/why-choose-us/card1.avif" 
                  alt="Easy Application" 
                  width={256} 
                  height={128} 
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: PRIMARY_BLUE }}>Easy Application</h3>
              <p className="text-gray-700 text-sm">Simple online form with secure file upload. Complete your application in minutes and get started on your Singapore job journey.</p>
            </div>

            {/* Secure Payment Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-blue-100">
              <div className="w-full h-40 mb-4 flex items-center justify-center">
                <Image 
                  src="/images/why-choose-us/card2.avif" 
                  alt="Secure Payment" 
                  width={256} 
                  height={128} 
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: PRIMARY_BLUE }}>Secure Payment</h3>
              <p className="text-gray-700 text-sm">Multiple payment options including Stripe and PayPal. Your financial information is protected with industry-standard security.</p>
            </div>

            {/* Get Matched Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-blue-100">
              <div className="w-full h-40 mb-4 flex items-center justify-center">
                <Image 
                  src="/images/why-choose-us/card3.avif" 
                  alt="Get Matched" 
                  width={256} 
                  height={128} 
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: PRIMARY_BLUE }}>Get Matched</h3>
              <p className="text-gray-700 text-sm">Our database connects you directly with Singapore employers. Get matched with opportunities that fit your skills and experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Job Seekers Section */}
      <section className="py-12 px-4 w-full flex justify-center">
        <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 border border-blue-100">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: PRIMARY_BLUE }}>For Job Seekers</h2>
          
          {/* Registration Information */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Registration Information</h3>
            <ul className="mb-6 text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                One-time registration/processing fee. You can use or resubmit your profile anytime.
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Get yourself registered for this amount.
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Come direct to us and avoid middlemen fees in your country.
              </li>
            </ul>
            <div className="text-center mb-4">
              <Link
                href="/apply"
                className="inline-block px-8 py-4 bg-green-600 text-white rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-lg"
              >
                Register Now
              </Link>
            </div>
            <div className="text-center">
              <span className="text-sm text-blue-700 font-medium">
                Check for yourself: 
              </span>
              <a 
                href="https://service2.mom.gov.sg/eadirectory/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-blue-700 font-medium underline hover:text-blue-900 ml-1"
              >
                MOM Agency Directory
              </a>
            </div>
          </div>

          {/* Official Verification Box */}
          <div className="bg-gray-100 rounded-lg p-6 border border-gray-200 mb-8">
            <p className="text-sm text-gray-700 mb-2">Official verification - We are a licensed employment agency:</p>
            <p className="text-base font-semibold text-gray-800 mb-1">LEADING-EDGE CONSULTANCY SERVICES PTE. LTD.</p>
            <p className="text-xs text-gray-600">License No.: 12C6068 | 12 years of experience</p>
          </div>

          {/* MOM Directory Listing */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-gray-800">Official MOM Employment Agencies Directory Listing:</h3>
            <div className="w-full mb-4">
              <Image 
                src="/images/why-choose-us/image.png" 
                alt="MOM Employment Agencies Directory - Leading Edge Listing" 
                width={800} 
                height={600} 
                className="w-full rounded-lg border border-gray-200"
              />
            </div>
            <p className="text-center text-sm text-gray-600">Screenshot from official Ministry of Manpower website</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2563a6] text-white py-10 px-4 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <div className="font-bold text-lg">Leading-Edge Consultancy Services Pte Ltd</div>
            <div className="text-sm mt-1">Simon Tseng, Senior Recruitment Consultant</div>
            <div className="text-sm mt-1">Phone: <a href="tel:+6590026161" className="underline">+65 90026161</a></div>
            <div className="text-sm">WhatsApp: <a href="https://wa.me/6590026161" className="underline">+65 90026161</a></div>
            <div className="text-sm">Email: <a href="mailto:stleading@gmail.com" className="underline">stleading@gmail.com</a></div>
            <div className="text-xs text-blue-100 mt-2">EA Licence No.: 12C6068 | Personal EA No.: R1108879</div>
          </div>
          <div className="w-full sm:w-1/3 h-32 bg-blue-100 rounded-lg flex items-center justify-center mt-4 sm:mt-0">
            {/* Google Maps Placeholder */}
            <span className="text-blue-500">[Google Maps Location]</span>
          </div>
        </div>
        <div className="text-center text-xs text-blue-100 mt-4">&copy; {new Date().getFullYear()} Leading-Edge Consultancy Services Pte Ltd. All rights reserved.</div>
      </footer>
    </div>
  );
}
