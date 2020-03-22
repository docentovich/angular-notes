import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop/drag-events';
import { moveItemInArray } from '@angular/cdk/drag-drop';

import { Note } from '@notes/models/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {
  @Input() notes: Note[] = [];
  @Output() addNote: EventEmitter<string> = new EventEmitter();
  @Output() orderNote: EventEmitter<Note[]> = new EventEmitter();
  newNoteTitle = '';
  isDragging = false;

  submitNoteForm(): void {
    if (this.newNoteTitle === '') {
      return;
    }
    this.addNote.emit(this.newNoteTitle);
    this.newNoteTitle = '';
  }

  drop(event: CdkDragDrop<Note[], any>): void {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
    const orderedNotes = this.notes.map((note, index) => ({ ...note, order: index }));

    this.orderNote.emit(orderedNotes);
  }
}
