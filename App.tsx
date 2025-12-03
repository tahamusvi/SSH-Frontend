import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SoftwareCard } from './components/SoftwareCard';
import { SoftwareDetail } from './pages/SoftwareDetail';
import { Page, Category, SoftwareSummary } from './types';
import { Filter, Layers, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { apiService } from './services/apiService';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedSoftwareSlug, setSelectedSoftwareSlug] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Data States
  const [categories, setCategories] = useState<Category[]>([]);
  const [softwareList, setSoftwareList] = useState<SoftwareSummary[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | 'All'>('All');
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Dark Mode Logic
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Initial Data Fetch
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const [cats, softs] = await Promise.all([
          apiService.getCategories(),
          apiService.getSoftwareList()
        ]);
        setCategories(cats);
        setSoftwareList(softs.results || []);
      } catch (error) {
        console.error("Failed to load initial data", error);
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchData();
  }, []);

  const handleSoftwareClick = (slug: string) => {
    setSelectedSoftwareSlug(slug);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentPage('home');
    setSelectedSoftwareSlug(null);
  };

  const filteredSoftware = useMemo(() => {
    return softwareList.filter(software => {
      const matchesSearch = software.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            software.short_description.includes(searchTerm);
      
      // Note: The list API returns category as a string title (e.g., "برنامه‌نویسی")
      // But our local state selectedCategoryId is an ID. We need to find the category title.
      let matchesCategory = true;
      if (selectedCategoryId !== 'All') {
        const selectedCatTitle = categories.find(c => c.id === selectedCategoryId)?.title;
        if (selectedCatTitle) {
           matchesCategory = software.category === selectedCatTitle;
        }
      }
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategoryId, softwareList, categories]);

  return (
    <div className="min-h-screen font-sans text-right pb-20 relative overflow-hidden transition-colors duration-500">
      
      {/* Glassmorphism Background Elements */}
      <div className="fixed inset-0 -z-10 transition-colors duration-500 bg-gray-50 dark:bg-gray-950">
        {/* Gradients/Blobs - Adjusted for IUST Teal Theme */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-400/20 dark:bg-teal-900/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-blue-400/20 dark:bg-blue-900/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-sky-400/20 dark:bg-sky-900/10 rounded-full blur-[120px]"></div>
      </div>

      <Navbar 
        onSearch={setSearchTerm} 
        goHome={handleBack}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-350px)]">
        {currentPage === 'home' ? (
          <div className="animate-in fade-in duration-500">
            {/* Hero / Intro */}
            <div className="mb-12 text-center space-y-6 pt-8">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-800 dark:text-white tracking-tight leading-tight drop-shadow-sm">
                Senfi Software Hub <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 mt-2 inline-block">دانشگاه علم و صنعت ایران</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium leading-8">
                دسترسی آسان، سریع و رایگان دانشجویان و اساتید به آرشیو جامع نرم‌افزارهای مهندسی و علمی مورد تایید مرکز کامپیوتر.
              </p>
            </div>

            {/* Filters */}
            <div className="mb-10 flex justify-center">
               <div className="inline-flex gap-2 p-2 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-lg overflow-x-auto max-w-full scrollbar-hide">
                 <button
                   onClick={() => setSelectedCategoryId('All')}
                   className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                     selectedCategoryId === 'All' 
                       ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30' 
                       : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                   }`}
                 >
                   <Layers className="w-4 h-4" />
                   همه
                 </button>
                 {categories.map((cat) => (
                   <button
                     key={cat.id}
                     onClick={() => setSelectedCategoryId(cat.id)}
                     className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                       selectedCategoryId === cat.id 
                         ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30' 
                         : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                     }`}
                   >
                     {cat.title}
                   </button>
                 ))}
               </div>
            </div>

            {/* Grid */}
            {isLoadingData ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-teal-600 dark:text-teal-400" />
              </div>
            ) : filteredSoftware.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredSoftware.map(software => (
                  <SoftwareCard 
                    key={software.id} 
                    software={software} 
                    onClick={handleSoftwareClick} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-3xl border border-white/40 dark:border-gray-700/40">
                <div className="bg-gray-200/50 dark:bg-gray-700/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-10 h-10 text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200">نتیجه‌ای یافت نشد</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">لطفا عبارت جستجو یا دسته‌بندی را تغییر دهید.</p>
              </div>
            )}
          </div>
        ) : (
          selectedSoftwareSlug && (
            <SoftwareDetail 
              slug={selectedSoftwareSlug} 
              onBack={handleBack} 
            />
          )
        )}
      </main>

      {/* Expanded IUST Footer */}
      <footer className="relative bg-white/50 dark:bg-gray-900/60 backdrop-blur-2xl border-t border-white/30 dark:border-gray-800/50 mt-20 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            
            {/* Column 1: About */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/IUST-University-Logo.png" 
                  alt="IUST Logo" 
                  className="h-12 w-auto object-contain dark:brightness-0 dark:invert transition-all opacity-90"
                />
                <h3 className="font-black text-gray-900 dark:text-white text-lg">دانشگاه علم و صنعت</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-7 text-justify">
                سامانه متمرکز دانلود نرم‌افزارهای دانشگاهی با هدف تسهیل دسترسی دانشجویان و اساتید به ابزارهای مورد نیاز آموزشی و پژوهشی توسط مرکز فناوری اطلاعات راه‌اندازی شده است.
              </p>
            </div>

            {/* Column 2: Links */}
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-6">دسترسی سریع</h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>سیستم گلستان</a></li>
                <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>سامانه LMS</a></li>
                <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>اتوماسیون اداری</a></li>
                <li><a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>کتابخانه مرکزی</a></li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-6">تماس با مرکز کامپیوتر</h4>
              <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400 mt-0.5 flex-shrink-0" />
                  <span>تهران، میدان رسالت، خیابان هنگام، دانشگاه علم و صنعت ایران، ساختمان مرکز کامپیوتر</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                  <span dir="ltr">021 - 77240540</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                  <span>support@iust.ac.ir</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-500 font-medium">
              © ۱۴۰۳ کلیه حقوق این وب‌سایت متعلق به دانشگاه علم و صنعت ایران می‌باشد.
            </p>
            <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-500">
              <a href="#" className="hover:text-gray-800 dark:hover:text-gray-300 transition-colors">قوانین و مقررات</a>
              <a href="#" className="hover:text-gray-800 dark:hover:text-gray-300 transition-colors">حریم خصوصی</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;