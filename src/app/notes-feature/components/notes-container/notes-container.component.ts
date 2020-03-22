import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NoteFacadeService } from '@notes/services/note-facade.service';
import { TopicFacadeService } from '@topics/services/topic-facade.service';
import { Note } from '@notes/models/note';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesContainerComponent {
  allNotesInTopic$ = this.notesFacade.allNotesInTopic$;

  constructor(
    private readonly notesFacade: NoteFacadeService,
    private readonly topicsFacade: TopicFacadeService
  ) {
    this.notesFacade.loadNotes();
  }

  onAddNote(noteText: string) {
    this.notesFacade.createNote(noteText);
  }

  onOrderNote(notes: Note[]) {
    this.notesFacade.noteOrder(notes);
  }
}
