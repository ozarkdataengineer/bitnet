import React, { useEffect, useRef } from 'react';
import { BookSection } from '../types';
import { BookOpen } from 'lucide-react';

interface ReaderPanelProps {
  sections: BookSection[];
  selectedNodeId: string | null;
}

const ReaderPanel: React.FC<ReaderPanelProps> = ({ sections, selectedNodeId }) => {
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (selectedNodeId && sectionRefs.current[selectedNodeId]) {
      sectionRefs.current[selectedNodeId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [selectedNodeId]);

  // Helper to highlight keywords
  const highlightText = (text: string, concepts: string[]) => {
    // This is a simplified highlighter. In production, regex would be more robust.
    const words = text.split(' ');
    return words.map((word, idx) => {
      const cleanWord = word.replace(/[.,]/g, '');
      const isConcept = concepts.includes(cleanWord) || (selectedNodeId && cleanWord === selectedNodeId);
      
      if (isConcept) {
        return (
          <span key={idx} className="text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
            {word}{' '}
          </span>
        );
      }
      return word + ' ';
    });
  };

  return (
    <div className="h-full flex flex-col bg-black/40 backdrop-blur-xl border-l border-white/10 relative overflow-hidden">
      {/* Decorative scan lines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_4px,3px_100%] opacity-20" />
      
      {/* Header */}
      <div className="p-6 border-b border-white/10 z-10 flex items-center justify-between">
        <h2 className="text-xl font-mono text-cyan-500 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          READER_MODULE
        </h2>
        <div className="text-xs text-neutral-500 font-mono">V.2.0.4</div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-12 z-10 scroll-smooth">
        {sections.map((section) => (
          <div 
            key={section.id} 
            ref={el => sectionRefs.current[section.relatedConcepts.find(c => c === section.id) || section.id] = el}
            className={`transition-opacity duration-500 ${selectedNodeId && !section.relatedConcepts.includes(selectedNodeId) && section.id !== selectedNodeId ? 'opacity-30 blur-[1px]' : 'opacity-100'}`}
          >
            <div className="mb-2 flex items-center gap-2">
               <div className="h-[1px] w-8 bg-purple-500"></div>
               <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                 SEC: {section.id.toUpperCase()}
               </span>
            </div>
            <h3 className="text-2xl font-light text-white mb-4 font-mono">{section.title}</h3>
            <p className="text-neutral-300 leading-relaxed font-light text-lg">
              {highlightText(section.content, section.relatedConcepts)}
            </p>
          </div>
        ))}
        
        <div className="h-32 flex items-center justify-center text-neutral-600 font-mono text-sm">
          -- END OF STREAM --
        </div>
      </div>
    </div>
  );
};

export default ReaderPanel;