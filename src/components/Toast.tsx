import React from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', isVisible }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-full bg-[#061A34] text-white text-sm font-medium shadow-2xl flex items-center gap-2 z-50 pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 border border-[#D4AF37]/30"
      role="status"
    >
      {type === 'success' && <CheckCircle className="w-4 h-4 text-[#10B981]" />}
      {type === 'error' && <AlertCircle className="w-4 h-4 text-[#BE123C]" />}
      {type === 'info' && <Info className="w-4 h-4 text-[#D1AC5B]" />}
      <span>{message}</span>
    </div>
  );
};
