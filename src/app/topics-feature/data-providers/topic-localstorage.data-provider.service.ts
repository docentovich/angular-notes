import { of } from 'rxjs';
import { Inject, Injectable } from '@angular/core';

import { Helper } from 'src/helper';
import { TopicsDataProvider } from '@topics/data-providers/topic.data-provider';
import { SerializedTopic } from '@topics/models/topic';
import {
  NotesDataProvider,
  NotesDataProviderToken,
} from '@notes/data-providers/notes.data-provider';

const TOPICS_KEY = 'topics';

@Injectable()
export class TopicsLocalstorageDataProviderService
  implements TopicsDataProvider {
  constructor(
    // no need in real application with real api
    @Inject(NotesDataProviderToken) private notesDataProvider: NotesDataProvider
  ) {}
  loadTopics() {
    return of(this.loadFromStorage());
  }

  addTopic(topic) {
    return of(this.addTopicToStorage(topic));
  }

  deleteTopic(topicId) {
    return of(this.deleteTopicFromStorage(topicId));
  }

  private deleteTopicFromStorage(topicId) {
    let topics = this.loadFromStorage();
    topics = Helper.removeElement(
      topics,
      element => element.id === topicId
    );
    // no need in real application with real api
    this.notesDataProvider.untieFromTopic(topicId);
    this.saveToStorage(topics);

    return true;
  }

  private addTopicToStorage(topic) {
    topic = { ...topic, id: Helper.uniqId() };
    const topics = [...this.loadFromStorage(), topic];
    this.saveToStorage(topics);

    return topic;
  }

  private loadFromStorage(): SerializedTopic[] {
    return JSON.parse(localStorage.getItem(TOPICS_KEY)) || [];
  }

  private saveToStorage(topics: SerializedTopic[]) {
    localStorage.setItem(TOPICS_KEY, JSON.stringify(topics));
  }
}
