import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
                        <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link
                                href="/blog/posts"
                                className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center"
                            >
                                Manage Blog Posts
                            </Link>
                            <Link
                                href="/blog/posts/create"
                                className="block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-center"
                            >
                                Create New Post
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
                        <h3 className="text-lg font-semibold mb-2">Your Portfolio</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="text-blue-600 hover:underline">View Homepage</Link></li>
                            <li><Link href="/blog" className="text-blue-600 hover:underline">View Blog</Link></li>
                        </ul>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
                        <h3 className="text-lg font-semibold mb-2">Stats</h3>
                        <p className="text-sm text-slate-600">
                            Blog posts tracking powered by Laravel. View your published posts and their performance.
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
