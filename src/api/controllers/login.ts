import * as express from 'express'
import * as session from 'express-session'
import * as http from 'http'
import * as rp from 'request-promise'
import * as Promise from 'promise'

export class LoginController {

public token : string;
public autorized: boolean = false;
  title = 'vk test app works!';
  clientId = "2474097";
  redirect_uri = "http://localhost:3000/api/oauth/login/";
  oauth_url = "https://oauth.vk.com/authorize";
  token_url ="https://oauth.vk.com/access_token";
  display = "popup";
  secret = "EoaDcDml65UE7vxCxgUC";
  scope = 0xfff;
  response_type = "code";
  version = "5.63";
  
  constructor( ) {  }   

  private GetToken(req : express.Request):Promise<any>{
    console.log('current fragment');
    console.log(req.url);
    if (req.query){
        if (req.query.error){
          throw new Error(req.query.error_description);
        }
        var code = req.query.code;       
        if (code){
            var url = this.token_url.concat("?").concat("client_id=", this.clientId,"&redirect_uri=",this.redirect_uri, "&client_secret=",this.secret,"&code=", code);
            return rp.get(url)
                .then(r => JSON.parse(r));
    }
  }  
  return Promise.reject(401);
}

  private state():string {
    return (Math.random()*9999).toString();
  }

  private Redirect(res: express.Response):void{
 var url = this.oauth_url.concat("?")
                            .concat("client_id=", this.clientId, "&redirect_uri=",this.redirect_uri,"&scope=", this.scope.toFixed().toString(),"&response_type=", this.response_type, "&v", this.version);
                res.redirect(url);
               
  }
 
  public Get(req : express.Request, res: express.Response){
        
        if (!req.session.token){  
            this.GetToken(req).then(token =>{
                 if (!token){
                 this.Redirect(res);
                 return;
                }  
                req.session.token = token.access_token;
                req.session.user_id = token.user_id;
                //req.session.cookie.expires = token.expires_in;
                req.session.save(err=>{console.log(err);});
                res.redirect(req.session.originalUrl);  
            }, err => {
              req.session.originalUrl = req.url;
              req.session.save(err=>{console.log(err);});
              this.Redirect(res);
            }).catch(r =>{res.json(r);});    
            return; 
        }
        res.status(200);
        res.write('Authorization success');
        res.write(req.session.token);       
        res.end();    
  }

}
