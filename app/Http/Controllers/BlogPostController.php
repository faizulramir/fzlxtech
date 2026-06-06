<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class BlogPostController extends Controller
{
    /**
     * Display a listing of published blog posts (public page).
     */
    public function index(Request $request)
    {
        $query = BlogPost::published()
            ->with('user');

        // Search functionality
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                  ->orWhere('excerpt', 'like', '%' . $search . '%')
                  ->orWhere('content', 'like', '%' . $search . '%');
            });
        }

        $posts = $query->orderBy('published_at', 'desc')
            ->paginate(10)
            ->withQueryString(); // Preserve search query in pagination links

        return inertia('blog/index', [
            'posts' => $posts,
            'search' => $search ?? ''
        ]);
    }

    /**
     * Show the form for creating a new blog post.
     */
    public function create()
    {
        return inertia('blog/create');
    }

    /**
     * Store a newly created blog post in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'status' => 'required|in:draft,published,archived',
            'published_at' => 'nullable|date',
            'meta_description' => 'nullable|string|max:255',
            'meta_keywords' => 'nullable|string|max:255',
        ]);

        // Generate unique slug from title
        $slug = Str::slug($validated['title']);
        $originalSlug = $slug;
        $counter = 1;
        while (BlogPost::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }
        $validated['slug'] = $slug;

        // Set user_id
        $validated['user_id'] = Auth::id();

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('blog-images', 'public');
            $validated['featured_image'] = $path;
        }

        // If status is published but no published_at set, use now
        if ($validated['status'] === 'published' && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        BlogPost::create($validated);

        return redirect()->route('dashboard')->with('success', 'Blog post created successfully!');
    }

    /**
     * Display the specified blog post (public view).
     */
    public function show(BlogPost $blog_post)
    {
        // Simple view count increment
        try {
            $blog_post->increment('views_count');
        } catch (\Exception $e) {
            \Log::error('View count increment failed: ' . $e->getMessage());
        }

        $blog_post->load('user');

        // Convert to array to control exactly what's passed
        $postArray = $blog_post->toArray();
        
        // Ensure content is raw HTML (Inertia will JSON encode it, but we need to avoid double-escaping)
        // Laravel automatically escapes HTML in JSON responses when using json()/response()->json()
        // But Inertia::render should handle it properly. The issue might be that the content is already escaped in DB.
        
        return inertia('blog/show', [
            'post' => $postArray
        ]);
    }

    /**
     * Show the form for editing the specified blog post.
     */
    public function edit(BlogPost $blog_post)
    {
        // Authorization check
        if (Auth::id() !== $blog_post->user_id) {
            abort(403, 'Unauthorized');
        }

        return inertia('blog/edit', [
            'post' => $blog_post
        ]);
    }

    /**
     * Update the specified blog post in storage.
     */
    public function update(Request $request, BlogPost $blog_post)
    {
        // Authorization check
        if (Auth::id() !== $blog_post->user_id) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'status' => 'required|in:draft,published,archived',
            'published_at' => 'nullable|date',
            'meta_description' => 'nullable|string|max:255',
            'meta_keywords' => 'nullable|string|max:255',
        ]);

        // Update slug if title changed
        if ($validated['title'] !== $blog_post->title) {
            $slug = Str::slug($validated['title']);
            $originalSlug = $slug;
            $counter = 1;
            while (BlogPost::where('slug', $slug)->where('id', '!=', $blog_post->id)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }
            $validated['slug'] = $slug;
        }

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            // Delete old image if exists
            if ($blog_post->featured_image) {
                \Storage::disk('public')->delete($blog_post->featured_image);
            }
            $path = $request->file('featured_image')->store('blog-images', 'public');
            $validated['featured_image'] = $path;
        }

        // If status is published but no published_at set, use now
        if ($validated['status'] === 'published' && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $blog_post->update($validated);

        return redirect()->route('blog.posts.edit', $blog_post)->with('success', 'Blog post updated successfully!');
    }

    /**
     * Remove the specified blog post from storage.
     */
    public function destroy(BlogPost $blog_post)
    {
        // Authorization check
        if (Auth::id() !== $blog_post->user_id) {
            abort(403, 'Unauthorized');
        }

        // Delete featured image if exists
        if ($blog_post->featured_image) {
            \Storage::disk('public')->delete($blog_post->featured_image);
        }

        $blog_post->delete();

        return redirect()->route('dashboard')->with('success', 'Blog post deleted successfully!');
    }
}
