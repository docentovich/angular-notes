import { createAction, props } from '@ngrx/store';
import { UpdateNum } from '@ngrx/entity/src/models';

import { SerializedNote } from '@notes/models/note';

export const loadNotesRequest = createAction('[Note/API] Load Notes Request');

export const addNoteRequest = createAction(
  '[Note/API] Add Note Request',
  props<{ note: Partial<SerializedNote> }>()
);

export const updateNoteRequest = createAction(
  '[Note/API] Update Note Request',
  props<{ note: UpdateNum<SerializedNote> }>()
);

export const updateNotesRequest = createAction(
  '[Note/API] Update Notes Request',
  props<{ notes: UpdateNum<SerializedNote>[] }>()
);

export const loadNotes = createAction(
  '[Note] Load Notes',
  props<{ notes: SerializedNote[] }>()
);

export const addNote = createAction(
  '[Note] Add Note',
  props<{ note: SerializedNote }>()
);

export const updateNote = createAction(
  '[Note] Update Note',
  props<{ note: UpdateNum<SerializedNote> }>()
);

export const updateNotes = createAction(
  '[Note] Update Notes',
  props<{ notes: UpdateNum<SerializedNote>[] }>()
);
