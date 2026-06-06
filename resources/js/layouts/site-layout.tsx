import React, { useState, useMemo } from 'react';
import { Link, Head, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';

interface SiteLayoutProps {
    children: React.ReactNode;
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { url } = usePage();

    // Determine canonical URL - use the current URL without query params for canonical
    const canonicalUrl = useMemo(() => {
        // Get clean URL (no query params except for pagination that should be canonical)
        const cleanUrl = url.split('?')[0];
        // Ensure it's absolute with HTTPS
        if (cleanUrl.startsWith('http')) {
            return cleanUrl;
        }
        // If it's a relative path, prepend the base URL (non-www version)
        const baseUrl = 'https://fzlxtech.cloud';
        return baseUrl + cleanUrl;
    }, [url]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
            {/* --- HEAD: Global meta tags --- */}
            <Head>
                <link rel="canonical" href={canonicalUrl} />
            </Head>
            {/* --- NAVIGATION --- */}
            <nav className="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0 font-bold text-2xl text-slate-900 tracking-tight">
                            <Link href="/" className="hover:opacity-80 transition">
                                Faizul<span className="text-blue-600">x</span>Tech
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8">
                            <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium transition">Home</Link>
                            <Link href="/#about" className="text-slate-600 hover:text-blue-600 font-medium transition">About</Link>
                            <Link href="/#services" className="text-slate-600 hover:text-blue-600 font-medium transition">Services</Link>
                            <Link href="/#experience" className="text-slate-600 hover:text-blue-600 font-medium transition">Experience</Link>
                            <Link href="/blog" className="text-slate-600 hover:text-blue-600 font-medium transition">Blog</Link>
                            <Link href="/#contact" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Hire Me</Link>
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
                            <Link href="/" className="block px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Home</Link>
                            <Link href="/#about" className="block px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md" onClick={() => setIsMenuOpen(false)}>About</Link>
                            <Link href="/#services" className="block px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Services</Link>
                            <Link href="/#experience" className="block px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Experience</Link>
                            <Link href="/blog" className="block px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md" onClick={() => setIsMenuOpen(false)}>Blog</Link>
                            <Link href="/#contact" className="block px-3 py-2 text-blue-600 font-bold" onClick={() => setIsMenuOpen(false)}>Hire Me</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="pt-20">
                {children}
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-slate-900 text-slate-300 py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-white text-lg font-bold mb-4">FzlxTech</h3>
                            <p className="text-sm">
                                Super Web Developer & System Architect building scalable digital solutions.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                                <li><Link href="/#about" className="hover:text-white transition">About</Link></li>
                                <li><Link href="/#services" className="hover:text-white transition">Services</Link></li>
                                <li><Link href="/#experience" className="hover:text-white transition">Experience</Link></li>
                                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Contact</h4>
                            <ul className="space-y-2 text-sm">
                                <li>{'Muhamad Faizul Bin Roni Amir'}</li>
                                <li>Shah Alam, Selangor, Malaysia</li>
                                <li>
                                    <a href="tel:+60178016870" className="hover:text-white transition">+60 17-801 6870</a>
                                </li>
                                <li>
                                    <a href="mailto:faizul.ramir@gmail.com" className="hover:text-white transition">faizul.ramir@gmail.com</a>
                                </li>
                                <li>
                                    <a href="https://linkedin.com/in/faizul-roni-amir-5009a4197" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                                        LinkedIn Profile
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
                        <p>&copy; {new Date().getFullYear()} FzlxTech. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SiteLayout;
