import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop/drag-events';

import { Topic } from '@topics/models/topic';
import { Note } from '@notes/models/note';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicsComponent {
  @Input() topics: Topic[] = [];
  @Output() addTopic: EventEmitter<string> = new EventEmitter();
  @Output() selectTopic: EventEmitter<number> = new EventEmitter();
  @Output() deleteTopic: EventEmitter<number> = new EventEmitter();
  @Output() addNoteToTopic: EventEmitter<{
    topicId: number;
    noteId: number;
  }> = new EventEmitter();

  newTopicTitle = '';
  mouseOverTopicId: number = null;

  drop(event: CdkDragDrop<Note, any>): void {
    const note: Note = event.item.data;
    const topic: Topic = this.topics.find(
      item => item.id === this.mouseOverTopicId
    );
    this.addNoteToTopic.emit({ topicId: topic.id, noteId: note.id });
  }

  topicMouseOver(topicId: number): void {
    this.mouseOverTopicId = topicId;
  }

  topicsMouseOut(): void {
    this.mouseOverTopicId = null;
  }

  submitTopicForm(): void {
    if (this.newTopicTitle === '') {
      return;
    }
    this.addTopic.emit(this.newTopicTitle);
    this.newTopicTitle = '';
  }
}
