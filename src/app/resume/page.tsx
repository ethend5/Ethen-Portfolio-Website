import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Ethen Dhanaraj — Electrical Engineering student at UC Santa Cruz.",
};

export default function ResumePage() {
  return (
    <section className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h1 className="text-4xl font-bold text-white">Resume</h1>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </a>
        </div>

        {/* NOTE: Place your resume PDF at public/resume.pdf */}
        <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#111118]">
          <object
            data="/resume.pdf"
            type="application/pdf"
            className="w-full"
            style={{ height: "80vh" }}
          >
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center gap-4">
              <p className="text-text-secondary text-lg">
                Your browser cannot display the PDF inline.
              </p>
              <a
                href="/resume.pdf"
                download
                className="px-5 py-2.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
              >
                Download Resume PDF
              </a>
              <Link
                href="/"
                className="text-sm text-text-muted hover:text-primary-400 transition-colors"
              >
                Return home
              </Link>
            </div>
          </object>
        </div>
      </div>
    </section>
  );
}
