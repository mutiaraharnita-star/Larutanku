export type ElectrolyteType = 'strong' | 'weak' | 'none';

export interface ParticleDef {
  label: string;
  type: 'cation' | 'anion' | 'neutral' | 'water';
  color: string;
}

export interface Solution {
  id: string;
  name: string;
  chemicalFormula: string;
  category: ElectrolyteType;
  categoryLabel: string;
  alpha: number; // Degree of ionization
  alphaText: string;
  bulbStatus: 'bright' | 'dim' | 'off';
  bulbLabel: string;
  gasBubbles: 'many' | 'few' | 'none';
  gasBubblesLabel: string;
  ionizationEquation: string;
  scientificExplanation: string;
  particles: {
    cations: string[];
    anions: string[];
    molecules: string[];
  };
  liquidColor: string; // CSS color string for the beaker liquid
  description: string;
  practicalUse: string;
}

export interface MaterialSection {
  id: string;
  title: string;
  content: string[];
  formulaBox?: {
    title: string;
    formula: string;
    description: string;
  };
  keyTakeaway?: string;
  comparisonTable?: {
    headers: string[];
    rows: string[][];
  };
}

export interface MaterialModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  iconName: string;
  estimatedMinutes: number;
  sections: MaterialSection[];
  summary: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
  difficulty: 'Dasar' | 'Menengah' | 'HOTS';
}

export interface LabObservationRecord {
  id: string;
  timestamp: string;
  solutionId: string;
  solutionName: string;
  chemicalFormula: string;
  concentration: string;
  bulbObservation: string;
  bubbleObservation: string;
  conclusion: string;
}

export interface UserProgress {
  completedModules: string[];
  testedSolutions: string[];
  highestQuizScore: number;
  totalQuizAttempts: number;
  lastQuizResult?: {
    score: number;
    total: number;
    percentage: number;
    date: string;
  };
  observations: LabObservationRecord[];
}
