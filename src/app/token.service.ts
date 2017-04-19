import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  private access_token: string;
  constructor() { 

  }

  public setToken(token:string){
    this.access_token = token;
  }

  public getTokent():string{
    return this.access_token;
  }

}
