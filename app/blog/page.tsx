'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  name: string;
  slug: string;
  content: {
    title: string;
    subtitle: string;
    hero_image: string;
    author: string;
    author_avatar: string;
    author_bio: string;
    published_date: string;
    reading_time: number;
    category: string;
    tags: string[];
    excerpt: string;
    featured: boolean;
    related_places?: string[];
  };
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiRecommendations, setAiRecommendations] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch(
          `https://api.storyblok.com/v2/cdn/stories?token=${process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN}&version=published&filter_query[component][in]=blog_post&per_page=100`
        );
        const result = await response.json();
        setPosts(result.stories || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogPosts();
  }, []);

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.content.category)))];
  
  // Filter by category and search query
  const filteredPosts = posts.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.content.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      p.content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts.find(p => p.content.featured);

  // Get AI recommendations based on user's browsing (mock for now)
  useEffect(() => {
    if (posts.length > 0) {
      // Simple recommendation: get posts from different categories
      const recommended = posts
        .filter(p => !p.content.featured)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setAiRecommendations(recommended);
    }
  }, [posts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              AtlasGo
            </Link>
            <nav className="flex gap-6">
              <Link href="/search" className="text-gray-600 hover:text-gray-900">Search</Link>
              <Link href="/itinerary" className="text-gray-600 hover:text-gray-900">Plan Trip</Link>
              <Link href="/blog" className="text-gray-900 font-semibold">Blog</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Travel Stories & Guides</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover insider tips, hidden gems, and travel inspiration from around the world
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search stories by title, location, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 pr-12 rounded-full border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-lg shadow-lg"
              />
              <svg className="w-6 h-6 text-gray-400 absolute left-5 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-sm text-gray-600 mt-2">
                Found {filteredPosts.length} {filteredPosts.length === 1 ? 'story' : 'stories'}
              </p>
            )}
          </div>
        </div>

        {/* AI Recommendations */}
        {aiRecommendations.length > 0 && !searchQuery && (
          <div className="mb-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">AI Recommended for You</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {aiRecommendations.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
                    <img src={post.content.hero_image} alt={post.content.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <span className="text-purple-600 font-semibold text-xs">{post.content.category}</span>
                      <h3 className="font-bold text-gray-900 mt-1 mb-2 line-clamp-2">{post.content.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{post.content.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Story</h2>
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-full">
                    <img
                      src={featuredPost.content.hero_image}
                      alt={featuredPost.content.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <span className="text-blue-600 font-semibold text-sm">{featuredPost.content.category}</span>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2 mb-3">{featuredPost.content.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{featuredPost.content.excerpt}</p>
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={featuredPost.content.author_avatar}
                        alt={featuredPost.content.author}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{featuredPost.content.author}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(featuredPost.content.published_date).toLocaleDateString()} · {featuredPost.content.reading_time} min read
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {featuredPost.content.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.filter(p => !p.content.featured).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1 h-full">
                <div className="relative h-48">
                  <img
                    src={post.content.hero_image}
                    alt={post.content.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-blue-600 font-semibold text-sm">{post.content.category}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2">{post.content.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.content.excerpt}</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={post.content.author_avatar}
                      alt={post.content.author}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{post.content.author}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(post.content.published_date).toLocaleDateString()} · {post.content.reading_time} min
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No stories found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
