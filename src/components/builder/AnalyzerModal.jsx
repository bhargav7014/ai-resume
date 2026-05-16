import React from 'react';

const AnalyzerModal = ({ isOpen, onClose, analysis }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            ATS Job Fit Analysis 🎯
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 border-gray-700 relative">
              <span className={`text-3xl font-bold ${analysis.score > 70 ? 'text-green-500' : analysis.score > 40 ? 'text-yellow-500' : 'text-red-500'}`}>
                {analysis.score}
              </span>
              <span className="text-xs text-gray-400 absolute -bottom-6">ATS SCORE</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-white mb-4">Actionable Feedback</h3>
          <ul className="space-y-3">
            {analysis.feedback.map((item, index) => (
              <li key={index} className="flex gap-3 text-gray-300 bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
                <span className="text-green-500 font-bold">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 border-t border-gray-700 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-all"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyzerModal;
