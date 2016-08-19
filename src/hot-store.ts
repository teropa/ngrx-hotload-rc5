import { NgModuleRef } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';

// This is where app state is kept between reloads
let appState: any;

export function hotModuleReplacement(
  bootloader: () => Promise<NgModuleRef<any>>,
  module: any
) {
  let MODULE_REF: NgModuleRef<any>;
  let DATA = !!module.hot.data ?
    module.hot.data.state :
    undefined;

  console.log('APP STATE', DATA);

  console.time('bootstrap');

  // Bootstrap the app, and get the resulting NgModuleRef
  if (document.readyState === 'complete') {
    bootloader()
      .then((modRef: NgModuleRef<any>) => MODULE_REF = modRef)
      .then(() => console.timeEnd('bootstrap'));
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      bootloader()
        .then((modRef: NgModuleRef<any>) => MODULE_REF = modRef)
        .then(() => console.timeEnd('bootstrap'));
    });
  }

  function getState(store: Store<any>) {
    let state:any;
    store.take(1).subscribe(s => state = s);
    return state;
  }

  module.hot.accept();

  // On hot reload, get the Store from the module and store its state
  module.hot.dispose((data: any) => {
    console.time('dispose');
    const store: Store<any> = MODULE_REF.injector.get(Store);
    appState = getState(store);
    (<any>Object).assign(data, { appState  });
    console.timeEnd('dispose');
  });

}

// Factory function for an @ngrx/store NgModule that is (maybe) initialized with
// the state from before a hot load.
export function provideHotStore(reducer: any) {
  return StoreModule.provideStore(reducer, appState);
}
