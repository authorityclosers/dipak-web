export interface PhilosophyPillar {
  index: string;
  tag: string;
  statement: string;
  elaboration: string;
}

export interface MissionContent {
  sectionNumber: string;
  sectionTitle: string;
  kicker: string;
  headlineLine1: string;
  headlineLine2: string;
  monumentalQuote: {
    prefix: string;
    emphasis: string;
    suffix: string;
  };
  missionBody: string;
  pillars: PhilosophyPillar[];
}
