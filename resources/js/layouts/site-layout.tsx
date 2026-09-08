import React, { useMemo, useState } from 'react';
import { Link, Head, usePage } from '@inertiajs/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SiteLayoutProps {
    children: React.ReactNode;
}

const navLinks = [
    { href: '/', label: 'Front Page', num: '01' },
    { href: '/#record', label: 'The Record', num: '02' },
    { href: '/#services', label: 'Services', num: '03' },
    { href: '/#experience', label: 'Experience', num: '04' },
    { href: '/blog', label: 'Dispatch', num: '05' },
];

const tickerItems = [
    'Laravel Enterprise Systems',
    'React Interfaces',
    'Electron Desktop Apps',
    'Ionic Mobile Apps',
    '5+ Years in Print & Production',
    'Shah Alam — Worldwide',
];

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { url, props } = usePage();
    const visits = (props as unknown as { visits?: { total?: number; today?: number } }).visits;
    const totalVisits = typeof visits?.total === 'number' ? visits.total.toLocaleString('en-US') : '—';
    const todayVisits = typeof visits?.today === 'number' ? visits.today.toLocaleString('en-US') : '—';

    const canonicalUrl = useMemo(() => {
        const cleanUrl = url.split('?')[0];
        if (cleanUrl.startsWith('http')) return cleanUrl;
        return 'https://fzlxtech.cloud' + cleanUrl;
    }, [url]);

    const today = useMemo(
        () =>
            new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
        [],
    );

    return (
        <div className="newsprint font-body min-h-screen bg-[#F9F9F7] text-[#111111] antialiased">
            <Head>
                <link rel="canonical" href={canonicalUrl} />
            </Head>

            {/* --- Dateline bar --- */}
            <div className="border-b border-[#111111]">
                <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-4 px-4 py-1.5 font-news-mono text-[11px] uppercase tracking-widest">
                    <span className="hidden sm:inline">Vol. 1 &mdash; Shah Alam Edition</span>
                    <span className="sm:hidden">Vol. 1</span>
                    <span className="hidden md:inline">{today}</span>
                    <span className="inline-flex items-center gap-2">
                        <span className="inline-block h-2 w-2 bg-[#CC0000]" aria-hidden />
                        Price: One Click
                    </span>
                </div>
            </div>

            {/* --- Masthead --- */}
            <header className="border-b border-[#111111]">
                <div className="mx-auto max-w-screen-xl px-4 pb-5 pt-6 text-center">
                    <p className="font-news-mono text-[11px] uppercase tracking-[0.3em] text-neutral-600">
                        &#x2727; Est. 2019 &#x2727;
                    </p>
                    <Link
                        href="/"
                        className="font-display mt-2 block text-5xl font-black leading-[0.9] tracking-tighter sm:text-6xl lg:text-7xl"
                    >
                        Faizul<span className="text-[#CC0000]">x</span>Tech
                    </Link>
                    <p className="mt-3 font-news-sans text-xs uppercase tracking-[0.25em] text-neutral-600">
                        All the Code That&rsquo;s Fit to Print
                    </p>
                </div>
            </header>

            {/* --- Sticky section nav --- */}
            <nav
                aria-label="Sections"
                className="sticky top-0 z-40 border-b-4 border-double border-[#111111] bg-[#F9F9F7]"
            >
                <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4">
                    <div className="hidden items-stretch md:flex">
                        {navLinks.map((link, i) => (
                            <Link
                                key={link.href + link.label}
                                href={link.href}
                                className={`flex min-h-[44px] items-center gap-2 px-4 font-news-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:text-[#CC0000] ${
                                    i > 0 ? 'border-l border-[#111111]' : ''
                                }`}
                            >
                                <span className="text-[10px] text-neutral-500">{link.num}</span>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <Link
                        href="/"
                        className="font-display text-xl font-black tracking-tighter md:hidden"
                    >
                        F<span className="text-[#CC0000]">x</span>T
                    </Link>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/#contact"
                            className="hidden min-h-[44px] items-center border border-[#111111] bg-[#111111] px-5 font-news-sans text-xs font-semibold uppercase tracking-widest text-[#F9F9F7] transition-all duration-200 hover:border-[#111111] hover:bg-[#F9F9F7] hover:text-[#111111] md:inline-flex"
                        >
                            Hire Me
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMenuOpen}
                            className="flex min-h-[44px] min-w-[44px] items-center justify-center border border-[#111111] transition-all duration-200 hover:bg-[#111111] hover:text-[#F9F9F7] md:hidden"
                        >
                            {isMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="overflow-hidden border-t border-[#111111] md:hidden"
                        >
                            <div className="px-4 py-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href + link.label}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex min-h-[44px] items-center justify-between border-b border-[#E5E5E0] py-2 font-news-mono text-xs uppercase tracking-widest last:border-b-0 hover:text-[#CC0000]"
                                    >
                                        <span>{link.label}</span>
                                        <span className="text-neutral-500">{link.num}</span>
                                    </Link>
                                ))}
                                <Link
                                    href="/#contact"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="mb-3 mt-2 flex min-h-[44px] items-center justify-center bg-[#111111] font-news-sans text-xs font-semibold uppercase tracking-widest text-[#F9F9F7]"
                                >
                                    Hire Me
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* --- Breaking ticker --- */}
            <div className="overflow-hidden border-b border-[#111111] bg-[#111111] text-[#F9F9F7]" aria-label="Latest">
                <div className="ticker-track items-center py-2">
                    {[0, 1].map((copy) => (
                        <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                            <span className="mx-4 bg-[#CC0000] px-2 py-0.5 font-news-mono text-[11px] font-bold uppercase tracking-widest">
                                Latest
                            </span>
                            {tickerItems.map((item) => (
                                <span
                                    key={`${copy}-${item}`}
                                    className="whitespace-nowrap font-news-mono text-[11px] uppercase tracking-widest"
                                >
                                    <span className="mx-3 text-[#CC0000]">&#x25A0;</span>
                                    {item}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <main>{children}</main>

            {/* --- Footer --- */}
            <footer className="border-t-4 border-double border-[#111111]">
                <div className="newsprint-texture mx-auto max-w-screen-xl px-4 py-16">
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 md:col-span-5">
                            <Link href="/" className="font-display text-3xl font-black tracking-tighter">
                                Faizul<span className="text-[#CC0000]">x</span>Tech
                            </Link>
                            <p className="mt-4 max-w-sm text-justify font-body text-sm leading-relaxed text-neutral-600">
                                Super Web Developer &amp; System Architect building scalable digital
                                solutions. Set in hot metal, shipped on the modern web.
                            </p>
                            <p className="mt-4 font-news-mono text-[11px] uppercase tracking-widest text-neutral-500">
                                Fig. 0.0 &mdash; The Masthead, Shah Alam
                            </p>
                        </div>

                        <div className="col-span-6 md:col-span-3">
                            <h4 className="font-news-mono text-xs uppercase tracking-widest">Sections</h4>
                            <ul className="mt-4 space-y-1 border-t border-[#111111] pt-4">
                                {navLinks.map((link) => (
                                    <li key={link.href + link.label}>
                                        <Link
                                            href={link.href}
                                            className="inline-block py-1 font-news-sans text-sm underline-offset-4 decoration-2 hover:text-[#CC0000] hover:underline"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="col-span-6 md:col-span-4">
                            <h4 className="font-news-mono text-xs uppercase tracking-widest">Wire Room</h4>
                            <ul className="mt-4 space-y-2 border-t border-[#111111] pt-4 font-news-sans text-sm text-neutral-600">
                                <li>Muhamad Faizul Bin Roni Amir</li>
                                <li>Shah Alam, Selangor, Malaysia</li>
                                <li>
                                    <a
                                        href="mailto:faizul.ramir@gmail.com"
                                        className="underline-offset-4 decoration-2 hover:text-[#CC0000] hover:underline"
                                    >
                                        faizul.ramir@gmail.com
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://linkedin.com/in/faizul-roni-amir-5009a4197"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 underline-offset-4 decoration-2 hover:text-[#CC0000] hover:underline"
                                    >
                                        LinkedIn
                                        <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-[#111111] text-[#F9F9F7]">
                    <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-2 px-4 py-3 font-news-mono text-[11px] uppercase tracking-widest sm:flex-row">
                        <span>&copy; {new Date().getFullYear()} FzlxTech. All rights reserved.</span>
                        <span>
                            Circulation: {totalVisits} readers <span className="text-[#CC0000]">&#x25A0;</span>{' '}
                            {todayVisits} today
                        </span>
                        <span className="text-neutral-400">Edition: Vol 1.0 | Printed in Shah Alam</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SiteLayout;
