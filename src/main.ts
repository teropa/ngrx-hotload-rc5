import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { bootloader } from '@angularclass/hmr';

function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

bootloader(main);