import React, { useState, useEffect, useMemo } from 'react';
import { Link, usePage, router, Head } from '@inertiajs/react';
import { format } from 'date-fns';
import SiteLayout from '@/layouts/site-layout';
import { Search, X } from 'lucide-react';

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

const BlogIndex = ({ posts, search }: BlogIndexProps) => {
    const { auth } = usePage().props as any;
    const [searchInput, setSearchInput] = useState(search || '');

    // Update local input when page loads with search param (e.g., back button)
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

    // SEO meta
    const pageTitle = search ? `Search: "${search}" - Blog` : 'Blog - FzlxTech';
    const pageDescription = search 
        ? `Search results for "${search}" in the FzlxTech blog about web development, Laravel, React, and system architecture.`
        : 'Thoughts on web development, system architecture, and technology from FzlxTech.';

    return (
        <SiteLayout>
            <Head
                title={pageTitle}
                meta={[
                    { name: 'description', content: pageDescription },
                    { property: 'og:title', content: pageTitle },
                    { property: 'og:description', content: pageDescription },
                    { property: 'og:type', content: 'website' },
                    { name: 'twitter:title', content: pageTitle },
                    { name: 'twitter:description', content: pageDescription },
                ]}
            />
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Blog</h1>
                    <p className="text-lg text-slate-600">
                        Thoughts on web development, system architecture, and technology.
                    </p>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mb-8">
                    <div className="relative max-w-xl mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search articles..."
                            className="block w-full pl-11 pr-10 py-3 border border-slate-300 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                        />
                        {searchInput && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                            >
                                <X className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                            </button>
                        )}
                    </div>
                </form>

                {/* Admin quick action */}
                {auth?.user && (
                    <div className="text-center mb-8">
                        <Link
                            href="/blog/posts/create"
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            + Write New Post
                        </Link>
                    </div>
                )}

                {posts.data.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                        <p className="text-slate-500">
                            {search ? 'No articles match your search.' : 'No blog posts yet. Check back soon!'}
                        </p>
                        {search && (
                            <button
                                onClick={clearSearch}
                                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-8">
                        {posts.data.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                                        <time dateTime={post.published_at}>
                                            {format(new Date(post.published_at), 'MMMM d, yyyy')}
                                        </time>
                                        <span>•</span>
                                        <span>{post.user?.name || 'Anonymous'}</span>
                                    </div>

                                    <h2 className="text-2xl font-bold text-slate-900 mb-3 hover:text-blue-600 transition">
                                        {post.title}
                                    </h2>

                                    {post.excerpt && (
                                        <p className="text-slate-600 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    <div className="flex items-center gap-4">
                                        <span className="text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap">
                                            Read more →
                                        </span>

                                        {post.meta_keywords && (
                                            <div className="flex flex-wrap gap-2">
                                                {post.meta_keywords.split(',').map((keyword: string, idx: number) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                                                    >
                                                        {keyword.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {posts.links && posts.links.length > 1 && (
                    <div className="mt-12 flex justify-center">
                        <nav className="flex gap-2">
                            {posts.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-2 rounded ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                    }`}
                                />
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </SiteLayout>
    );
};

export default BlogIndex;
