import React from 'react';
import { Activity, Cpu, Wifi, ShieldCheck } from 'lucide-react';

interface HUDProps {
  resonance: number;
}

const HUD: React.FC<HUDProps> = ({ resonance }) => {
  return (
    <div className="absolute top-6 left-6 flex flex-col gap-2 pointer-events-none z-20">
      
      {/* Status Block */}
      <div className="bg-black/60 backdrop-blur-md border border-cyan-900/50 p-4 rounded-sm w-64">
        <div className="flex justify-between items-center mb-2 border-b border-cyan-900/30 pb-2">
           <span className="text-cyan-500 font-mono text-xs tracking-widest">SYSTEM_STATUS</span>
           <div className="flex gap-1">
             <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
             <div className="w-2 h-2 rounded-full bg-cyan-900"></div>
           </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-400 font-mono flex items-center gap-2">
              <Activity className="w-3 h-3 text-purple-400" /> Entropy
            </span>
            <span className="text-purple-300 font-mono">LOW</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-400 font-mono flex items-center gap-2">
              <Wifi className="w-3 h-3 text-cyan-400" /> Resonance
            </span>
            <span className="text-cyan-300 font-mono">{resonance}%</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-400 font-mono flex items-center gap-2">
              <Cpu className="w-3 h-3 text-green-400" /> Cores
            </span>
            <span className="text-green-300 font-mono">ACTIVE</span>
          </div>
        </div>
        
        {/* Decorative Graphs */}
        <div className="mt-3 flex gap-1 h-4 items-end">
          {[40, 70, 30, 80, 50, 90, 60, 40, 70].map((h, i) => (
            <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/50 transition-colors"></div>
          ))}
        </div>
      </div>

      <div className="bg-black/60 backdrop-blur-md border border-purple-900/50 p-2 rounded-sm w-32 flex items-center gap-2">
         <ShieldCheck className="w-4 h-4 text-purple-500" />
         <span className="text-xs text-purple-200 font-mono">SECURE</span>
      </div>

    </div>
  );
};

export default HUD;