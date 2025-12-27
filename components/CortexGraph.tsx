import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { ConceptNode, ConceptLink, GraphData } from '../types';

interface CortexGraphProps {
  data: GraphData;
  onNodeClick: (nodeId: string) => void;
  width: number;
  height: number;
}

const CortexGraph: React.FC<CortexGraphProps> = ({ data, onNodeClick, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<ConceptNode | null>(null);
  
  // Ref to store simulation to stop it on unmount
  const simulationRef = useRef<d3.Simulation<ConceptNode, ConceptLink> | null>(null);

  // Helper to check if a node is connected to the hovered node
  const isConnected = useCallback((a: ConceptNode, b: ConceptNode) => {
    return data.links.some(l => {
      const sourceId = typeof l.source === 'object' ? (l.source as ConceptNode).id : l.source;
      const targetId = typeof l.target === 'object' ? (l.target as ConceptNode).id : l.target;
      
      return (
        (sourceId === a.id && targetId === b.id) ||
        (sourceId === b.id && targetId === a.id)
      );
    });
  }, [data.links]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Deep copy data to avoid mutation issues in strict mode
    const nodes: ConceptNode[] = data.nodes.map(d => ({ ...d }));
    const links: ConceptLink[] = data.links.map(d => ({ ...d }));

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius((d: any) => d.val + 10));

    simulationRef.current = simulation;

    // Animation Loop
    let animationFrameId: number;
    let t = 0; // Time variable for breathing effect

    const render = () => {
      if (!ctx) return;
      t += 0.05;

      ctx.clearRect(0, 0, width, height);
      
      // Draw Links
      links.forEach(link => {
        const source = link.source as ConceptNode;
        const target = link.target as ConceptNode;
        
        const isHoveredLink = hoveredNode && (
          (source.id === hoveredNode.id && target.id !== hoveredNode.id) ||
          (target.id === hoveredNode.id && source.id !== hoveredNode.id)
        );

        ctx.beginPath();
        // Ensure coordinates exist before drawing
        if (source.x !== undefined && source.y !== undefined && target.x !== undefined && target.y !== undefined) {
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);
        }
        
        if (isHoveredLink) {
          ctx.strokeStyle = "rgba(6, 182, 212, 0.8)"; // Cyan
          ctx.lineWidth = 3;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#06b6d4";
        } else {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
        }
        
        ctx.stroke();
        
        // Reset shadow for next draw
        ctx.shadowBlur = 0;
      });

      // Draw Nodes
      nodes.forEach(node => {
        // Ensure coordinates exist
        if (node.x === undefined || node.y === undefined) return;

        const isHovered = hoveredNode?.id === node.id;
        const isNeighbor = hoveredNode && isConnected(node, hoveredNode);
        
        // Breathing radius
        const baseRadius = node.val;
        const breathing = Math.sin(t + (node.index || 0) * 0.5) * 2;
        const radius = isHovered ? baseRadius * 1.3 : baseRadius + breathing;

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
        
        if (isHovered) {
          ctx.fillStyle = "#06b6d4"; // Cyan
          ctx.shadowBlur = 30;
          ctx.shadowColor = "#06b6d4";
        } else if (isNeighbor) {
          ctx.fillStyle = "#a855f7"; // Purple
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#a855f7";
        } else {
          ctx.fillStyle = "#1e293b"; // Slate 800
          ctx.strokeStyle = "#06b6d4";
          ctx.lineWidth = 1.5;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(6, 182, 212, 0.3)";
        }

        ctx.fill();
        if (!isHovered && !isNeighbor) ctx.stroke();

        // Label
        ctx.shadowBlur = 0;
        ctx.fillStyle = isHovered || isNeighbor ? "#ffffff" : "rgba(255, 255, 255, 0.6)";
        ctx.font = isHovered ? "bold 14px Roboto Mono" : "12px Roboto Mono";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.id, node.x, node.y + radius + 15);
      });
      
      animationFrameId = requestAnimationFrame(render);
    };

    simulation.on("tick", render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      simulation.stop();
    };
  }, [width, height, data, hoveredNode, isConnected]);

  // Interaction Handlers
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !simulationRef.current) return;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const nodes = simulationRef.current.nodes();
    let found: ConceptNode | null = null;

    // Simple distance check
    for (const node of nodes) {
      if (node.x !== undefined && node.y !== undefined) {
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < node.val + 5) {
          found = node;
          break;
        }
      }
    }
    setHoveredNode(found);
    
    // Change cursor
    if (canvasRef.current) {
      canvasRef.current.style.cursor = found ? 'pointer' : 'default';
    }
  };

  const handleClick = () => {
    if (hoveredNode) {
      onNodeClick(hoveredNode.id);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute top-0 left-0 w-full h-full"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onMouseLeave={() => setHoveredNode(null)}
    />
  );
};

export default CortexGraph;