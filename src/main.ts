import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideStore } from '@ngrx/store';
import { AppModule } from './app.module';
import { appReducer } from './app/app.reducer';
import { hotModuleReplacement } from './hot-store';

function main(initialState?: any) {
  return platformBrowserDynamic().bootstrapModule(AppModule, {
    providers: [
      provideStore(appReducer, initialState)
    ]
  });
}

if((<any>module).hot) {
  hotModuleReplacement(main, module);
} else {
  document.addEventListener('DOMContentLoaded', () => main);
}
