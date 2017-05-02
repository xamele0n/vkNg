import * as express from 'express'
import * as session from 'express-session'
import * as http from 'http'
import * as rp from 'request-promise'
import {VkApi} from './vkApi'

export class UserController extends VkApi{
    constructor(){
        super();
    }
    public Get(req : express.Request, res : express.Response){

        this.Auth(req, res).then(function (rq): rp.RequestPromise {
        return rp.get("https://api.vk.com/method/users.get?v=5.63&user_ids=" + req.session.user_id + "&access_token=" + req.session.token);
    }).then(val => {
        res.write(val);
        res.end();
    }, err => {
        console.log('rejected');
        console.log(err);
        res.end();
    })
    }
}