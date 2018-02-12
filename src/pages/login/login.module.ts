import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {LoginPage } from './login';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ForgotpassmodalpagePageModule } from '../shared/forgotpassmodal/forgotpassmodalpage.module';
import { TranslaterModule } from '../../app/translate.module';
@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),ForgotpassmodalpagePageModule,TranslaterModule,
  ],
  providers: [AuthService]
})
export class LoginPageModule {}
