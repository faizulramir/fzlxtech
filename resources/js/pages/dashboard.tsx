import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { LayoutGrid, FileText, PlusCircle, ExternalLink, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const containerStagger = {
    animate: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <motion.div
                    variants={containerStagger}
                    initial="initial"
                    animate="animate"
                    className="grid auto-rows-min gap-4 md:grid-cols-3"
                >
                    <motion.div
                        variants={cardVariant}
                        className="rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
                    >
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link
                                href="/blog/posts"
                                className="flex items-center gap-2 px-4 py-2.5 bg-white text-black rounded-lg font-medium text-sm hover:bg-white/90 transition-all duration-300"
                            >
                                <FileText className="w-4 h-4" />
                                Manage Blog Posts
                            </Link>
                            <Link
                                href="/blog/posts/create"
                                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 text-white rounded-lg font-medium text-sm hover:bg-white/20 transition-all duration-300"
                            >
                                <PlusCircle className="w-4 h-4" />
                                Create New Post
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={cardVariant}
                        className="rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
                    >
                        <h3 className="text-lg font-semibold text-white mb-4">Your Portfolio</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/" className="text-white/40 hover:text-white transition-colors inline-flex items-center gap-1 group">
                                    View Homepage
                                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-white/40 hover:text-white transition-colors inline-flex items-center gap-1 group">
                                    View Blog
                                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        variants={cardVariant}
                        className="rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
                    >
                        <h3 className="text-lg font-semibold text-white mb-4">Stats</h3>
                        <p className="text-sm text-white/30 leading-relaxed">
                            Blog posts tracking powered by Laravel. View your published posts and their performance.
                        </p>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-1 mt-4 text-white/50 hover:text-white text-sm transition-colors group"
                        >
                            <BookOpen className="w-4 h-4" />
                            Browse Blog
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </AppLayout>
    );
}
