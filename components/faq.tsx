'use client';

import { useState } from 'react';
import { Plus, Minus, Search, ArrowRight } from 'lucide-react';

const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'general', label: 'General' },
    { id: 'services', label: 'Services & Pricing' },
    { id: 'technical', label: 'Technical' },
    { id: 'process', label: 'Process & Timeline' },
  ];

  const faqs = {
    general: [
      {
        id: 'g1',
        question: "What makes Prana different from other web development companies?",
        answer: "We combine technical excellence with nature-inspired design principles to create unique, sustainable digital solutions. Our boutique approach ensures personalized attention and high-quality deliverables, while our expertise in data visualization sets us apart in creating engaging, interactive experiences."
      },
      {
        id: 'g2',
        question: "Do you work with clients internationally?",
        answer: "Yes, we work with clients globally. Our process is designed to facilitate seamless collaboration across time zones, utilizing modern tools and regular communication to ensure project success regardless of location."
      },
      {
        id: 'g3',
        question: "What types of businesses do you typically work with?",
        answer: "We work with forward-thinking businesses across various sectors, from local businesses to larger organizations. Our sweet spot is partnering with companies that value quality, innovation, and sustainable practices."
      }
    ],
    services: [
      {
        id: 's1',
        question: "What's included in your maintenance plans?",
        answer: "Our maintenance plans include regular updates, security monitoring, performance optimization, content updates, and technical support. Higher-tier plans also include data analysis, strategy sessions, and priority support."
      },
      {
        id: 's2',
        question: "Can you help modify an existing website?",
        answer: "Yes, we can enhance existing websites. We'll start with a thorough assessment of your current site and recommend improvements that align with your goals while maintaining your established brand identity."
      },
      {
        id: 's3',
        question: "Do you offer rush delivery options?",
        answer: "While we prioritize quality and thoroughness, we understand that sometimes timing is crucial. We can discuss expedited timelines based on your specific needs and project scope, ensuring we maintain our quality standards."
      }
    ],
    technical: [
      {
        id: 't1',
        question: "What technologies do you use?",
        answer: "We primarily work with modern web technologies including React, Next.js, and Node.js. For data visualization, we utilize D3.js and custom solutions. Our tech stack is chosen to ensure performance, scalability, and maintainability."
      },
      {
        id: 't2',
        question: "How do you handle data security?",
        answer: "Security is paramount in our development process. We implement industry best practices, regular security audits, encrypted data transmission, and secure authentication systems. All solutions are built with privacy and security in mind."
      },
      {
        id: 't3',
        question: "Can you integrate with existing systems?",
        answer: "Yes, we specialize in creating seamless integrations with existing systems and APIs. We'll assess your current infrastructure and design solutions that work harmoniously with your established processes."
      }
    ],
    process: [
      {
        id: 'p1',
        question: "How long does a typical project take?",
        answer: "Project timelines vary based on scope and complexity. A standard website typically takes 6-8 weeks from concept to launch. Custom solutions with advanced features may take 3-4 months. We'll provide a detailed timeline during our initial consultation."
      },
      {
        id: 'p2',
        question: "What is your development process?",
        answer: "Our process includes Discovery (understanding your needs), Design (creating the solution blueprint), Development (building the solution), and Deployment (launching and supporting). We maintain clear communication and regular updates throughout."
      },
      {
        id: 'p3',
        question: "How involved will I need to be in the process?",
        answer: "We value collaboration while respecting your time. Key touchpoints include the initial consultation, design approval, and feature reviews. We'll establish a communication schedule that works for you while ensuring your vision is accurately implemented."
      }
    ]
  };

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = searchQuery
    ? Object.values(faqs).flat().filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs[activeCategory];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-24 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-[var(--megaman)]/20 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[var(--frozen-turquoise)]/20 to-transparent rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Everything you need to know about working with us
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 
                text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--frozen-turquoise)]
                transition-colors"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          </div>
        </div>

        {!searchQuery && (
          /* Category Navigation */
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left text-white hover:bg-white/5 transition-colors"
              >
                <span className="font-medium">{faq.question}</span>
                {openItems.includes(faq.id) ? (
                  <Minus className="w-5 h-5 text-[var(--frozen-turquoise)]" />
                ) : (
                  <Plus className="w-5 h-5 text-[var(--frozen-turquoise)]" />
                )}
              </button>
              
              {openItems.includes(faq.id) && (
                <div className="px-6 py-4 text-white/80 border-t border-white/10">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 text-center">
          <p className="text-white/80 mb-4">
            Still have questions? We're here to help.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r 
            from-[var(--megaman)] to-[var(--frozen-turquoise)] text-white font-semibold 
            hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;