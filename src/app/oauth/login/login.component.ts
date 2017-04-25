import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'
import { Observable } from 'rxjs'
import { TokenService } from './../../token.service'
import { VkService } from './../../vk.service'
import { UserModule } from '../../user/user.module'

@Component({
  selector: 'app-login', 
  templateUrl: "login.component.html",
  styles: [],
  providers:[]
})
export class LoginComponent implements OnInit {

public token : string;
public autorized: boolean = false;
  title = 'vk test app works!';
  clientId = "2474097";
  redirect_uri = "http://localhost:4200/oauth/login";
  oauth_url = "https://oauth.vk.com/authorize";
  display = "popup";
  scope = 0xfff;
  response_type = "token";
  version = "5.63";
  
  constructor(private activatedRoute: ActivatedRoute, 
            private router: Router,
            private tokenService: TokenService,
            private vk : VkService ) {     

  const routeFragment: Observable<string> = activatedRoute.fragment;
  routeFragment.subscribe(fragment => {
    console.log('current fragment');
    console.log(fragment);
    if (fragment){
    let token: string = fragment.match(/access_token=(.*?)[&$]/)[1];
    this.tokenService.setToken(token);
    this.token = token;
    this.autorized = true;
    }
              });
  }

  public users :UserModule[];
  ngOnInit() {
      this.vk.getUsers("4827782").subscribe(
                               users => this.users = users, //Bind to view
                                err => {
                                    // Log errors if any
                                    console.log(err);
                                });;
  }

  public state():string {
    return (Math.random()*9999).toString();
  }

  public Authorize(){
  
    window.location.href = this.oauth_url
    .concat("?")
    .concat("client_id=", this.clientId, "&redirect_uri=",this.redirect_uri,"&scope=", this.scope.toFixed().toString(),"&response_type=", this.response_type, "&v", this.version)
  }

}
