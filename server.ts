import * as express from 'express';
import {ng2engine} from 'angular2-universal-preview';
import {App} from './src/app';

let app = express();

app.engine('.ng2.html', ng2engine);
app.set('views', __dirname + '/src');
app.set('view engine', 'ng2.html');

app.use(express.static(__dirname + '/'));

app.use('/', function(req, res) {
	res.render('index', { App: App })
})

app.listen(4000, () => {
	console.log('Listening on http://localhost:4000...');
});