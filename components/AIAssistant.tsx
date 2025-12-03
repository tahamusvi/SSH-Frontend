import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { askAiAssistant } from '../services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  context?: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'سلام! من دستیار هوشمند SSH هستم. چطور می‌تونم کمکت کنم؟' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await askAiAssistant(userMsg, context);

    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 left-8 bg-white/20 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-gray-600/50 text-blue-600 dark:text-blue-400 p-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 hover:bg-white/40 dark:hover:bg-black/60 transition-all z-40 group ${isOpen ? 'hidden' : 'flex'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 rounded-full blur-md group-hover:opacity-40 transition-opacity"></div>
        <Sparkles className="w-6 h-6 animate-pulse relative z-10" />
        <span className="mr-3 font-bold hidden md:inline relative z-10">دستیار هوشمند</span>
      </button>

      {/* Modal / Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 left-8 w-[90vw] md:w-96 h-[550px] bg-white/70 dark:bg-gray-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 transition-colors">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-md p-4 flex justify-between items-center text-white border-b border-white/10">
            <div className="flex items-center">
              <div className="bg-white/20 p-1.5 rounded-lg mr-2">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                 <h3 className="font-bold text-sm">دستیار هوشمند</h3>
                 <p className="text-xs text-blue-100 opacity-80">همیشه آنلاین</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1.5 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-bl-none' 
                    : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-gray-100 border border-white/40 dark:border-gray-700/50 rounded-br-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/40 dark:border-gray-700/50 rounded-2xl rounded-br-none px-5 py-3 shadow-sm">
                  <Loader2 className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-t border-white/40 dark:border-gray-700/40 flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="سوالی دارید؟..."
              className="flex-1 bg-white/60 dark:bg-gray-800/60 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-200/50 dark:border-gray-700/50 transition-all shadow-inner"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !query.trim()}
              className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              <Send className="w-5 h-5 rotate-180" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};