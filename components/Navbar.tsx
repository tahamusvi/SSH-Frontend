import React from 'react';
import { Menu, Search, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onSearch: (term: string) => void;
  goHome: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, goHome, isDarkMode, toggleDarkMode }) => {
  return (
    <nav className="sticky top-4 mx-4 sm:mx-8 md:mx-16 z-50 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 shadow-lg shadow-black/5 transition-all duration-300">
      <div className="px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group gap-3" onClick={goHome}>
            <div className="transition-transform duration-300 group-hover:scale-105">
              <img 
                src="/IUST-University-Logo.png" 
                alt="SSH Senfi Software Hub" 
                className="h-12 w-auto object-contain dark:brightness-0 dark:invert transition-all duration-300 opacity-90 group-hover:opacity-100" 
              />
            </div>
            <div className="flex flex-col">
               <span className="text-lg font-black text-gray-800 dark:text-white tracking-tight leading-none group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">SSH Senfi Software Hub</span>
               <span className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-1">دانشگاه علم و صنعت ایران</span>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative group">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-iust dark:group-focus-within:text-iust transition-colors" />
            </div>
            <input
              type="text"
              placeholder="جستجو در نرم‌افزارهای دانشگاه..."
              onChange={(e) => onSearch(e.target.value)}
              className="block w-full pr-10 pl-3 py-2.5 border border-gray-200/50 dark:border-gray-700/50 rounded-xl leading-5 bg-gray-100/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-iust/50 focus:border-iust/50 sm:text-sm transition-all shadow-inner"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 bg-gray-100/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 transition-all focus:outline-none active:scale-95 border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Mobile Menu Button (No Auth) */}
            <div className="flex items-center md:hidden">
              <button className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};