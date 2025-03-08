import React, { useState } from 'react';

const About = () => {
  const [activeTab, setActiveTab] = useState('journey');

  const tabs = [
    { id: 'journey', label: 'My Journey' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'philosophy', label: 'Philosophy' }
  ];
  const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
          // Get header height for offset calculation
          const headerHeight = document.querySelector('header')?.offsetHeight || 0;
          // Calculate the element's position
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          // Scroll with offset
          window.scrollTo({
              top: elementPosition - headerHeight,
              behavior: 'smooth'
              });
          }
      };

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Home Navigation Button */}


        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 inline-block">About Me</h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Tabs - Larger and more interactive */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 bg-gray-800 rounded-xl shadow-xl">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content - Improved readability and spacing */}
          <div className="bg-gray-800 rounded-3xl p-10 shadow-2xl border border-gray-700">
            {activeTab === 'journey' && (
              <div className="space-y-10 text-gray-300">
                <div className="flex items-start">
                  <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center mr-6 flex-shrink-0 mt-1 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-3">AI-Driven Career Path</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      With a solid foundation from NIT Jalandhar in Electronics & Communication, I've carved a specialized path in AI and language technologies. Starting with NLP chatbots at XpertReview and BlitzJobs, I quickly advanced to building comprehensive AI systems at Sprinklr, where I spent nearly 3 years developing conversational AI ecosystems that achieved 50% call deflection rates.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-16 w-16 rounded-full bg-purple-500 flex items-center justify-center mr-6 flex-shrink-0 mt-1 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-3">AI Innovation Leader</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      My journey led me to UnifyApps where I pioneered a MultiModal AI-Agentic Framework that integrated complex workflows across 10+ clients, resulting in millions in cost savings. Now at HighLevel, I'm pushing the boundaries of AI support bots and conversational agents, significantly improving accuracy metrics and transforming content generation workflows.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-16 w-16 rounded-full bg-indigo-500 flex items-center justify-center mr-6 flex-shrink-0 mt-1 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 19 7.5 19s3.332-.477 4.5-1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 19 16.5 19c-1.746 0-3.332-.477-4.5-1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-3">Research Contributor</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Beyond practical applications, I've contributed to the academic field with research on Explainable AI in education, published in the International Journal of Research in Applied Science & Engineering Technology. This publication reflects my commitment to not just implementing AI solutions, but advancing the theoretical foundations that make these innovations possible.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'expertise' && (
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-blue-400 transition-all duration-300 shadow-lg">
                    <h3 className="text-2xl font-semibold text-blue-400 mb-5">AI Agents & LLMs</h3>
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <div className="w-3 h-3 bg-blue-400 rounded-full mr-4"></div>
                        <span className="text-lg">Multi-Agent Orchestration & Evaluation</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-3 h-3 bg-blue-400 rounded-full mr-4"></div>
                        <span className="text-lg">RAG & LLM Fine-tuning (LoRA, PEFT)</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-3 h-3 bg-blue-400 rounded-full mr-4"></div>
                        <span className="text-lg">LLM Optimization & Responsible AI</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-3 h-3 bg-blue-400 rounded-full mr-4"></div>
                        <span className="text-lg">Vision & Multimodal LLMs</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-purple-400 transition-all duration-300 shadow-lg">
                    <h3 className="text-2xl font-semibold text-purple-400 mb-5">Voice Technologies</h3>
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <div className="w-3 h-3 bg-purple-400 rounded-full mr-4"></div>
                        <span className="text-lg">ASR (Wav2vec2, Whisper)</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-3 h-3 bg-purple-400 rounded-full mr-4"></div>
                        <span className="text-lg">TTS with VITS architecture</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-3 h-3 bg-purple-400 rounded-full mr-4"></div>
                        <span className="text-lg">Voice-enabled FAQ Chatbots</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-indigo-400 transition-all duration-300 shadow-lg">
                    <h3 className="text-2xl font-semibold text-indigo-400 mb-5">ML & Infrastructure</h3>
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <div className="w-3 h-3 bg-indigo-400 rounded-full mr-4"></div>
                        <span className="text-lg">Transformers & Deep Learning</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-3 h-3 bg-indigo-400 rounded-full mr-4"></div>
                        <span className="text-lg">Distributed Training & Inference</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-3 h-3 bg-indigo-400 rounded-full mr-4"></div>
                        <span className="text-lg">Model Quantization & Performance Optimization</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-green-400 transition-all duration-300 shadow-lg">
                    <h3 className="text-2xl font-semibold text-green-400 mb-5">Cloud & DevOps</h3>
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-4"></div>
                        <span className="text-lg">AWS & GCP Cloud Platforms</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-4"></div>
                        <span className="text-lg">Kubernetes & Docker</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-4"></div>
                        <span className="text-lg">CI/CD Pipelines & FastAPI</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'philosophy' && (
              <div className="space-y-10">
                <div className="p-8 rounded-2xl bg-gray-900 border border-gray-700 hover:border-blue-400 transition-all duration-300 shadow-lg">
                  <div className="flex mb-5 items-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-5 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Solving Real Problems</h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    I believe AI should solve tangible problems. My work focuses on creating systems that deliver measurable impact—whether it's reducing operational costs by 80% through model optimization or increasing accuracy from 75% to 92% in agent workflows. Every solution I build aims to transform business processes and enhance human capabilities.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-gray-900 border border-gray-700 hover:border-purple-400 transition-all duration-300 shadow-lg">
                  <div className="flex mb-5 items-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-5 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Responsible AI Advocacy</h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    I'm deeply committed to responsible AI development. This means building systems that are not only powerful but also ethical, transparent, and fair. My research in explainable AI for education demonstrates this commitment—creating technology that empowers users through understanding, not just automation.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-gray-900 border border-gray-700 hover:border-indigo-400 transition-all duration-300 shadow-lg">
                  <div className="flex mb-5 items-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-5 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Continuous Innovation</h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    The AI field evolves rapidly, and I thrive on staying at its cutting edge. From optimizing LLMs with LoRA and PEFT to orchestrating multi-agent systems that handle complex workflows, I'm constantly pushing boundaries to deliver solutions that weren't possible yesterday. This drive for innovation is what makes my work both challenging and deeply rewarding.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats - Enhanced to be more impactful */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold text-blue-400 mb-3">8.86</div>
              <div className="text-gray-300 text-lg">CGPA at NIT Jalandhar</div>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold text-purple-400 mb-3">94%</div>
              <div className="text-gray-300 text-lg">High School</div>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold text-indigo-400 mb-3">92%</div>
              <div className="text-gray-300 text-lg">Agent Accuracy</div>
            </div>
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold text-green-400 mb-3">1M+</div>
              <div className="text-gray-300 text-lg">Annual Cost Savings</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;