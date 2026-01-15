

import React, { useState, useEffect } from 'react';
import { Lock, ExternalLink, Zap, Key } from 'lucide-react';

interface ApiKeyGateProps {
  onKeySelected: (key: string) => void;
}

export const ApiKeyGate: React.FC<ApiKeyGateProps> = ({ onKeySelected }) => {
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState('');

  // Auto-load from session storage for convenience on refresh
  useEffect(() => {
    const savedKey = sessionStorage.getItem('gemini_api_key');
    if (savedKey) {
      onKeySelected(savedKey);
    }
  }, [onKeySelected]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) {
      setError('API 키를 입력해주세요.');
      return;
    }
    if (!inputKey.startsWith('AIza')) {
      setError('올바른 Google API 키 형식이 아닌 것 같습니다 (AIza로 시작해야 합니다).');
      return;
    }
    
    // Save to session storage
    sessionStorage.setItem('gemini_api_key', inputKey.trim());
    onKeySelected(inputKey.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black p-6">
      <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-banana-500/10 rounded-full border border-banana-500/20">
            <Zap className="w-10 h-10 text-banana-500" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Nano Banana Pro
        </h1>
        <p className="text-center text-slate-400 mb-8 text-sm">
          Gemini 3 Pro Image 생성 기능을 사용하려면<br/>본인의 Google API 키가 필요합니다.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
              Google Gemini API Key
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="password"
                value={inputKey}
                onChange={(e) => {
                  setInputKey(e.target.value);
                  setError('');
                }}
                placeholder="AIza..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-slate-200 placeholder-slate-600 focus:ring-2 focus:ring-banana-500/50 focus:border-banana-500 outline-none transition-all"
              />
            </div>
            {error && <p className="text-red-400 text-xs ml-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-banana-500 to-banana-600 hover:from-banana-400 hover:to-banana-500 text-slate-950 font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-banana-500/20 flex items-center justify-center gap-2"
          >
            <Lock className="w-5 h-5" />
            시작하기
          </button>
          
          <div className="text-xs text-center text-slate-500 mt-6 space-y-2">
            <p className="mb-2">
              이 키는 브라우저에만 저장되며 서버로 전송되지 않습니다.
            </p>
            <div className="flex flex-col gap-1 items-center">
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-banana-500 hover:text-banana-400 transition-colors"
              >
                API 키 발급받기 <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-400 transition-colors"
              >
                결제 관련 안내 <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
