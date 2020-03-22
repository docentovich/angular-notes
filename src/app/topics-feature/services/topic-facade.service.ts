import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SerializedTopic, Topic } from '@topics/models/topic';
import { select, Store } from '@ngrx/store';
import * as fromTopicReducer from '@topics/store/topic.reducer';
import {
  addTopicRequest,
  deleteTopicRequest,
  loadTopicsRequest,
  selectTopic,
} from '@topics/store/topic.actions';
import { NoteFacadeService } from '@notes/services/note-facade.service';

@Injectable({
  providedIn: 'root',
})
export class TopicFacadeService {
  public allTopics$: Observable<Topic[]> = combineLatest([
    this.store.pipe(select(fromTopicReducer.topicSelectors.selectAllTopics)),
    this.store.pipe(
      select(fromTopicReducer.topicSelectors.selectSelectedTopicId)
    ),
  ]).pipe(
    map(
      ([topics, selectedTopicId]) =>
        topics && topics.map(topic => this.deserialize(topic, selectedTopicId))
    )
  );

  public selectedTopicId$: Observable<number> = this.store.pipe(
    select(fromTopicReducer.topicSelectors.selectSelectedTopicId)
  );

  constructor(
    private readonly store: Store<fromTopicReducer.State>,
    private readonly noteFacade: NoteFacadeService
  ) {}

  public loadTopics() {
    this.store.dispatch(loadTopicsRequest());
  }

  public createTopic(title: string) {
    const topic: Partial<Topic> = {
      title,
    };
    this.store.dispatch(addTopicRequest({ topic: this.serialize(topic) }));
  }

  public selectTopic(id: number) {
    this.store.dispatch(selectTopic({ id }));
  }

  public deleteTopic(topicId: number) {
    this.store.dispatch(deleteTopicRequest({ topicId }));
  }

  public addNoteToTopic(topicId: number, noteId: number) {
    this.noteFacade.addNoteToTopic(topicId, noteId);
  }

  private deserialize(
    serializedTopic: SerializedTopic,
    selectedTopicId: number
  ): Topic {
    return {
      ...serializedTopic,
      isSelected: serializedTopic.id === selectedTopicId,
    };
  }

  private serialize(topic: Topic): SerializedTopic;
  private serialize(topic: Partial<Topic>): Partial<SerializedTopic>;
  private serialize(topic) {
    const { isSelected, ..._topic } = topic;
    return {
      ..._topic,
    };
  }
}
