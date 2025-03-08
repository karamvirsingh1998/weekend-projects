// src/components/sections/Hero.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import * as LucideIcons from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Modern, vibrant neural network visualization
const NeuralNetworkBackground = () => {
  const containerRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [connections, setConnections] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [animatedPoints, setAnimatedPoints] = useState(0);

  // Setup network points and connections on mount
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });

        // Create points based on dimensions
        const pointCount = Math.min(Math.floor((width * height) / 12000), 80);
        generateNetwork(pointCount, width, height);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Gradually animate points appearing for a smoother entry effect
  useEffect(() => {
    if (points.length > 0 && animatedPoints < points.length) {
      const timer = setTimeout(() => {
        setAnimatedPoints((prev) => Math.min(prev + 1, points.length));
      }, 40);

      return () => clearTimeout(timer);
    }
  }, [points.length, animatedPoints]);

  // Generate network of points and connections
  const generateNetwork = (count, width, height) => {
    const newPoints = [];

    // Generate points with varied depths for a 3D effect
    for (let i = 0; i < count; i++) {
      newPoints.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 2,
        depth: Math.random(),
        velX: (Math.random() - 0.5) * 0.3,
        velY: (Math.random() - 0.5) * 0.3,
        // Use a range of blues for different point types
        color:
          i % 5 === 0
            ? "rgba(100, 200, 255, 0.8)"
            : i % 7 === 0
            ? "rgba(150, 180, 255, 0.7)"
            : "rgba(100, 150, 255, 0.5)",
      });
    }

    setPoints(newPoints);

    // Create connections between nearby points
    const newConnections = [];
    const connectionDistance = Math.min(width, height) * 0.15;

    for (let i = 0; i < newPoints.length; i++) {
      for (let j = i + 1; j < newPoints.length; j++) {
        const dx = newPoints[i].x - newPoints[j].x;
        const dy = newPoints[i].y - newPoints[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          newConnections.push({
            id: `${i}-${j}`,
            pointA: i,
            pointB: j,
            distance,
            opacity: Math.max(0.05, 1 - distance / connectionDistance),
            highlighted: false,
          });
        }
      }
    }

    setConnections(newConnections);
  };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* SVG for connections */}
      <svg width="100%" height="100%" className="absolute inset-0">
        {connections.slice(0, animatedPoints * 3).map((conn) => {
          if (points.length <= conn.pointA || points.length <= conn.pointB)
            return null;
          const pointA = points[conn.pointA];
          const pointB = points[conn.pointB];

          return (
            <motion.line
              key={conn.id}
              x1={pointA.x}
              y1={pointA.y}
              x2={pointB.x}
              y2={pointB.y}
              stroke="rgba(120, 170, 255, 0.15)"
              strokeWidth={conn.highlighted ? 1 : 0.5}
              initial={{ opacity: 0 }}
              animate={{ opacity: conn.opacity }}
              transition={{ duration: 1.5 }}
            />
          );
        })}
      </svg>

      {/* Points/nodes */}
      {points.slice(0, animatedPoints).map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute rounded-full"
          style={{
            left: point.x,
            top: point.y,
            width: point.size,
            height: point.size,
            backgroundColor: point.color,
            zIndex: Math.floor(point.depth * 10),
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.7 + point.depth * 0.3,
            scale: 1,
            x: [0, point.velX * 50, 0],
            y: [0, point.velY * 50, 0],
          }}
          transition={{
            opacity: { duration: 0.7 },
            scale: { duration: 0.5 },
            x: {
              repeat: Infinity,
              duration: 10 + point.depth * 15,
              ease: "easeInOut",
              repeatType: "reverse",
            },
            y: {
              repeat: Infinity,
              duration: 10 + point.depth * 20,
              ease: "easeInOut",
              repeatType: "reverse",
              delay: point.id * 0.05,
            },
          }}
        />
      ))}

      {/* Floating accent particles for additional visual interest */}
      {Array.from({ length: 15 }).map((_, i) => {
        const size = Math.random() * 5 + 2;
        const speed = Math.random() * 40 + 30;

        return (
          <motion.div
            key={`accent-${i}`}
            className="absolute rounded-full bg-blue-400/30"
            style={{
              width: size,
              height: size,
              filter: "blur(1px)",
            }}
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              opacity: 0,
            }}
            animate={{
              y: [null, -speed],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              y: {
                repeat: Infinity,
                duration: 3 + Math.random() * 2,
                ease: "easeOut",
                repeatType: "loop",
                delay: i * 0.3,
              },
              opacity: {
                repeat: Infinity,
                duration: 3 + Math.random() * 2,
                ease: "easeInOut",
                repeatType: "loop",
                delay: i * 0.3,
              },
            }}
          />
        );
      })}
    </div>
  );
};

// Simple particle emitter for navigation tiles
const SimpleParticleEmitter = ({ color }) => {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);

  // Create particles on click
  const createParticles = (e) => {
    if (!containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const x = e.clientX - container.left;
    const y = e.clientY - container.top;

    const newParticles = [];
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 30 + 20;
      const size = Math.random() * 6 + 3;
      const lifetime = Math.random() * 600 + 400;

      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size,
        lifetime,
        color,
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);

    // Remove particles after their lifetime
    newParticles.forEach((particle) => {
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== particle.id));
      }, particle.lifetime);
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const parentEl = container.parentElement;

    if (parentEl) {
      const handleClick = (e) => createParticles(e);
      parentEl.addEventListener("click", handleClick);

      return () => {
        parentEl.removeEventListener("click", handleClick);
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full bg-${particle.color}`}
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            x: particle.vx,
            y: particle.vy,
            opacity: [1, 0],
            scale: [1, 0.5],
          }}
          transition={{
            duration: particle.lifetime / 1000,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

// Mock responses as fallback when API fails
const MOCK_RESPONSES = {
  default:
    "I'm Karamvir's AI assistant. How can I help you learn more about his experience in AI engineering, language models, and voice technology?",

  experience:
    "Karamvir has 5+ years of experience in AI and ML. He's worked on production-grade systems that have saved companies over $1.5M through automation and improved accuracy. His systems have consistently maintained 92% or higher accuracy in production environments.",

  llm: "Karamvir is an expert in Large Language Models (LLMs). He has worked on fine-tuning models, building retrieval-augmented generation systems, PEFT/LoRA implementations, and ensuring factuality in AI outputs. He's particularly focused on creating reliable AI solutions for enterprise applications.",

  voice:
    "As a voice technology specialist, Karamvir has built several speech recognition and text-to-speech systems. He's worked on improving noise robustness in speech models and built voice assistants that can handle complex interactions.",

  education:
    "Karamvir graduated from NIT Jalandhar with an impressive 8.86 CGPA. He's also taken specialized courses in machine learning, natural language processing, and speech technology throughout his career.",

  research:
    "Karamvir has published 3 research papers on topics including improving factuality in language models and noise-robust speech recognition. His work has been cited by other researchers in the field.",

  skills:
    "Karamvir's technical skills span multiple areas of AI including: LLMs, RAG, LoRA, PEFT, Multimodal AI, TTS, ASR, Transformers. He's also experienced with infrastructure technologies like Kubernetes, AWS, GCP, and has strong programming skills in Python, C++, and FastAPI.",

  projects:
    "Throughout his career, Karamvir has built 15+ AI systems including voice assistants, content generation platforms, recommendation engines, and automated document processing solutions. These systems have achieved high accuracy rates and delivered significant cost savings.",
};

const Hero = () => {
  // State for AI Assistant chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const chatEndRef = useRef(null);

  // State for mousemove parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // State for dynamic traits carousel
  const [currentTraitIndex, setCurrentTraitIndex] = useState(0);
  const traits = [
    "Building AI that solves real problems",
    "Expertise in multi-agent orchestration",
    "Voice technology specialist",
    "LLM fine-tuning expert",
    "Responsible AI advocate",
    "8+ years of AI/ML experience",
    "Published AI researcher",
  ];

  // State for achievement counters
  const [counters, setCounters] = useState({
    systems: 0,
    accuracy: 0,
    savings: 0,
    publications: 0,
  });

  // State for skill pills
  const skillPills = [
    "LLMs",
    "RAG",
    "LoRA",
    "PEFT",
    "Multimodal AI",
    "TTS",
    "ASR",
    "Transformers",
    "Kubernetes",
    "AWS",
    "GCP",
    "FastAPI",
    "Python",
    "C++",
  ];

  // Navigation icons with increased size
  const navIcons = [
    {
      id: "about",
      name: "About",
      icon: <LucideIcons.User size={40} />,
      color: "blue-600",
      background: "bg-blue-900/30",
      preview: "My journey, expertise & philosophy",
    },
    {
      id: "projects",
      name: "Projects",
      icon: <LucideIcons.Briefcase size={40} />,
      color: "green-600",
      background: "bg-green-900/30",
      preview: "AI systems & solutions I've built",
    },
    {
      id: "skills",
      name: "Skills",
      icon: <LucideIcons.Code2 size={40} />,
      color: "yellow-600",
      background: "bg-yellow-900/30",
      preview: "Technical expertise & capabilities",
    },
    {
      id: "research",
      name: "Research",
      icon: <LucideIcons.GraduationCap size={40} />,
      color: "purple-600",
      background: "bg-purple-900/30",
      preview: "Academic publications & contributions",
    },
    {
      id: "citations",
      name: "Citations",
      icon: <LucideIcons.FileText size={40} />,
      color: "cyan-600",
      background: "bg-cyan-900/30",
      preview: "References to my work & research",
    },
    {
      id: "ideas",
      name: "Ideas",
      icon: <LucideIcons.Lightbulb size={40} />,
      color: "amber-600",
      background: "bg-amber-900/30",
      preview: "Innovative concepts & future projects",
    },
    {
      id: "interests",
      name: "Interests",
      icon: <LucideIcons.Heart size={40} />,
      color: "pink-600",
      background: "bg-pink-900/30",
      preview: "Travel, books & personal hobbies",
    },
    {
      id: "contact",
      name: "Contact",
      icon: <LucideIcons.Mail size={40} />,
      color: "indigo-600",
      background: "bg-indigo-900/30",
      preview: "Get in touch & connect with me",
    },
  ];

  // Suggested questions for AI assistant
  const suggestedQuestions = [
    "What's Karamvir's expertise in LLMs?",
    "Tell me about his work experience",
    "What research has he published?",
    "Which technologies does he specialize in?",
    "What are his educational qualifications?",
  ];

  // Handle mouse movement for parallax effects
  const handleMouseMove = (e) => {
    // Update motion values based on mouse position
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    mouseX.set((clientX / innerWidth - 0.5) * 2);
    mouseY.set((clientY / innerHeight - 0.5) * 2);
  };

  // Transform for 3D card effect
  const rotateX = useTransform(mouseY, [-1, 1], [10, -10]);
  const rotateY = useTransform(mouseX, [-1, 1], [-10, 10]);

  // Rotate through traits
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTraitIndex((prev) => (prev + 1) % traits.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [traits.length]);

  // Animate counters on load
  useEffect(() => {
    const targetValues = {
      systems: 15,
      accuracy: 92,
      savings: 1.5,
      publications: 3,
    };

    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);

    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      setCounters({
        systems: Math.floor(easeOutCubic(progress) * targetValues.systems),
        accuracy: Math.floor(easeOutCubic(progress) * targetValues.accuracy),
        savings: parseFloat(
          (easeOutCubic(progress) * targetValues.savings).toFixed(1)
        ),
        publications: Math.floor(
          easeOutCubic(progress) * targetValues.publications
        ),
      });

      if (frame === totalFrames) {
        clearInterval(timer);
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, []);

  // Easing function for smooth animation
  const easeOutCubic = (x) => {
    return 1 - Math.pow(1 - x, 3);
  };

  // Updated navigation handler with improved scroll behavior
  const handleNavClick = (id) => {
    if (id === "resume") {
      // Handle resume download
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      // Get header height for offset calculation
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;

      // Calculate the element's position
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;

      // Scroll with offset
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth",
      });
    }
  };

  // Handle opening/closing chat assistant
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);

    // Add initial message if empty
    if (!isChatOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: MOCK_RESPONSES.default,
        },
      ]);
    }
  };

  // Get mock response based on message content
  const getMockResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("experience") || lowerMessage.includes("work")) {
      return MOCK_RESPONSES.experience;
    }

    if (
      lowerMessage.includes("llm") ||
      lowerMessage.includes("language model")
    ) {
      return MOCK_RESPONSES.llm;
    }

    if (lowerMessage.includes("voice") || lowerMessage.includes("speech")) {
      return MOCK_RESPONSES.voice;
    }

    if (
      lowerMessage.includes("education") ||
      lowerMessage.includes("study") ||
      lowerMessage.includes("qualification")
    ) {
      return MOCK_RESPONSES.education;
    }

    if (
      lowerMessage.includes("research") ||
      lowerMessage.includes("publication") ||
      lowerMessage.includes("paper")
    ) {
      return MOCK_RESPONSES.research;
    }

    if (
      lowerMessage.includes("skill") ||
      lowerMessage.includes("technolog") ||
      lowerMessage.includes("stack")
    ) {
      return MOCK_RESPONSES.skills;
    }

    if (
      lowerMessage.includes("project") ||
      lowerMessage.includes("system") ||
      lowerMessage.includes("build")
    ) {
      return MOCK_RESPONSES.projects;
    }

    // Default response for any other queries
    return `Based on what I know about Karamvir, I can tell you that he's a skilled AI Engineer with 8+ years of experience. He specializes in LLMs, voice technology, and has built numerous AI systems that have delivered significant business value. Is there something specific about his background or expertise you'd like to know?`;
  };

  // Handle sending a message to AI assistant
  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    // Add user message to chat
    const newMessages = [...messages, { role: "user", content: messageText }];

    setMessages(newMessages);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Get API key from environment variable
      const apiKey =  process.env.REACT_APP_GEMINI_API_KEY;


      // Check if API key is available
      if (!apiKey || apiKey === "" || apiKey === "YOUR_API_KEY") {
        // Use fallback responses if no API key
        setUsingFallback(true);
        setTimeout(() => {
          const response = getMockResponse(messageText);

          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: response,
            },
          ]);

          setIsTyping(false);
        }, 1000);

        return;
      }

      // Initialize Gemini AI with the official Google SDK
      const genAI = new GoogleGenerativeAI(apiKey);

      // Get the model - try to use gemini-1.5-flash if available, fall back to gemini-pro
      const modelName = "gemini-1.5-flash";
      const model = genAI.getGenerativeModel({ model: modelName });

      // Construct context about Karamvir
      const prompt = `
        # AI Assistant Bot Persona for Karamvir Singh

## Personal Background
- Name: Karamvir Singh
- Role: Staff AI Engineer
- Education:
  - NIT Jalandhar Graduate
  - CGPA: 8.86
  - High School: 94%

## Academic Achievements
### Research Publications
- Title: "Advancing Educational Insights: Explainable AI Models for Informed Decision Making"
- Published in: International Journal of Research in Applied Science & Engineering Technology
- Year: 2023
- Focus: Exploring how explainable AI models enhance educational decision-making

### Certifications
1. Deep Learning Specialization (Coursera) - Completed 2022
2. Problem Solving Certificate (HackerRank) - Completed 2020
3. Machine Learning A-Z (Udemy) - Completed 2019

## Professional Experience
### Companies
1. HighLevel
   - AI Support Bot Development
   - Multi-Agent Routing System
   - Content Generation Co-pilot

2. UnifyApps
   - Created MultiModal AI-Agentic Framework
   - Developed Voice-Enabled FAQ Chatbot
   - Built Business Analytics Tool
   - Optimized LLM Adapter Training

3. Sprinklr
   - Architected Conversational AI Ecosystem
   - Developed High-Performance Inference System
   - Created Advanced Text-to-Speech System

## Technical Expertise
### Technical Skills
- Programming Languages: Python, C++
- AI Technologies:
  - Multi-Agent Orchestration
  - Retrieval Augmented Generation (RAG)
  - LLM Fine-tuning (LoRA, PEFT)
  - Voice Technologies (ASR, TTS)
  - Transformer Architectures

### Infrastructure
- Cloud Platforms: AWS, Google Cloud Platform
- DevOps: Kubernetes, Docker, CI/CD Pipelines
- Frameworks: FastAPI

## Personal Interests
### Travel Destinations
Explored Locations:
1. Dubai: Blend of modern architecture and cultural heritage
2. Singapore: Harmony of nature and urban development
3. Spiti Valley: Untouched natural beauty
4. Manali: Mountain views and adventure sports
5. Hyderabad: Historic charm and culinary delights
6. Delhi: Heritage and modernity
7. Gurgaon: Dynamic urban lifestyle and tech culture
8. Ladakh: Majestic landscapes
9. Goa: Beaches and vibrant culture

### Reading Interests
Favorite Books:
1. Rich Dad Poor Dad - Robert Kiyosaki
2. The Art of War - Sun Tzu
3. Seven Habits of Highly Effective People - Stephen R. Covey
4. Harry Potter Series - J.K. Rowling
5. The Girl in Room 105 - Chetan Bhagat

### Hobbies
- Guitar Learning: Exploring music as a creative outlet
- Coding Projects
- Competitive Programming
- Reading across various genres

## Innovative Project Ideas
1. Support Ticket Automation System
2. Investment Portfolio Advisor
3. WhatsApp Intelligence Assistant
4. ML-Driven Contract Analyzer
5. Voice-First Developer Assistant

## Core Philosophical Approach
- Solve Real Problems: Focus on creating AI solutions with measurable impact
- Responsible AI: Committed to ethical, transparent, and fair AI development
- Continuous Innovation: Always pushing boundaries of what's possible in AI

## Communication Guidelines
- Professional and technical tone
- Emphasize practical applications of AI
- Highlight innovative approaches to solving complex problems
- Demonstrate deep understanding of AI technologies

## Interaction Constraints
- Respond only based on the information provided about Karamvir Singh
- Provide insights from his professional experiences and technical expertise
- Avoid speculating beyond the given information
- Maintain a knowledgeable and focused approach to technology discussions

## Contact Information
- Email: karamvirh71@gmail.com
- LinkedIn: https://www.linkedin.com/in/karamvir-singh-842838177/
- WhatsApp: +91 8283880452
- Twitter: @9876349269
- GitHub: https://github.com/karamvirsingh1998

## Personal Mission
To transform complex technological challenges into intelligent, impactful solutions that drive meaningful change across industries.

        User query: ${messageText}

        Keep your answer helpful, concise, and personable. Focus on Karamvir's professional background.
        You are Karamvir's Personal Assistant, You can only answer the questions which are in scope of Context.
        For Queries which are not in scope of Context, Politely refuse without explicitly statingthe lack of context
        2. Keep Answers, Very Concise ,empathetic , human-tonic , keep it very concise only answering what user asked.
      `;

      // Call Gemini API
      const result = await model.generateContent(prompt);
      const response = result.response.text();

      // Add assistant response to chat with slight delay for typing effect
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: response,
          },
        ]);

        setIsTyping(false);
      }, 800);
    } catch (error) {
      console.error("Error calling AI assistant:", error);

      // Switch to fallback mode
      setUsingFallback(true);

      // Add fallback response
      setTimeout(() => {
        const fallbackResponse = getMockResponse(messageText);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: fallbackResponse,
          },
        ]);

        setIsTyping(false);
      }, 800);
    }
  };

  // Scroll to bottom of chat when messages update
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <section
      id="hero"
      className="h-screen w-full flex items-stretch overflow-hidden bg-gray-900"
      onMouseMove={handleMouseMove}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Neural Network Visualization */}
        <NeuralNetworkBackground />

        <div
          className="absolute inset-0 bg-grid-white/[0.01]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%23FFFFFF' fill-opacity='0.05'/%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
          }}
        ></div>
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Left Section (35%) - Profile Photo & About */}
      <div className="w-[35%] h-full flex flex-col p-8 relative z-10">
        <div className="flex flex-col justify-center h-full">
          {/* Profile Photo - 3D Card Effect */}
          <div className="flex-[0.3] flex items-center justify-center mt-20 relative">
            {/* Floating Skill Pills */}
            <div className="absolute inset-0 z-0">
              {skillPills.map((skill, index) => {
                const angle = (index / skillPills.length) * Math.PI * 2;
                const radius = 140;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                return (
                  <motion.div
                    key={skill}
                    className="absolute bg-blue-600/80 text-white px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      x: [0, Math.random() * 10 - 5],
                      y: [0, Math.random() * 10 - 5],
                    }}
                    transition={{
                      opacity: { delay: index * 0.05, duration: 0.5 },
                      x: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2 + Math.random() * 2,
                      },
                      y: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 2 + Math.random() * 2,
                      },
                    }}
                    whileHover={{
                      scale: 1.2,
                      backgroundColor: "rgba(37, 99, 235, 0.9)",
                    }}
                  >
                    {skill}
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="w-full max-w-xl aspect-square rounded-lg border-4 border-blue-500 overflow-hidden shadow-xl relative z-10"
              style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/images/profile.jpeg"
                alt="Karamvir Singh"
                className="w-full h-full object-cover transform-gpu"
                onError={(e) => {
                  console.error("Image failed to load");
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/400?text=Karamvir+Singh";
                }}
              />

              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/20 to-purple-600/0 mix-blend-overlay"></div>
            </motion.div>
          </div>

          {/* About Section - Enhanced with better visuals and interactions */}
          <div className="flex-[0.4] flex flex-col justify-center text-center relative z-10 mt-12">
            {/* Decorative elements */}
            <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>

            {/* Name with gradient text and animated underline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="relative mb-2"
            >
              <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 transform-gpu">
                Karamvir Singh
              </h1>
              <motion.div
                className="h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mt-2 mx-auto"
                initial={{ width: 0 }}
                animate={{ width: "180px" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>

            {/* Animated job title with typewriter effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-4"
            >
              <div className="relative inline-block">
                <p className="text-2xl md:text-3xl text-gray-300 font-medium">
                  Staff AI Engineer
                </p>
                <motion.div
                  initial={{ height: "100%" }}
                  animate={{ height: 0 }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                  className="absolute inset-0 bg-gray-900"
                />
              </div>
            </motion.div>

            {/* Dynamic Trait Carousel */}
            <div className="h-8 mb-4">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTraitIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg text-gray-300 italic"
                >
                  {traits[currentTraitIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Achievement Counters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-center space-x-6 my-4"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {counters.systems}+
                </div>
                <div className="text-sm text-gray-400">AI Systems</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {counters.accuracy}%
                </div>
                <div className="text-sm text-gray-400">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  ${counters.savings}M+
                </div>
                <div className="text-sm text-gray-400">Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">
                  {counters.publications}
                </div>
                <div className="text-sm text-gray-400">Publications</div>
              </div>
            </motion.div>

            {/* Social links with hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center space-x-8 my-4"
            >
              <motion.a
                href="https://github.com/karamvirsingh1998"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
                <LucideIcons.Github
                  size={32}
                  className="text-gray-400 group-hover:text-white transition-colors duration-300"
                />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/karamvir-singh-842838177/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
                <LucideIcons.Linkedin
                  size={32}
                  className="text-gray-400 group-hover:text-white transition-colors duration-300"
                />
              </motion.a>

              <motion.a
                href="https://x.com/9876349269"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
                <LucideIcons.Twitter
                  size={32}
                  className="text-gray-400 group-hover:text-white transition-colors duration-300"
                />
              </motion.a>
            </motion.div>

            {/* Download Resume Button with enhanced styling */}
            <motion.a
              href="/karamvirResume.pdf"
              download="Karamvir_Singh_Resume.pdf"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative mx-auto mt-6 px-8 py-3 overflow-hidden group bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <div className="flex items-center">
                <LucideIcons.Download size={18} className="mr-2" />
                <span>Download Resume</span>
              </div>
            </motion.a>
          </div>
        </div>

        {/* Scroll Down Animation */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1.5,
            y: {
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
        >
          <motion.div
            className="flex flex-col items-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => handleNavClick("about")}
          >
            <p className="text-gray-400 mb-2 text-sm">Scroll Down</p>
            <LucideIcons.ChevronDown className="text-blue-400 animate-bounce" />
          </motion.div>
        </motion.div>
      </div>

      {/* Right Section (65%) - Navigation Icons Grid */}
      <div className="w-[65%] h-full bg-gradient-to-r from-gray-900 to-gray-800 p-8 flex items-center">
        <div className="w-full">
          <div className="grid grid-cols-4 gap-4 h-full">
            <div className="col-span-4 grid grid-cols-4 grid-rows-2 gap-8">
              {navIcons.map((item, index) => {
                // Calculate row and column position
                const row = Math.floor(index / 4);
                const col = index % 4;

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
                      y: -5,
                    }}
                    onClick={() => handleNavClick(item.id)}
                    className={`cursor-pointer group relative`}
                    style={{
                      gridRow: row + 1,
                      gridColumn: col + 1,
                    }}
                  >
                    {/* Preview on hover */}
                    <motion.div
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-800 text-white text-sm py-2 px-4 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none z-20 whitespace-nowrap"
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.preview}
                    </motion.div>

                    <div
                      className={`p-6 w-full aspect-square rounded-lg ${
                        item.background
                      } border-2 border-${
                        item.color.split("-")[1]
                      }-500/50 shadow-lg transition-all flex flex-col items-center justify-center gap-4 relative overflow-hidden`}
                    >
                      {/* Particle effect on click */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <SimpleParticleEmitter color={item.color} />
                      </div>

                      {/* Floating animation */}
                      <motion.div
                        className="text-white"
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: index * 0.2,
                        }}
                      >
                        {item.icon}
                      </motion.div>
                      <div className="text-white text-xl font-medium">
                        {item.name}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Chat Interface */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Toggle Button */}
        <motion.button
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleChat}
        >
          {isChatOpen ? (
            <LucideIcons.X size={24} />
          ) : (
            <LucideIcons.MessageCircle size={24} />
          )}
        </motion.button>

        {/* Chat Interface */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-20 right-0 w-96 h-[500px] bg-gray-900 rounded-xl shadow-2xl border border-gray-700 flex flex-col overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <LucideIcons.Bot size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">Karamvir's AI Assistant</h3>
                    <p className="text-xs opacity-80">
                      Ask me anything about Karamvir
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800 text-gray-200"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 text-gray-200 rounded-lg p-3">
                      <div className="flex space-x-2">
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "600ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fallback Mode Indicator */}
                {usingFallback && !isTyping && (
                  <div className="flex justify-center">
                    <div className="bg-yellow-500/10 text-yellow-300 rounded-lg text-xs p-2 text-center max-w-[90%]">
                      <LucideIcons.Info className="inline-block mr-1 h-3 w-3" />
                      Running in local mode with pre-loaded information
                    </div>
                  </div>
                )}

                <div ref={chatEndRef}></div>
              </div>

              {/* Suggested Questions */}
              <div className="p-2 bg-gray-800 overflow-x-auto">
                <div className="flex space-x-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(question)}
                      className="px-3 py-1 bg-gray-700 text-white text-sm rounded-full whitespace-nowrap hover:bg-blue-600 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t border-gray-700">
                <div className="flex">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-gray-800 text-white rounded-l-lg px-4 py-2 outline-none"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isTyping}
                    className={`text-white px-4 py-2 rounded-r-lg ${
                      !inputMessage.trim() || isTyping
                        ? "bg-blue-600/50 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    <LucideIcons.Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
