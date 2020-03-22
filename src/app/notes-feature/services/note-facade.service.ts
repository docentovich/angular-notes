import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Note, SerializedNote } from '@notes/models/note';
import * as fromNoteReducer from '@notes/store/note.reducer';
import {
  addNoteRequest,
  loadNotesRequest,
  updateNoteRequest,
  updateNotesRequest,
} from '@notes/store/note.actions';

@Injectable({
  providedIn: 'root',
})
export class NoteFacadeService {
  public allNotesInTopic$: Observable<Note[]> = this.store.pipe(
    select(fromNoteReducer.noteSelectors.selectAllFromSelectedTopic),
    map(notes => notes && notes.map(this.deserialize))
  );

  constructor(private readonly store: Store<fromNoteReducer.State>) {}

  public loadNotes() {
    this.store.dispatch(loadNotesRequest());
  }

  public createNote(text: string) {
    const note: Partial<Note> = {
      text,
      lastChangeDate: new Date(),
      order: null,
    };
    this.store.dispatch(addNoteRequest({ note: this.serialize(note) }));
  }

  public addNoteToTopic(topicId: number, noteId: number) {
    this.store.dispatch(
      updateNoteRequest({
        note: { id: noteId, changes: { topicId, order: null } },
      })
    );
  }

  public noteOrder(notes: Note[]) {
    this.store.dispatch(
      updateNotesRequest({
        notes: notes.map(note => ({
          id: note.id,
          changes: this.serialize(note),
        })),
      })
    );
  }

  private deserialize(serializedNote: SerializedNote): Note {
    return {
      ...serializedNote,
      lastChangeDate: new Date(serializedNote.lastChangeDate),
    };
  }

  private serialize(note: Note): SerializedNote;
  private serialize(note: Partial<Note>): Partial<SerializedNote>;
  private serialize(note) {
    return {
      ...note,
      lastChangeDate: note.lastChangeDate.getTime(),
    };
  }
}
