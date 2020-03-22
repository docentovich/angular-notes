import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

import {Note} from '@notes/models/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NoteComponent {
  @Input() note: Note = null;
}
