import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
  JobContainerComponent,
} from '@components/job-container/job-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    JobContainerComponent,
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Jobs';
}
