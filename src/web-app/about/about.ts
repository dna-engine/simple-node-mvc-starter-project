// simple-node-mvc-starter-project ~~ MIT License
// Web App

// Imports
import { dna } from 'dna-engine';

// Modules
import { aboutHello } from './+context/modules/hello';
import { appLookup } from '../+context/modules/lookup';

const about = {
   setup(): void {
      console.log('About', appLookup.apiServer);
      aboutHello.world();
      },
   };

dna.dom.onReady(about.setup);

export default about;
