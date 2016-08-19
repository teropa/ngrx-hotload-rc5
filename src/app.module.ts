import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';

import { provideHotStore } from './hot-store'

import { AppComponent } from './app/app.component';
import { appReducer } from './app/app.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    provideHotStore(appReducer) // Get a store module that may have an initial state
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
