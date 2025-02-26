import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink, BookOpen, Newspaper, Award, ArrowRight, Home } from 'lucide-react';

const BloggingPublications = () => {
  const [activeTab, setActiveTab] = useState('publications');

  // Data for each section
  const publications = [
    {
      title: "Advancing Educational Insights: Explainable AI Models for Informed Decision Making",
      journal: "International Journal of Research in Applied Science & Engineering Technology",
      year: 2023,
      abstract: "This research explores how explainable AI models can enhance educational decision-making processes by providing transparent insights and interpretable outcomes, ultimately improving learning experiences and administrative efficiency.",
      link: "https://www.ijraset.com/best-journal/advancing-educational-insights-explainable-ai-models-for-informed-decision-making",
      image: "assets/citations/paper1.png",
      tags: ["Explainable AI", "Education", "Decision Making"]
    }
  ];

  const blogs = [
    {
      title: "Encoding vs Embedding Models: Both Output Numbers, Different Stories",
      platform: "Medium",
      date: "Jan 15, 2025",
      snippet: "An in-depth exploration of the fundamental differences between encoding and embedding models in AI, clarifying how these seemingly similar processes serve vastly different purposes in machine learning pipelines.",
      link: "https://medium.com/@karamvirhapal/encoding-vs-embedding-models-both-output-numbers-different-stories-5c85eced1801",
      image: "assets/citations/medium1.png",
      readTime: "8 min read",
      tags: ["AI", "Machine Learning", "NLP"]
    },
    {
      title: "Langflow vs LangGraph: A Comprehensive Guide to AI Application Development",
      platform: "Medium",
      date: "Nov 20, 2024",
      snippet: "A detailed comparison between Langflow and LangGraph, two powerful frameworks for developing AI applications, highlighting their strengths, weaknesses, and ideal use cases to help developers choose the right tool.",
      link: "https://medium.com/@karamvirhapal/langflow-vs-langgraph-a-comprehensive-guide-to-ai-application-development-aca306bb5c31",
      image: "assets/citations/medium2.png",
      readTime: "10 min read",
      tags: ["Langflow", "LangGraph", "AI Development"]
    }
  ];

  const courses = [
    {
      title: "Deep Learning Specialization",
      platform: "Coursera",
      instructor: "Andrew Ng",
      completionDate: "2022",
      description: "Comprehensive specialization covering neural networks, deep learning, structuring ML projects, CNNs, and sequence models.",
      link: "https://www.coursera.org/account/accomplishments/specialization/certificate/FDDJVR77JGD7",
      image: "assets/citations/coursera.png",
      skills: ["Neural Networks", "Deep Learning", "CNN", "RNN", "TensorFlow"]
    },
    {
      title: "Problem Solving Certificate",
      platform: "HackerRank",
      completionDate: "2020",
      description: "Certificate validating intermediate-level problem-solving skills in algorithms, data structures, and computational thinking.",
      link: "https://www.hackerrank.com/certificates/7f86be3fe508",
      image: "assets/citations/hackerrank.png",
      skills: ["Algorithms", "Data Structures", "Problem Solving"]
    },
    {
      title: "Machine Learning A-Z",
      platform: "Udemy",
      instructor: "Kirill Eremenko & Hadelin de Ponteves",
      completionDate: "2019",
      description: "Comprehensive course covering all aspects of machine learning including regression, classification, clustering, and reinforcement learning.",
      link: "https://www.udemy.com/certificate/UC-L5MS4F1J/",
      image: "assets/citations/udemy.png",
      skills: ["Machine Learning", "Regression", "Classification", "Python"]
    }
  ];

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const tabIcons = {
    publications: <BookOpen className="w-6 h-6" />,
    blogs: <Newspaper className="w-6 h-6" />,
    courses: <Award className="w-6 h-6" />
  };

  return (
    <section id="publications" className="min-h-screen py-32 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      <div className="container mx-auto px-6 sm:px-10">
        {/* Home Navigation Button */}
        <div className="flex justify-start mb-16">
          <a
            href="#hero"
            className="flex items-center px-8 py-4 text-xl font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 shadow-lg transition-all duration-300"
          >
            <Home className="w-6 h-6 mr-3" />
            Back to Home
          </a>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Header with parallax effect */}
          <motion.div
            className="text-center mb-24 relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 flex justify-center items-center -z-10">
              <div className="w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>
            <h2 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 inline-block mb-8">
              Knowledge Sharing
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Explore my research publications, blog posts, and professional certifications that showcase my journey and expertise in AI and software engineering.
            </p>
            <div className="w-40 h-2 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-10 rounded-full"></div>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-20">
                          <div className="inline-flex p-2.5 bg-gray-800 rounded-2xl shadow-xl">
              {['publications', 'blogs', 'courses'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-12 py-5 rounded-xl text-xl font-medium transition-all duration-300 flex items-center ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {tabIcons[tab]}
                  <span className="ml-3 capitalize">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Publications Tab */}
          {activeTab === 'publications' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-12"
            >
              {publications.map((pub) => (
                <motion.div
                  key={pub.title}
                  variants={itemVariants}
                  className="bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className="md:flex">
                    <div className="md:w-2/5 h-80 overflow-hidden">
                      <img
                        src={pub.image}
                        alt={pub.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="md:w-3/5 p-12">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-3">{pub.title}</h3>
                          <p className="text-blue-400 mb-4 text-lg">
                            {pub.journal} • {pub.year}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-8 text-xl leading-relaxed">{pub.abstract}</p>

                      <div className="flex flex-wrap gap-3 mb-8">
                        {pub.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-5 py-2 bg-gray-700 rounded-full text-base font-medium text-blue-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-300 font-medium text-lg"
                      >
                        Read Publication
                        <ExternalLink size={20} className="ml-3" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Blogs Tab */}
          {activeTab === 'blogs' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {blogs.map((blog) => (
                  <motion.div
                    key={blog.title}
                    variants={itemVariants}
                    className="bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-[1.03] h-full flex flex-col"
                  >
                    <div className="h-64 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="p-10 flex-grow flex flex-col">
                      <div className="mb-6">
                        <div className="flex items-center justify-between text-base text-gray-400 mb-3">
                          <span>{blog.platform}</span>
                          <span>{blog.readTime}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">{blog.title}</h3>
                        <p className="text-gray-300 mb-6 text-lg leading-relaxed">{blog.snippet}</p>
                      </div>

                      <div className="flex flex-wrap gap-3 mb-6 mt-auto">
                        {blog.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-4 py-2 bg-gray-700 rounded-full text-sm font-medium text-purple-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a
                        href={blog.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium text-lg mt-2"
                      >
                        Read on Medium
                        <ChevronRight size={20} className="ml-2" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* View More Button */}
              <div className="flex justify-center mt-20">
                <a
                  href="https://medium.com/@karamvirhapal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-10 py-5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-300 font-medium text-xl group shadow-lg"
                >
                  View More Articles
                  <ArrowRight size={22} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </motion.div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <div className="grid md:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <motion.div
                    key={course.title}
                    variants={itemVariants}
                    className="bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-700 hover:border-green-500 transition-all duration-300 transform hover:scale-[1.03] h-full flex flex-col"
                  >
                    <div className="h-60 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 z-10"></div>
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute bottom-0 left-0 p-6 z-20">
                        <span className="px-5 py-2 bg-green-600/80 text-white rounded-lg text-base font-medium">
                          {course.platform}
                        </span>
                      </div>
                    </div>
                    <div className="p-10 flex-grow flex flex-col">
                      <h3 className="text-2xl font-bold text-white mb-3">{course.title}</h3>
                      {course.instructor && (
                        <p className="text-gray-400 text-base mb-4">Instructor: {course.instructor}</p>
                      )}
                      <p className="text-gray-300 mb-6 text-lg leading-relaxed">{course.description}</p>

                      <div className="flex flex-wrap gap-3 mb-6 mt-auto">
                        {course.skills && course.skills.slice(0, 3).map(skill => (
                          <span
                            key={skill}
                            className="px-4 py-2 bg-gray-700 rounded-full text-sm font-medium text-green-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-lg">Completed: {course.completionDate}</span>
                        <a
                          href={course.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors duration-300 font-medium text-lg"
                        >
                          View Certificate
                          <ExternalLink size={18} className="ml-2" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BloggingPublications;