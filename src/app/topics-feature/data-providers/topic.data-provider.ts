import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

import { SerializedTopic } from '@topics/models/topic';

export const TopicsDataProviderToken = new InjectionToken<string>('topics');

export interface TopicsDataProvider {
  loadTopics(): Observable<SerializedTopic[]>;
  addTopic(topic: Partial<SerializedTopic>): Observable<SerializedTopic>;
  deleteTopic(topicId: number): Observable<boolean>;
}
