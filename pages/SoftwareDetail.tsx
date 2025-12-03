
import React, { useState, useEffect } from 'react';
import { SoftwareDetail as SoftwareDetailType } from '../types';
import { Download, Calendar, HardDrive, ShieldCheck, ArrowRight, Share2, Info, Loader2, CheckCircle2 } from 'lucide-react';
import { AIAssistant } from '../components/AIAssistant';
import { apiService, getImageUrl } from '../services/apiService';

interface SoftwareDetailProps {
  slug: string;
  onBack: () => void;
}

export const SoftwareDetail: React.FC<SoftwareDetailProps> = ({ slug, onBack }) => {
  const [activeTab, setActiveTab] = useState<'description' | 'versions' | 'guide'>('versions');
  const [software, setSoftware] = useState<SoftwareDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      const data = await apiService.getSoftwareDetail(slug);
      setSoftware(data);
      setLoading(false);
    };
    fetchDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-teal-600 dark:text-teal-400" />
      </div>
    );
  }

  if (!software) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">نرم‌افزار یافت نشد</h2>
        <button onClick={onBack} className="mt-4 text-blue-600 hover:underline">بازگشت به صفحه اصلی</button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      {/* Breadcrumb / Back */}
      <div className="mb-6">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-bold bg-white/30 dark:bg-gray-800/30 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
        >
          <ArrowRight className="w-5 h-5 ml-2" />
          بازگشت به لیست
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Header Card */}
          <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-xl border border-white/50 dark:border-gray-700/50 flex flex-col sm:flex-row items-start sm:items-center gap-8 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-3xl -z-10"></div>

            <div className="w-28 h-28 sm:w-36 sm:h-36 bg-white/60 dark:bg-gray-700/60 rounded-3xl flex-shrink-0 overflow-hidden border border-white/60 dark:border-gray-600 shadow-lg p-2">
              <img 
                src={getImageUrl(software.cover_image)} 
                alt={software.title} 
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Img'; }}
              />
            </div>
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">{software.title}</h1>
                <button className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 p-2.5 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors border border-transparent hover:border-white/40">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-5 text-lg font-medium leading-relaxed">{software.description.substring(0, 150)}...</p>
              <div className="flex flex-wrap gap-2">
                {software.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-white/50 dark:bg-gray-700/50 border border-white/40 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-bold">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs & Content */}
          <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-[2rem] shadow-xl border border-white/50 dark:border-gray-700/50 overflow-hidden min-h-[400px] transition-colors">
            <div className="flex border-b border-gray-200/50 dark:border-gray-700/50 bg-white/20 dark:bg-gray-900/20">
              <button 
                onClick={() => setActiveTab('versions')}
                className={`flex-1 py-5 text-center font-bold text-sm sm:text-base transition-all relative ${activeTab === 'versions' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
              >
                لینک‌های دانلود
                {activeTab === 'versions' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-400 rounded-t-full mx-6 shadow-[0_-2px_10px_rgba(37,99,235,0.5)]"></div>}
              </button>
              <button 
                onClick={() => setActiveTab('description')}
                className={`flex-1 py-5 text-center font-bold text-sm sm:text-base transition-all relative ${activeTab === 'description' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
              >
                توضیحات کامل
                {activeTab === 'description' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-400 rounded-t-full mx-6 shadow-[0_-2px_10px_rgba(37,99,235,0.5)]"></div>}
              </button>
              <button 
                onClick={() => setActiveTab('guide')}
                className={`flex-1 py-5 text-center font-bold text-sm sm:text-base transition-all relative ${activeTab === 'guide' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
              >
                راهنمای نصب
                {activeTab === 'guide' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-400 rounded-t-full mx-6 shadow-[0_-2px_10px_rgba(37,99,235,0.5)]"></div>}
              </button>
            </div>

            <div className="p-8">
              {activeTab === 'versions' && (
                <div className="space-y-6">
                  {software.releases.map((release) => (
                    <div key={release.id} className="flex flex-col p-5 rounded-2xl border border-white/60 dark:border-gray-600/50 shadow-sm bg-white/50 dark:bg-gray-800/50">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                         <div className="flex items-center gap-3">
                           <span className="font-black text-gray-800 dark:text-white text-lg">{release.version}</span>
                           <span className="bg-gray-200/60 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded-lg border border-gray-300/50 dark:border-gray-600/50 backdrop-blur-sm">
                             {release.platform}
                           </span>
                         </div>
                         <div className="text-sm text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>آخرین بروزرسانی: {new Date(software.updated_at).toLocaleDateString('fa-IR')}</span>
                         </div>
                      </div>

                      <div className="space-y-3">
                        {release.parts.map((part, pIdx) => (
                           <div key={pIdx} className="flex flex-col sm:flex-row items-center justify-between p-3 rounded-xl bg-white/40 dark:bg-gray-900/40 border border-white/40 dark:border-gray-700/40 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                              <div className="flex items-center gap-3 mb-2 sm:mb-0">
                                 <span className="bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded-md">
                                   پارت {part.part_number}
                                 </span>
                                 <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                   <HardDrive className="w-3.5 h-3.5" />
                                   {part.file_size}
                                 </span>
                              </div>
                              <a 
                                href={part.download_url}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-md hover:shadow-teal-500/30 transition-all active:scale-95"
                              >
                                <Download className="w-4 h-4" />
                                دانلود فایل
                              </a>
                           </div>
                        ))}
                      </div>
                      
                      {release.specific_install_guide && (
                        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 bg-yellow-50/50 dark:bg-yellow-900/10 p-3 rounded-lg border border-yellow-200/50 dark:border-yellow-800/20">
                           <span className="font-bold text-yellow-700 dark:text-yellow-500 block mb-1">نکته نصب این نسخه:</span>
                           {release.specific_install_guide}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {software.releases.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                      هیچ نسخه دانلودی برای این نرم‌افزار یافت نشد.
                    </div>
                  )}

                  <div className="mt-8 p-5 bg-yellow-100/40 dark:bg-yellow-900/20 rounded-2xl flex gap-3 text-yellow-800 dark:text-yellow-400 text-sm font-medium border border-yellow-200/50 dark:border-yellow-800/30 backdrop-blur-sm">
                    <Info className="w-5 h-5 flex-shrink-0" />
                    <p>در صورت خرابی لینک‌ها، لطفا از طریق بخش نظرات یا دستیار هوشمند به ما اطلاع دهید.</p>
                  </div>
                </div>
              )}

              {activeTab === 'description' && (
                <div className="prose prose-lg prose-blue dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-8 text-justify">
                  <p>{software.description}</p>
                  
                  {software.features && software.features.length > 0 && (
                    <>
                      <h4 className="font-black text-gray-900 dark:text-white mt-8 mb-4">ویژگی‌های کلیدی:</h4>
                      <ul className="list-none space-y-2 pr-0">
                         {software.features.map((feature, idx) => (
                           <li key={idx} className="flex items-center gap-2 bg-white/40 dark:bg-gray-700/30 p-3 rounded-xl border border-white/30 dark:border-gray-700">
                              <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                              {feature.text}
                           </li>
                         ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
              
              {activeTab === 'guide' && (
                 <div className="space-y-6">
                    <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 dark:text-gray-400">
                        <div className="bg-gray-100/50 dark:bg-gray-700/50 p-6 rounded-full mb-6">
                           <ShieldCheck className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">راهنمای نصب</h3>
                        <p className="max-w-2xl mx-auto mb-8 font-medium leading-loose text-justify bg-white/30 dark:bg-gray-800/30 p-6 rounded-2xl border border-white/40 dark:border-gray-700/40">
                          {software.installation_guide || "راهنمای نصب اختصاصی برای این نرم‌افزار ثبت نشده است. معمولاً کافیست فایل را از حالت فشرده خارج کرده و فایل Setup را اجرا کنید."}
                        </p>
                    </div>
                 </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-white/50 dark:border-gray-700/50 transition-colors">
            <h3 className="font-black text-gray-900 dark:text-white mb-6 border-b border-gray-200/50 dark:border-gray-700/50 pb-4 text-lg">اطلاعات فنی</h3>
            <div className="space-y-5 text-sm font-medium">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400">سازنده</span>
                <span className="text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-gray-700/50 px-3 py-1 rounded-lg">{software.developer}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400">دسته بندی</span>
                <span className="text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-gray-700/50 px-3 py-1 rounded-lg">{software.category.title}</span>
              </div>
               <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400">تعداد دانلود</span>
                <span className="text-gray-800 dark:text-gray-200 bg-white/50 dark:bg-gray-700/50 px-3 py-1 rounded-lg">{software.download_count.toLocaleString()}</span>
              </div>
               <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400">امتیاز کاربران</span>
                <div className="flex items-center bg-yellow-100/50 dark:bg-yellow-900/30 px-3 py-1 rounded-lg border border-yellow-200/50">
                   <span className="text-yellow-500 mr-1.5">★</span>
                   <span className="text-yellow-700 dark:text-yellow-400 font-bold">{software.rating}</span>
                </div>
              </div>
            </div>
          </div>
          
           <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 shadow-2xl shadow-blue-500/20 text-white border border-blue-400/30">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10">
              <h3 className="font-black text-xl mb-3">دانشجوی گرامی</h3>
              <p className="text-blue-100 text-sm mb-6 leading-7 font-medium">
                تمامی نرم‌افزارهای قرار گرفته در این سایت تست شده و سالم هستند.
              </p>
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold py-3 rounded-xl transition-all border border-white/20">
                گزارش خرابی
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Inject Context to AI */}
      <AIAssistant context={`User is viewing the software "${software.title}". Description: ${software.description}.`} />
    </div>
  );
};
