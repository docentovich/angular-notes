import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { UpdateNum } from '@ngrx/entity/src/models';

import { NotesDataProvider } from '@notes/data-providers/notes.data-provider';
import { Helper } from '../../../helper';
import { SerializedNote } from '@notes/models/note';


const NOTES_KEY = 'notes';

@Injectable()
export class NotesLocalstorageDataProviderService implements NotesDataProvider {
  loadNotes(): Observable<SerializedNote[]> {
    return of(this.loadFromStorage());
  }

  loadNotesByTopicId(topicId: number): Observable<SerializedNote[]> {
    return of(this.loadNotesByTopicIdFromStorage(topicId));
  }

  addNote(note: Partial<SerializedNote>): Observable<SerializedNote> {
    return of(this.addNoteToStorage(note));
  }

  updateNote(noteId: number, partialNote): Observable<SerializedNote> {
    return of(this.updateNoteInStorage(noteId, partialNote));
  }

  updateNotes(
    notes: UpdateNum<SerializedNote>[]
  ): Observable<SerializedNote[]> {
    return of(this.updateNotesInStorage(notes));
  }

  untieFromTopic(topicId: number): Observable<SerializedNote[]> {
    const { changed, all } = Helper.butchElementsUpdate(
      this.loadFromStorage(),
      element => element.topicId === topicId,
      { topicId: null }
    );
    this.saveToStorage(all);

    return of(changed);
  }

  private loadFromStorage(): SerializedNote[] {
    return JSON.parse(localStorage.getItem(NOTES_KEY)) || [];
  }

  private saveToStorage(notes: SerializedNote[]) {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }

  private loadNotesByTopicIdFromStorage(topicId: number): SerializedNote[] {
    return this.loadFromStorage().filter(note => note.topicId === topicId);
  }

  private updateNoteInStorage(
    noteId: number,
    partialNote: Partial<SerializedNote>
  ): SerializedNote {
    partialNote = { ...partialNote, lastChangeDate: new Date().getTime() };
    const { array, updatedElement } = Helper.updateElement(
      this.loadFromStorage(),
      element => element.id === noteId,
      partialNote
    );
    this.saveToStorage(array);

    return updatedElement;
  }
  private updateNotesInStorage(
    notes: UpdateNum<SerializedNote>[]
  ): SerializedNote[] {
    const { array, updatedElements } = Helper.updateElements(
      this.loadFromStorage(),
      notes
    );
    this.saveToStorage(array);

    return updatedElements;
  }

  private addNoteToStorage(note: Partial<SerializedNote>): SerializedNote {
    note = {
      ...note,
      lastChangeDate: new Date().getTime(),
      id: Helper.uniqId(),
    };
    const notes = [...this.loadFromStorage(), note as SerializedNote];
    this.saveToStorage(notes);

    return note as SerializedNote;
  }
}
