'use client';

import { useState } from 'react';
import { 
  ArrowRight, 
  Clock, 
  Tag, 
  BarChart,
  Code,
  Leaf,
  Search
} from 'lucide-react';

const InsightsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'development', label: 'Development', icon: <Code className="w-4 h-4" /> },
    { id: 'data', label: 'Data & Analytics', icon: <BarChart className="w-4 h-4" /> },
    { id: 'sustainability', label: 'Sustainability', icon: <Leaf className="w-4 h-4" /> }
  ];

  const articles = [
    {
      title: "The Future of Data Visualization in Web Development",
      excerpt: "Exploring how interactive data visualization is transforming user experiences and decision-making processes.",
      category: "data",
      readTime: "5 min",
      image: "/api/placeholder/600/400",
      featured: true
    },
    {
      title: "Building Sustainable Digital Solutions",
      excerpt: "How eco-friendly web development practices can reduce carbon footprint while maintaining performance.",
      category: "sustainability",
      readTime: "4 min",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Modern Web Development Best Practices",
      excerpt: "Key principles and techniques for creating efficient, scalable web applications in 2024.",
      category: "development",
      readTime: "6 min",
      image: "/api/placeholder/600/400"
    }
  ];

  const FeaturedArticle = ({ article }) => (
    <div className="relative group overflow-hidden rounded-2xl">
      <div className="aspect-[16/9] overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm backdrop-blur-sm">
              {article.category}
            </span>
            <span className="text-white/60 text-sm flex items-center gap-1">
              <Clock className="w-4 h-4" /> {article.readTime} read
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white">{article.title}</h3>
          <p className="text-white/80">{article.excerpt}</p>
          <button className="flex items-center gap-2 text-[var(--frozen-turquoise)] group/btn">
            Read More 
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );

  const ArticleCard = ({ article }) => (
    <div className="group">
      <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 rounded-full bg-white/10 text-white text-sm">
            {article.category}
          </span>
          <span className="text-white/60 text-sm flex items-center gap-1">
            <Clock className="w-4 h-4" /> {article.readTime} read
          </span>
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-[var(--frozen-turquoise)] transition-colors">
          {article.title}
        </h3>
        <p className="text-white/60">{article.excerpt}</p>
        <button className="flex items-center gap-2 text-[var(--frozen-turquoise)] group/btn">
          Read More 
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-24 relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--megaman)]/5 to-[var(--frozen-turquoise)]/5" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-white">
              Insights & Articles
            </h2>
            <p className="text-lg text-white/80 max-w-2xl">
              Exploring the intersection of technology, design, and sustainability
            </p>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {category.icon}
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        <div className="mb-16">
          <FeaturedArticle article={articles[0]} />
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.slice(1).map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 text-center">
          <button className="px-8 py-4 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300">
            Load More Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;