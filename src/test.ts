// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Importamos el archivo de cobertura después de inicializar el entorno
import './test-coverage';

// En Angular 17, en lugar de usar require.context, 
// los archivos .spec.ts se cargan automáticamente por el sistema de construcción