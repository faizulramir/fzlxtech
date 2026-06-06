import React from 'react';
import { Link } from '@inertiajs/react';
import { Code, Database, Smartphone, Layout, Mail, Phone, Linkedin, ArrowDown, Sparkles, ExternalLink, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SiteLayout from '@/layouts/site-layout';

// --- DATA FROM RESUME ---
const portfolioData = {
    personal: {
        name: "Muhamad Faizul Bin Roni Amir",
        title: "Super Web Developer & System Architect",
        phone: "60178016870",
        email: "faizul.ramir@gmail.com",
        location: "Shah Alam, Selangor, Malaysia",
        linkedin: "https://linkedin.com/in/faizul-roni-amir-5009a4197",
        summary: "Results-driven Software Developer with over 5 years of experience building scalable, high-performance web and mobile solutions. Specializing in PHP, Laravel, and Cross-platform applications, I help businesses digitize workflows and improve operational efficiency."
    },
    services: [
        {
            title: "Enterprise Web Systems",
            description: "Custom dashboards, CRMs, and management systems built with Laravel & PHP. Secure, scalable, and designed for complex business logic.",
            icon: <Database className="w-6 h-6" />
        },
        {
            title: "Cross-Platform Apps",
            description: "Desktop and mobile applications using Electron.js and Ionic.js. Build once, deploy everywhere to save development costs.",
            icon: <Smartphone className="w-6 h-6" />
        },
        {
            title: "Modern Frontend Interface",
            description: "Interactive and responsive user interfaces using React.js. Ensuring a smooth user experience for your customers.",
            icon: <Layout className="w-6 h-6" />
        },
        {
            title: "System Architecture",
            description: "Consultation on database design (MySQL), API integration, and agile development workflows to ensure project success.",
            icon: <Code className="w-6 h-6" />
        }
    ],
    experience: [
        {
            company: "MyORI Services Sdn Bhd",
            role: "Lead Web Developer",
            period: "08/2021 - Present",
            description: "Leading end-to-end development of digital solutions. Developed internal tools using Laravel, React, and Electron.js to improve team productivity and data accuracy."
        },
        {
            company: "HeiTech Padu Berhad",
            role: "Software Developer",
            period: "02/2019 - 08/2021",
            description: "Developed enterprise software for government and corporate clients. Focused on secure system designs and agile delivery."
        }
    ],
    techStack: [
        { name: "Laravel", image: "/images/laravel.png" },
        { name: "PHP", image: "/images/php.png" },
        { name: "React.js", image: "/images/react.png" },
        { name: "Electron.js", image: "/images/electron.png" },
        { name: "Ionic.js", image: "/images/ionic.png" },
        { name: "Flutter", image: "/images/flutter.png" },
        { name: "JavaScript", image: "/images/javascript.png" },
        { name: "TypeScript", image: "/images/typescript.png" },
    ]
};

// Reusable animation variants
const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const slideUp = {
    hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const App = () => {
    return (
        <SiteLayout>
            {/* --- HERO SECTION --- */}
            <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
                {/* Background grid effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]" />

                <div className="relative w-full pt-32 pb-20 flex flex-col-reverse md:flex-row items-center gap-12">
                    {/* Text Content */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="md:w-3/5"
                    >
                        <motion.div variants={slideUp}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/50 mb-6">
                                <Sparkles className="w-3.5 h-3.5" />
                                Available for projects
                            </div>
                        </motion.div>

                        <motion.h1
                            variants={slideUp}
                            className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05]"
                        >
                            Building
                            <br />
                            <span className="text-white/30">Scalable Digital</span>
                            <br />
                            Solutions
                        </motion.h1>

                        <motion.p
                            variants={slideUp}
                            className="mt-8 text-lg text-white/40 leading-relaxed max-w-xl"
                        >
                            I help businesses streamline operations with custom software.
                            Specializing in <span className="text-white/60 font-medium">Laravel, React, and Electron.js</span> to deliver high-performance enterprise applications.
                        </motion.p>

                        <motion.div variants={slideUp} className="mt-10 flex flex-wrap gap-4">
                            <Link
                                href="#contact"
                                className="group px-8 py-3.5 bg-white text-black rounded-full font-medium text-sm hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] inline-flex items-center gap-2"
                            >
                                Let's Build Your Project
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <Link
                                href="/blog"
                                className="px-8 py-3.5 border border-white/20 text-white/60 rounded-full font-medium text-sm hover:bg-white/5 hover:text-white hover:border-white/30 transition-all duration-300"
                            >
                                Read My Blog
                            </Link>
                        </motion.div>

                        {/* Scroll indicator */}
                        <motion.div
                            variants={slideUp}
                            className="mt-16 hidden md:flex items-center gap-3 text-white/20 text-sm"
                        >
                            <motion.div
                                animate={{ y: [0, 6, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <ArrowDown className="w-4 h-4" />
                            </motion.div>
                            Scroll to explore
                        </motion.div>
                    </motion.div>

                    {/* Photo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="md:w-2/5 flex justify-center"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent blur-3xl" />
                            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border border-white/10">
                                <img
                                    src="/dp.jpg"
                                    alt="Muhamad Faizul Bin Roni Amir"
                                    width="288"
                                    height="288"
                                    loading="eager"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- ABOUT SECTION --- */}
            <section id="about" className="py-32 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={slideUp} className="mb-16">
                            <span className="text-white/30 uppercase tracking-[0.2em] text-xs font-medium">01.</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">About Me</h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-16 items-start">
                            <motion.div variants={slideUp}>
                                <p className="text-lg text-white/40 leading-relaxed mb-8">
                                    {portfolioData.personal.summary}
                                </p>
                                <div className="space-y-3 text-white/40">
                                    {[
                                        ['Name', portfolioData.personal.name],
                                        ['Location', portfolioData.personal.location],
                                        ['Email', portfolioData.personal.email],
                                        ['Phone', portfolioData.personal.phone],
                                    ].map(([label, value]) => (
                                        <div key={label} className="flex gap-4">
                                            <span className="text-white/20 w-20 flex-shrink-0">{label}</span>
                                            <span className="text-white/60">{value}</span>
                                        </div>
                                    ))}
                                    <div className="flex gap-4 pt-2">
                                        <span className="text-white/20 w-20 flex-shrink-0">LinkedIn</span>
                                        <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 group">
                                            linkedin.com/in/faizul-roni-amir
                                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={slideUp}>
                                <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {portfolioData.techStack.map((tech, idx) => (
                                        <motion.span
                                            key={tech.name}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="px-4 py-2 bg-white/5 text-white/50 rounded-full text-sm border border-white/5 hover:border-white/20 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-default"
                                        >
                                            {tech.name}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- TECH SCROLL --- */}
            <section className="py-20 border-t border-white/5 overflow-hidden">
                <div className="relative">
                    <div className="flex animate-[scroll_30s_linear_infinite] gap-8 w-max">
                        {[...portfolioData.techStack, ...portfolioData.techStack, ...portfolioData.techStack].map((tech, idx) => (
                            <div
                                key={`${tech.name}-${idx}`}
                                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.02] border border-white/5 flex-shrink-0"
                            >
                                <img
                                    src={tech.image}
                                    alt={tech.name}
                                    className="w-8 h-8 object-contain opacity-60"
                                />
                                <span className="text-sm text-white/40 whitespace-nowrap">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                    {/* Fade edges */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-black pointer-events-none z-10" />
                </div>
            </section>

            {/* --- SERVICES SECTION --- */}
            <section id="services" className="py-32 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={slideUp} className="mb-16">
                            <span className="text-white/30 uppercase tracking-[0.2em] text-xs font-medium">02.</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">Services</h2>
                        </motion.div>

                        <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-6">
                            {portfolioData.services.map((service, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={cardVariant}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-white/10 transition-all duration-500 mb-6">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                                    <p className="text-white/30 leading-relaxed text-sm">{service.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* --- EXPERIENCE SECTION --- */}
            <section id="experience" className="py-32 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={slideUp} className="mb-16">
                            <span className="text-white/30 uppercase tracking-[0.2em] text-xs font-medium">03.</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">Experience</h2>
                        </motion.div>

                        <div className="space-y-12">
                            {portfolioData.experience.map((exp, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={cardVariant}
                                    className="relative pl-8 border-l border-white/10 hover:border-white/30 transition-colors duration-500"
                                >
                                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-white transition-colors duration-500" />
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                                        <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                                        <span className="text-sm text-white/30 whitespace-nowrap">{exp.period}</span>
                                    </div>
                                    <p className="text-white/50 font-medium mb-3">{exp.company}</p>
                                    <p className="text-white/30 leading-relaxed text-sm">{exp.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- CONTACT SECTION --- */}
            <section id="contact" className="py-32 border-t border-white/5 relative overflow-hidden">
                {/* Background accent */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.04)_0%,transparent_70%)]" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={slideUp}>
                            <span className="text-white/30 uppercase tracking-[0.2em] text-xs font-medium">04.</span>
                            <h2 className="text-4xl md:text-6xl font-bold text-white mt-3 mb-6">Let's Work Together</h2>
                            <p className="text-lg text-white/30 mb-12 max-w-xl mx-auto">
                                I'm available for freelance projects and full-time opportunities. Let's build something great.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={staggerContainer}
                            className="flex flex-col md:flex-row justify-center items-center gap-4"
                        >
                            {[
                                {
                                    href: `tel:${portfolioData.personal.phone}`,
                                    icon: <Phone className="w-4 h-4" />,
                                    label: `Call: ${portfolioData.personal.phone}`,
                                    primary: true,
                                },
                                {
                                    href: `mailto:${portfolioData.personal.email}`,
                                    icon: <Mail className="w-4 h-4" />,
                                    label: 'Send Email',
                                },
                                {
                                    href: portfolioData.personal.linkedin,
                                    icon: <Linkedin className="w-4 h-4" />,
                                    label: 'LinkedIn',
                                    external: true,
                                },
                            ].map((item) => (
                                <motion.div key={item.label} variants={cardVariant}>
                                    <a
                                        href={item.href}
                                        target={item.external ? '_blank' : undefined}
                                        rel={item.external ? 'noopener noreferrer' : undefined}
                                        className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm transition-all duration-300 ${
                                            item.primary
                                                ? 'bg-white text-black hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]'
                                                : 'border border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5'
                                        }`}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </a>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </SiteLayout>
    );
};

export default App;
