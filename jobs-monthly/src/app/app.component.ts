import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {
  JobContainerComponent,
} from '@components/job-container/job-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    JobContainerComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Jobs';
}
