interface MetricHistory {
  date: string;
  visitors: number;
  engagement: number;
  conversions: number;
}

interface SuccessStoryCard {
  title: string;
  description: string;
  previewImage: string;
  url: string;
  metrics: {
    current: {
      visitors: string;
      engagement: string;
      timeSpent: string;
      conversion: string;
    };
    history: MetricHistory[];
  };
  features: string[];
  testimonial?: {
    quote: string;
    author: string;
    company: string;
    image: string;
  };
  techStack: string[];
  insights: string[];
}

const generateMetricHistory = (baseline: number, days: number): MetricHistory[] => {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    visitors: Math.floor(baseline * (1 + Math.sin(i / 3) * 0.3)),
    engagement: Math.floor(65 + Math.cos(i / 2) * 15),
    conversions: Math.floor(8 + Math.sin(i / 4) * 3),
  }));
};

export const cards: SuccessStoryCard[] = [
  {
    title: 'PINKYS UP DC',
    description: 'Elevating social events in the DMV, deliciously alcohol free.',
    previewImage: 'pinkys.png',
    url: 'https://pinkysup.social',
    metrics: {
      current: {
        visitors: '5,234',
        engagement: '78%',
        timeSpent: '6m 45s',
        conversion: '12.3%',
      },
      history: generateMetricHistory(5200, 14),
    },
    features: [
      'Animated Mocktail Showcase',
      'Interactive Booking System',
      'Responsive Gallery Grid',
      'Custom Brand Elements',
    ],
    testimonial: {
      quote:
        "Cosmic didn't just build us a website - they created an ecosystem that revolutionized how we do business. Their attention to detail and understanding of the nightlife industry truly sets them apart.",
      author: 'Brenda Periera Vargas',
      company: 'Founder - PINKYS UP DC',
      image: 'brenda.jpg',
    },
    techStack: [
      'React',
      'Next.js',
      'TailwindCSS',
      'TypeScript',
      'Framer Motion',
      'Node.js',
      'Express',
      'MongoDB',
      'Socket.io',
      'Vercel',
      'Sanity',
      'Cloudinary',
    ],
    insights: [
      'Utilized server-side rendering for improved performance.',
      'Implemented responsive design for mobile and desktop views.',
      'Optimized images for faster loading times.',
      'Ensured accessibility compliance with WCAG standards.',
    ],
  },
  {
    title: 'PINKYS UP DC',
    description: 'Elevating social events in the DMV, deliciously alcohol free.',
    previewImage: 'pinkys.png',
    url: 'https://pinkysup.social',
    metrics: {
      current: {
        visitors: '5,234',
        engagement: '78%',
        timeSpent: '6m 45s',
        conversion: '12.3%',
      },
      history: generateMetricHistory(5200, 14),
    },
    features: [
      'Animated Mocktail Showcase',
      'Interactive Booking System',
      'Responsive Gallery Grid',
      'Custom Brand Elements',
    ],
    testimonial: {
      quote:
        "Cosmic didn't just build us a website - they created an ecosystem that revolutionized how we do business. Their attention to detail and understanding of the nightlife industry truly sets them apart.",
      author: 'Brenda Periera Vargas',
      company: 'Founder - PINKYS UP DC',
      image: 'brenda.jpg',
    },
    techStack: [
      'React',
      'Next.js',
      'TailwindCSS',
      'TypeScript',
      'Framer Motion',
      'Node.js',
      'Express',
      'MongoDB',
      'Socket.io',
      'Vercel',
      'Sanity',
      'Cloudinary',
    ],
    insights: [
      'Utilized server-side rendering for improved performance.',
      'Implemented responsive design for mobile and desktop views.',
      'Optimized images for faster loading times.',
      'Ensured accessibility compliance with WCAG standards.',
    ],
  },
];
