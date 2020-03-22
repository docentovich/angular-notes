import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as TopicActions from '@topics/store/topic.actions';
import { SerializedTopic } from '@topics/models/topic';

export const topicsFeatureKey = 'topics';

export interface State extends EntityState<SerializedTopic> {
  selectedTopicId: number;
}

export const adapter: EntityAdapter<SerializedTopic> = createEntityAdapter<
  SerializedTopic
>();

export const initialState: State = adapter.getInitialState({
  selectedTopicId: null,
});

const topicReducer = createReducer(
  initialState,
  on(TopicActions.addTopic, (state, action) =>
    adapter.addOne(action.topic, state)
  ),
  on(TopicActions.loadTopics, (state, action) =>
    adapter.addMany(action.topics, state)
  ),
  on(TopicActions.deleteTopic, (state, action) =>
    adapter.removeOne(action.topicId, state)
  ),
  on(TopicActions.loadTopics, (state, action) =>
    adapter.setAll(action.topics, state)
  ),
  on(TopicActions.selectTopic, (state, action) => ({
    ...state,
    selectedTopicId: action.id,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return topicReducer(state, action);
}

const selectTopicsFeature = createFeatureSelector<State>(topicsFeatureKey);

const adapterSelectors = adapter.getSelectors();

const selectSelectedTopicId = createSelector(
  selectTopicsFeature,
  state => state && state.selectedTopicId
);

function defaultTopic(): SerializedTopic {
  return { id: null, title: 'Тема по умолчанию' };
}

const selectAllTopics = createSelector(
  selectTopicsFeature,
  selectSelectedTopicId,
  state => state && [defaultTopic(), ...adapterSelectors.selectAll(state)]
);

export const topicSelectors = { selectSelectedTopicId, selectAllTopics };
