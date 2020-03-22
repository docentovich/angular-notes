import { createAction, props } from '@ngrx/store';

import { SerializedTopic } from '@topics/models/topic';

export const deleteTopicRequest = createAction(
  '[Topic/API] Delete Topic Request',
  props<{ topicId: number }>()
);

export const loadTopicsRequest = createAction(
  '[Topic/API] Load Topics',
);

export const addTopicRequest = createAction(
  '[Topic/API] Add Topic',
  props<{ topic: Partial<SerializedTopic> }>()
);

export const addTopic = createAction(
  '[Topic] Add Topic',
  props<{ topic: SerializedTopic }>()
);

export const loadTopics = createAction(
  '[Topic] Add Topics',
  props<{ topics: SerializedTopic[] }>()
);

export const deleteTopic = createAction(
  '[Topic] Delete Topic Success',
  props<{ topicId: number }>()
);

export const selectTopic = createAction(
  '[Topic] Select Topic',
  props<{ id: number }>()
);
