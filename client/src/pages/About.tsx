import { useState } from "react";

export default function About() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">


      {/* Main Content */}
      <main className="relative px-6 py-20 max-w-7xl mx-auto">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-500/12 via-purple-500/10 to-indigo-600/8 blur-3xl" />

        {/* Top Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: About Text with Show More/Less */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur">
            <h1 className="text-4xl font-bold mb-2">About</h1>
            <h2 className="text-4xl font-bold text-pink-500 mb-6">
              ThumbGen
            </h2>

            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                ThumbGen is an AI-powered tool built to help creators design scroll-stopping 
                thumbnails in seconds — no design experience needed.
              </p>

              <p className="text-gray-300 leading-relaxed">
                In today's crowded creator economy, first impressions matter.
                A compelling thumbnail can be the difference between getting 
                ignored and getting clicked.
              </p>

              <p className="text-gray-300 leading-relaxed">
                ThumbGen's AI analyzes layout, color contrast, visual flow, 
                and subject focus to generate thumbnails that naturally stand
                out in YouTube feeds and recommendations.
              </p>

              {/* Hidden content - Show More */}
              {showMore && (
                <div className="space-y-4 pt-2 border-t border-white/10">
                  <p className="text-gray-300 leading-relaxed">
                    From gaming and education to entertainment and everything
                    in between, ThumbGen adapts to your content style and audience,
                    using insights that work across different niches to improve performance.
                  </p>

                  <p className="text-gray-300 leading-relaxed">
                    Our goal is simple: remove the barriers to professional thumbnail design.
                    You shouldn't need expensive tools, years of experience, or hours of trial
                    and error to create thumbnails that get attention.
                  </p>

                  <p className="text-gray-300 leading-relaxed">
                    Pro Tip: ThumbGen styles images based on your prompts, so be clear and 
                    detailed for the best results. When adding text, keep titles short 
                    and impactful — fewer words help avoid distortion and ensure a clean fit 
                    within the image's aspect ratio.
                  </p>
                </div>
              )}

              <button
                onClick={() => setShowMore(!showMore)}
                className="mt-6 text-pink-400 hover:text-pink-300 font-medium transition-colors"
              >
                {showMore ? "Show Less ↑" : "Show More ↓"}
              </button>
            </div>
          </div>

          {/* RIGHT: Why Choose Us */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 py-12 backdrop-blur">
            <h3 className="text-2xl font-semibold mb-8">Why Choose Us?</h3>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-pink-500/20">
                    <svg className="h-6 w-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Lightning Fast</h4>
                  <p className="text-gray-400 text-sm mt-1">
                    Generate professional thumbnails in seconds, not hours.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-500/20">
                    <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5a4 4 0 100-8 4 4 0 000 8z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">AI Powered</h4>
                  <p className="text-gray-400 text-sm mt-1">
                    Leverage state-of-the-art AI models optimized for clicks.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-500/20">
                    <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Fully Customizable</h4>
                  <p className="text-gray-400 text-sm mt-1">
                    Edit every detail to match your brand's unique style.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Middle Section: Image + Created By */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-12">
          {/* LEFT: Image */}
          <div className="rounded-2xl overflow-hidden border border-white/10 h-full min-h-[500px]">
            <img
              src="/src/assets/ghibli.jpg"
              alt="Creator showcase"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* RIGHT: Created By Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur">
            <h3 className="text-2xl font-semibold mb-6">Created By</h3>
            
            <div className="space-y-4">
              {/* GitHub */}
              <a
                href="https://github.com/ishikaprasad22"
                target="_blank"
                rel="noopener noreferrer"
                className="created-by-box"
              >
                <div className="created-by-logo">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm">GitHub</p>
                  <p className="text-gray-400 text-xs">@ishikaprasad22</p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/contact-ishika-prasad/"
                target="_blank"
                rel="noopener noreferrer"
                className="created-by-box"
              >
                <div className="created-by-logo">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm">LinkedIn</p>
                  <p className="text-gray-400 text-xs">Ishika Prasad</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ishikaa2207@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="created-by-box"
              >
                <div className="created-by-logo">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm">Email</p>
                  <p className="text-gray-400 text-xs">ishikaa2207@gmail.com</p>
                </div>
              </a>

              {/* Portfolio */}
              <a
                href="#"
                className="created-by-box"
              >
                <div className="created-by-logo">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm">Portfolio</p>
                  <p className="text-gray-400 text-xs">This section is in progress — check back soon.</p>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Bottom Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur hover:bg-white/8 transition-all">
            <h4 className="text-lg font-semibold mb-2">Built for Creators</h4>
            <p className="text-gray-400 text-sm">
              Designed with real creator workflows in mind — from solo
              YouTubers to growing content teams.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur hover:bg-white/8 transition-all">
            <h4 className="text-lg font-semibold mb-2">
              AI + Human Control
            </h4>
            <p className="text-gray-400 text-sm">
              AI gives you the perfect starting point. You stay in control
              with full customization and creative freedom.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur hover:bg-white/8 transition-all">
            <h4 className="text-lg font-semibold mb-2">
              Focused on Results
            </h4>
            <p className="text-gray-400 text-sm">
              Every feature is built to improve visibility, engagement, and
              long-term channel growth.
            </p>
          </div>
        </section>
      </main>

      
    </div>
  );
}
