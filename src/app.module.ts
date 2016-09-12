import { NgModule, ApplicationRef, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { createNewHosts, removeNgStyles } from '@angularclass/hmr';

import { AppComponent } from './app/app.component';
import { appReducer } from './app/app.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.provideStore(appReducer)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private appRef: ApplicationRef, private injector: Injector) {
  }

  hmrOnInit(store: any) {
    if (!store || !store.ngrxState) return;

    console.log('got ngrx state', store.ngrxState);

    // Now, how do we get the state *into* the @ngrx/store?
    // It should be passed as a second argument to StoreModule.provideStore(appReducer, ...)
    // but that seems too late at this point.
  }

  hmrOnDestroy(store: any) {
    let ngrxStore: Store<any> = this.injector.get(Store);
    ngrxStore.take(1).subscribe(state => store.ngrxState = state);

    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    store.disposeOldHosts = createNewHosts(cmpLocation);

    removeNgStyles();
  }

  hmrAfterDestroy(store: any) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
