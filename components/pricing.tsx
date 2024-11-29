'use client';

import { useState } from 'react';
import {
    Check,
    ArrowRight,
    Zap,
    Leaf,
    BarChart,
    Shield,
    Globe,
    Code
} from 'lucide-react';

const PricingSection = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');

    const packages = [
        {
            name: "Growth",
            description: "Perfect for small businesses ready to establish their digital presence",
            oneTimePrice: 4999,  // One-time development fee
            price: {
                monthly: 249,      // Monthly maintenance & support
                yearly: 199        // Monthly price when billed yearly
            },
            features: [
                "Custom Website Development",
                "Mobile-First Design",
                "Basic SEO Setup",
                "Contact Form Integration",
                "Monthly Content Updates",
                "Performance Monitoring",
                "Basic Analytics Reports",
                "Email Support"
            ],
            highlighted: false,
            icon: <Globe className="w-6 h-6" />
        },
        {
            name: "Scale",
            description: "For businesses needing advanced features and data visualization",
            oneTimePrice: 9999,  // One-time development fee
            price: {
                monthly: 499,      // Monthly maintenance & support
                yearly: 399        // Monthly price when billed yearly
            },
            features: [
                "Everything in Growth, plus:",
                "Custom Data Visualizations",
                "Interactive Components",
                "Analytics Dashboard",
                "Monthly Data Analysis",
                "API Management",
                "Priority Support",
                "Quarterly Strategy Sessions"
            ],
            highlighted: true,
            icon: <BarChart className="w-6 h-6" />
        },
        {
            name: "Enterprise",
            description: "Comprehensive solutions for larger organizations",
            oneTimePrice: "Custom",
            price: {
                monthly: 999,      // Starting price for enterprise support
                yearly: 799        // Monthly price when billed yearly
            },
            features: [
                "Everything in Scale, plus:",
                "Custom Backend Development",
                "Advanced Security Features",
                "24/7 Monitoring",
                "Monthly Security Audits",
                "Dedicated Support Team",
                "Custom Feature Development",
                "Weekly Strategy Sessions"
            ],
            highlighted: false,
            icon: <Shield className="w-6 h-6" />
        }
    ];

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-24 relative">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--megaman)] rounded-full blur-[128px] opacity-20" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--frozen-turquoise)] rounded-full blur-[128px] opacity-20" />
            </div>

            <div className="relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-6 text-white">
                        Investment Plans
                    </h2>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                        Transparent pricing for lasting partnerships
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full p-1">
                        {['monthly', 'yearly'].map((cycle) => (
                            <button
                                key={cycle}
                                onClick={() => setBillingCycle(cycle)}
                                className={`px-6 py-2 rounded-full transition-all duration-300 ${billingCycle === cycle
                                    ? 'bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] text-white'
                                    : 'text-white/60 hover:text-white'
                                    }`}
                            >
                                {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className={`relative group transition-all duration-500 ${pkg.highlighted ? 'md:-translate-y-4' : ''
                                }`}
                        >
                            {/* Background Card */}
                            <div className={`absolute inset-0 rounded-2xl transition-all duration-300 
                ${pkg.highlighted
                                    ? 'bg-gradient-to-br from-[var(--megaman)] to-[var(--frozen-turquoise)] blur-[2px] opacity-50'
                                    : 'bg-white/10 blur-[1px] opacity-30 group-hover:opacity-40'
                                }`}
                            />

                            {/* Content Card */}
                            <div className="relative h-full bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                                {/* Package Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {pkg.name}
                                        </h3>
                                        <p className="text-white/60">
                                            {pkg.description}
                                        </p>
                                    </div>
                                    <div className={`p-3 rounded-xl ${pkg.highlighted ? 'bg-white/20' : 'bg-white/10'
                                        }`}>
                                        {pkg.icon}
                                    </div>
                                </div>
                                {/* Price Display */}
                                <div className="mb-8">
                                    {/* One-time Fee */}
                                    <div className="mb-4">
                                        <span className="text-white/60 text-sm">One-time development</span>
                                        <div className="flex items-baseline">
                                            <span className="text-3xl font-bold text-white">
                                                {pkg.oneTimePrice === 'Custom' ? 'Custom' : formatPrice(pkg.oneTimePrice)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Monthly/Yearly Fee */}
                                    <div>
                                        <span className="text-white/60 text-sm">Ongoing support & maintenance</span>
                                        <div className="flex items-baseline">
                                            <span className="text-2xl font-bold text-white">
                                                {formatPrice(pkg.price[billingCycle])}
                                            </span>
                                            <span className="text-white/60 ml-2">
                                                /mo
                                            </span>
                                        </div>
                                        {billingCycle === 'yearly' && (
                                            <div className="text-sm text-[var(--frozen-turquoise)] mt-2">
                                                Save {formatPrice((pkg.price.monthly - pkg.price.yearly) * 12)} annually
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-4 mb-8">
                                    {pkg.features.map((feature, fIndex) => (
                                        <div key={fIndex} className="flex items-center text-white/80">
                                            <Check className="w-5 h-5 mr-3 text-[var(--frozen-turquoise)]" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <button className={`w-full py-4 rounded-xl transition-all duration-300 group
                  ${pkg.highlighted
                                        ? 'bg-gradient-to-r from-[var(--megaman)] to-[var(--frozen-turquoise)] text-white hover:shadow-lg hover:shadow-[var(--megaman)]/20'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                                >
                                    <span className="flex items-center justify-center">
                                        Get Started
                                        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Message */}
                <div className="mt-16 text-center">
                    <p className="text-white/60">
                        All plans include our signature nature-inspired design philosophy and commitment to quality.
                    </p>
                    <p className="text-white/80 mt-2">
                        Need a custom solution? <button className="text-[var(--frozen-turquoise)] hover:underline">Let's talk</button>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;