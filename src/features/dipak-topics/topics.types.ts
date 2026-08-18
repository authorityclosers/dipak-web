export interface TopicItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface TopicsContent {
  sectionNumber: string;
  sectionTitle: string;
  headlineWord1: string;
  headlineWord2: string;
  topics: TopicItem[];
}
