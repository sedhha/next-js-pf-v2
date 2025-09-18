'use client';
import React, { useState, useEffect } from 'react';

// Static contact form interface
interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// Contact methods data
const contactMethods = [
    {
        icon: '📧',
        label: 'Email',
        value: 'hello@shivsahil.com',
        description: 'Drop me a line anytime',
        gradient: 'from-emerald-400 to-cyan-400',
        delay: '0s'
    },
    {
        icon: '🔗',
        label: 'LinkedIn',
        value: '/in/shivsahil',
        description: 'Professional network',
        gradient: 'from-blue-400 to-indigo-400',
        delay: '0.2s'
    },
    {
        icon: '🐙',
        label: 'GitHub',
        value: '@shivsahil',
        description: 'Code repositories',
        gradient: 'from-gray-400 to-gray-600',
        delay: '0.4s'
    },
    {
        icon: '📱',
        label: 'Social',
        value: 'Multiple platforms',
        description: 'Connect everywhere',
        gradient: 'from-violet-400 to-purple-400',
        delay: '0.6s'
    }
];

// Form validation
const validateForm = (data: ContactFormData): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};

    if (!data.name || data.name.length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (!data.subject || data.subject.length < 5) {
        errors.subject = 'Subject must be at least 5 characters';
    }

    if (!data.message || data.message.length < 10) {
        errors.message = 'Message must be at least 10 characters';
    }

    return errors;
};

// Input component with modern styling
const ModernInput = ({
    label,
    type = 'text',
    value,
    onChange,
    error,
    placeholder,
    rows
}: {
    label: string;
    type?: string;
    value: string;
    // eslint-disable-next-line no-unused-vars
    onChange: (value: string) => void;
    error?: string;
    placeholder: string;
    rows?: number;
}) => {
    const isTextarea = type === 'textarea';
    const InputComponent = isTextarea ? 'textarea' : 'input';

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {label}
            </label>
            <div className="relative">
                <InputComponent
                    type={isTextarea ? undefined : type}
                    rows={rows}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full px-4 py-3 bg-black/30 border rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 backdrop-blur-sm ${error
                        ? 'border-red-500/50 focus:ring-red-500/20 focus:border-red-400'
                        : 'border-gray-700/50 focus:ring-emerald-500/20 focus:border-emerald-400 hover:border-gray-600/50'
                        } ${isTextarea ? 'resize-none min-h-[120px]' : ''}`}
                />
                {error && (
                    <div className="absolute -bottom-6 left-0 text-red-400 text-xs">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

// Contact method card component
const ContactMethodCard = ({ method, onClick }: { method: typeof contactMethods[0]; onClick: () => void }) => (
    <div
        onClick={onClick}
        className="group relative cursor-pointer"
        style={{ animationDelay: method.delay }}
    >
        <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl blur-sm"
            style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
        </div>
        <div className={`relative bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:bg-black/60 hover:border-gray-700/50 transition-all duration-500 group-hover:scale-105`}>
            <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${method.gradient} flex items-center justify-center text-black font-bold text-xl group-hover:scale-110 transition-transform duration-300`}>
                    {method.icon}
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg group-hover:text-emerald-300 transition-colors duration-300">
                        {method.label}
                    </h3>
                    <p className="text-gray-400 text-sm">{method.description}</p>
                </div>
            </div>
            <p className="text-emerald-400 font-mono text-sm">{method.value}</p>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
    </div>
);

// Main Contact Component
const Contact = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Form validation on change
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const newErrors = validateForm(formData);
            setErrors(newErrors);
        }
    }, [formData, errors]);

    const handleInputChange = (field: keyof ContactFormData) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = validateForm(formData);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSubmitSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSubmitSuccess(false), 5000);
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleContactMethodClick = (method: typeof contactMethods[0]) => {
        // Handle contact method clicks (open email, social links, etc.)
        console.log(`Opening ${method.label}: ${method.value}`);
    };

    return (
        <section id="connect" className="relative py-20 px-4 bg-black">
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-l from-emerald-500/15 to-cyan-500/10 blur-3xl animate-pulse [animation-delay:2s]"></div>
                <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-gradient-to-r from-violet-500/15 to-purple-500/10 blur-3xl animate-pulse [animation-delay:4s]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-rose-500/5 to-transparent blur-2xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 mb-8">
                        <span className="text-2xl">🚀</span>
                        <span className="text-emerald-300 font-medium">Let&apos;s Build Something Amazing</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-8">
                        <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
                            Connect & Collaborate
                        </span>
                    </h2>

                    <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        Have an idea that&apos;s burning to become reality? Need help with a project?
                        Or just want to discuss the fascinating intersection of consciousness and code?
                        I&apos;m all ears and ready to create something extraordinary together.
                    </p>
                </div>

                {/* Contact Methods Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {contactMethods.map((method) => (
                        <ContactMethodCard
                            key={method.label}
                            method={method}
                            onClick={() => handleContactMethodClick(method)}
                        />
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-5 gap-12">

                    {/* Contact Form - Takes 3 columns */}
                    <div className="lg:col-span-3">
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                            <div className="relative bg-black/40 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-8 hover:border-gray-700/50 transition-all duration-500">

                                {/* Form Header */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center">
                                        <span className="text-black font-bold text-lg">📝</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">Get In Touch</h3>
                                        <p className="text-gray-400">Let&apos;s discuss your next big idea</p>
                                    </div>
                                </div>

                                {/* Success Message */}
                                {submitSuccess && (
                                    <div className="mb-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">✅</span>
                                            <div>
                                                <h4 className="font-bold">Message Sent Successfully!</h4>
                                                <p className="text-sm opacity-80">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Contact Form */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <ModernInput
                                            label="Name"
                                            value={formData.name}
                                            onChange={handleInputChange('name')}
                                            error={errors.name}
                                            placeholder="Your name"
                                        />
                                        <ModernInput
                                            label="Email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange('email')}
                                            error={errors.email}
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <ModernInput
                                        label="Subject"
                                        value={formData.subject}
                                        onChange={handleInputChange('subject')}
                                        error={errors.subject}
                                        placeholder="What's this about?"
                                    />

                                    <ModernInput
                                        label="Message"
                                        type="textarea"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleInputChange('message')}
                                        error={errors.message}
                                        placeholder="Tell me about your project, idea, or just say hello..."
                                    />

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center gap-3">
                                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                                Sending Message...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-3">
                                                Send Message
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                            </span>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Takes 2 columns */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Philosophy Quote */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-rose-500/20 rounded-3xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                            <div className="relative bg-black/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 text-center">
                                <div className="text-4xl mb-4">💭</div>
                                <blockquote className="text-gray-300 italic leading-relaxed mb-4">
                                    &quot;Every great project begins with a simple conversation. Every breakthrough starts with &apos;What if we could...?&apos;&quot;
                                </blockquote>
                                <div className="text-emerald-400 font-medium">— Let&apos;s start that conversation</div>
                            </div>
                        </div>

                        {/* Additional Contact Info */}
                        <div className="bg-black/40 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-xl">🌐</span>
                                Let&apos;s Connect
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Location</span>
                                    <span className="text-emerald-300 font-bold">Global</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Timezone</span>
                                    <span className="text-cyan-300 font-bold">IST (GMT+5:30)</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Collaboration</span>
                                    <span className="text-violet-300 font-bold">Remote Ready</span>
                                </div>
                            </div>
                        </div>

                        {/* Skills/Focus Areas */}
                        <div className="bg-black/40 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                                <span className="text-xl">🎯</span>
                                Focus Areas
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['Full Stack Development', 'System Architecture', 'Data Engineering', 'Philosophy', 'Innovation'].map((skill) => (
                                    <span key={skill} className="px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;