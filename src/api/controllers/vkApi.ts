import * as http from 'http'
import * as express from 'express'
import * as session from 'express-session'
import * as rp from 'request-promise'
import {CoreOptions} from 'request'
import * as Promise from 'promise'

export class VkApi{
    public BaseUrl : string = "https://api.vk.com/method/";
    public Options : VkOptions = new VkOptions();

    constructor(){
        this.Options = new VkOptions();
    }

    public Auth(req: express.Request, res : express.Response): Promise.IThenable<express.Request>{
        return Promise.resolve(1).then(function(val){
            if (!req.session.token){
                res.redirect('/api/oauth/login?callback='+req.url);
                return Promise.reject(req);
            }
            return req;
        });
    }
    
}

export class VkOptions implements CoreOptions{
    public baseUrl:string = "https://api.vk.com/method/"
}