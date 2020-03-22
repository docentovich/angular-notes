import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';

import { TopicFacadeService } from '@topics/services/topic-facade.service';
import { Topic } from '@topics/models/topic';

@Component({
  selector: 'app-topics-container',
  templateUrl: './topics-container.component.html',
  styleUrls: ['./topics-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicsContainerComponent {
  allTopics$: Observable<Topic[]> = this.facade.allTopics$;
  @Output() selectTopic: EventEmitter<number> = new EventEmitter();

  constructor(private readonly facade: TopicFacadeService) {
    this.facade.loadTopics();
  }

  onAddTopicTitle(topicTitle: string) {
    this.facade.createTopic(topicTitle);
  }

  onSelectTopic(topicId: number) {
    this.facade.selectTopic(topicId);
  }

  onDeleteTopic(topicId: number) {
    this.facade.deleteTopic(topicId);
  }

  onAddNoteToTopic({ topicId, noteId }: { topicId: number; noteId: number }) {
    this.facade.addNoteToTopic(topicId, noteId);
  }
}
