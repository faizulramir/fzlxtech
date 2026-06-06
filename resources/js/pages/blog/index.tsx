import React, { useState, useEffect, useMemo } from 'react';
import { Link, usePage, router, Head } from '@inertiajs/react';
import { format } from 'date-fns';
import SiteLayout from '@/layouts/site-layout';
import { Search, X, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    published_at: string;
    meta_keywords: string | null;
    user?: {
        name: string;
    };
}

interface PaginatedPosts {
    data: BlogPost[];
    links: { url: string | null; active: boolean; label: string }[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface BlogIndexProps {
    posts: PaginatedPosts;
    search?: string;
}

const stagger = {
    animate: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

const BlogIndex = ({ posts, search }: BlogIndexProps) => {
    const { auth } = usePage().props as any;
    const [searchInput, setSearchInput] = useState(search || '');

    useEffect(() => {
        setSearchInput(search || '');
    }, [search]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const url = searchInput.trim()
            ? `/blog?search=${encodeURIComponent(searchInput.trim())}`
            : '/blog';
        router.get(url);
    };

    const clearSearch = () => {
        setSearchInput('');
        router.get('/blog');
    };

    const pageTitle = search ? `Search: "${search}" - Blog` : 'Blog - FzlxTech';
    const pageDescription = search
        ? `Search results for "${search}" in the FzlxTech blog about web development, Laravel, React, and system architecture.`
        : 'Thoughts on web development, system architecture, and technology from FzlxTech.';

    return (
        <SiteLayout>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
            </Head>
            <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={stagger}
                    className="text-center mb-16"
                >
                    <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                        Blog
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-lg text-white/30">
                        Thoughts on web development, system architecture, and technology.
                    </motion.p>
                </motion.div>

                {/* Search Bar */}
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    onSubmit={handleSearch}
                    className="mb-12"
                >
                    <div className="relative max-w-xl mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-white/20" />
                        </div>
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search articles..."
                            className="block w-full pl-11 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all"
                        />
                        {searchInput && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                            >
                                <X className="h-5 w-5 text-white/30 hover:text-white/60 transition-colors" />
                            </button>
                        )}
                    </div>
                </motion.form>

                {/* Admin quick action */}
                {auth?.user && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center mb-12"
                    >
                        <Link
                            href="/blog/posts/create"
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-full font-medium text-sm hover:bg-white/90 transition-all duration-300"
                        >
                            + Write New Post
                        </Link>
                    </motion.div>
                )}

                {posts.data.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16 border border-white/5 rounded-2xl"
                    >
                        <p className="text-white/30">
                            {search ? 'No articles match your search.' : 'No blog posts yet. Check back soon!'}
                        </p>
                        {search && (
                            <button
                                onClick={clearSearch}
                                className="mt-4 text-white/50 hover:text-white font-medium transition-colors"
                            >
                                Clear search
                            </button>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={stagger}
                        className="space-y-6"
                    >
                        {posts.data.map((post) => (
                            <motion.div key={post.id} variants={fadeUp}>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="block p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-3 text-sm text-white/20 mb-3">
                                        <time dateTime={post.published_at}>
                                            {format(new Date(post.published_at), 'MMMM d, yyyy')}
                                        </time>
                                        <span>•</span>
                                        <span>{post.user?.name || 'Anonymous'}</span>
                                    </div>

                                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-white/80 transition-colors">
                                        {post.title}
                                    </h2>

                                    {post.excerpt && (
                                        <p className="text-white/30 mb-5 line-clamp-3 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    <div className="flex items-center gap-4">
                                        <span className="text-white/50 group-hover:text-white font-medium text-sm inline-flex items-center gap-1 transition-colors">
                                            Read more
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                        </span>

                                        {post.meta_keywords && (
                                            <div className="flex flex-wrap gap-2">
                                                {post.meta_keywords.split(',').map((keyword: string, idx: number) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2.5 py-0.5 bg-white/5 text-white/30 text-xs rounded-full border border-white/5"
                                                    >
                                                        {keyword.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {posts.links && posts.links.length > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-16 flex justify-center"
                    >
                        <nav className="flex gap-2">
                            {posts.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                                        link.active
                                            ? 'bg-white text-black font-medium'
                                            : 'text-white/40 border border-white/10 hover:bg-white/5 hover:text-white/70'
                                    }`}
                                />
                            ))}
                        </nav>
                    </motion.div>
                )}
            </div>
        </SiteLayout>
    );
};

export default BlogIndex;
