import React, { useState } from 'react';

const About = () => {
  const [activeTab, setActiveTab] = useState('journey');

  const tabs = [
    { id: 'journey', label: 'My Journey' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'philosophy', label: 'Philosophy' }
  ];

  return (
    <section id="about" className="auto-fit-section">
      {/* Creative background with 3D depth effect */}
      <div className="absolute inset-0 bg-gray-900">
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMzAiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDRjMCAyLjIxIDEuNzkgNCA0IDRzNC0xLjc5IDQtNHptMjAgMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNGMwIDIuMjEgMS43OSA0IDQgNHM0LTEuNzkgNC00em0tNDAgMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNGMwIDIuMjEgMS43OSA0IDQgNHM0LTEuNzkgNC00em0yMC0yMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNGMwIDIuMjEgMS43OSA0IDQgNHM0LTEuNzkgNC00em0yMCAwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0YzAgMi4yMSAxLjc5IDQgNCA0czQtMS43OSA0LTR6bS00MCAwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0YzAgMi4yMSAxLjc5IDQgNCA0czQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/20 via-purple-900/10 to-transparent h-1/2"></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-1/4 w-48 h-48 rounded-full bg-blue-600/10 animate-float"></div>
      <div className="absolute bottom-40 right-1/4 w-64 h-64 rounded-full bg-purple-600/10 animate-float-delay"></div>
      <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full border border-indigo-500/30 animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-24 rounded-full bg-gradient-to-b from-blue-500/20 to-purple-500/20 rotate-12 animate-float-delay-2"></div>
      <div className="absolute bottom-1/4 left-1/5 w-24 h-6 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 -rotate-12 animate-float-delay-3"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* 3D tilted header for visual interest */}
          <div className="mb-20 text-center perspective">
            <div className="transform -rotate-x-5 mb-10">
              <h2 className="text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-glow">About Me</h2>
              <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">Pioneering AI solutions that transform business processes</p>
            </div>
            <div className="w-40 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full shadow-glow"></div>
          </div>

          {/* Creative tab design with offset glowing effect */}
          <div className="flex justify-center mb-16 z-20 relative">
            <div className="p-1 bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-neon">
              <div className="flex relative">
                {activeTab && (
                  <div 
                    className="absolute inset-0 m-1 -z-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl transition-all duration-500 ease-out-expo shadow-lg shadow-purple-500/20"
                    style={{
                      left: `${tabs.findIndex(t => t.id === activeTab) * 33.33}%`,
                      width: '33.33%',
                    }}
                  ></div>
                )}
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Custom honeycomb-inspired card layout with hover effects */}
          <div className="card-container relative p-2">
            {/* Glowing border effect that follows container */}
            <div className="absolute inset-0 rounded-3xl border border-purple-500/30 shadow-xl bg-gray-800/40 backdrop-blur-sm"></div>
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-md"></div>
            
            <div className="relative bg-gray-800/80 backdrop-blur-md rounded-3xl p-10 shadow-inner overflow-hidden">
              {/* Content container */}
              <div className="relative z-10">
                {activeTab === 'journey' && (
                  <div className="journey-grid">
                    {/* Timeline design with connected elements */}
                    <div className="relative space-y-16 pl-10">
                      {/* Vertical line connecting timeline */}
                      <div className="absolute left-0 top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500"></div>
                      
                      <div className="relative">
                        <div className="absolute left-0 top-0 w-10 h-10 -ml-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-glow">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        
                        <div className="card-glow ml-8">
                          <h3 className="text-2xl font-bold text-white mb-4">AI-Driven Career Path</h3>
                          <p className="text-gray-300 leading-relaxed">
                            With a solid foundation from NIT Jalandhar in Electronics & Communication, I've carved a specialized path in AI and language technologies. Starting with NLP chatbots at XpertReview and BlitzJobs, I quickly advanced to building comprehensive AI systems at Sprinklr, where I spent nearly 3 years developing conversational AI ecosystems that achieved 50% call deflection rates.
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-0 top-0 w-10 h-10 -ml-5 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-glow">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        
                        <div className="card-glow ml-8">
                          <h3 className="text-2xl font-bold text-white mb-4">AI Innovation Leader</h3>
                          <p className="text-gray-300 leading-relaxed">
                            My journey led me to UnifyApps where I pioneered a MultiModal AI-Agentic Framework that integrated complex workflows across 10+ clients, resulting in millions in cost savings. Now at HighLevel, I'm pushing the boundaries of AI support bots and conversational agents, significantly improving accuracy metrics and transforming content generation workflows.
                          </p>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-0 top-0 w-10 h-10 -ml-5 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-glow">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 19 7.5 19s3.332-.477 4.5-1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253" />
                          </svg>
                        </div>
                        
                        <div className="card-glow ml-8">
                          <h3 className="text-2xl font-bold text-white mb-4">Research Contributor</h3>
                          <p className="text-gray-300 leading-relaxed">
                            Beyond practical applications, I've contributed to the academic field with research on Explainable AI in education, published in the International Journal of Research in Applied Science & Engineering Technology. This publication reflects my commitment to not just implementing AI solutions, but advancing the theoretical foundations that make these innovations possible.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'expertise' && (
                  <div className="grid gap-10 md:grid-cols-2">
                    {/* Expertise cards with unique design */}
                    <div className="flex flex-col h-full gap-8">
                      <div className="expertise-card group">
                        <div className="card-content">
                          <div className="icon-container bg-blue-500/10 group-hover:bg-blue-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold text-blue-400 mb-5">AI Agents & LLMs</h3>
                          <ul className="space-y-3">
                            <li className="text-lg text-gray-300 flex items-center">
                              <span className="expertise-bullet bg-blue-400"></span>
                              <span>Multi-Agent Orchestration & Evaluation</span>
                            </li>
                            <li className="text-lg text-gray-300 flex items-center">
                              <span className="expertise-bullet bg-blue-400"></span>
                              <span>RAG & LLM Fine-tuning (LoRA, PEFT)</span>
                            </li>
                            <li className="text-lg text-gray-300 flex items-center">
                              <span className="expertise-bullet bg-blue-400"></span>
                              <span>LLM Optimization & Responsible AI</span>
                            </li>
                            <li className="text-lg text-gray-300 flex items-center">
                              <span className="expertise-bullet bg-blue-400"></span>
                              <span>Vision & Multimodal LLMs</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="expertise-card group">
                        <div className="card-content">
                          <div className="icon-container bg-purple-500/10 group-hover:bg-purple-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold text-purple-400 mb-5">Voice Technologies</h3>
                          <ul className="space-y-3">
                            <li className="text-lg text-gray-300 flex items-center">
                              <span className="expertise-bullet bg-purple-400"></span>
                              <span>ASR (Wav2vec2, Whisper)</span>
                            </li>
                            <li className="text-lg text-gray-300 flex items-center">
                              <span className="expertise-bullet bg-purple-400"></span>
                              <span>TTS with VITS architecture</span>
                            </li>
                            <li className="text-lg text-gray-300 flex items-center">
                              <span className="expertise-bullet bg-purple-400"></span>
                              <span>Voice-enabled FAQ Chatbots</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col h-full gap-8">
                      <div className="expertise-card group">
                        <div className="card-content">
                          <div className="icon-container bg-indigo-500/10 group-hover:bg-indigo-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold text-indigo-400 mb-5">ML & Infrastructure</h3>
                          <ul className="space-y-3">
                            <li className="text-lg text-gray-300 flex items-center">
                              <span className="expertise-bullet bg-indigo-400"></span>
                              <span>Transformers & Deep Learning</span>
                            </li>
                            <li className="text-lg text-gray-300 flex items-center">
                              <span className="expertise-bullet bg-indigo-400"></span>
                              <span>Distributed Training & Inference</span>
                            </li>
                            <li className="text-lg text-gray-300 flex items-center">
                              <span className="expertise-bullet bg-indigo-400"></span>
                              <span>Model Quantization & Optimization</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="expertise-card group">
                        <div className="card-content">
                          <div className="icon-container bg-green-500/10 group-hover:bg-green-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold text-green-400 mb-5">Cloud & DevOps</h3>
                          <ul className="space-y-3">
                            <li className="text-lg text-gray-300 flex items-center">
                              <span className="expertise-bullet bg-green-400"></span>
                              <span>AWS & GCP Cloud Platforms</span>
                            </li>
                            <li className="text-lg text-gray-300 flex items-center">
                              <span className="expertise-bullet bg-green-400"></span>
                              <span>Kubernetes & Docker</span>
                            </li>
                            <li className="text-lg text-gray-300 flex items-center">
                              <span className="expertise-bullet bg-green-400"></span>
                              <span>CI/CD Pipelines & FastAPI</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'philosophy' && (
                  <div className="philosophy-container">
                    {/* Unique honeycomb layout for philosophy section */}
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="philosophy-card">
                        <div className="hexagon">
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="title">Solving Real Problems</h3>
                        <p className="description">
                          I believe AI should solve tangible problems. My work focuses on creating systems that deliver measurable impact—whether it's reducing operational costs by 80% through model optimization or increasing accuracy from 75% to 92% in agent workflows.
                        </p>
                      </div>

                      <div className="philosophy-card">
                        <div className="hexagon">
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                          </svg>
                        </div>
                        <h3 className="title">Responsible AI Advocacy</h3>
                        <p className="description">
                          I'm deeply committed to responsible AI development. This means building systems that are not only powerful but also ethical, transparent, and fair. My research in explainable AI for education demonstrates this commitment.
                        </p>
                      </div>

                      <div className="philosophy-card">
                        <div className="hexagon">
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="title">Continuous Innovation</h3>
                        <p className="description">
                          The AI field evolves rapidly, and I thrive on staying at its cutting edge. From optimizing LLMs with LoRA and PEFT to orchestrating multi-agent systems that handle complex workflows, I'm constantly pushing boundaries.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats with unique futuristic design */}
          <div className="stats-grid mt-16 mb-10">
            <div className="stat-card">
              <div className="stat-value">8.86</div>
              <div className="stat-label">CGPA at NIT Jalandhar</div>
              <div className="stat-line"></div>
            </div>
            <div className="stat-card">
              <div className="stat-value">94%</div>
              <div className="stat-label">High School</div>
              <div className="stat-line"></div>
            </div>
            <div className="stat-card">
              <div className="stat-value">92%</div>
              <div className="stat-label">Agent Accuracy</div>
              <div className="stat-line"></div>
            </div>
            <div className="stat-card">
              <div className="stat-value">1M+</div>
              <div className="stat-label">Annual Cost Savings</div>
              <div className="stat-line"></div>
            </div>
          </div>

          {/* Futuristic call-to-action button */}
          <div className="flex justify-center mt-16">
            <a href="#contact" className="call-to-action">
              <span className="button-text">Let's Connect</span>
              <div className="button-stars"></div>
            </a>
          </div>
        </div>
      </div>

      {/* CSS for all custom animations and styles */}
      <style jsx>{`
        /* Core Animation Keyframes */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-delay-2 {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-25px) rotate(15deg); }
        }
        @keyframes float-delay-3 {
          0%, 100% { transform: translateY(0px) rotate(-12deg); }
          50% { transform: translateY(-10px) rotate(-15deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        @keyframes button-star {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-20px) rotate(90deg); opacity: 0; }
        }

        /* Custom Animations */
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 7s ease-in-out infinite 1s; }
        .animate-float-delay-2 { animation: float-delay-2 8s ease-in-out infinite 0.5s; }
        .animate-float-delay-3 { animation: float-delay-3 9s ease-in-out infinite 1.5s; }
        .animate-pulse-slow { animation: pulse-slow 10s ease-in-out infinite; }

        /* Custom Classes */
        .drop-shadow-glow { 
          filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.3)); 
        }
        .shadow-glow { 
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
        }
        .shadow-neon { 
          box-shadow: 0 0 25px rgba(139, 92, 246, 0.2), 
                      inset 0 0 20px rgba(139, 92, 246, 0.1); 
        }
        .perspective { 
          perspective: 1000px; 
        }
        .-rotate-x-5 { 
          transform: rotateX(-5deg); 
        }
        .ease-out-expo { 
          transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1); 
        }

        /* Card Styling */
        .card-glow {
          position: relative;
          background: rgba(30, 41, 59, 0.5);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .card-glow:hover {
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.2);
          border-color: rgba(139, 92, 246, 0.3);
          transform: translateY(-5px);
        }

        /* Expertise Cards */
        .expertise-card {
          position: relative;
          background: rgba(17, 24, 39, 0.7);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .expertise-card:hover {
          transform: translateY(-5px);
        }
        .expertise-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, var(--card-color-start, #3b82f6), var(--card-color-end, #8b5cf6));
          opacity: 0.7;
        }
        .expertise-card:nth-child(1) {
          --card-color-start: #3b82f6;
          --card-color-end: #60a5fa;
        }
        .expertise-card:nth-child(2) {
          --card-color-start: #8b5cf6;
          --card-color-end: #a78bfa;
        }
        .expertise-card:nth-child(3) {
          --card-color-start: #6366f1;
          --card-color-end: #818cf8;
        }
        .expertise-card:nth-child(4) {
          --card-color-start: #10b981;
          --card-color-end: #34d399;
        }
        .card-content {
          padding: 25px;
        }
        .icon-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 16px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }
        .expertise-bullet {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 10px;
          position: relative;
        }
        .expertise-bullet::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.2;
        }

        /* Philosophy Cards */
        .philosophy-container {
          position: relative;
          padding: 20px 0;
        }
        .philosophy-card {
          position: relative;
          background: rgba(17, 24, 39, 0.7);
          border-radius: 16px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.3s ease;
          height: 100%;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .philosophy-card:hover {
          transform: translateY(-10px);
          border-color: rgba(139, 92, 246, 0.3);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 0 15px rgba(139, 92, 246, 0.2);
        }
        .hexagon {
          position: relative;
          width: 80px;
          height: 90px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          margin-bottom: 25px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .philosophy-card:hover .hexagon {
          transform: rotate(10deg);
          background: linear-gradient(135deg, #8b5cf6, #3b82f6);
        }
        .hexagon .icon {
          width: 40px;
          height: 40px;
          color: white;
        }
        .philosophy-card .title {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 15px;
        }
        .philosophy-card .description {
          color: #d1d5db;
          line-height: 1.6;
        }

        /* Stats Design */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        .stat-card {
          position: relative;
          background: rgba(17, 24, 39, 0.7);
          border-radius: 16px;
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.2);
        }
        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 5px;
          position: relative;
          z-index: 10;
        }
        .stat-label {
          color: #d1d5db;
          font-size: 1rem;
          position: relative;
          z-index: 10;
        }
        .stat-line {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 50%;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: all 0.3s ease;
        }
        .stat-card:hover .stat-line {
          width: 80%;
        }
        .stat-card:nth-child(1) .stat-value {
          background: linear-gradient(to right, #3b82f6, #60a5fa);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .stat-card:nth-child(1) .stat-line {
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
        }
        .stat-card:nth-child(2) .stat-value {
          background: linear-gradient(to right, #8b5cf6, #a78bfa);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .stat-card:nth-child(2) .stat-line {
          background: linear-gradient(90deg, #8b5cf6, #a78bfa);
        }
        .stat-card:nth-child(3) .stat-value {
          background: linear-gradient(to right, #6366f1, #818cf8);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .stat-card:nth-child(3) .stat-line {
          background: linear-gradient(90deg, #6366f1, #818cf8);
        }
        .stat-card:nth-child(4) .stat-value {
          background: linear-gradient(to right, #10b981, #34d399);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .stat-card:nth-child(4) .stat-line {
          background: linear-gradient(90deg, #10b981, #34d399);
        }

        /* Call to Action Button */
        .call-to-action {
          position: relative;
          display: inline-block;
          padding: 15px 40px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          font-weight: 600;
          font-size: 1.125rem;
          border-radius: 50px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(139, 92, 246, 0.3);
          border: 2px solid transparent;
          z-index: 1;
        }
        .call-to-action:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 30px rgba(139, 92, 246, 0.4);
        }
        .call-to-action::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #8b5cf6, #3b82f6);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        .call-to-action:hover::before {
          opacity: 1;
        }
        .button-text {
          position: relative;
          z-index: 10;
        }
        .button-stars {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .button-stars::before,
        .button-stars::after {
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 4px 2px rgba(255, 255, 255, 0.3);
        }
        .button-stars::before {
          left: 30%;
          bottom: 0;
          animation: button-star 2s infinite;
        }
        .button-stars::after {
          left: 70%;
          bottom: 0;
          animation: button-star 2.5s infinite 0.3s;
        }
      `}</style>
    </section>
  );
};

export default About;