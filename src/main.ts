import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Librerías 
import 'jquery';
import 'popper.js'; 
import 'bootstrap';
import 'owl.carousel';
import '@fortawesome/fontawesome-free';
import 'animate.css';
import 'magnific-popup';

// Types
import '@types/jquery';
import '@types/popper.js';
import '@types/bootstrap'; 
import '@types/fontawesome';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));