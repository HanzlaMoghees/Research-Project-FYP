import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  const getIcon = () => {
    switch (toastMessage.type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-indigo-600 shrink-0" />;
    }
  };

  const getBorderColor = () => {
    switch (toastMessage.type) {
      case 'success':
        return 'border-emerald-200 bg-emerald-50/90 text-emerald-950';
      case 'warning':
        return 'border-amber-200 bg-amber-50/90 text-amber-950';
      default:
        return 'border-indigo-200 bg-indigo-50/90 text-indigo-950';
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className={`flex items-start gap-3 p-3.5 rounded-lg border shadow-lg backdrop-blur-xs ${getBorderColor()}`}>
        {getIcon()}
        <div className="text-xs font-medium leading-relaxed flex-1">
          {toastMessage.text}
        </div>
      </div>
    </div>
  );
};
