import express = require('express');
import bodyParser = require('body-parser');
import path = require('path')

class Server {
    public server : any;
    constructor(){   
            
        this.server = express();
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: false }));
        // set env
        this.server.set('views',path.join(__dirname,'../../src'));

        //setup routes
        var router = express.Router();
        router.get('/', (req, res) => {
            res.send('api works');
            });
        this.server.use('/api', router);
        this.server.get('/', function(req : express.Request, res: express.Response) {
                res.sendFile('index.html', { root: './src/' });
            });
        var port = process.env.PORT || '3000';
        
        this.server.set('port', port);
        this.server.listen(port, () => console.log(`API running on localhost:${port}`));
    }
}

export let server = new Server();

