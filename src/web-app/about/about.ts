// simple-node-mvc-starter-project ~~ MIT License
// Web App

// Imports
import { dna } from 'dna-dom';

// Modules
import { aboutCompany } from './+page/modules/company.js';
import { aboutHello } from './+page/modules/hello.js';
import { appLookup } from '../+page/modules/lookup.js';

const about = {
   setup(): void {
      console.info('About', appLookup.apiServer);
      aboutHello.world();
      aboutCompany.mission();
      },
   };

dna.dom.onReady(about.setup);

export default about;
