import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

import { Topic } from '@topics/models/topic';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicComponent {
  @Input() topic: Topic = null;
  @Output() deleteTopic: EventEmitter<number> = new EventEmitter();
  @Output() selectTopic: EventEmitter<number> = new EventEmitter();
  @HostListener('click', []) onClick() {
    this.selectTopic.emit(this.topic.id);
  }
  delete(): void {
    this.deleteTopic.emit(this.topic.id);
  }
}
