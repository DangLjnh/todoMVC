import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { delay, from, map, merge, of } from 'rxjs';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

const users = [
  {
    id: 1,
    firstName: 'Dang',
    lastName: 'Linh',
    username: 'dt_nlinh',
    age: 22,
  },
  {
    id: 2,
    firstName: 'Nguyen',
    lastName: 'Vu',
    username: 'pn_vu',
    age: 18,
  },
];

const observer = {
  next: (val: any) => console.log(val),
  error: (err: any) => console.log(err),
  complete: () => console.log('complete'),
};
