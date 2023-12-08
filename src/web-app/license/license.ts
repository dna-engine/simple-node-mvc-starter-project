// simple-node-mvc-starter-project ~~ MIT License
// Web App

// Imports
import { dna } from 'dna-engine';

// Modules
import { appLookup } from '../+page/modules/lookup';
import { licenseDetails } from './+page/modules/details';

const license = {
   setup(): void {
      console.log('Details', appLookup.apiServer);
      licenseDetails.show();
      },
   };

dna.dom.onReady(license.setup);

export default license;
