import React, { useState } from 'react';
import { Menu, X, Code, Database, Smartphone, Layout, Mail, Phone, Linkedin, MapPin, ExternalLink, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// --- DATA FROM RESUME ---
const portfolioData = {
    personal: {
        name: "Muhamad Faizul Bin Roni Amir",
        title: "Lead Web Developer & System Architect",
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
    techStack: ["Laravel", "PHP", "React.js", "Electron.js", "Ionic.js", "MySQL", "JavaScript", "Git"]
};

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">

            {/* --- NAVIGATION --- */}
            <nav className="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0 font-bold text-2xl text-slate-900 tracking-tight">
                            Faizul<span className="text-blue-600">x</span>Tech
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8">
                            <a href="#about" className="text-slate-600 hover:text-blue-600 font-medium transition">About</a>
                            <a href="#services" className="text-slate-600 hover:text-blue-600 font-medium transition">Services</a>
                            <a href="#experience" className="text-slate-600 hover:text-blue-600 font-medium transition">Experience</a>
                            <a href="#contact" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Hire Me</a>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-slate-900">
                                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a href="#about" className="block px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md" onClick={() => setIsMenuOpen(false)}>About</a>
                            <a href="#services" className="block px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Services</a>
                            <a href="#contact" className="block px-3 py-2 text-blue-600 font-bold" onClick={() => setIsMenuOpen(false)}>Hire Me</a>
                        </div>
                    </div>
                )}
            </nav>

            {/* --- HERO SECTION --- */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center">
                <div className="md:w-1/2 mt-10 md:mt-0">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5 }}>
                        <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Lead Web Developer</span>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mt-4 leading-tight">
                            Building Scalable <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Digital Solutions</span>
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                            I help businesses streamline operations with custom software.
                            Specializing in <b>Laravel, React, and Electron.js</b> to deliver high-performance enterprise applications.
                        </p>
                        <div className="mt-8 flex gap-4">
                            <a href="#contact" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition transform">
                                Let's Build Your Project
                            </a>
                            <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-lg font-semibold hover:bg-slate-50 transition flex items-center gap-2">
                                <Linkedin size={20} /> LinkedIn
                            </a>
                        </div>
                    </motion.div>
                </div>
                <div className="md:w-1/2 flex justify-center relative">
                    {/* PLACEHOLDER FOR YOUR IMAGE */}
                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10">
                        {/* Replace src below with your actual photo path */}
                        <img
                            src="/dp.jpg"
                            alt="Muhamad Faizul"
                            className="w-full h-full object-cover scale-200"
                        />
                    </div>
                    {/* Decorative Circle */}
                    <div className="absolute top-0 right-10 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-70 -z-0"></div>
                </div>
            </section>

            {/* --- SERVICES --- */}
            <section id="services" className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">How I Can Help You</h2>
                        <p className="mt-4 text-slate-600">Leveraging 5+ years of full-stack experience to deliver results.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {portfolioData.services.map((service, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-xl transition duration-300"
                            >
                                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- EXPERIENCE & STACK --- */}
            <section id="experience" className="py-20 bg-slate-900 text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-16">

                        {/* Experience Column */}
                        <div className="md:w-2/3">
                            <h2 className="text-3xl font-bold mb-8">Professional Experience</h2>
                            <div className="space-y-12">
                                {portfolioData.experience.map((job, index) => (
                                    <div key={index} className="relative pl-8 border-l-2 border-blue-500/30">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                                        <h3 className="text-xl font-bold">{job.role}</h3>
                                        <h4 className="text-lg text-blue-400 mb-2">{job.company}</h4>
                                        <span className="text-sm text-slate-400 mb-4 block">{job.period}</span>
                                        <p className="text-slate-300 leading-relaxed">{job.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tech Stack Column */}
                        <div className="md:w-1/3">
                            <h2 className="text-3xl font-bold mb-8">Tech Stack</h2>
                            <div className="flex flex-wrap gap-3">
                                {portfolioData.techStack.map((tech, index) => (
                                    <span key={index} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-sm font-medium hover:border-blue-500 hover:text-blue-400 transition">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-12 p-6 bg-slate-800 rounded-xl border border-slate-700">
                                <h3 className="font-bold text-xl mb-4">Why Work With Me?</h3>
                                <ul className="space-y-3 text-slate-300">
                                    <li className="flex items-start gap-2"><ChevronRight size={18} className="text-blue-500 mt-1" /> 5+ Years Experience</li>
                                    <li className="flex items-start gap-2"><ChevronRight size={18} className="text-blue-500 mt-1" /> Agile Methodology</li>
                                    <li className="flex items-start gap-2"><ChevronRight size={18} className="text-blue-500 mt-1" /> Clean Code Practices</li>
                                    <li className="flex items-start gap-2"><ChevronRight size={18} className="text-blue-500 mt-1" /> Full-Stack Capable</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- CTA / CONTACT --- */}
            <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-8 md:p-12 text-center">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to start a project?</h2>
                        <p className="text-lg text-slate-600 mb-10">
                            I am currently available for freelance projects and system consultation.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                            <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center justify-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition group">
                                <Mail className="group-hover:scale-110 transition" />
                                <span className="font-medium">{portfolioData.personal.email}</span>
                            </a>
                            <a href={`https://wa.me/${portfolioData.personal.phone}`} className="flex items-center justify-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-green-50 hover:border-green-200 hover:text-green-600 transition group">
                                <Phone className="group-hover:scale-110 transition" />
                                <span className="font-medium">WhatsApp Me</span>
                            </a>
                        </div>

                        <div className="mt-10 pt-10 border-t flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
                            <div className="flex items-center gap-2 mb-4 md:mb-0">
                                <MapPin size={16} /> {portfolioData.personal.location}
                            </div>
                            <p>&copy; {new Date().getFullYear()} Faizul.Dev. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default App;