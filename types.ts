import { SimulationNodeDatum, SimulationLinkDatum } from 'd3';

export interface ConceptNode extends SimulationNodeDatum {
  id: string;
  group: number;
  description: string;
  val: number; // radius/importance
  // Explicitly add d3 properties that might be missing from the extended type or needed for strict typing
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  index?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface ConceptLink extends SimulationLinkDatum<ConceptNode> {
  source: string | ConceptNode;
  target: string | ConceptNode;
  value: number; // strength
}

export interface BookSection {
  id: string;
  title: string;
  content: string;
  relatedConcepts: string[];
}

export interface GraphData {
  nodes: ConceptNode[];
  links: ConceptLink[];
}