<!DOCTYPE html>
<html lang="en" dir="ltr" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Muhamad Faizul Bin Roni Amir - Super Web Developer & System Architect specializing in Laravel, React, and enterprise solutions. 5+ years experience building scalable web and mobile applications in Malaysia.">
        <meta name="keywords" content="Laravel developer, PHP developer, React developer, web developer Malaysia, system architect, enterprise web systems, cross-platform apps, FzlxTech, Muhamad Faizul">
        <meta name="author" content="Muhamad Faizul Bin Roni Amir">
        <meta name="copyright" content="© {{ date('Y') }} FzlxTech. All rights reserved.">
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        <meta name="googlebot" content="index, follow">
        <meta name="theme-color" content="#2563eb" media="(prefers-color-scheme: light)">
        <meta name="theme-color" content="#1e40af" media="(prefers-color-scheme: dark)">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        {{-- Open Graph / Facebook --}}
        <meta property="og:type" content="profile">
        <meta property="og:url" content="{{ config('app.url') }}">
        <meta property="og:title" content="{{ config('app.name', 'FzlxTech') }} - Super Web Developer & System Architect">
        <meta property="og:description" content="Results-driven Software Developer with 5+ years experience. Specializing in PHP, Laravel, React, Electron.js, and Ionic.js. Building scalable digital solutions for businesses in Malaysia and worldwide.">
        <meta property="og:image" content="{{ config('app.url') }}/dp.jpg">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:image:alt" content="Muhamad Faizul Bin Roni Amir - Lead Web Developer">
        <meta property="og:site_name" content="FzlxTech">
        <meta property="og:locale" content="en_MY">

        {{-- Twitter Card --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@fzlxtech"> <!-- Update if you have Twitter -->
        <meta name="twitter:creator" content="@fzlxtech">
        <meta name="twitter:url" content="{{ config('app.url') }}">
        <meta name="twitter:title" content="{{ config('app.name', 'FzlxTech') }} - Super Web Developer & System Architect">
        <meta name="twitter:description" content="Results-driven Software Developer with 5+ years experience. Specializing in Laravel, React, and enterprise solutions.">
        <meta name="twitter:image" content="{{ config('app.url') }}/dp.jpg">
        <meta name="twitter:image:alt" content="Muhamad Faizul Bin Roni Amir - Lead Web Developer">

        {{-- Canonical URL --}}
        <link rel="canonical" href="{{ config('app.url') }}">

        {{-- Favicon --}}
        <link rel="icon" href="/ft-logo.svg?v=1" type="image/svg+xml">
        <link rel="icon" href="/favicon.ico?v=1" sizes="any">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=1">

        {{-- Web App Manifest --}}
        <link rel="manifest" href="/manifest.json">

        {{-- Preconnect for fonts --}}
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="dns-prefetch" href="https://fonts.bunny.net">
        <link rel="dns-prefetch" href="https://fonts.gstatic.com">

        {{-- RSS Feed (optional - create later if needed) --}}
        {{-- <link rel="alternate" type="application/rss+xml" title="FzlxTech Blog" href="{{ config('app.url') }}/feed"> --}}

        {{-- Structured Data - JSON-LD (Person) --}}
        <script type="application/ld+json">
        {
            "@@context": "https://schema.org",
            "@@type": "Person",
            "name": "Muhamad Faizul Bin Roni Amir",
            "url": "{{ config('app.url') }}",
            "image": "{{ config('app.url') }}/dp.jpg",
            "sameAs": [
                "https://linkedin.com/in/faizul-roni-amir-5009a4197"
                {{-- Add other social profiles: Twitter, GitHub, etc. --}}
            ],
            "jobTitle": "Super Web Developer & System Architect",
            "worksFor": {
                "@@type": "Organization",
                "name": "FzlxTech",
                "url": "{{ config('app.url') }}"
            },
            "address": {
                "@@type": "PostalAddress",
                "addressLocality": "Shah Alam",
                "addressRegion": "Selangor",
                "addressCountry": "MY"
            },
            "contactPoint": {
                "@@type": "ContactPoint",
                "telephone": "+60178016870",
                "contactType": "customer service",
                "email": "faizul.ramir@gmail.com",
                "availableLanguage": ["English", "Malay"]
            },
            "knowsAbout": [
                "Laravel",
                "PHP",
                "React.js",
                "Electron.js",
                "Ionic.js",
                "Flutter",
                "JavaScript",
                "TypeScript",
                "System Architecture",
                "MySQL",
                "PostgreSQL",
                "API Development",
                "RESTful APIs",
                "Microservices",
                "Cloud Computing"
            ],
            "alumniOf": [
                {
                    "@@type": "EducationalOrganization",
                    "name": "Add your university/college here"
                }
            ],
            "award": [
                "Add any awards or certifications here"
            ]
        }
        </script>

        {{-- BreadcrumbList structured data (helps Google understand site structure) --}}
        <script type="application/ld+json">
        {
            "@@context": "https://schema.org",
            "@@type": "BreadcrumbList",
            "itemListElement": [{
                "@@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "{{ config('app.url') }}"
            }]
        }
        </script>

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'FzlxTech') }} - Super Web Developer & System Architect</title>

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
