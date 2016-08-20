import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appReducer } from './app/app.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
