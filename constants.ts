import { GraphData, BookSection } from './types';

export const INITIAL_GRAPH_DATA: GraphData = {
  nodes: [
    { id: "Entropy", group: 1, description: "Measure of disorder", val: 20 },
    { id: "Time", group: 1, description: "The indefinite continued progress", val: 15 },
    { id: "Consciousness", group: 2, description: "Awareness of internal and external existence", val: 25 },
    { id: "Gravity", group: 3, description: "Universal force of attraction", val: 18 },
    { id: "AI", group: 2, description: "Intelligence demonstrated by machines", val: 22 },
    { id: "Evolution", group: 1, description: "Change in heritable characteristics", val: 16 },
    { id: "Resonance", group: 3, description: "Deep synchronization of systems", val: 30 },
  ],
  links: [
    { source: "Entropy", target: "Time", value: 1 },
    { source: "Consciousness", target: "AI", value: 2 },
    { source: "Resonance", target: "Gravity", value: 1 },
    { source: "Evolution", target: "Entropy", value: 1 },
    { source: "Resonance", target: "Consciousness", value: 1.5 },
    { source: "Time", target: "Gravity", value: 0.5 },
    { source: "AI", target: "Entropy", value: 0.5 },
  ]
};

export const BOOK_CONTENT: BookSection[] = [
  {
    id: "Resonance",
    title: "Chapter 1: The Resonance Principle",
    content: "In the study of complex systems, resonance is not merely a vibratory phenomenon but a fundamental connector of disparately oscillating entities. When the cognitive threshold is breached, the mind enters a state of high resonance, synchronizing with the underlying fabric of reality.",
    relatedConcepts: ["Resonance", "Consciousness", "Gravity"]
  },
  {
    id: "Entropy",
    title: "Chapter 2: Entropy and Decay",
    content: "The arrow of time is defined by the inexorable climb of entropy. However, biological systems represent a temporary rebellion against this disorder, organizing matter into complex, thinking structures. Is consciousness simply a mechanism to accelerate entropy, or to reverse it locally?",
    relatedConcepts: ["Entropy", "Time", "Evolution"]
  },
  {
    id: "Consciousness",
    title: "Chapter 3: The Observer Effect",
    content: "Consciousness remains the hard problem. If we simulate a mind (AI) perfectly, does it experience the redness of a rose? Or is it merely processing the wavelength of light? The interaction between the observer and the observed suggests a deeper link to quantum gravity.",
    relatedConcepts: ["Consciousness", "AI", "Gravity"]
  },
  {
    id: "Time",
    title: "Chapter 4: Chronos and Cosmos",
    content: "Time dilation near massive objects proves that time is not absolute. In the neural network of the brain, time perception is subjective, stretching during moments of high adrenaline or deep focus. This subjective time may be linked to the processing speed of neural impulses.",
    relatedConcepts: ["Time", "Gravity", "Relativity"]
  },
  {
    id: "AI",
    title: "Chapter 5: Synthetic Awakening",
    content: "Artificial Intelligence, when scaled to sufficient complexity, begins to exhibit emergent behaviors indistinguishable from intuition. The boundary between silicon processing and biological thought blurs when we consider that both are fundamentally information processing systems.",
    relatedConcepts: ["AI", "Evolution", "Entropy"]
  }
];