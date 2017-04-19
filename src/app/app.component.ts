import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vk test app works!';
  clientId = "2474097";
  redirect_uri = "http://localhost:4200/oauth/login";
  oauth_url = "https://oauth.vk.com/authorize";
  display = "popup";
  scope = 0xfff;
  response_type = "token";
  version = "5.63";
  
 
  public state():string {
    return (Math.random()*9999).toString();
  }

  public Authorize(){
  
    window.location.href = this.oauth_url
    .concat("?")
    .concat("client_id=", this.clientId, "&redirect_uri=",this.redirect_uri,"&scope=", this.scope.toFixed().toString(),"&response_type=", this.response_type, "&v", this.version)
  }

}
