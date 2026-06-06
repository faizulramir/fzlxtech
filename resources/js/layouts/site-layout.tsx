import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, Head, usePage } from '@inertiajs/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SiteLayoutProps {
    children: React.ReactNode;
}

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: '/#services', label: 'Services' },
    { href: '/#experience', label: 'Experience' },
    { href: '/blog', label: 'Blog' },
];

const stagger = {
    animate: {
        transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
};

const fadeSlideIn = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
};

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const canonicalUrl = useMemo(() => {
        const cleanUrl = url.split('?')[0];
        if (cleanUrl.startsWith('http')) return cleanUrl;
        return 'https://fzlxtech.cloud' + cleanUrl;
    }, [url]);

    return (
        <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-white selection:text-black">
            <Head>
                <link rel="canonical" href={canonicalUrl} />
            </Head>

            {/* --- NAVIGATION --- */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`fixed w-full z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-black/90 backdrop-blur-xl border-b border-white/10'
                        : 'bg-transparent'
                }`}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="flex-shrink-0"
                        >
                            <Link href="/" className="text-2xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity">
                                Faizul<span className="text-white/40">x</span>Tech
                            </Link>
                        </motion.div>

                        {/* Desktop Menu */}
                        <motion.div
                            variants={stagger}
                            initial="initial"
                            animate="animate"
                            className="hidden md:flex items-center space-x-1"
                        >
                            {navLinks.map((link) => (
                                <motion.div key={link.href} variants={fadeSlideIn}>
                                    <Link
                                        href={link.href}
                                        className="relative px-4 py-2 text-sm text-white/60 hover:text-white transition-colors duration-300 group"
                                    >
                                        {link.label}
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white group-hover:w-3/4 transition-all duration-300" />
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div variants={fadeSlideIn}>
                                <Link
                                    href="/#contact"
                                    className="ml-4 px-5 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                >
                                    Hire Me
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Mobile Menu Button */}
                        <motion.div className="md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-white/60 hover:text-white transition-colors p-2"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
                        >
                            <div className="px-4 py-4 space-y-1">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="block px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: navLinks.length * 0.05 }}
                                >
                                    <Link
                                        href="/#contact"
                                        className="block px-4 py-3 mt-2 bg-white text-black text-center rounded-lg font-medium"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Hire Me
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Main Content */}
            <main>{children}</main>

            {/* --- FOOTER --- */}
            <footer className="border-t border-white/10 bg-black">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-12"
                    >
                        <div>
                            <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                                Faizul<span className="text-white/40">x</span>Tech
                            </Link>
                            <p className="mt-4 text-sm text-white/40 leading-relaxed">
                                Super Web Developer & System Architect building scalable digital solutions.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
                            <ul className="space-y-3">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-white/40 hover:text-white transition-colors duration-300">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
                            <ul className="space-y-3 text-sm text-white/40">
                                <li>Muhamad Faizul Bin Roni Amir</li>
                                <li>Shah Alam, Selangor, Malaysia</li>
                                <li>
                                    <a href="tel:+60178016870" className="hover:text-white transition-colors duration-300">+60 17-801 6870</a>
                                </li>
                                <li>
                                    <a href="mailto:faizul.ramir@gmail.com" className="hover:text-white transition-colors duration-300">faizul.ramir@gmail.com</a>
                                </li>
                                <li>
                                    <a href="https://linkedin.com/in/faizul-roni-amir-5009a4197" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white transition-colors duration-300 group">
                                        LinkedIn
                                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="border-t border-white/5 mt-12 pt-8 text-center"
                    >
                        <p className="text-xs text-white/20">
                            &copy; {new Date().getFullYear()} FzlxTech. All rights reserved.
                        </p>
                    </motion.div>
                </div>
            </footer>
        </div>
    );
};

export default SiteLayout;
