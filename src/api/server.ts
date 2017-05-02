import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as session from 'express-session'
import { LoginController } from './controllers/login'
import { UserController } from './controllers/user'



class Server {
    public server : any;
    constructor(){   
            
        this.server = express();
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: false }));
        this.server.set('trust proxy', 1) // trust first proxy
        this.server.use(session({
            secret: 'very secret phrase',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false, path :'/api' }  ,                      
            }));
        // set env
        this.server.set('views',path.join(__dirname,'../../src'));

        //setup routes
        var router = express.Router();
        router.get('/', (req, res) => {
            if (!req.session.tkn){
                console.log('set session');
                req.session.tkn = '1';
                req.session.save(r=>{});
            }
            res.json(req.session);
        });
        // oauth routes
        var login = new LoginController();        
        router.get('/oauth/login', (r,rp) => login.Get(r,rp));
        // user routes
        var user= new UserController();
        router.get('/user', (r,rp) => user.Get(r, rp));
        // setup routes
        this.server.use('/api', router);
        this.server.get('/', function(req : express.Request, res: express.Response) {
                res.sendFile('index.html', { root: './src/'});
            });
        var port = process.env.PORT || '3000';
        
        this.server.set('port', port);
        this.server.listen(port, () => console.log(`API running on localhost:${port}`));
    }
}

export let server = new Server();