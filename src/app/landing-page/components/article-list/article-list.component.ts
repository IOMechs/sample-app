import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  animations: [
    // Trigger animation article rows
    trigger('articlesAnimation', [
      // Transition from any state to any state
      transition('* => *', [
        // Initially the all rows are not visible
        query(':enter', style({ opacity: 0 }), { optional: true }),

        // Each row will appear sequentially with the delay of 300ms
        query(':enter', stagger('300ms', [
          animate('.5s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(-10px) scale(1.1)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))]), { optional: true }),

        // Rows will disappear sequentially with the delay of 300ms
        query(':leave', stagger('300ms', [
          animate('500ms ease-out', keyframes([
            style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
            style({ opacity: .5, transform: 'scale(.5)', offset: 0.3 }),
            style({ opacity: 0, transform: 'scale(0)', offset: 1 }),
          ]))]), { optional: true })
      ]),
    ]),
  ],
})
export class ArticleListComponent implements OnInit, OnDestroy {
  componentAlive: boolean;
  isAdmin = false;
  constructor(public page: PaginationService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.componentAlive = true;
    this.afAuth.authState
    .pipe(
      takeWhile(() => this.componentAlive)
    )
    .subscribe(user => {
      if (user && user.email === 'admin@gmail.com') {
        this.isAdmin = true;
      }
    });
    this.page.init('articles', 'created', { reverse: true, prepend: false, limit: 5 });
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.page.more();
    }
  }

  ngOnDestroy() {
    this.page.resetPagination();
    this.componentAlive = false;
  }

}