import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { UpdateNum } from '@ngrx/entity/src/models';

import { SerializedNote } from '@notes/models/note';

export const NotesDataProviderToken = new InjectionToken<string>('notes');

export interface NotesDataProvider {
  loadNotes(): Observable<SerializedNote[]>;
  loadNotesByTopicId(topicId: number): Observable<SerializedNote[]>;
  addNote(serializedNote: Partial<SerializedNote>): Observable<SerializedNote>;
  untieFromTopic(topicId: number): Observable<SerializedNote[]>;
  updateNote(
    noteId: number,
    changes: Partial<SerializedNote>
  ): Observable<SerializedNote>;
  updateNotes(notes: UpdateNum<SerializedNote>[]): Observable<SerializedNote[]>;
}
