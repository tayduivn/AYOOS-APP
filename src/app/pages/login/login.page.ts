import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { NavController } from '@ionic/angular';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private oauthService: OAuthService, private navCtrl: NavController) { }

  username: string;
  password: string;
  message:string;
  ngOnInit() {
    if (this.oauthService.hasValidAccessToken()) {
      this.navCtrl.navigateRoot('/home');
    }
  }
  clearMessage(){
    this.message='';
  }
  login() {
    console.log('in login' + this.username + ' password is ' + this.password);
    this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(this.username, this.password, new HttpHeaders()).then(() => {
      let claims = this.oauthService.getIdentityClaims();
      if (claims) console.log(claims);
      if (this.oauthService.hasValidAccessToken()) {
        this.navCtrl.navigateRoot('/home');
      }
    }).catch((err:HttpErrorResponse)=>{
      this.message=err.error.error_description;
    });
  }


}



