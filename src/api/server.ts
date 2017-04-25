import * as express from 'express'
import * as bodyParser from 'body-parser'

export class Server {
    public server;
    constructor(){   
            
        this.server = express();
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: false }));

        //setup routes
        var router = express.Router();
        router.get('/', (req, res) => {
            res.send('api works');
            });
        this.server('/api', router);
        this.server.get('/', function(req, res) {
                res.sendFile('index.html');
            });
        var port = process.env.PORT || '3000';
        
        this.server.set('port', port);
        this.server.listen(port, () => console.log(`API running on localhost:${port}`));
    }
}

