import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './oauth/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { TokenService } from './token.service'
import { VkService } from './vk.service'
import { UserModule } from './user/user.module'

const appRoutes: Routes = [ 
  {
    path: 'oauth/login',
    component: LoginComponent    
  },  
  { path: '', component: LoginComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
    
  ],
  providers: [TokenService, VkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
