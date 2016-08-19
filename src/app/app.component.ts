import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState, INC, DEC } from './app.reducer';

@Component({
  selector: 'my-app',
  template: `
    <button (click)="dec()">-</button>
    {{ count$ | async }}
    <button (click)="inc()">+</button>
  `
})
export class AppComponent {

  count$ = this.store.select('count');

  constructor(private store: Store<AppState>) {
  }

  inc() {
    this.store.dispatch({type: INC});
  }

  dec() {
    this.store.dispatch({type: DEC});
  }

}
