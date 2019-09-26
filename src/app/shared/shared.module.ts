import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert.service';
import { ScrollableDirective } from './directives/scrollable.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    AlertComponent,
    ScrollableDirective
  ],
  providers: [
    AlertService
  ],
  entryComponents: [],
  exports: [
    AlertComponent,
    ScrollableDirective
  ]
})
export class SharedModule { }
