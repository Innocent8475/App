/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Loader2, ArrowRight, BookOpen, Layers } from 'lucide-react';

interface PromptConsoleProps {
  onGenerate: (prompt: string) => Promise<void>;
  isGenerating: boolean;
}

const DESIGN_PRESETS = [
  {
    icon: "🧘‍♀️",
    label: "Zen Meditation app Splash & Home",
    desc: "A calm lavender theme onboarding and audio dashboard with warm rounded cards and soft hues."
  },
  {
    icon: "📈",
    label: "Crypto Wallet dashboard and payment",
    desc: "A dark cyberpunk slate layout showing real-time token balances, custom graphs, buy/sell and currency widgets."
  },
  {
    icon: "🥘",
    label: "Food Delivery menu and tracking screen",
    desc: "A bright orange themed gourmet pizza description screen alongside a status delivery map tracking step-indicators."
  },
  {
    icon: "🛍️",
    label: "Apparel e-commerce catalog first preview",
    desc: "Minimal editorial catalog using clean cream tones, beautiful product placeholder cards, tag filters, and inline icons."
  },
  {
    icon: "💬",
    label: "Messaging Chat and Personal Profiles",
    desc: "Beautiful chat UI with message bubbles, rich search heads, input actions, and customizable layout contacts."
  }
];

export default function PromptConsole({ onGenerate, isGenerating }: PromptConsoleProps) {
  const [prompt, setPrompt] = useState("");
  const [showPresets, setShowPresets] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;
    onGenerate(prompt);
  };

  const handlePresetSelect = (desc: string) => {
    setPrompt(desc);
    setShowPresets(false);
  };

  return (
    <div className="bg-[#14161f] border-b border-[#242735] px-6 py-4 flex flex-col gap-4 relative z-50">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-400 fill-violet-400/20" />
            AI Mobile UI Canvas Builder
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Generate high-fidelity vector mobile screens & interactive prototype flows directly with prompt rules.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 max-w-2xl flex items-center gap-2 relative">
          <input
            type="text"
            id="prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
            placeholder="e.g., A minimalist mental health check-in flow dark mode..."
            className="w-full bg-[#1c1e29] border border-[#2d3145] text-sm text-gray-200 placeholder-gray-500 rounded-lg pl-4 pr-12 py-2.5 focus:outline-none focus:border-violet-500 transition-colors disabled:opacity-55"
          />
          <button
            type="submit"
            id="prompt-submit-btn"
            disabled={!prompt.trim() || isGenerating}
            className="absolute right-1.5 top-1.5 p-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-md transition-all disabled:opacity-40 disabled:hover:bg-violet-600"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>

      {showPresets && (
        <div className="flex flex-col gap-2 mt-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-gray-400 tracking-wider uppercase flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-gray-400" />
              Inspiring Layout Design Presets
            </span>
            <button
              onClick={() => setShowPresets(false)}
              className="text-[11px] text-gray-500 hover:text-gray-300 underline underline-offset-2"
            >
              Hide Presets
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mt-1">
            {DESIGN_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetSelect(p.desc)}
                className="flex flex-col text-left p-3 rounded-lg border border-[#222533] bg-[#1a1c27] hover:border-[#383d54] hover:bg-[#1f2231] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{p.icon}</span>
                  <span className="text-xs font-semibold text-gray-200 group-hover:text-white truncate">
                    {p.label}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 lines-clamp-2 leading-relaxed">
                  {p.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {!showPresets && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPresets(true)}
            className="text-[11px] py-1 text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1"
          >
            <Layers className="w-3 h-3" />
            View Presets Catalog
          </button>
        </div>
      )}

      {isGenerating && (
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent animate-pulse" />
      )}
    </div>
  );
}
