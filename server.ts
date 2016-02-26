import * as path from 'path';
import * as express from 'express';

// Angular 2
import {ng2engine} from 'angular2-universal-preview';

import {HelloApp} from './src/hello';

let app = express();

app.use(express.static(__dirname));

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000...');
});