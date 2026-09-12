import { Link } from '@inertiajs/react';
import { Code, Database, Smartphone, Layout, Mail, Linkedin, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SiteLayout from '@/layouts/site-layout';

// --- DATA FROM RESUME ---
const portfolioData = {
    personal: {
        name: 'Muhamad Faizul Bin Roni Amir',
        title: 'Super Web Developer & System Architect',
        email: 'faizul.ramir@gmail.com',
        location: 'Shah Alam, Selangor, Malaysia',
        linkedin: 'https://linkedin.com/in/faizul-roni-amir-5009a4197',
        summary:
            'Results-driven Software Developer with over 5 years of experience building scalable, high-performance web and mobile solutions. Specializing in PHP, Laravel, and cross-platform applications, I help businesses digitize workflows and improve operational efficiency.',
    },
    services: [
        {
            num: '01',
            title: 'Enterprise Web Systems',
            description:
                'Custom dashboards, CRMs, and management systems built with Laravel & PHP. Secure, scalable, and designed for complex business logic.',
            icon: Database,
        },
        {
            num: '02',
            title: 'Cross-Platform Apps',
            description:
                'Desktop and mobile applications using Electron.js and Ionic.js. Build once, deploy everywhere to save development costs.',
            icon: Smartphone,
        },
        {
            num: '03',
            title: 'Modern Frontend Interface',
            description:
                'Interactive and responsive user interfaces using React.js. Ensuring a smooth user experience for your customers.',
            icon: Layout,
        },
        {
            num: '04',
            title: 'System Architecture',
            description:
                'Consultation on database design (MySQL), API integration, and agile development workflows to ensure project success.',
            icon: Code,
        },
    ],
    experience: [
        {
            num: '01',
            company: 'MyORI Services Sdn Bhd',
            role: 'Lead Web Developer',
            period: '08/2021 — Present',
            description:
                'Leading end-to-end development of digital solutions. Developed internal tools using Laravel, React, and Electron.js to improve team productivity and data accuracy.',
        },
        {
            num: '02',
            company: 'HeiTech Padu Berhad',
            role: 'Software Developer',
            period: '02/2019 — 08/2021',
            description:
                'Developed enterprise software for government and corporate clients. Focused on secure system designs and agile delivery.',
        },
    ],
    techStack: [
        { name: 'Laravel', image: '/images/laravel.png' },
        { name: 'PHP', image: '/images/php.png' },
        { name: 'React.js', image: '/images/react.png' },
        { name: 'Electron.js', image: '/images/electron.png' },
        { name: 'Ionic.js', image: '/images/ionic.png' },
        { name: 'Flutter', image: '/images/flutter.png' },
        { name: 'JavaScript', image: '/images/javascript.png' },
        { name: 'TypeScript', image: '/images/typescript.png' },
    ],
};

const reveal = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
};

const SectionLabel = ({ index, title, blurb }: { index: string; title: string; blurb?: string }) => (
    <div className="mb-10 border-b-4 border-double border-[#111111] pb-6">
        <p className="font-news-mono text-xs uppercase tracking-widest text-[#CC0000]">Sec. {index}</p>
        <h2 className="font-display mt-2 text-4xl font-black tracking-tight lg:text-5xl">{title}</h2>
        {blurb && <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-neutral-600">{blurb}</p>}
    </div>
);

const App = () => {
    return (
        <SiteLayout>
            {/* --- FRONT PAGE / HERO --- */}
            <section className="newsprint-texture border-b border-[#111111]">
                <div className="mx-auto max-w-screen-xl px-4 py-10 lg:py-14">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-y border-[#111111] py-2 font-news-mono text-[11px] uppercase tracking-widest">
                        <span className="bg-[#CC0000] px-2 py-0.5 font-bold text-white">Exclusive</span>
                        <span className="hidden sm:inline">Morning Edition &mdash; No. 001</span>
                        <span>Shah Alam, Malaysia</span>
                    </div>

                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={reveal}
                        className="font-display mt-8 text-center text-5xl font-black leading-[0.9] tracking-tighter sm:text-6xl lg:text-8xl"
                    >
                        Building Scalable
                        <br />
                        Digital Solutions
                    </motion.h1>
                    <p className="mt-4 text-center font-news-sans text-xs uppercase tracking-[0.25em] text-neutral-600">
                        Laravel &bull; React &bull; Electron &mdash; Enterprise Software, In Print
                    </p>

                    <div className="mt-10 grid grid-cols-12 gap-0 border border-[#111111]">
                        {/* Lede column */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={reveal}
                            className="col-span-12 border-b border-[#111111] p-6 sm:p-8 lg:col-span-8 lg:border-b-0 lg:border-r"
                        >
                            <p className="font-news-mono text-[11px] uppercase tracking-widest text-neutral-500">
                                By {portfolioData.personal.name} &mdash; Lead Web Developer
                            </p>
                            <p className="drop-cap mt-4 text-justify font-body text-base leading-relaxed lg:text-lg">
                                I help businesses streamline operations with custom software. Specializing in{' '}
                                <strong>Laravel, React, and Electron.js</strong> to deliver high-performance
                                enterprise applications &mdash; from internal CRMs to cross-platform desktop and
                                mobile releases. Every engagement is reported like front-page news: clear scope,
                                tight deadlines, no filler.
                            </p>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <Link
                                    href="#contact"
                                    className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-[#111111] bg-[#111111] px-6 font-news-sans text-xs font-semibold uppercase tracking-widest text-[#F9F9F7] transition-all duration-200 hover:bg-[#F9F9F7] hover:text-[#111111]"
                                >
                                    Commission a Project <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                                </Link>
                                <Link
                                    href="/blog"
                                    className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-[#111111] bg-transparent px-6 font-news-sans text-xs font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#111111] hover:text-[#F9F9F7]"
                                >
                                    Read the Dispatch
                                </Link>
                                <a
                                    href={portfolioData.personal.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-[44px] items-center justify-center font-news-sans text-xs font-semibold uppercase tracking-widest underline-offset-4 decoration-2 decoration-[#CC0000] hover:underline"
                                >
                                    LinkedIn Record
                                </a>
                            </div>
                            <div className="mt-8 grid grid-cols-3 divide-x divide-[#111111] border-t border-[#111111] pt-4 text-center">
                                {[
                                    ['5+', 'Years in Service'],
                                    ['20+', 'Systems Shipped'],
                                    ['100%', 'Ink, No Filler'],
                                ].map(([stat, label]) => (
                                    <div key={label} className="px-2">
                                        <p className="font-display text-3xl font-black">{stat}</p>
                                        <p className="mt-1 font-news-mono text-[10px] uppercase tracking-widest text-neutral-500">
                                            {label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Portrait column */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={reveal}
                            className="col-span-12 p-6 sm:p-8 lg:col-span-4"
                        >
                            <div className="border border-[#111111] p-2">
                                <img
                                    src="/dp.jpg"
                                    alt="Muhamad Faizul Bin Roni Amir"
                                    width="480"
                                    height="480"
                                    loading="eager"
                                    className="aspect-square w-full object-cover grayscale transition-all duration-200 hover:sepia-[50%]"
                                />
                            </div>
                            <p className="mt-3 font-news-mono text-[11px] uppercase tracking-widest text-neutral-500">
                                Fig. 1.1 &mdash; The Developer, at his desk.
                            </p>
                            <div className="mt-4 border border-[#111111] bg-white/40 p-4">
                                <p className="font-news-mono text-[11px] uppercase tracking-widest text-[#CC0000]">
                                    Currently Accepting
                                </p>
                                <p className="mt-2 font-body text-sm leading-relaxed">
                                    Freelance builds &amp; full-time roles. Replies filed within one business day.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- THE RECORD / ABOUT --- */}
            <section id="record" className="border-b border-[#111111]">
                <div className="mx-auto max-w-screen-xl scroll-mt-24 px-4 py-16">
                    <SectionLabel
                        index="02 &mdash; The Record"
                        title="About the Author"
                        blurb="Five years of shipping enterprise software for government, corporate, and startup desks."
                    />
                    <div className="grid grid-cols-12 gap-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={reveal}
                            className="col-span-12 lg:col-span-7"
                        >
                            <p className="drop-cap text-justify font-body text-base leading-relaxed">
                                {portfolioData.personal.summary}
                            </p>
                            <dl className="mt-8 border-t border-[#111111]">
                                {[
                                    ['Name', portfolioData.personal.name],
                                    ['Beat', portfolioData.personal.title],
                                    ['Bureau', portfolioData.personal.location],
                                    ['Wire', portfolioData.personal.email],
                                ].map(([label, value]) => (
                                    <div
                                        key={label}
                                        className="grid grid-cols-3 gap-4 border-b border-[#E5E5E0] py-2.5"
                                    >
                                        <dt className="font-news-mono text-[11px] uppercase tracking-widest text-neutral-500">
                                            {label}
                                        </dt>
                                        <dd className="col-span-2 font-news-sans text-sm">{value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={reveal}
                            className="col-span-12 lg:col-span-5"
                        >
                            <div className="border border-[#111111] p-6">
                                <h3 className="font-news-mono text-xs uppercase tracking-widest">
                                    Tools of the Trade
                                </h3>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {portfolioData.techStack.map((tech) => (
                                        <span
                                            key={tech.name}
                                            className="border border-[#111111] px-3 py-1.5 font-news-mono text-[11px] uppercase tracking-widest transition-all duration-200 hover:bg-[#111111] hover:text-[#F9F9F7]"
                                        >
                                            {tech.name}
                                        </span>
                                    ))}
                                </div>
                                <div className="py-6 text-center font-display text-xl tracking-[0.5em] text-neutral-400">
                                    &#x2727; &#x2727; &#x2727;
                                </div>
                                <p className="text-justify font-body text-sm leading-relaxed text-neutral-600">
                                    Stack chosen per assignment: Laravel and MySQL for the heavy enterprise
                                    lifting, React for the front page, Electron and Ionic when one codebase must
                                    run everywhere.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- SERVICES --- */}
            <section id="services" className="newsprint-texture border-b border-[#111111]">
                <div className="mx-auto max-w-screen-xl scroll-mt-24 px-4 py-16">
                    <SectionLabel
                        index="03 &mdash; Classifieds"
                        title="Services Offered"
                        blurb="Four departments, one newsroom. Every engagement ships with documentation and a handover."
                    />
                    <div className="grid grid-cols-1 border border-[#111111] md:grid-cols-2">
                        {portfolioData.services.map((service, idx) => {
                            const Icon = service.icon;
                            return (
                                <motion.article
                                    key={service.title}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={reveal}
                                    className={`hard-shadow-hover group bg-[#F9F9F7] p-6 sm:p-8 ${
                                        idx % 2 === 0 ? 'md:border-r md:border-[#111111]' : ''
                                    } ${idx < 2 ? 'border-b border-[#111111]' : ''} ${
                                        idx > 0 ? 'max-md:border-t max-md:border-[#E5E5E0] max-md:first:border-t-0' : ''
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center border border-[#111111] transition-all duration-200 group-hover:bg-[#111111] group-hover:text-[#F9F9F7]">
                                            <Icon className="h-6 w-6" strokeWidth={1.5} />
                                        </div>
                                        <span className="font-news-mono text-xs tracking-widest text-[#CC0000]">
                                            {service.num}
                                        </span>
                                    </div>
                                    <h3 className="font-display mt-6 text-2xl font-bold lg:text-3xl">
                                        {service.title}
                                    </h3>
                                    <p className="mt-3 text-justify font-body text-sm leading-relaxed text-neutral-600">
                                        {service.description}
                                    </p>
                                    <Link
                                        href="#contact"
                                        className="mt-5 inline-flex min-h-[44px] items-center gap-1 font-news-sans text-xs font-semibold uppercase tracking-widest underline-offset-4 decoration-2 decoration-[#CC0000] hover:underline"
                                    >
                                        File a request <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                                    </Link>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- PROJECTS (sealed files) --- */}
            <section id="projects" className="border-b border-[#111111]">
                <div className="mx-auto max-w-screen-xl scroll-mt-24 px-4 py-16">
                    <SectionLabel
                        index="04 &mdash; Selected Work"
                        title="The Sealed Files"
                        blurb="Every client engagement is filed under strict confidence. No names, no screenshots — the work speaks through referrals."
                    />
                    <div className="grid grid-cols-12 gap-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={reveal}
                            className="col-span-12 lg:col-span-7"
                        >
                            <div className="relative border border-[#111111] p-6 sm:p-8">
                                <span
                                    aria-hidden
                                    className="absolute -top-4 right-6 -rotate-3 border-2 border-[#CC0000] bg-[#F9F9F7] px-3 py-1 font-news-mono text-xs font-bold uppercase tracking-[0.25em] text-[#CC0000]"
                                >
                                    Private
                                </span>
                                <p className="font-news-mono text-[11px] uppercase tracking-widest text-neutral-500">
                                    Official Statement
                                </p>
                                <p className="drop-cap mt-4 text-justify font-body text-base leading-relaxed">
                                    All projects are private. Client systems &mdash; enterprise dashboards,
                                    management portals, and cross-platform applications &mdash; are built under
                                    confidentiality and cannot be displayed here. What I can share: the fields
                                    of engagement, the stack behind them, and references on request.
                                </p>
                                <ul className="mt-6 border-t border-[#111111]">
                                    {[
                                        ['Enterprise Systems', 'Laravel · MySQL · REST APIs'],
                                        ['Desktop & Mobile Apps', 'Electron.js · Ionic.js · Flutter'],
                                        ['Interfaces & Portals', 'React.js · TypeScript'],
                                    ].map(([field, stack]) => (
                                        <li
                                            key={field}
                                            className="flex flex-col gap-1 border-b border-[#E5E5E0] py-3 sm:flex-row sm:items-center sm:justify-between"
                                        >
                                            <span className="font-news-sans text-sm font-semibold">{field}</span>
                                            <span className="font-news-mono text-[11px] uppercase tracking-widest text-neutral-500">
                                                {stack}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={reveal}
                            className="col-span-12 lg:col-span-5"
                        >
                            <div className="border border-[#111111]">
                                <p className="border-b border-[#111111] px-4 py-2 font-news-mono text-[11px] uppercase tracking-widest text-neutral-500">
                                    Case Files &mdash; Access Restricted
                                </p>
                                {[1, 2, 3].map((n) => (
                                    <div
                                        key={n}
                                        className="flex items-center justify-between gap-3 border-b border-[#E5E5E0] px-4 py-3 last:border-b-0"
                                    >
                                        <span className="font-news-mono text-[11px] uppercase tracking-widest">
                                            File No. 00{n}
                                        </span>
                                        <span className="bg-[#111111] px-2 py-0.5 font-news-mono text-[10px] uppercase tracking-widest text-[#F9F9F7]">
                                            &#x25A0; Redacted
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="#contact"
                                className="mt-4 flex min-h-[44px] items-center justify-center gap-2 border border-[#111111] bg-[#111111] px-6 font-news-sans text-xs font-semibold uppercase tracking-widest text-[#F9F9F7] transition-all duration-200 hover:bg-[#F9F9F7] hover:text-[#111111]"
                            >
                                Request the Dossier <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                            </Link>
                            <p className="mt-3 text-center font-news-mono text-[11px] uppercase tracking-widest text-neutral-500">
                                Full case files shared privately on request
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- EXPERIENCE (inverted) --- */}
            <section id="experience" className="border-b-4 border-[#111111] bg-[#111111] text-[#F9F9F7]">
                <div className="mx-auto max-w-screen-xl scroll-mt-24 px-4 py-16">
                    <div className="mb-10 border-b-4 border-double border-[#F9F9F7] pb-6">
                        <p className="font-news-mono text-xs uppercase tracking-widest text-[#CC0000]">
                            Sec. 05 &mdash; Archive
                        </p>
                        <h2 className="font-display mt-2 text-4xl font-black tracking-tight lg:text-5xl">
                            Service Record
                        </h2>
                    </div>
                    <div className="grid grid-cols-12 gap-0 border border-[#F9F9F7]">
                        {portfolioData.experience.map((exp, idx) => (
                            <motion.article
                                key={exp.company}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={reveal}
                                className={`col-span-12 p-6 sm:p-8 lg:col-span-6 ${
                                    idx === 0 ? 'lg:border-r lg:border-[#F9F9F7]' : ''
                                } ${idx === 0 ? 'border-b border-[#F9F9F7] lg:border-b-0' : ''}`}
                            >
                                <p className="font-display text-5xl font-black text-[#CC0000]">{exp.num}</p>
                                <p className="mt-4 font-news-mono text-[11px] uppercase tracking-widest text-neutral-400">
                                    {exp.period}
                                </p>
                                <h3 className="font-display mt-2 text-2xl font-bold">{exp.role}</h3>
                                <p className="mt-1 font-news-sans text-sm font-semibold uppercase tracking-widest">
                                    {exp.company}
                                </p>
                                <p className="mt-4 text-justify font-body text-sm leading-relaxed text-neutral-400">
                                    {exp.description}
                                </p>
                            </motion.article>
                        ))}
                    </div>

                    {/* Press plate strip */}
                    <div className="mt-8 overflow-hidden border border-[#F9F9F7]/30" aria-label="Technology">
                        <div className="ticker-track items-center py-3">
                            {[0, 1].map((copy) => (
                                <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                                    {[...portfolioData.techStack, ...portfolioData.techStack].map((tech, i) => (
                                        <span
                                            key={`${copy}-${tech.name}-${i}`}
                                            className="mx-3 flex items-center gap-2 whitespace-nowrap border border-[#F9F9F7]/30 px-4 py-2"
                                        >
                                            <img
                                                src={tech.image}
                                                alt=""
                                                aria-hidden
                                                loading="lazy"
                                                className="h-5 w-5 object-contain grayscale"
                                            />
                                            <span className="font-news-mono text-[11px] uppercase tracking-widest">
                                                {tech.name}
                                            </span>
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CONTACT / NOTICES --- */}
            <section id="contact" className="newsprint-texture">
                <div className="mx-auto max-w-screen-xl scroll-mt-24 px-4 py-16">
                    <SectionLabel index="06 &mdash; Notices" title="Place a Notice" />
                    <div className="grid grid-cols-12 gap-8">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={reveal}
                            className="col-span-12 border-4 border-[#111111] p-8 text-center lg:col-span-8 lg:col-start-3"
                        >
                            <p className="font-news-mono text-[11px] uppercase tracking-widest text-neutral-500">
                                To the Editor &mdash; Re: Your Next Project
                            </p>
                            <h3 className="font-display mx-auto mt-3 max-w-xl text-3xl font-black leading-tight lg:text-4xl">
                                Have a story worth building? Let&rsquo;s put it on the front page.
                            </h3>
                            <div className="py-6 text-center font-display text-xl tracking-[0.5em] text-neutral-400">
                                &#x2727; &#x2727; &#x2727;
                            </div>
                            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                                <a
                                    href={`mailto:${portfolioData.personal.email}`}
                                    className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-[#111111] bg-[#111111] px-6 font-news-sans text-xs font-semibold uppercase tracking-widest text-[#F9F9F7] transition-all duration-200 hover:bg-[#F9F9F7] hover:text-[#111111]"
                                >
                                    <Mail className="h-4 w-4" strokeWidth={1.5} /> Send a Wire
                                </a>
                                <a
                                    href={portfolioData.personal.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-[#111111] px-6 font-news-sans text-xs font-semibold uppercase tracking-widest transition-all duration-200 hover:bg-[#111111] hover:text-[#F9F9F7]"
                                >
                                    <Linkedin className="h-4 w-4" strokeWidth={1.5} /> LinkedIn
                                </a>
                            </div>
                            <p className="mt-6 font-news-mono text-[11px] uppercase tracking-widest text-neutral-500">
                                Replies filed within one business day
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </SiteLayout>
    );
};

export default App;
