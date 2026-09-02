import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCcw, Compass, Award } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { DESTINATIONS } from '../data/destinations';
import { Destination, Currency, TravelVibe } from '../types';
import { formatPrice } from '../utils/currency';
import { triggerConfetti } from '../utils/confetti';
import { CosmicStarfield } from './CosmicStarfield';

interface VibeQuizProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  onSelectDestination: (dest: Destination) => void;
  onBookNow: (dest: Destination) => void;
}

export const VibeQuiz: React.FC<VibeQuizProps> = ({
  isOpen,
  onClose,
  currency,
  onSelectDestination,
  onBookNow,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [matchedDest, setMatchedDest] = useState<Destination | null>(null);

  if (!isOpen) return null;

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleSelectOption = (destMatchId: string) => {
    const updated = [...selectedAnswers, destMatchId];
    setSelectedAnswers(updated);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Find most frequent destination or first match
      const found = DESTINATIONS.find((d) => d.id === destMatchId) || DESTINATIONS[0];
      setMatchedDest(found);
      triggerConfetti();
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setMatchedDest(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative space-cosmos-backdrop rounded-[32px] max-w-xl w-full overflow-hidden shadow-2xl border border-white/20 animate-in fade-in zoom-in-95 duration-200 text-white">
        
        {/* Background Starfield */}
        <CosmicStarfield density={50} speed={0.1} />
        
        {/* Header */}
        <div className="bg-black/50 border-b border-white/10 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/15 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spatial Vibe Assessment</span>
          </div>
          <h3 className="text-xl font-black font-display text-white">
            {!matchedDest ? `Question ${currentQuestionIndex + 1} of ${QUIZ_QUESTIONS.length}` : 'Your Spatial Match'}
          </h3>

          {/* Progress Bar */}
          {!matchedDest && (
            <div className="mt-4 w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 bg-[#0B0F19]/90">
          {!matchedDest ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-white mb-1">{currentQuestion.question}</h4>
                <p className="text-xs text-slate-300">{currentQuestion.subtitle}</p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentQuestion.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.destinationMatchId)}
                    className="p-4 rounded-2xl visionos-glass-card border border-white/15 hover:border-amber-400/80 hover:bg-white/20 text-left transition-all duration-300 flex items-start gap-3.5 group transform hover:-translate-y-1 shadow-lg"
                  >
                    <span className="text-2xl p-2 bg-white/10 rounded-xl group-hover:scale-110 transition">{opt.emoji}</span>
                    <div className="min-w-0">
                      <h5 className="font-bold text-sm text-white group-hover:text-amber-300 transition">{opt.text}</h5>
                      <span className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">{opt.subtext}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Match View */
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase border border-amber-400/40">
                <Award className="w-3.5 h-3.5" />
                <span>100% Curated Compatibility</span>
              </div>

              <div className="relative h-60 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                <img
                  src={matchedDest.image}
                  alt={matchedDest.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-left text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">{matchedDest.country}</span>
                  <h4 className="text-2xl font-black font-display text-white">{matchedDest.name}</h4>
                  <p className="text-xs text-slate-200 line-clamp-2 mt-1">{matchedDest.tagline}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-white/15 text-xs text-slate-300 text-left">
                {matchedDest.description}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake</span>
                </button>

                <button
                  onClick={() => {
                    onSelectDestination(matchedDest);
                    onClose();
                  }}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-xs shadow-xl transition flex items-center justify-center gap-2"
                >
                  <span>Explore Matched Voyage</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
