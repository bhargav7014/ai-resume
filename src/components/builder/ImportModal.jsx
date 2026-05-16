import React, { useState, useRef } from 'react';
import { extractTextFromFile } from '../../utils/fileExtractor';

const ImportModal = ({ isOpen, onClose, onImport, isLoading }) => {
  const [text, setText] = useState('');
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsProcessingFile(true);
    try {
      const extractedText = await extractTextFromFile(file);
      setText(extractedText);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsProcessingFile(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    setIsProcessingFile(true);
    try {
      const extractedText = await extractTextFromFile(file);
      setText(extractedText);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsProcessingFile(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-950 border border-zinc-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Magic Import</h2>
              <p className="text-zinc-500 text-sm mt-1">Upload a file or paste your resume text.</p>
            </div>
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="mb-6 group"
          >
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group-hover:border-emerald-500/30"
            >
              <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-400 group-hover:text-emerald-500 transition-colors">
                {isProcessingFile ? (
                  <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                )}
              </div>
              <div className="text-center">
                <p className="text-zinc-300 font-bold">Click to upload or drag & drop</p>
                <p className="text-zinc-500 text-xs mt-1">PDF, DOCX, or TXT (Max 5MB)</p>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept=".pdf,.docx,.txt" 
                className="hidden" 
              />
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-zinc-950 px-3 text-zinc-600 font-black tracking-widest">OR PASTE TEXT</span></div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your resume content here..."
            className="w-full h-48 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-zinc-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all resize-none mb-6"
          ></textarea>

          <div className="flex gap-4">
            <button 
              onClick={() => onImport(text)}
              disabled={isLoading || !text.trim()}
              className={`flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  AI Parsing...
                </>
              ) : (
                <>
                  <span className="text-xl">🪄</span>
                  Magic Build
                </>
              )}
            </button>
            <button 
              onClick={onClose}
              className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-black rounded-xl transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
