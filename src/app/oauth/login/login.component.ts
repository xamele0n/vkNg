import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'
import { Observable } from 'rxjs'
import { TokenService } from './../../token.service'
import {VkService} from './../../vk.service'

@Component({
  selector: 'app-login', 
  templateUrl: "login.component.html",
  styles: [],
  providers:[VkService]
})
export class LoginComponent implements OnInit {

public token : string;
public autorized: boolean = false;
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

  public users ;
  ngOnInit() {
      this.users = this.vk.getUsers("4827782").subscribe(
                               users => this.users = users, //Bind to view
                                err => {
                                    // Log errors if any
                                    console.log(err);
                                });;
  }

}
