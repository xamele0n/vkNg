import { Injectable } from '@angular/core';
import { TokenService } from './token.service'
import {Http, HttpModule, Response, Headers, RequestOptions} from '@angular/http'
import { Observable } from 'rxjs'
import { UserModule} from './user/user.module'

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class VkService {

  private baseUrl = "https://api.vk.com/method/";
  private v="5.63";
  constructor(private tokenService: TokenService, 
              private http: Http) { }

public getUsers(ids: string): Observable<UserModule[]>{
   return this.http.get(this.baseUrl.concat("users.get?user_ids=", ids,"&v=", this.v))
                  .map((res:Response) => res.json())
                  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
}
}
