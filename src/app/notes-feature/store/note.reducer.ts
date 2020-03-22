import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as NoteActions from '@notes/store/note.actions';
import { SerializedNote } from '@notes/models/note';
import { topicSelectors } from '@topics/store/topic.reducer';

export const notesFeatureKey = 'notes';

export interface State extends EntityState<SerializedNote> {}

export const adapter: EntityAdapter<SerializedNote> = createEntityAdapter<
  SerializedNote
>();

export const initialState: State = adapter.getInitialState({});

const noteReducer = createReducer(
  initialState,
  on(NoteActions.addNote, (state, action) =>
    adapter.addOne(action.note, state)
  ),
  on(NoteActions.updateNote, (state, action) =>
    adapter.updateOne(action.note, state)
  ),
  on(NoteActions.updateNotes, (state, action) =>
    adapter.updateMany(action.notes, state)
  ),
  on(NoteActions.loadNotes, (state, action) =>
    adapter.setAll(action.notes, state)
  )
);

export function reducer(state: State | undefined, action: Action) {
  return noteReducer(state, action);
}

const adapterSelectors = adapter.getSelectors();

const selectNotesFeature = createFeatureSelector<State>(notesFeatureKey);

const selectAllNote = createSelector(
  selectNotesFeature,
  state => state && adapterSelectors.selectAll(state)
);

function sortNotes(note1: SerializedNote, note2: SerializedNote) {
  note1 = { ...note1, order: (note1.order === null ? 999999 : note1.order) };
  note2 = { ...note2, order: (note2.order === null ? 999999 : note2.order) };
  return note1.order - note2.order;
}

const selectAllByTopicId = (topicId: number) =>
  createSelector(
    selectAllNote,
    allNotes =>
      allNotes &&
      allNotes.filter(note => note.topicId === topicId).sort(sortNotes)
  );

const selectAllFromSelectedTopic = createSelector(
  topicSelectors.selectSelectedTopicId,
  selectAllNote,
  (selectedTopicId, allNote) =>
    allNote &&
    selectedTopicId !== undefined &&
    selectAllByTopicId(selectedTopicId).projector(allNote)
);

export const noteSelectors = {
  selectAllNote,
  selectAllByTopicId,
  selectAllFromSelectedTopic,
};
