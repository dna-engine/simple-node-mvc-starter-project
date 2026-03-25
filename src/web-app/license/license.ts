// simple-node-mvc-starter-project ~~ MIT License
// Web App

// Imports
import { dna } from 'dna-dom';

// Modules
import { appLookup } from '../+page/modules/lookup.js';
import { licenseDetails } from './+page/modules/details.js';

const license = {
   setup(): void {
      console.info('Details', appLookup.apiServer);
      licenseDetails.show();
      },
   };

dna.dom.onReady(license.setup);

export default license;
