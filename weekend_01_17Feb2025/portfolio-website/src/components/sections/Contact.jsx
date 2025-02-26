import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Mail, Phone, Linkedin, Twitter, Calendar, Send, MessageSquare, CheckCircle, AlertCircle, Coffee } from 'lucide-react';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('message');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Form submission with Formspree
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace 'YOUR_FORMSPREE_FORM_ID' with your actual form ID from Formspree
      const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus({
          submitted: true,
          success: true,
          message: "Your message has been sent successfully! I'll get back to you soon."
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        submitted: true,
        success: false,
        message: "Sorry, there was an error sending your message. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calendar demo request data
  const availableTimes = [
    { id: 1, day: 'Monday', times: ['10:00 AM', '2:00 PM', '4:00 PM'] },
    { id: 2, day: 'Tuesday', times: ['11:00 AM', '1:00 PM', '5:00 PM'] },
    { id: 3, day: 'Wednesday', times: ['9:00 AM', '3:00 PM', '6:00 PM'] },
    { id: 4, day: 'Thursday', times: ['10:00 AM', '12:00 PM', '4:00 PM'] },
    { id: 5, day: 'Friday', times: ['11:00 AM', '2:00 PM', '3:00 PM'] }
  ];

  // For demo purposes
  const handleSchedule = (day, time) => {
    window.open(`https://calendly.com/yourusername/30min?date=${day}&time=${time}`, '_blank');
  };

  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/0 to-gray-900/0"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900/0 to-gray-900/0"></div>
      </div>

      <div className="container mx-auto px-6 sm:px-10 relative z-10">
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

        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 inline-block mb-8">
            Let's Connect
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Have a project in mind or want to explore collaboration opportunities? I'd love to hear from you.
          </p>
          <div className="w-40 h-2 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-10 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Left sidebar - Contact info */}
            <div className="md:col-span-2">
              <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 shadow-xl h-full">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>

                  {/* Contact details */}
                  <div className="space-y-6 mb-8">
                    <a
                      href="mailto:karamvirh71@gmail.com"
                      className="flex items-center p-4 bg-gray-900/80 rounded-xl hover:bg-gray-700 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mr-4 group-hover:bg-blue-600/30 transition-colors">
                        <Mail className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Email</div>
                        <div className="text-white font-medium">karamvirh71@gmail.com</div>
                      </div>
                    </a>

                    <a
                      href="https://wa.me/+918283880452"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-gray-900/80 rounded-xl hover:bg-gray-700 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center mr-4 group-hover:bg-green-600/30 transition-colors">
                        <Phone className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">WhatsApp</div>
                        <div className="text-white font-medium">+91 8283880452</div>
                      </div>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/karamvir-singh-842838177/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-gray-900/80 rounded-xl hover:bg-gray-700 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mr-4 group-hover:bg-blue-600/30 transition-colors">
                        <Linkedin className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">LinkedIn</div>
                        <div className="text-white font-medium">karamvir-singh</div>
                      </div>
                    </a>

                    <a
                      href="https://twitter.com/9876349269"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-gray-900/80 rounded-xl hover:bg-gray-700 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-sky-900/30 flex items-center justify-center mr-4 group-hover:bg-sky-600/30 transition-colors">
                        <Twitter className="w-5 h-5 text-sky-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Twitter</div>
                        <div className="text-white font-medium">@9876349269</div>
                      </div>
                    </a>
                  </div>

                  {/* Buy me a coffee */}
                  <div className="mt-12">
                    <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-xl p-6 border border-amber-500/30">
                      <div className="flex items-center mb-4">
                        <Coffee className="w-6 h-6 text-amber-400 mr-3" />
                        <h4 className="text-lg font-bold text-white">Buy me a coffee</h4>
                      </div>
                      <p className="text-gray-300 text-sm mb-4">
                        If you found my work helpful and want to support me, consider buying me a coffee!
                      </p>
                      <a
                        href="https://www.buymeacoffee.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        <Coffee className="w-4 h-4 mr-2" />
                        Buy me a coffee
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right section - Contact form / Meeting scheduler */}
            <div className="md:col-span-3">
              <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 shadow-xl h-full">
                {/* Tabs */}
                <div className="flex border-b border-gray-700">
                  <button
                    className={`flex-1 py-4 font-medium flex justify-center items-center ${
                      activeTab === 'message'
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('message')}
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                  <button
                    className={`flex-1 py-4 font-medium flex justify-center items-center ${
                      activeTab === 'schedule'
                        ? 'text-purple-400 border-b-2 border-purple-400'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('schedule')}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Meeting
                  </button>
                </div>

                <div className="p-8">
                  {/* Message Form */}
                  {activeTab === 'message' && (
                    <div>
                      {formStatus.submitted ? (
                        <div className={`rounded-xl p-6 mb-6 flex items-start ${
                          formStatus.success ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'
                        }`}>
                          {formStatus.success ? (
                            <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-6 h-6 text-red-400 mr-3 flex-shrink-0" />
                          )}
                          <p className={formStatus.success ? 'text-green-300' : 'text-red-300'}>
                            {formStatus.message}
                          </p>
                        </div>
                      ) : null}

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className="block text-white font-medium mb-2">Your Name</label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                              placeholder="John Doe"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-white font-medium mb-2">Your Email</label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                              placeholder="john@example.com"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="subject" className="block text-white font-medium mb-2">Subject</label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
                            placeholder="Project Collaboration"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-white font-medium mb-2">Your Message</label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="5"
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white resize-none"
                            placeholder="Hello, I'd like to discuss a potential project..."
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full py-4 px-6 rounded-xl font-medium text-white flex items-center justify-center ${
                            isSubmitting
                              ? 'bg-blue-900/50 cursor-not-allowed'
                              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                          } transition-all shadow-lg`}
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              Send Message
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Schedule Meeting */}
                  {activeTab === 'schedule' && (
                    <div>
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-white mb-2">Schedule a Meeting</h3>
                        <p className="text-gray-300">
                          Select a convenient time slot from my availability, and let's discuss your project or ideas.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {availableTimes.map((day) => (
                          <div
                            key={day.id}
                            className="bg-gray-900 rounded-xl border border-gray-700 p-4 hover:border-purple-500/50 transition-colors"
                          >
                            <h4 className="text-white font-semibold mb-3">{day.day}</h4>
                            <div className="space-y-2">
                              {day.times.map((time) => (
                                <button
                                  key={time}
                                  onClick={() => handleSchedule(day.day, time)}
                                  className="w-full py-2 text-center bg-gray-800 hover:bg-purple-900/30 text-gray-300 hover:text-white rounded-lg transition-colors text-sm"
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 p-4 bg-purple-900/20 rounded-xl border border-purple-500/30 flex items-start">
                        <Calendar className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-300 text-sm">
                          Meetings are typically 30 minutes long. If you need a longer session or can't find a suitable time, please mention it in your message.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;