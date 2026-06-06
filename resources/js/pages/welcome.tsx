import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Code, Database, Smartphone, Layout, Mail, Phone, Linkedin, MapPin, ExternalLink, ChevronRight } from 'lucide-react';
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
            icon: <Database className="w-8 h-8 text-blue-500" />
        },
        {
            title: "Cross-Platform Apps",
            description: "Desktop and mobile applications using Electron.js and Ionic.js. Build once, deploy everywhere to save development costs.",
            icon: <Smartphone className="w-8 h-8 text-blue-500" />
        },
        {
            title: "Modern Frontend Interface",
            description: "Interactive and responsive user interfaces using React.js. Ensuring a smooth user experience for your customers.",
            icon: <Layout className="w-8 h-8 text-blue-500" />
        },
        {
            title: "System Architecture",
            description: "Consultation on database design (MySQL), API integration, and agile development workflows to ensure project success.",
            icon: <Code className="w-8 h-8 text-blue-500" />
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
    techStack: ["Laravel", "PHP", "React.js", "Electron.js", "Ionic.js", "Flutter", "JavaScript", "TypeScript"]
};

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <SiteLayout>
            {/* --- HERO SECTION --- */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center">
                <div className="md:w-1/2 mt-10 md:mt-0">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5 }}>
                        <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Super Web Developer</span>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mt-4 leading-tight">
                            Building Scalable <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Digital Solutions</span>
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                            I help businesses streamline operations with custom software.
                            Specializing in <b>Laravel, React, and Electron.js</b> to deliver high-performance enterprise applications.
                        </p>
                        <div className="mt-8 flex gap-4">
                            <Link
                                href="#contact"
                                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition transform"
                            >
                                Let's Build Your Project
                            </Link>
                            <Link
                                href="/blog"
                                className="px-8 py-3 bg-white text-slate-700 border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-50 transition"
                            >
                                Read My Blog
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <div className="md:w-1/2 flex justify-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl relative"
                    >
                        {/* Replace src below with your actual photo path */}
                        <img
                            src="/dp.jpg"
                            alt="Muhamad Faizul Bin Roni Amir"
                            width="320"
                            height="320"
                            loading="eager"
                            className="w-full h-full object-cover scale-200"
                        />
                    </motion.div>
                </div>
            </section>

            {/* --- ABOUT SECTION --- */}
            <section id="about" className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">About Me</h2>
                        <div className="grid md:grid-cols-2 gap-12 items-start">
                            <div>
                                <p className="text-lg text-slate-600 mb-4">
                                    {portfolioData.personal.summary}
                                </p>
                                <div className="space-y-2 text-slate-600">
                                    <p><strong>Name:</strong> {portfolioData.personal.name}</p>
                                    <p><strong>Location:</strong> {portfolioData.personal.location}</p>
                                    <p><strong>Email:</strong> <a href={`mailto:${portfolioData.personal.email}`} className="text-blue-600 hover:underline">{portfolioData.personal.email}</a></p>
                                    <p><strong>Phone:</strong> <a href={`tel:${portfolioData.personal.phone}`} className="text-blue-600 hover:underline">{portfolioData.personal.phone}</a></p>
                                    <p>
                                        <strong>LinkedIn:</strong>{" "}
                                        <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            linkedin.com/in/faizul-roni-amir-5009a4197
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-4">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {portfolioData.techStack.map((tech, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- SERVICES SECTION --- */}
            <section id="services" className="py-20 bg-slate-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Services</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {portfolioData.services.map((service, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                                    <div className="mb-4">{service.icon}</div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{service.title}</h3>
                                    <p className="text-slate-600">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- EXPERIENCE SECTION --- */}
            <section id="experience" className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Experience</h2>
                        <div className="space-y-8">
                            {portfolioData.experience.map((exp, idx) => (
                                <div key={idx} className="border-l-4 border-blue-600 pl-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                        <h3 className="text-xl font-semibold text-slate-900">{exp.role}</h3>
                                        <span className="text-sm text-slate-500">{exp.period}</span>
                                    </div>
                                    <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                                    <p className="text-slate-600">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- CONTACT SECTION --- */}
            <section id="contact" className="py-20 bg-slate-900 text-slate-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">Let's Work Together</h2>
                        <p className="text-lg mb-8">
                            I'm available for freelance projects and full-time opportunities.
                        </p>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                            <a
                                href={`tel:${portfolioData.personal.phone}`}
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                <Phone size={20} />
                                Call: {portfolioData.personal.phone}
                            </a>
                            <a
                                href={`mailto:${portfolioData.personal.email}`}
                                className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
                            >
                                <Mail size={20} />
                                Send Email
                            </a>
                            <a
                                href={portfolioData.personal.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
                            >
                                <Linkedin size={20} />
                                LinkedIn
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </SiteLayout>
    );
};

export default App;
