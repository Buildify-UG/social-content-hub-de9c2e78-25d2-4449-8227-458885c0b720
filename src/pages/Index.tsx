import React, { useState } from 'react';
import { MessageCircle, Bell, Film, Globe, Plus, Heart, MessageSquare, Share2, Search } from 'lucide-react';

interface Post {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  author: string;
  avatar: string;
  isLiked?: boolean;
}

const samplePosts: Post[] = [
  {
    id: '1',
    category: 'Fashion',
    title: 'Summer Trends 2024',
    description: 'The hottest summer fashion styles everyone is wearing right now',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=500&fit=crop',
    likes: 2340,
    comments: 156,
    shares: 89,
    author: 'Fashion Hub',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop',
  },
  {
    id: '2',
    category: 'Sports',
    title: 'Epic Basketball Highlights',
    description: 'Incredible dunks and plays from this week\'s championship games',
    image: 'https://images.unsplash.com/photo-1546519638-68711109d298?w=400&h=500&fit=crop',
    likes: 5120,
    comments: 342,
    shares: 234,
    author: 'Sports Central',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
  },
  {
    id: '3',
    category: 'Cooking',
    title: 'Easy 15-Minute Pasta',
    description: 'Quick and delicious pasta recipe for busy weeknights',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=500&fit=crop',
    likes: 3450,
    comments: 234,
    shares: 156,
    author: 'Chef Mike',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop',
  },
  {
    id: '4',
    category: 'Entertainment',
    title: 'New Music Video Release',
    description: 'Check out the latest viral music video everyone is talking about',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=500&fit=crop',
    likes: 7890,
    comments: 512,
    shares: 445,
    author: 'Music Vibes',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
  },
  {
    id: '5',
    category: 'Fitness',
    title: 'Home Calisthenics Workout',
    description: 'Amazing bodyweight exercises you can do anywhere',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop',
    likes: 4200,
    comments: 298,
    shares: 187,
    author: 'Fitness Pro',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
  },
];

const categories = ['All', 'Fashion', 'Sports', 'Cooking', 'Entertainment', 'Fitness', 'Music', 'Movies', 'Dance'];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<'post' | 'reel' | 'music' | null>(null);

  const toggleLike = (postId: string) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };

  const filteredPosts = selectedCategory === 'All' 
    ? samplePosts 
    : samplePosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-screen-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Viral Hub
            </h1>
          </div>
          
          {/* Search Bar - Hidden on very small screens */}
          <div className="hidden sm:flex flex-1 mx-4">
            <div className="w-full bg-secondary rounded-full px-4 py-2 flex items-center gap-2">
              <Search size={18} className="text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search posts..." 
                className="bg-transparent outline-none flex-1 text-sm"
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-secondary rounded-full transition" title="Chat">
              <MessageCircle size={20} />
            </button>
            <button className="p-2 hover:bg-secondary rounded-full transition relative" title="Notifications">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-secondary rounded-full transition" title="Reels">
              <Film size={20} />
            </button>
            <button className="p-2 hover:bg-secondary rounded-full transition" title="Worldwide News">
              <Globe size={20} />
            </button>
            <button 
              onClick={() => setShowCreateModal(!showCreateModal)}
              className="p-2 hover:bg-secondary rounded-full transition bg-green-500 hover:bg-green-600"
              title="Create"
            >
              <Plus size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="overflow-x-auto border-t border-border">
          <div className="max-w-screen-lg mx-auto px-4 py-2 flex gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-end sm:items-center justify-center">
          <div className="bg-background rounded-t-2xl sm:rounded-2xl w-full sm:w-96 p-6 space-y-4 max-h-96">
            <h2 className="text-xl font-bold">Create Content</h2>
            
            <button
              onClick={() => setCreateType('post')}
              className="w-full p-4 bg-secondary hover:bg-secondary/80 rounded-lg text-left font-medium transition"
            >
              📸 New Post
            </button>
            
            <button
              onClick={() => setCreateType('reel')}
              className="w-full p-4 bg-secondary hover:bg-secondary/80 rounded-lg text-left font-medium transition"
            >
              🎬 Create Reel (with VFX Green Screen)
            </button>
            
            <button
              onClick={() => setCreateType('music')}
              className="w-full p-4 bg-secondary hover:bg-secondary/80 rounded-lg text-left font-medium transition"
            >
              🎵 Music Studio (Auto-tune, Karaoke, Voice Effects)
            </button>

            <button
              onClick={() => setShowCreateModal(false)}
              className="w-full p-3 bg-destructive text-destructive-foreground rounded-lg font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Feature Sections (Placeholder) */}
      {createType === 'reel' && (
        <div className="max-w-screen-lg mx-auto px-4 py-8 bg-secondary/30 rounded-lg my-4 border border-border">
          <h3 className="text-lg font-bold mb-2">🎥 Reel Creator with VFX</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Describe your custom background: "Beach sunset with palm trees", "Neon cyberpunk city", etc.
          </p>
          <textarea 
            placeholder="Describe your VFX background..."
            className="w-full p-3 bg-background rounded-lg border border-border text-foreground placeholder-muted-foreground"
            rows={3}
          />
          <button className="mt-3 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium">
            Start Recording
          </button>
        </div>
      )}

      {createType === 'music' && (
        <div className="max-w-screen-lg mx-auto px-4 py-8 bg-secondary/30 rounded-lg my-4 border border-border">
          <h3 className="text-lg font-bold mb-4">🎵 Live Music Studio</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button className="p-3 bg-background rounded-lg border border-border hover:border-primary transition font-medium">
              🎤 Voice Enhancer
            </button>
            <button className="p-3 bg-background rounded-lg border border-border hover:border-primary transition font-medium">
              🎛️ Auto-Tune
            </button>
            <button className="p-3 bg-background rounded-lg border border-border hover:border-primary transition font-medium">
              🎹 Instruments
            </button>
            <button className="p-3 bg-background rounded-lg border border-border hover:border-primary transition font-medium">
              📝 Karaoke Mode
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            ✓ Use artist sounds • ✓ Karaoke lyrics (hidden from viewers) • ✓ VFX backgrounds
          </p>
        </div>
      )}

      {/* Main Feed */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts in this category yet</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <article key={post.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition">
              {/* Post Header */}
              <div className="p-4 flex items-center gap-3 border-b border-border">
                <img 
                  src={post.avatar} 
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{post.author}</p>
                  <p className="text-xs text-muted-foreground">{post.category}</p>
                </div>
              </div>

              {/* Post Image */}
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-64 object-cover"
              />

              {/* Post Content */}
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-lg">{post.title}</h3>
                <p className="text-sm text-muted-foreground">{post.description}</p>
              </div>

              {/* Engagement Stats */}
              <div className="px-4 py-2 text-xs text-muted-foreground border-t border-b border-border flex justify-between">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
                <span>{post.shares} shares</span>
              </div>

              {/* Action Buttons */}
              <div className="p-3 flex justify-around">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium text-sm ${
                    likedPosts.has(post.id)
                      ? 'text-red-500 bg-red-500/10'
                      : 'text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  <Heart size={18} fill={likedPosts.has(post.id) ? 'currentColor' : 'none'} />
                  Like
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary transition font-medium text-sm">
                  <MessageSquare size={18} />
                  Comment
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-secondary transition font-medium text-sm">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Footer - What's Next Section */}
      <div className="max-w-2xl mx-auto px-4 py-12 text-center text-sm text-muted-foreground border-t border-border mt-8">
        <p className="font-semibold mb-3">🚀 What's Next?</p>
        <ul className="space-y-2 text-left bg-secondary/30 rounded-lg p-4 inline-block">
          <li>• Full VFX green screen recording with AI background generation</li>
          <li>• Music studio with real-time auto-tune and instrument library</li>
          <li>• Karaoke mode with hidden lyrics for creators</li>
          <li>• User authentication and profile pages</li>
          <li>• Real-time chat and notifications</li>
          <li>• Video upload and streaming infrastructure</li>
          <li>• Trending algorithm and recommendation system</li>
          <li>• Creator monetization and analytics dashboard</li>
        </ul>
      </div>
    </div>
  );
}
