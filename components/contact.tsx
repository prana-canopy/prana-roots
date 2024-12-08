'use client';

import { useState } from 'react';
import { 
  Send, 
  Calendar, 
  Mail, 
  MessageSquare,
  ArrowRight,
  Clock,
  Phone
} from 'lucide-react';

const ContactSection = () => {
  const [contactMethod, setContactMethod] = useState('message');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });

  const projectTypes = [
    "Website Development",
    "Data Visualization",
    "Custom Solutions",
    "Not Sure Yet"
  ];

  const availableTimeSlots = [
    "10:00 AM - 11:00 AM",
    "2:00 PM - 3:00 PM",
    "4:00 PM - 5:00 PM"
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-24 relative">
      {/* Background Elements */}
      {/* <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--megaman)]/10 to-[var(--frozen-turquoise)]/10" />
      </div> */}

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Let's Create Something Beautiful
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Ready to bring your vision to life? Choose how you'd like to connect with us.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            {/* Contact Method Toggle */}
            <div className="flex gap-4 mb-8">
              {[
                { id: 'message', label: 'Send Message', icon: <MessageSquare className="w-4 h-4" /> },
                { id: 'calendar', label: 'Book Call', icon: <Calendar className="w-4 h-4" /> }
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setContactMethod(method.id)}
                  className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2
                    transition-all duration-300 ${
                    contactMethod === method.id
                      ? 'bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {method.icon}
                  {method.label}
                </button>
              ))}
            </div>

            {contactMethod === 'message' ? (
              /* Message Form */
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-white/80">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white 
                      focus:outline-none focus:border-[var(--frozen-turquoise)] transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white/80">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white 
                      focus:outline-none focus:border-[var(--frozen-turquoise)] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white/80">Project Type</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white 
                      focus:outline-none focus:border-[var(--frozen-turquoise)] transition-colors"
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-white/80">Message</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white 
                      focus:outline-none focus:border-[var(--frozen-turquoise)] transition-colors h-32"
                    placeholder="Tell us about your project"
                  />
                </div>

                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] 
                  text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  Send Message
                </button>
              </form>
            ) : (
              /* Calendar Booking */
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-white/80">Select Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white 
                      focus:outline-none focus:border-[var(--frozen-turquoise)] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white/80">Available Time Slots</label>
                  <div className="grid grid-cols-1 gap-2">
                    {availableTimeSlots.map((slot) => (
                      <button
                        key={slot}
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white 
                          hover:bg-white/10 transition-colors text-left flex items-center gap-2"
                      >
                        <Clock className="w-4 h-4" />
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] 
                  text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  Book Consultation
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-8">
            {/* Quick Connect Options */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 space-y-6">
              <h3 className="text-2xl font-semibold text-white mb-6">Quick Connect</h3>
              
              <a href="mailto:hello@pranalabs.com" className="flex items-center gap-4 text-white/80 hover:text-white transition-colors">
                <div className="p-3 rounded-lg bg-white/5">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-white/60">hello@pranalabs.com</p>
                </div>
              </a>

              <a href="tel:+1234567890" className="flex items-center gap-4 text-white/80 hover:text-white transition-colors">
                <div className="p-3 rounded-lg bg-white/5">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-white/60">+1 (234) 567-890</p>
                </div>
              </a>
            </div>

            {/* FAQ Preview */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-semibold text-white mb-6">Common Questions</h3>
              
              <div className="space-y-4">
                {[
                  "How long does a typical project take?",
                  "What's included in the maintenance plan?",
                  "Do you offer rush delivery?"
                ].map((question, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-3 rounded-xl bg-white/5 text-white/80 hover:text-white 
                      hover:bg-white/10 transition-all duration-300 flex items-center justify-between group"
                  >
                    {question}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                ))}
              </div>

              <button className="w-full mt-6 py-3 text-[var(--frozen-turquoise)] hover:text-white transition-colors">
                View all FAQs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;