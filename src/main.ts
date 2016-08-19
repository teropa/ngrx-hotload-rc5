import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { hotModuleReplacement } from './hot-store';

function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

if((<any>module).hot) {
  hotModuleReplacement(main, module);
} else {
  document.addEventListener('DOMContentLoaded', () => main);
}
