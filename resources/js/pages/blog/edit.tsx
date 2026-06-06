import React, { useState, useEffect } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import SiteLayout from '@/layouts/site-layout';

interface PostData {
    id: number;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    featured_image: string | null;
    status: string;
    published_at: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    user_id: number;
}

interface BlogEditProps {
    post: PostData;
}

const BlogEdit = ({ post }: BlogEditProps) => {
    const { errors } = usePage().props;
    const [title, setTitle] = useState(post.title);
    const [excerpt, setExcerpt] = useState(post.excerpt || '');
    const [content, setContent] = useState(post.content);
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [status, setStatus] = useState(post.status);
    const [publishedAt, setPublishedAt] = useState(
        post.published_at ? new Date(post.published_at).toISOString().slice(0, 16) : ''
    );
    const [metaDescription, setMetaDescription] = useState(post.meta_description || '');
    const [metaKeywords, setMetaKeywords] = useState(post.meta_keywords || '');
    const [previewImage, setPreviewImage] = useState<string | null>(
        post.featured_image ? `/storage/${post.featured_image}` : null
    );
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        // Reset form when post prop changes
        setTitle(post.title);
        setExcerpt(post.excerpt || '');
        setContent(post.content);
        setStatus(post.status);
        setPublishedAt(post.published_at ? new Date(post.published_at).toISOString().slice(0, 16) : '');
        setMetaDescription(post.meta_description || '');
        setMetaKeywords(post.meta_keywords || '');
        setPreviewImage(post.featured_image ? `/storage/${post.featured_image}` : null);
        setFeaturedImage(null);
    }, [post]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFeaturedImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('excerpt', excerpt);
        formData.append('content', content);
        formData.append('status', status);
        formData.append('published_at', publishedAt);
        formData.append('meta_description', metaDescription);
        formData.append('meta_keywords', metaKeywords);
        if (featuredImage) {
            formData.append('featured_image', featuredImage);
        }

        router.put(`/blog/posts/${post.slug}`, formData, {
            forceFormData: true,
            onSuccess: () => {
                setProcessing(false);
            },
            onError: () => {
                setProcessing(false);
            }
        });
    };

    return (
        <SiteLayout>
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link
                            href={`/blog/${post.slug}`}
                            className="text-blue-600 hover:text-blue-700 text-sm mb-2 block"
                        >
                            ← View Post
                        </Link>
                        <h1 className="text-3xl font-bold text-slate-900">Edit Post</h1>
                        <p className="text-slate-600 mt-2">Update your blog post.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Excerpt (Optional)
                        </label>
                        <textarea
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>}
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Content <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={15}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        />
                        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                    </div>

                    {/* Featured Image */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Featured Image (Optional)
                        </label>
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {previewImage && (
                            <div className="mt-3">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-lg border border-slate-200"
                                />
                            </div>
                        )}
                        {errors.featured_image && <p className="mt-1 text-sm text-red-600">{errors.featured_image}</p>}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Status <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                    </div>

                    {/* Publish Date */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Publish Date (Optional)
                        </label>
                        <input
                            type="datetime-local"
                            value={publishedAt}
                            onChange={(e) => setPublishedAt(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.published_at && <p className="mt-1 text-sm text-red-600">{errors.published_at}</p>}
                    </div>

                    {/* Meta Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Meta Description (Optional)
                        </label>
                        <textarea
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            rows={2}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.meta_description && <p className="mt-1 text-sm text-red-600">{errors.meta_description}</p>}
                    </div>

                    {/* Meta Keywords */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Meta Keywords (Optional)
                        </label>
                        <input
                            type="text"
                            value={metaKeywords}
                            onChange={(e) => setMetaKeywords(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="comma, separated, keywords"
                        />
                        {errors.meta_keywords && <p className="mt-1 text-sm text-red-600">{errors.meta_keywords}</p>}
                    </div>

                    {/* Submit */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {processing ? 'Updating...' : 'Update Post'}
                        </button>

                        <Link
                            href="/dashboard"
                            className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </SiteLayout>
    );
};

export default BlogEdit;
