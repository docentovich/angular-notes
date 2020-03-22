import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action, select, Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { deleteTopic } from '@topics/store/topic.actions';
import * as fromNoteReducer from '@notes/store/note.reducer';
import {
  addNote,
  addNoteRequest,
  loadNotes,
  loadNotesRequest,
  updateNote,
  updateNoteRequest,
  updateNotes,
  updateNotesRequest,
} from '@notes/store/note.actions';
import {
  NotesDataProvider,
  NotesDataProviderToken,
} from '@notes/data-providers/notes.data-provider';
import { TopicFacadeService } from '@topics/services/topic-facade.service';

@Injectable()
export class NoteEffects {
  loadNotes$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNotesRequest),
      switchMap(() =>
        this.notesDataProvider
          .loadNotes()
          .pipe(map(notes => loadNotes({ notes })))
      )
    )
  );

  createNote$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(addNoteRequest),
      withLatestFrom(this.topicFacadeService.selectedTopicId$),
      switchMap(([action, topicId]) =>
        this.notesDataProvider
          .addNote({ ...action.note, topicId })
          .pipe(map(note => addNote({ note })))
      )
    )
  );

  updateNote$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(updateNoteRequest),
      switchMap(action =>
        this.notesDataProvider
          .updateNote(action.note.id, action.note.changes)
          .pipe(
            map(note =>
              updateNote({
                note: { id: note.id, changes: { ...note } },
              })
            )
          )
      )
    )
  );

  updateNotesRequest$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(updateNotesRequest),
      switchMap(action =>
        this.notesDataProvider.updateNotes(action.notes).pipe(
          map(notes =>
            updateNotes({
              notes: notes.map(note => ({ id: note.id, changes: note })),
            })
          )
        )
      )
    )
  );

  deleteTopicSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTopic),
      switchMap(action =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(
              select(
                fromNoteReducer.noteSelectors.selectAllByTopicId(
                  action.topicId
                )
              )
            )
          )
        )
      ),
      map(([, notes]) =>
        updateNotes({
          notes: notes.map(note => ({
            id: note.id,
            changes: { topicId: null },
          })),
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private readonly store: Store<fromNoteReducer.State>,
    private readonly topicFacadeService: TopicFacadeService,
    @Inject(NotesDataProviderToken)
    private notesDataProvider: NotesDataProvider
  ) {}
}
