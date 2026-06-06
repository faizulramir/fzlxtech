<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\BlogPostController;
use App\Models\BlogPost;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Sitemap
Route::get('/sitemap.xml', function () {
    $posts = BlogPost::published()
        ->orderBy('published_at', 'desc')
        ->get(['slug', 'published_at', 'updated_at']);

    $baseUrl = config('app.url'); // Use APP_URL from .env

    $urls = [
        [
            'loc' => $baseUrl,
            'lastmod' => now()->toDateString(),
            'changefreq' => 'monthly',
            'priority' => '1.0',
        ],
        [
            'loc' => $baseUrl . '/blog',
            'lastmod' => $posts->first()?->published_at ?? now()->toDateString(),
            'changefreq' => 'weekly',
            'priority' => '0.8',
        ],
    ];

    foreach ($posts as $post) {
        $urls[] = [
            'loc' => $baseUrl . '/blog/' . $post->slug,
            'lastmod' => $post->updated_at->toDateString(),
            'changefreq' => 'monthly',
            'priority' => '0.7',
        ];
    }

    $xml = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;

    foreach ($urls as $url) {
        $xml .= '  <url>' . PHP_EOL;
        $xml .= '    <loc>' . htmlspecialchars($url['loc']) . '</loc>' . PHP_EOL;
        $xml .= '    <lastmod>' . $url['lastmod'] . '</lastmod>' . PHP_EOL;
        $xml .= '    <changefreq>' . $url['changefreq'] . '</changefreq>' . PHP_EOL;
        $xml .= '    <priority>' . $url['priority'] . '</priority>' . PHP_EOL;
        $xml .= '  </url>' . PHP_EOL;
    }

    $xml .= '</urlset>';

    return response($xml, 200)->header('Content-Type', 'application/xml');
})->name('sitemap.xml');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Blog Admin Routes (CRUD)
    Route::get('blog/posts', [BlogPostController::class, 'index'])->name('blog.posts.index');
    Route::get('blog/posts/create', [BlogPostController::class, 'create'])->name('blog.posts.create');
    Route::post('blog/posts', [BlogPostController::class, 'store'])->name('blog.posts.store');
    Route::get('blog/posts/{blog_post}/edit', [BlogPostController::class, 'edit'])->name('blog.posts.edit');
    Route::put('blog/posts/{blog_post}', [BlogPostController::class, 'update'])->name('blog.posts.update');
    Route::delete('blog/posts/{blog_post}', [BlogPostController::class, 'destroy'])->name('blog.posts.destroy');
});

// Public Blog Routes
Route::get('blog', [BlogPostController::class, 'index'])->name('blog.index');
Route::get('blog/{blog_post}', [BlogPostController::class, 'show'])->name('blog.show');

require __DIR__.'/settings.php';
