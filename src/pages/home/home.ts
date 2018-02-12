import { Component, ViewChild } from '@angular/core';
import { IonicPage,NavController, Slides,ToastController, MenuController ,Events ,Platform} from 'ionic-angular';
import {Utils} from '../utils';
// import { Network } from '@ionic-native/network';
import {TranslateService} from 'ng2-translate';
import { Subscription } from 'rxjs/Subscription'
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Slides]
})
export class HomePage {
  logo: String;
  disconnectSubscription:Subscription;
  language:string;
  @ViewChild(Slides) slides: Slides;
 register:string;
 howitwork:string;
 logintext:string;
  // constructor(public navCtrl: NavController, private network: Network, public toastCtrl: ToastController) {
    constructor(public events:Events, private navCtrl: NavController,  public toastCtrl: ToastController, public menu: MenuController,public translate: TranslateService,public platform:Platform) {
    this.logo = 'assets/imgs/logo-big.png';
    // translate.addLangs(["en", "fr"]);
    // translate.setDefaultLang('en');
menu.enable(false);
    // let browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.register ="REGISTRIRAJ SE";
    this.language =localStorage.getItem('language')?localStorage.getItem('language'):"si";
    console.log('abc',this.language);
     this.changeLanguage(this.language); 
    
            // the lang to use, if the lang isn't available, it will use the current loader to get them

          // // watch network for a connection
      // let connectSubscription = this.network.onConnect().subscribe(() => {
      //   console.log('network connected!');
      //   // We just got a connection but we need to wait briefly
      //   // before we determine the connection type. Might need to wait.
      //   // prior to doing any api requests as well.
      //   setTimeout(() => {
      //     if (this.network.type === 'wifi') {
      //       console.log('we got a wifi connection');
      //     }
      //   }, 3000);
      // });

      // // stop connect watch
      // connectSubscription.unsubscribe();
      var token: string = localStorage.getItem('token');
      // var user_id: string = localStorage.getItem('user_id');
      var role_id: number = parseInt(localStorage.getItem('role_id'));
      if (token === null || typeof token === "undefined" || token === "undefined") {
        // this.navCtrl.setRoot("LoginPage");
      } else {
        // console.log('role_id',role_id);
        Utils.redirectrolewise(role_id,this.navCtrl);
           this.menu.enable(true);
    this.events.publish('user:login');

      }

  }
 ionViewWillLeave(){
  // this.menu.enable(true);
   // stop disconnect watch
  // this.disconnectSubscription.unsubscribe();
 }
 changeLanguage(language){
   console.log(language,this.register);
  if (language == 'si') {
    this.register ="Register";
    this.howitwork="How it works";
    this.logintext="Login";
     console.log("Selected language is slovakian", this.register);
     this.translate.use('si');
     this.platform.setDir('ltr', true);
     localStorage.setItem('language',language);
 } else if (language == 'ar') {
     this.platform.setDir('rtl', true);
     this.translate.use('ar');
     localStorage.setItem('language',language);
 }
    else {
     
     this.register ="REGISTRIRAJ SE";
     this.howitwork="Kako deluje?";
     this.logintext="Prijava Se";
     console.log("Selected language is English" ,this.register);
     this.translate.use('en');
     this.platform.setDir('ltr', true);
     localStorage.setItem('language',language);
 }


}
  goToSlide() {
    this.slides.slideTo(2, 500);
  }
  ionViewDidEnter() {
   // watch network for a disconnect
  //  this.disconnectSubscription = this.network.onDisconnect().subscribe(()=>{
  //         this.presentToast();
  //   });
  localStorage.setItem('lastrecordid',  '0');
  localStorage.setItem('stopInfinite', '0');
   }

  showLoginPage() {
    //validate user if already logged in 
    // localStorage.getItem('token');
    // localStorage.getItem('user_id');   
    //temporary code must redo with  promise
    this.navCtrl.push("LoginPage");
    var token: string = localStorage.getItem('token');
    // var user_id: string = localStorage.getItem('user_id');
    var role_id: number = parseInt(localStorage.getItem('role_id'));
    if (token === null || typeof token === "undefined" || token === "undefined") {
      // this.navCtrl.push("LoginPage");
    } else {
      console.log('role_id',role_id);
      Utils.redirectrolewise(role_id,this.navCtrl)
    }
  }
  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Your internet connection appears to be offline. Data integrity is not guaranteed.',
      duration: 3000,
      position: 'middle',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  gotoRegisterOption(){
  this.navCtrl.push('RegisteroptionPage');
}
  
}
