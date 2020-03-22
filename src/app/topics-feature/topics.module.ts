import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TopicsDataProviderToken } from '@topics/data-providers/topic.data-provider';
import { TopicsLocalstorageDataProviderService } from '@topics/data-providers/topic-localstorage.data-provider.service';
import { TopicsContainerComponent } from '@topics/components/topics-container/topics-container.component';
import { TopicComponent } from '@topics/components/topic/topic.component';
import { TopicsComponent } from '@topics/components/topics/topics.component';
import * as fromTopic from '@topics/store/topic.reducer';
import { TopicEffects } from '@topics/store/topic.effects';

@NgModule({
  declarations: [TopicsContainerComponent, TopicComponent, TopicsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromTopic.topicsFeatureKey, fromTopic.reducer),
    EffectsModule.forFeature([TopicEffects]),
    FormsModule,
    MatInputModule,
    DragDropModule,
  ],
  exports: [TopicsContainerComponent],
  providers: [
    {
      provide: TopicsDataProviderToken,
      useClass: TopicsLocalstorageDataProviderService,
    },
  ],
})
export class TopicsModule {}
