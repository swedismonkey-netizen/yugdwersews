/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, ExternalLink, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => {
              setSelectedGame(null);
              setSearchQuery('');
            }}
          >
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <Gamepad2 className="text-black w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">
              UNBLOCKED<span className="text-emerald-500">HUB</span>
            </h1>
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all placeholder:text-zinc-600"
            />
          </div>

          <div className="flex items-center gap-4 text-sm font-medium text-zinc-400">
            <button className="hover:text-white transition-colors hidden md:block">Categories</button>
            <button className="hover:text-white transition-colors hidden md:block">New</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {selectedGame ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="p-2 hover:bg-zinc-900 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold">{selectedGame.title}</h2>
                  <p className="text-zinc-500 text-sm">{selectedGame.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleFullScreen}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors text-sm"
                >
                  <Maximize2 className="w-4 h-4" />
                  {isFullScreen ? 'Exit Full' : 'Full Screen'}
                </button>
                <a 
                  href={selectedGame.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg transition-colors text-sm font-bold"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Direct
                </a>
              </div>
            </div>

            <div className={`relative bg-black rounded-2xl overflow-hidden border border-white/5 shadow-2xl ${isFullScreen ? 'fixed inset-0 z-50 rounded-none' : 'aspect-video w-full'}`}>
              {isFullScreen && (
                <button 
                  onClick={toggleFullScreen}
                  className="absolute top-4 right-4 z-[60] p-2 bg-black/50 hover:bg-black backdrop-blur-md rounded-full text-white transition-all border border-white/10"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
              <iframe
                src={selectedGame.url}
                className="w-full h-full border-none"
                title={selectedGame.title}
                allow="autoplay; fullscreen; keyboard"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="bg-zinc-900/30 p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 mb-4 text-emerald-500">
                  <Info className="w-5 h-5" />
                  <h3 className="font-bold">How to Play</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Use your keyboard or mouse depending on the game. Most games use Arrow Keys or WASD for movement. If the game doesn't respond, click inside the frame to focus it.
                </p>
              </div>
              <div className="bg-zinc-900/30 p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 mb-4 text-emerald-500">
                  <Gamepad2 className="w-5 h-5" />
                  <h3 className="font-bold">Game Info</h3>
                </div>
                <ul className="text-zinc-400 text-sm space-y-2">
                  <li><span className="text-zinc-500">Category:</span> Web Games</li>
                  <li><span className="text-zinc-500">Platform:</span> Browser</li>
                  <li><span className="text-zinc-500">Status:</span> Unblocked</li>
                </ul>
              </div>
              <div className="bg-zinc-900/30 p-6 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 mb-4 text-emerald-500">
                  <Maximize2 className="w-5 h-5" />
                  <h3 className="font-bold">Optimization</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  For the best experience, use Full Screen mode. This hides browser distractions and provides more space for gameplay.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <header className="text-center py-12 space-y-4">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-6xl font-black tracking-tighter"
              >
                PLAY WITHOUT <span className="text-emerald-500">LIMITS</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-zinc-500 max-w-2xl mx-auto"
              >
                The ultimate collection of unblocked web games. No downloads, no installs, just pure gaming directly in your browser.
              </motion.p>
            </header>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              <AnimatePresence mode="popLayout">
                {filteredGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedGame(game)}
                    className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 cursor-pointer hover:border-emerald-500/50 transition-all hover:shadow-2xl hover:shadow-emerald-500/10"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={game.thumbnail} 
                        alt={game.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg group-hover:text-emerald-500 transition-colors">{game.title}</h3>
                      <p className="text-zinc-500 text-xs line-clamp-1">{game.description}</p>
                    </div>
                    <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center py-20">
                <p className="text-zinc-500 text-lg">No games found matching "{searchQuery}"</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-emerald-500 hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-white/5 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50">
            <Gamepad2 className="w-5 h-5" />
            <span className="font-bold text-sm tracking-widest">UNBLOCKED HUB</span>
          </div>
          <div className="flex gap-8 text-zinc-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">DMCA</a>
          </div>
          <p className="text-zinc-600 text-xs">
            © 2026 Unblocked Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
