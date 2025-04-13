import React, { useState, useEffect, useRef } from 'react';
import { Home, Linkedin, ExternalLink, X, Zap, Briefcase, Award, MessageCircle } from 'lucide-react';

const Citations = () => {
  // States
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  const [filterTag, setFilterTag] = useState('all');
  const [isQuoteAnimating, setIsQuoteAnimating] = useState(false);
  const quoteRef = useRef(null);
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth'
      });
    }
  };

  // Enhanced citation data with additional metadata
  const citations = [
    {
      id: 1,
      image: '/citations/pavitar.png',
      name: 'Pavitar Singh',
      role: 'Founder and CEO (Unifyapps) , Ex-CTO (Sprinklr)',
      linkedIn: 'http://linkedin.com/in/pavitar/',
      company: 'Unifyapps',
      previousCompany: 'Sprinklr',
      tags: ['leadership', 'ai-strategy', 'engineering'],
      highlightQuote: "I had worked with Karamvir during his tenure as Lead AI Engineer at UnifyApps. While I didn’t manage Karamvir directly, I witnessed how he played a key role in driving forward our AI initiatives and turning strategic ideas into tangible results. His ability to understand and execute the company's broader vision was invaluable.Karamvir demonstrated exceptional technical expertise and a talent for solving complex problems. He was instrumental in developing innovative AI solutions that aligned seamlessly with our business goals. His dedication, collaborative spirit, and proactive approach made him a critical part of our success, helping to push the boundaries of what we could achieve with AI.I have no doubt that Karamvir will continue to thrive and deliver impactful results in any future endeavor. He would be a tremendous asset to any team",
      relationship: "CEO"
    },
    {
      id: 2,
      image: '/citations/yogin.png',
      name: 'Yogin Patel',
      role: 'Head of AI (Sprinklr)',
      linkedIn: 'https://www.linkedin.com/in/yogin-patel-4ba55321/',
      company: 'Sprinklr',
      tags: ['ai-research', 'leadership', 'nlp'],
      highlightQuote: "I am delighted to recommend Karamvir, a standout member of our team whose leadership and ownership are evident in every facet of our operations. Karamvir's commitment to excellence is showcased in his pivotal role in developing Voice AI models, a key project that has significantly advanced our technological capabilities. His ability to lead this complex initiative demonstrates his deep technical expertise.Karamvir is inherently involved in all our projects, directly or indirectly. Either influencing outcomes with his leadership and expertise, or his approachability further amplifies his impact, as team members from various projects consistently seek his advice, trusting his guidance and benefiting from his insights. This unique blend of involvement and influence highlights his integral role in our success.Any organization would benefit immensely from Karamvir’s dedication and leadership. He is not just a participant in projects but a driving force behind them, ensuring that each one not only reaches but surpasses our goals. Karamvir’s contributions have not only propelled our projects to new heights but have also set a standard of excellence within our team.",
      relationship: "Manager"
    },
    {
      id: 3,
      image: '/citations/sachin.png',
      name: 'Sachin Bhardwaj',
      role: 'Head of AI (UnifyApps)',
      linkedIn: 'https://www.linkedin.com/in/sachin-bharadwaj-3518881/',
      company: 'UnifyApps',
      tags: ['ai-agents', 'leadership', 'innovation'],
      highlightQuote: "Karamvir is an exceptional talent. He has always surprised me and surpassed my expectations. He thrives on challenges which brings the best out of him. A complete team player and true engineer at heart. He has unique ability to quickly come up with prototype and then meticulously plan the complete development. As is always the case with talented people, change is inevitable. I hope we again develop something together in near future. Wishing you all the best!!",
      relationship: "Manager"
    },
    {
      id: 4,
      image: '/citations/aayush.png',
      name: 'Aayush Kubba',
      role: 'Senior Director Data Science (Sprinklr)',
      linkedIn: 'https://www.linkedin.com/in/aayushkubba/',
      company: 'Sprinklr',
      tags: ['data-science', 'machine-learning', 'mentorship'],
      highlightQuote: "Karamvir was a great asset to our team. One thing i adore about him was his ability to quickly experiment and iterate to solve business use-cases",
      relationship: "Manager"
    },
    {
      id: 5,
      image: '/citations/eli.png',
      name: 'Elisabetta Carta',
      role: 'Senior Product Manager AI (Sprinklr)',
      linkedIn: 'https://www.linkedin.com/in/elisabetta-carta/',
      company: 'Sprinklr',
      tags: ['product', 'ai-strategy', 'user-experience'],
      highlightQuote: "I have had the pleasure of working closely with Karamvir for 3 years on multiple CCaaS speech tech projects across 5 international languages for our global customers. Karamvir is one of the most meticulous and punctual Engineers I've ever collaborated with. His in-depth technical expertise, his dedication and his polite and enjoyable personality make him a great asset.",
      relationship: "Colleague"
    },
    {
      id: 6,
      image: '/citations/navaneshwar.png',
      name: 'Navaneshwar Reddy',
      role: 'Director of Engineering (UnifyApps)',
      linkedIn: 'https://www.linkedin.com/in/navaneshwar-reddy/',
      company: 'UnifyApps',
      tags: ['engineering', 'architecture', 'leadership'],
      highlightQuote: "I’ve had the pleasure of working closely with karamvir and I can confidently say that he is an exceptional AI Engineer. He has a solid understanding of AI concepts and consistently demonstrates an eagerness to explore new ideas and technologies. What sets him apart is his problem-solving mindset. No challenge is too big; he approaches every task with a determined and analytical attitude, often uncovering creative and efficient solutions. Beyond technical skills, he is hardworking, curious, and always willing to learn.I have no doubt that he will continue to excel in any role that demands innovation, dedication, and expertise in AI.",
      relationship: "Colleague"
    },
    {
      id: 7,
      image: '/citations/krit.png',
      name: 'Akshat Goyal',
      role: 'Director of Product Management (Sprinklr)',
      linkedIn: 'https://www.linkedin.com/in/goyalakshat28/',
      company: 'Sprinklr',
      tags: ['product', 'strategy', 'innovation'],
      highlightQuote: "Karamvir have been a very important member of our Voice AI team at Sprinklr. Me and my team have worked with Karamvir on some of the complex & toughest client asks and I can confidently say that his dedication towards client commitments & delight is unmatched.",
      relationship: "Colleague"
    },
    {
      id: 8,
      image: '/citations/akshat.png',
      name: 'Krit Patel',
      role: 'Associate Director of Engineering (Sprinklr)',
      linkedIn: 'https://www.linkedin.com/in/krit-patel-061731171/',
      company: 'Sprinklr',
      tags: ['engineering', 'mentorship', 'technical-leadership'],
      highlightQuote: "I had the pleasure of working closely with karamvir in the Voice AI team, where he was one of the first members. karamvir is incredibly hardworking, always bringing innovative ideas to the table to tackle problems head-on. He's a supportive team player,ready to jump into any project and lend a hand. His dedication and problem-solving mentality make him a valuable asset to any team.",
      relationship: "Colleague"
    },
    {
      id: 9,
      image: '/citations/manoj.png',
      name: 'Manoj Kumar',
      role: 'Head India Operations (Kryptoblocks)',
      linkedIn: 'https://www.linkedin.com/in/manoj-kumar-kayastha/',
      company: 'Kryptoblocks',
      tags: ['operations', 'leadership', 'strategy'],
      highlightQuote: "Karamvir Singh has worked for us as Intern at XpertReview software Solutions. He is very knowledgeable, articulate and pleasure to work with. He has very good understanding of the problem provided to him and take it forward for solution without much guidance. He has really an exceptional coding skill as well. It's my pleasure to recommend him for his future endeavor. ",
      relationship: "Colleague"
    }
  ];

  // Extract all unique tags for filtering
  const allTags = ['all', ...new Set(citations.flatMap(citation => citation.tags))];

  // Filter citations based on selected tag
  const filteredCitations = filterTag === 'all' 
    ? citations 
    : citations.filter(citation => citation.tags.includes(filterTag));

  // Functions for modal
  const openImageModal = (image, name) => {
    setSelectedImage({ url: image, name: name });
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  const handleModalClick = (e) => {
    if (e.target.id === 'imageModal') {
      closeImageModal();
    }
  };

  // Handle testimonial selection with animation
  const handleSelectTestimonial = (citation) => {
    if (isQuoteAnimating) return;
    
    setIsQuoteAnimating(true);
    
    // If already selected, deselect
    if (activeTestimonial && activeTestimonial.id === citation.id) {
      setActiveTestimonial(null);
      setTimeout(() => {
        setIsQuoteAnimating(false);
      }, 500);
      return;
    }
    
    // Animate out current quote if there is one
    if (activeTestimonial) {
      setActiveTestimonial(null);
      setTimeout(() => {
        setActiveTestimonial(citation);
        setTimeout(() => {
          setIsQuoteAnimating(false);
        }, 500);
      }, 500);
    } else {
      // No current quote, just animate in
      setActiveTestimonial(citation);
      setTimeout(() => {
        setIsQuoteAnimating(false);
      }, 500);
    }
    
    // Scroll quote into view on mobile
    if (window.innerWidth < 768 && quoteRef.current) {
      setTimeout(() => {
        quoteRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  // Auto cycle through testimonials
  useEffect(() => {
    if (!activeTestimonial && filteredCitations.length > 0 && !isQuoteAnimating) {
      const timer = setTimeout(() => {
        handleSelectTestimonial(filteredCitations[0]);
      }, 1000);
      return () => clearTimeout(timer);
    }
    
    if (activeTestimonial && !isQuoteAnimating) {
      const timer = setTimeout(() => {
        const currentIndex = filteredCitations.findIndex(c => c.id === activeTestimonial.id);
        const nextIndex = (currentIndex + 1) % filteredCitations.length;
        handleSelectTestimonial(filteredCitations[nextIndex]);
      }, 8000); // Change testimonial every 8 seconds
      return () => clearTimeout(timer);
    }
  }, [activeTestimonial, filteredCitations, isQuoteAnimating]);

  // Reset active testimonial when filter changes
  useEffect(() => {
    setActiveTestimonial(null);
  }, [filterTag]);

  return (
    <section id="testimonials" className="py-32 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background with subtle network pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDRjMCAyLjIxIDEuNzkgNCA0IDRzNC0xLjc5IDQtNHptMjAgMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNGMwIDIuMjEgMS43OSA0IDQgNHM0LTEuNzkgNC00em0tNDAgMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNGMwIDIuMjEgMS43OSA0IDQgNHM0LTEuNzkgNC00em0yMC0yMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNGMwIDIuMjEgMS43OSA0IDQgNHM0LTEuNzkgNC00em0yMCAwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0YzAgMi4yMSAxLjc5IDQgNCA0czQtMS43OSA0LTR6bS00MCAwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0YzAgMi4yMSAxLjc5IDQgNCA0czQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-500/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-purple-500/10 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 sm:px-10 relative z-10">
        {/* Section header with animated gradient */}
        <div className="text-center mb-16">
          <h2 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 inline-block mb-6 gradient-animate">
            Testimonials
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Endorsements from professionals who have experienced the impact of my work
          </p>
          <div className="w-40 h-2 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-8 rounded-full glow-line"></div>
        </div>

        {/* Tag filters with visual design */}
        <div className="flex justify-center flex-wrap gap-2 mb-16">
          {allTags.map(tag => (
            <button 
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filterTag === tag 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/20 scale-105' 
                  : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tag === 'all' ? 'All Testimonials' : tag.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>

        {/* Main content with quote and grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Animated quote section */}
          <div className="lg:col-span-1 order-2 lg:order-1" ref={quoteRef}>
            <div className="sticky top-24">
              <div className={`quote-container ${activeTestimonial ? 'has-quote' : ''}`}>
                {activeTestimonial && (
                  <div className="quote-content">
                    <div className="quote-mark top-mark">❝</div>
                    <p className="quote-text">{activeTestimonial.highlightQuote}</p>
                    <div className="quote-mark bottom-mark">❞</div>
                    
                    <div className="citation-details">
                      <div className="avatar-container">
                        <img 
                          src={activeTestimonial.image} 
                          alt={activeTestimonial.name}
                          className="avatar-image"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/100?text=Profile';
                          }}
                        />
                      </div>
                      
                      <div className="citation-text">
                        <h3 className="citation-name">{activeTestimonial.name}</h3>
                        <p className="citation-role">{activeTestimonial.role}</p>
                        
                        <div className="citation-company">
                          <span className="company-badge">{activeTestimonial.company}</span>
                          {activeTestimonial.previousCompany && (
                            <span className="prev-company-badge">Ex-{activeTestimonial.previousCompany}</span>
                          )}
                        </div>
                        
                        <a
                          href={activeTestimonial.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="linkedin-link"
                        >
                          <Linkedin size={14} className="mr-1" />
                          <span>View Profile</span>
                        </a>
                      </div>
                    </div>
                    
                    <div className="tags-container">
                      {activeTestimonial.tags.map(tag => (
                        <span key={tag} className="tag">
                          {tag.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {!activeTestimonial && (
                  <div className="empty-quote">
                    <MessageCircle size={40} className="text-gray-600 mb-3" />
                    <p>Select a testimonial to view their endorsement</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Image grid layout */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredCitations.map((citation) => (
                <div 
                  key={citation.id}
                  className={`testimonial-card ${activeTestimonial && activeTestimonial.id === citation.id ? 'active' : ''}`}
                  onClick={() => handleSelectTestimonial(citation)}
                >
                  <div className="image-container">
                    <img
                      src={citation.image}
                      alt={`Testimonial from ${citation.name}`}
                      className="testimonial-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300?text=Profile';
                      }}
                    />
                    
                    <div className="image-overlay">
                      <div className="overlay-content">
                        <div className="overlay-icon">
                          <MessageCircle size={24} />
                        </div>
                        <p className="overlay-text">View Quote</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <h4 className="card-name">{citation.name}</h4>
                    <p className="card-role">{citation.company}</p>
                    
                    <div className="card-actions">
                      <button 
                        className="view-full-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          openImageModal(citation.image, citation.name);
                        }}
                      >
                        <span className="sr-only">View Full Testimonial</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H7" />
                        </svg>
                      </button>
                      
                      <a
                        href={citation.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linkedin-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="sr-only">LinkedIn Profile</span>
                        <Linkedin size={14} />
                      </a>
                    </div>
                  </div>
                  
                  {/* Relationship indicator */}
                  <div className="relationship-indicator">
                    {citation.relationship === "Manager" ? (
                      <span title="Manager">M</span>
                    ) : (
                      <span title="Colleague">C</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Statistics section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <div className="stat-card">
            <div className="stat-icon">
              <Award size={24} />
            </div>
            <div className="stat-value">{citations.length}</div>
            <div className="stat-label">Endorsements</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <Briefcase size={24} />
            </div>
            <div className="stat-value">{[...new Set(citations.map(c => c.company))].length}</div>
            <div className="stat-label">Companies</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <Zap size={24} />
            </div>
            <div className="stat-value">{allTags.length - 1}</div>
            <div className="stat-label">Skill Areas</div>
          </div>
        </div>
      </div>

      {/* Enhanced Image Modal with animations */}
      {selectedImage && (
        <div
          id="imageModal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md modal-container"
          onClick={handleModalClick}
        >
          <div className="relative max-w-5xl w-full bg-gray-900 rounded-xl overflow-hidden shadow-2xl modal-content">
            {/* Close button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-gray-800/80 p-2 rounded-full text-white hover:bg-red-600 transition-colors duration-300"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Modal image */}
            <div className="max-h-[90vh] overflow-auto p-2">
              <img
                src={selectedImage.url}
                alt={`Testimonial from ${selectedImage.name}`}
                className="w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/800x600?text=Unable+to+Load+Image';
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS */}
      <style jsx>{`
        /* Animated gradient text */
        .gradient-animate {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* Glowing underline */
        .glow-line {
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }
        
        .glow-line::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          animation: shine 3s infinite;
        }
        
        @keyframes shine {
          100% { left: 100%; }
        }
        
        /* Quote container */
        .quote-container {
          min-height: 350px;
          background: rgba(30, 41, 59, 0.5);
          backdrop-filter: blur(8px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .quote-container.has-quote {
          border-color: rgba(139, 92, 246, 0.3);
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.1);
        }
        
        .quote-content {
          position: relative;
          width: 100%;
          animation: fadeInUp 0.5s ease;
        }
        
        .empty-quote {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #94a3b8;
          font-style: italic;
          opacity: 0.7;
        }
        
        .quote-mark {
          font-size: 4rem;
          line-height: 1;
          color: rgba(139, 92, 246, 0.2);
          position: absolute;
        }
        
        .top-mark {
          top: -2rem;
          left: -1rem;
        }
        
        .bottom-mark {
          bottom: -4rem;
          right: -1rem;
        }
        
        .quote-text {
          font-size: 1.25rem;
          line-height: 1.7;
          color: white;
          margin-bottom: 2rem;
          text-align: center;
          font-style: italic;
        }
        
        /* Citation details */
        .citation-details {
          display: flex;
          align-items: center;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .avatar-container {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(139, 92, 246, 0.5);
          flex-shrink: 0;
          margin-right: 1rem;
        }
        
        .avatar-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .citation-text {
          flex: 1;
        }
        
        .citation-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.25rem;
        }
        
        .citation-role {
          font-size: 0.85rem;
          color: #94a3b8;
          margin-bottom: 0.5rem;
        }
        
        .citation-company {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        
        .company-badge {
          display: inline-block;
          padding: 0.15rem 0.6rem;
          background: rgba(59, 130, 246, 0.2);
          color: #93c5fd;
          border-radius: 20px;
          font-size: 0.75rem;
        }
        
        .prev-company-badge {
          display: inline-block;
          padding: 0.15rem 0.6rem;
          background: rgba(139, 92, 246, 0.2);
          color: #c4b5fd;
          border-radius: 20px;
          font-size: 0.75rem;
        }
        
        .linkedin-link {
          display: inline-flex;
          align-items: center;
          color: #60a5fa;
          font-size: 0.75rem;
          transition: color 0.3s ease;
        }
        
        .linkedin-link:hover {
          color: #93c5fd;
          text-decoration: underline;
        }
        
        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;
          justify-content: center;
        }
        
        .tag {
          padding: 0.25rem 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          font-size: 0.75rem;
          color: #e2e8f0;
        }
        
        /* Testimonial cards in the grid */
        .testimonial-card {
          position: relative;
          background: rgba(30, 41, 59, 0.7);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        
        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .testimonial-card.active {
          border-color: rgba(139, 92, 246, 0.7);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
        }
        
        .image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
          background: #1f2937;
        }
        
        .testimonial-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.5s ease;
        }
        
        .testimonial-card:hover .testimonial-image {
          transform: scale(1.05);
        }
        
        .image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .testimonial-card:hover .image-overlay {
          opacity: 1;
        }
        
        .overlay-content {
          text-align: center;
          transform: translateY(10px);
          transition: transform 0.3s ease;
        }
        
        .testimonial-card:hover .overlay-content {
          transform: translateY(0);
        }
        
        .overlay-icon {
          background: rgba(139, 92, 246, 0.3);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.5rem;
          color: white;
        }
        
        .overlay-text {
          color: white;
          font-size: 0.875rem;
        }
        
        .card-footer {
          padding: 1rem;
        }
        
        .card-name {
          font-size: 1rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .card-role {
          font-size: 0.875rem;
          color: #94a3b8;
          margin-bottom: 0.75rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .card-actions {
          display: flex;
          justify-content: space-between;
        }
        
        .view-full-btn,
        .linkedin-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .view-full-btn {
          background: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
        }
        
        .view-full-btn:hover {
          background: rgba(59, 130, 246, 0.4);
        }
        
        .linkedin-btn {
          background: rgba(10, 102, 194, 0.2);
          color: #0a66c2;
        }
        
        .linkedin-btn:hover {
          background: rgba(10, 102, 194, 0.4);
        }
        
        /* Relationship indicator */
        .relationship-indicator {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
          z-index: 10;
        }
        
        .relationship-indicator span[title="Manager"] {
          background: rgba(239, 68, 68, 0.8);
          color: white;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        
        .relationship-indicator span[title="Colleague"] {
          background: rgba(59, 130, 246, 0.8);
          color: white;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        
        /* Statistics cards */
        .stat-card {
          background: rgba(30, 41, 59, 0.5);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 1.5rem;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          border-color: rgba(139, 92, 246, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .stat-icon {
          margin: 0 auto;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
          color: white;
          margin-bottom: 1rem;
        }
        
        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          color: #94a3b8;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        /* Modal animations */
        .modal-container {
          animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
          animation: scaleIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .quote-container {
            min-height: 200px;
            margin-bottom: 2rem;
          }
          
          .quote-text {
            font-size: 1rem;
          }
          
          .citation-details {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          
          .avatar-container {
            margin-right: 0;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Citations;