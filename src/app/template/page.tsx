'use client';

import { useRef } from 'react';
import Link from 'next/link';

export default function TemplatePage() {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Trigger print dialog which allows saving as PDF
    window.print();
  };

  return (
    <>
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-template, #resume-template * {
            visibility: visible;
          }
          #resume-template {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            padding: 40px !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <main className="min-h-screen bg-[#030303]">
        {/* Navigation - Hidden in print */}
        <nav className="no-print fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/5">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center font-bold text-sm">
                AI
              </div>
              <span className="font-semibold hidden sm:block">Build-Off</span>
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium text-sm transition-all hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </button>
            </div>
          </div>
        </nav>

        {/* Header - Hidden in print */}
        <div className="no-print pt-24 pb-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full mb-4">
              <span className="text-teal-400">🎁</span>
              <span className="text-sm text-teal-400">Free ATS Resume Template</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Your ATS-Optimized Template
            </h1>
            <p className="text-neutral-400 max-w-xl mx-auto">
              This template is designed to pass ATS screening systems. Fill in your details and download as PDF.
            </p>
          </div>
        </div>

        {/* Tips - Hidden in print */}
        <div className="no-print max-w-4xl mx-auto px-4 mb-8">
          <div className="bg-gradient-to-r from-orange-500/10 to-teal-500/10 border border-orange-500/20 rounded-xl p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span>💡</span> ATS Tips
            </h3>
            <ul className="text-sm text-neutral-300 space-y-1">
              <li>• Use standard section headings (Education, Experience, Skills)</li>
              <li>• Avoid tables, graphics, and fancy formatting</li>
              <li>• Include keywords from the job description</li>
              <li>• Use a clean, single-column layout</li>
              <li>• Save as PDF to preserve formatting</li>
            </ul>
          </div>
        </div>

        {/* Resume Template */}
        <div className="max-w-4xl mx-auto px-4 pb-16">
          <div
            id="resume-template"
            ref={resumeRef}
            className="bg-white text-black rounded-lg shadow-2xl p-8 md:p-12"
            contentEditable
            suppressContentEditableWarning
          >
            {/* Header */}
            <header className="text-center mb-6 border-b-2 border-gray-300 pb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                YOUR FULL NAME
              </h1>
              <p className="text-gray-600 text-sm">
                your.email@example.com | +91 98765 43210 | LinkedIn: linkedin.com/in/yourname | GitHub: github.com/yourname
              </p>
              <p className="text-gray-600 text-sm">
                City, State, India
              </p>
            </header>

            {/* Objective */}
            <section className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
                Career Objective
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Motivated final-year [Your Branch] engineering student seeking opportunities to apply my technical skills in [Target Role/Industry]. Passionate about building innovative solutions using AI/ML technologies and eager to contribute to a dynamic team environment.
              </p>
            </section>

            {/* Education */}
            <section className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
                Education
              </h2>
              <div className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">Bachelor of Engineering in [Your Branch]</h3>
                    <p className="text-gray-600 text-sm">[Your College Name], [City]</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>2023 - 2027</p>
                    <p>CGPA: 8.5/10</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">Higher Secondary (XII)</h3>
                    <p className="text-gray-600 text-sm">[School Name], [City]</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>2023</p>
                    <p>Percentage: 92%</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
                Projects
              </h2>

              <div className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">AI Resume Screening Tool</h3>
                  <span className="text-sm text-gray-600">Oct 2024</span>
                </div>
                <p className="text-gray-600 text-sm italic mb-1">Python, OpenAI API, Streamlit</p>
                <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                  <li>Built an AI-powered resume screening tool that matches candidates to job descriptions with 85% accuracy</li>
                  <li>Implemented NLP-based keyword extraction reducing manual screening time by 60%</li>
                  <li>Deployed on Streamlit Cloud, serving 200+ users in the first month</li>
                </ul>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">[Your Project Name]</h3>
                  <span className="text-sm text-gray-600">Month Year</span>
                </div>
                <p className="text-gray-600 text-sm italic mb-1">Technologies Used</p>
                <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                  <li>Describe what you built and the problem it solved</li>
                  <li>Include measurable results (%, numbers, impact)</li>
                  <li>Mention technologies and methodologies used</li>
                </ul>
              </div>
            </section>

            {/* Skills */}
            <section className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
                Technical Skills
              </h2>
              <div className="text-sm text-gray-700 space-y-1">
                <p><span className="font-semibold">Programming Languages:</span> Python, JavaScript, Java, C++</p>
                <p><span className="font-semibold">Web Technologies:</span> React, Node.js, HTML, CSS, REST APIs</p>
                <p><span className="font-semibold">AI/ML:</span> TensorFlow, PyTorch, Scikit-learn, OpenAI API, LangChain</p>
                <p><span className="font-semibold">Databases:</span> MySQL, MongoDB, PostgreSQL</p>
                <p><span className="font-semibold">Tools:</span> Git, Docker, VS Code, Jupyter Notebook, Postman</p>
              </div>
            </section>

            {/* Experience (Optional) */}
            <section className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
                Experience
              </h2>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">[Internship Role / Position]</h3>
                    <p className="text-gray-600 text-sm">[Company Name], [Location]</p>
                  </div>
                  <span className="text-sm text-gray-600">Month Year - Month Year</span>
                </div>
                <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                  <li>Describe your responsibilities and achievements</li>
                  <li>Use action verbs: Developed, Implemented, Optimized, Led</li>
                  <li>Quantify results whenever possible</li>
                </ul>
              </div>
            </section>

            {/* Achievements */}
            <section className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
                Achievements & Certifications
              </h2>
              <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                <li>Completed &quot;Build Your First AI Project&quot; Workshop - College Build-Off (2024)</li>
                <li>[Certification Name] - [Issuing Organization] (Year)</li>
                <li>[Achievement/Award] - [Context] (Year)</li>
                <li>[Hackathon/Competition] - [Position/Result] (Year)</li>
              </ul>
            </section>

            {/* Extra-curricular */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">
                Extra-Curricular Activities
              </h2>
              <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                <li>Member, [Technical Club/Society] - Organized workshops on [Topic]</li>
                <li>[Leadership Role] - [Organization/Event]</li>
                <li>[Volunteer Work / Community Involvement]</li>
              </ul>
            </section>
          </div>
        </div>

        {/* Instructions - Hidden in print */}
        <div className="no-print max-w-4xl mx-auto px-4 pb-16">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span>📝</span> How to Use This Template
            </h3>
            <ol className="text-sm text-neutral-300 space-y-2 list-decimal list-inside">
              <li>Click on any text in the template above to edit it directly</li>
              <li>Replace placeholder text with your actual information</li>
              <li>Add or remove sections based on your experience</li>
              <li>Click &quot;Download PDF&quot; to save (use Print → Save as PDF)</li>
              <li>Review the PDF to ensure formatting is preserved</li>
            </ol>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/result"
              className="text-neutral-400 hover:text-white transition-colors text-sm"
            >
              ← Back to your registration
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
