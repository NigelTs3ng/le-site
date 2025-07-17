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
          background: `linear-gradient(135deg, ${LIGHT_BLUE} 0%, #fafdff 100%)`,
        }}
      >
        <div className="mb-6 flex flex-col items-center">
          <div className="bg-white rounded-full shadow-lg p-3 mb-3" style={{ boxShadow: "0 4px 24px 0 rgba(37,99,166,0.10)" }}>
            <Image src="/le-logo.png" alt="Leading-Edge Logo" width={90} height={90} />
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold" style={{ color: PRIMARY_BLUE, letterSpacing: "0.01em" }}>LEADING-EDGE</h1>
          <div className="text-lg sm:text-xl font-medium mt-2 mb-4" style={{ color: PRIMARY_BLUE, letterSpacing: "0.04em" }}>
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
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-8 border border-blue-100">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: PRIMARY_BLUE }}>For Job Seekers</h2>
          <p className="mb-4 text-gray-700">Looking for work in Singapore? We offer opportunities in various industries for candidates from Bangladesh, India, China, and Southeast Asia.</p>
          <Link
            href="/apply"
            className="inline-block px-7 py-3 bg-green-600 text-white rounded-full font-semibold shadow hover:bg-green-700 transition border-2 border-green-600 text-lg"
          >
            Apply to Work in Singapore for $1
          </Link>
        </div>
      </section>

      {/* Testimonials Carousel (static for now) */}
      <section className="py-12 px-4 w-full flex justify-center" style={{ background: LIGHT_BLUE }}>
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center" style={{ color: PRIMARY_BLUE }}>What Our Clients Say</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch">
            <div className="bg-white rounded-2xl shadow p-6 flex-1 border border-blue-100">
              <p className="text-gray-700 italic mb-2">“The agency made hiring so easy. We found reliable staff for our restaurant in just days!”</p>
              <span className="block text-sm text-gray-500">– Mr. Tan, F&amp;B Owner</span>
            </div>
            <div className="bg-white rounded-2xl shadow p-6 flex-1 border border-blue-100">
              <p className="text-gray-700 italic mb-2">“I applied from Bangladesh and got a job in Singapore quickly. Thank you!”</p>
              <span className="block text-sm text-gray-500">– Rahim, Worker</span>
            </div>
            <div className="bg-white rounded-2xl shadow p-6 flex-1 border border-blue-100">
              <p className="text-gray-700 italic mb-2">“Professional and trustworthy. Highly recommended for employers.”</p>
              <span className="block text-sm text-gray-500">– Ms. Lim, Construction</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 px-4 w-full flex justify-center">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-8 border border-blue-100 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: PRIMARY_BLUE }}>About Leading-Edge Consultancy</h2>
          <p className="text-gray-700 mb-4">Leading-Edge Consultancy Services Pte Ltd is a Singapore-based employment agency dedicated to connecting SMEs with skilled foreign workers. Our team ensures a smooth, transparent, and efficient hiring process for both employers and job seekers.</p>
          <div className="text-gray-600 text-sm mt-2">
            60 Paya Lebar Road, #07-54 Paya Lebar Square, Singapore 409051<br />
            EA Licence No.: 12C6068 &nbsp;|&nbsp; Personal EA No.: R1108879
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
