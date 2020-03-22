import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NotesDataProviderToken } from '@notes/data-providers/notes.data-provider';
import { NotesLocalstorageDataProviderService } from '@notes/data-providers/notes-localstorage.data-provider.service';
import { NotesContainerComponent } from '@notes/components/notes-container/notes-container.component';
import { NotesComponent } from '@notes/components/notes/notes.component';
import { NoteComponent } from '@notes/components/note/note.component';
import * as fromNote from '@notes/store/note.reducer';
import { NoteEffects } from '@notes/store/note.effects';

@NgModule({
  declarations: [NotesContainerComponent, NotesComponent, NoteComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromNote.notesFeatureKey, fromNote.reducer),
    EffectsModule.forFeature([NoteEffects]),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
  ],
  exports: [NotesContainerComponent],
  providers: [
    {
      provide: NotesDataProviderToken,
      useClass: NotesLocalstorageDataProviderService,
    },
  ],
})
export class NotesModule {}
