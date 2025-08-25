import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm font-medium mb-6">
            <Mail size={16} />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Contact
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"> Us</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Ready to start your learning journey? Have questions about our pathshala? We're here to help you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-stretch">
          {/* Contact Info Cards */}
          <div className="space-y-6 sm:space-y-8 flex flex-col h-full">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-emerald-400/50 transition-all duration-300 group flex-1">
              <div className="flex items-start gap-4 h-full">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <Mail size={20} className="text-white sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    Email Us
                  </h3>
                  <p className="text-white/70 mb-2 text-sm sm:text-base">Send us your questions anytime</p>
                  <a 
                    href="mailto:support@easypathshala.com" 
                    className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm sm:text-base break-all">
                    support@easypathshala.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-teal-400/50 transition-all duration-300 group flex-1">
              <div className="flex items-start gap-4 h-full">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <Phone size={20} className="text-white sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                    Call Us
                  </h3>
                  <p className="text-white/70 mb-2 text-sm sm:text-base">Available Mon-Fri, 9am-6pm IST</p>
                  <a 
                    href="tel:+911234567890" 
                    className="text-teal-400 hover:text-teal-300 transition-colors text-sm sm:text-base">
                    +91 9797632997
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group flex-1">
              <div className="flex items-start gap-4 h-full">
                <div className="bg-gradient-to-r from-cyan-500 to-sky-500 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <MapPin size={20} className="text-white sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    Visit Us
                  </h3>
                  <p className="text-white/70 mb-2 text-sm sm:text-base">Come say hello at our office</p>
                  <address className="text-cyan-400 not-italic text-sm sm:text-base">
                    EasyPathshala HQ<br />
                    Jammu and Kashmir<br />
                    India
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 h-full flex flex-col">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Send us a Message</h3>
            <form className="space-y-4 sm:space-y-6 flex-1 flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 sm:px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 text-sm sm:text-base"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 sm:px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 text-sm sm:text-base"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 sm:px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 text-sm sm:text-base"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-3 sm:px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 text-sm sm:text-base"
                  placeholder="What's this about?"
                />
              </div>
              
              <div className="flex-1">
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full h-full min-h-[120px] px-3 sm:px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 resize-none text-sm sm:text-base"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mt-[30px]">
                  <Send size={18} className="sm:w-5 sm:h-5" />
                  Send Message
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;