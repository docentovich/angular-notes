import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  addTopic,
  loadTopics,
  addTopicRequest,
  deleteTopicRequest,
  deleteTopic,
  loadTopicsRequest,
} from '@topics/store/topic.actions';
import {
  TopicsDataProvider,
  TopicsDataProviderToken,
} from '@topics/data-providers/topic.data-provider';

@Injectable()
export class TopicEffects {
  loadTopics$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTopicsRequest),
      switchMap(() =>
        this.topicsDataProvider
          .loadTopics()
          .pipe(map(topics => loadTopics({ topics })))
      )
    )
  );

  createTopic$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(addTopicRequest),
      switchMap(action =>
        this.topicsDataProvider
          .addTopic(action.topic)
          .pipe(map(topic => addTopic({ topic })))
      )
    )
  );

  deleteTopicRequest$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTopicRequest),
      switchMap(action =>
        this.topicsDataProvider
          .deleteTopic(action.topicId)
          .pipe(map(() => deleteTopic({ ...action })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    @Inject(TopicsDataProviderToken)
    private topicsDataProvider: TopicsDataProvider
  ) {}
}
