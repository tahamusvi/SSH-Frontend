
import React from 'react';
import { Download, Star, ChevronLeft } from 'lucide-react';
import { SoftwareSummary } from '../types';
import { getImageUrl } from '../services/apiService';

interface SoftwareCardProps {
  software: SoftwareSummary;
  onClick: (slug: string) => void;
}

export const SoftwareCard: React.FC<SoftwareCardProps> = ({ software, onClick }) => {
  return (
    <div 
      onClick={() => onClick(software.slug)}
      className="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-black/40 transition-all duration-300 cursor-pointer group flex flex-col h-full overflow-hidden hover:-translate-y-1"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <div className="p-6 flex flex-col flex-grow relative z-10">
        <div className="flex justify-between items-start mb-5">
          <div className="bg-white/80 dark:bg-gray-700/80 p-3 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
            <img 
              src={getImageUrl(software.cover_image)} 
              alt={software.title} 
              className="w-14 h-14 object-cover rounded-xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Img';
              }} 
            />
          </div>
          <div className="flex items-center bg-yellow-400/20 dark:bg-yellow-900/40 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-yellow-400/20">
            <Star className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400 fill-yellow-600 dark:fill-yellow-400 ml-1.5" />
            <span className="text-xs font-black text-yellow-700 dark:text-yellow-400 pt-0.5">{software.rating}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-black text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {software.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-6 flex-grow leading-relaxed font-medium">
          {software.short_description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="px-2.5 py-1 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
            {software.category}
          </span>
          <span className="px-2.5 py-1 text-xs font-bold text-gray-600 dark:text-gray-400 bg-gray-200/50 dark:bg-gray-700/50 rounded-lg border border-gray-200/50 dark:border-gray-600/50">
            {software.latest_version}
          </span>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-white/30 dark:bg-gray-900/30 border-t border-white/40 dark:border-gray-700/40 flex justify-between items-center group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/20 transition-colors relative z-10">
        <div className="flex items-center text-xs font-bold text-gray-500 dark:text-gray-400">
          <Download className="w-4 h-4 ml-1.5" />
          {software.download_count.toLocaleString()} دانلود
        </div>
        <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-black">
          مشاهده
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
