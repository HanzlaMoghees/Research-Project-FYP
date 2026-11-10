import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  Cpu, 
  Layers, 
  FileCode, 
  FolderTree, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export const LocalRunModal: React.FC = () => {
  const { isLocalRunModalOpen, setIsLocalRunModalOpen, showToast } = useApp();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'quickstart' | 'details' | 'troubleshooting'>('quickstart');

  if (!isLocalRunModalOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    showToast('Command copied to clipboard!', 'info');
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  const quickCommands = [
    {
      title: '1. Clone or Download the repository',
      code: 'git clone <repository-url>\ncd scholarpulse',
      comment: 'Clone the project to your local directory'
    },
    {
      title: '2. Install all dependencies',
      code: 'npm install',
      comment: 'Installs React 19, Tailwind CSS v4, Lucide icons, Motion, and Vite'
    },
    {
      title: '3. Start the local development server',
      code: 'npm run dev',
      comment: 'Starts Vite dev server on http://localhost:3000'
    },
    {
      title: '4. Build for production (optional)',
      code: 'npm run build\nnpm run preview',
      comment: 'Compiles production assets into /dist and starts preview server'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-700 text-white flex items-center justify-center shadow-xs">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">
                How to Run ScholarPulse on Your Local Machine
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Complete guide to clone, install dependencies, and run locally on port 3000
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLocalRunModalOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 border-b border-slate-200 px-4 shrink-0 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('quickstart')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'quickstart' 
                ? 'bg-white text-slate-900 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Quickstart (3 Steps)
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'details' 
                ? 'bg-white text-slate-900 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Environment & Port
          </button>
          <button
            onClick={() => setActiveTab('troubleshooting')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'troubleshooting' 
                ? 'bg-white text-slate-900 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tech Stack & Specs
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5 text-xs">
          
          {activeTab === 'quickstart' && (
            <div className="space-y-4">
              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-lg text-indigo-950 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <span className="font-bold">Prerequisites:</span> Ensure you have <strong className="font-semibold text-indigo-900">Node.js 18.x or 20.x+</strong> and <strong className="font-semibold text-indigo-900">npm</strong> installed on your macOS, Windows, or Linux system.
                </div>
              </div>

              <div className="space-y-3">
                {quickCommands.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-slate-700 font-medium">
                      <span>{item.title}</span>
                      <span className="text-[11px] text-slate-400 font-normal">{item.comment}</span>
                    </div>

                    <div className="relative group bg-slate-900 text-slate-100 rounded-lg p-3 font-mono text-xs flex items-center justify-between border border-slate-800">
                      <pre className="overflow-x-auto whitespace-pre font-mono leading-relaxed">
                        {item.code}
                      </pre>
                      <button
                        onClick={() => copyToClipboard(item.code, idx)}
                        className="ml-3 p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors shrink-0 flex items-center gap-1 text-[11px]"
                        title="Copy command"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-sans">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="font-sans">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-950 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs">Access Your Local Application</div>
                  <div className="text-[11px] text-emerald-800 mt-0.5">
                    Once <code className="font-mono bg-emerald-100 px-1 py-0.5 rounded">npm run dev</code> starts, open your browser to:
                  </div>
                </div>
                <a
                  href="http://localhost:3000"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 font-bold font-mono text-xs bg-emerald-700 text-white rounded-md hover:bg-emerald-800 transition-colors shadow-xs flex items-center gap-1"
                >
                  <span>http://localhost:3000</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm">Environment Configuration</h3>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  The application comes preconfigured. If you wish to use custom environmental variables, create a <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">.env</code> file based on <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">.env.example</code>:
                </p>
                <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs border border-slate-800">
                  GEMINI_API_KEY="your_optional_api_key"<br />
                  APP_URL="http://localhost:3000"
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">Custom Port Binding</h3>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  The dev server defaults to port 3000 via <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">package.json</code>:
                </p>
                <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs border border-slate-800">
                  "dev": "vite --port=3000 --host=0.0.0.0"
                </div>
                <p className="text-slate-500 text-[11px]">
                  If port 3000 is occupied, you can change the port in package.json or pass it in the command: <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">npm run dev -- --port=5173</code>
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">Offline & Local Data Persistence</h3>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  All user accounts, thesis deliverables, version increments, supervisor feedback threads, and notifications are stored in your browser's persistent <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">localStorage</code>. You can click <strong>"Reset Demo Data"</strong> anytime from the user profile dropdown to restore fresh seed data.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'troubleshooting' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Technology Stack & Specifications</h3>
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Frontend Library</span>
                  <div className="font-bold text-slate-900 mt-0.5">React 19 & TypeScript</div>
                  <div className="text-[11px] text-slate-500">Hooks, Context API, Modular components</div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Styling Engine</span>
                  <div className="font-bold text-slate-900 mt-0.5">Tailwind CSS v4</div>
                  <div className="text-[11px] text-slate-500">Modern @import syntax & zero-pill design</div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Build Tooling</span>
                  <div className="font-bold text-slate-900 mt-0.5">Vite 8 & ES2022</div>
                  <div className="text-[11px] text-slate-500">Instant HMR & lightning-fast builds</div>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Iconography & Fonts</span>
                  <div className="font-bold text-slate-900 mt-0.5">Lucide React & Plus Jakarta</div>
                  <div className="text-[11px] text-slate-500">JetBrains Mono for tabular metrics</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-[11px] space-y-1">
                <div className="font-bold text-slate-800">Verification Commands:</div>
                <div className="font-mono text-slate-700">npm run lint &nbsp;&nbsp;# Runs TypeScript typechecking</div>
                <div className="font-mono text-slate-700">npm run build &nbsp;# Generates production dist bundles</div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0 text-xs">
          <span className="text-slate-500">ScholarPulse Local Environment Guide</span>
          <button
            onClick={() => setIsLocalRunModalOpen(false)}
            className="px-4 py-2 font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg transition-colors shadow-xs"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
