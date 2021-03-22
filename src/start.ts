/**
 * This is the starting point of the app after it's been build and compiled to Javascript.
 * it's required to import the module to load the folder aliases.
 */
import 'module-alias/register';

(async () => {
  await import('./server');
})();
