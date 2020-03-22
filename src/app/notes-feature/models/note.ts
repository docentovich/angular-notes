export interface Note {
  id: number;
  topicId: number;
  lastChangeDate: Date;
  order: number;
  text: string;
}

export interface SerializedNote {
  id: number;
  topicId: number;
  lastChangeDate: number;
  order: number;
  text: string;
}
