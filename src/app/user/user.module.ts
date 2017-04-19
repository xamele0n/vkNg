import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class UserModule { 
  constructor(
        public id: number,
        public first_name: string,
        public deactivated: string,
        public hidden: number
        ){}

  public static fromJson(json: any): UserModule {
        return new UserModule(
          json.id,
          json.first_name,
          json.deactivated,
          json.hidden
        );
    }
}
