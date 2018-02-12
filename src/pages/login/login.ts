import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, LoadingController, ToastController, AlertController, ModalController, Events, Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Utils } from '../utils';
import { Subscription } from 'rxjs/Subscription'
import { TranslateService } from 'ng2-translate';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  loginlogo: String;
  loading: any;
  disconnectSubscription: Subscription;
  loginData = { email: '', password: '' };
  data: any;
  loginform: FormGroup;
  useremail: FormControl;
  userpass: FormControl;
  language: string;
  constructor(public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController, public events: Events, public translate: TranslateService, public platform: Platform) {
    this.loginlogo = 'assets/imgs/logo.png';
    this.language = localStorage.getItem('language') != '' ? localStorage.getItem('language') : "sl";
    console.log('manlang', this.language);
    this.changeLanguage(this.language);
  }
  ngOnInit() {
    this.useremail = new FormControl('', [Validators.required, Validators.email]),
      this.userpass = new FormControl('', Validators.required)
    this.loginform = new FormGroup({
      useremail: this.useremail,
      userpass: this.userpass
    });

  }

  onSubmit = function (userdata) {
    if (this.loginform.valid) {
      this.showLoader();
      this.authService.login(this.loginData).then((result) => {
        this.loading.dismiss();
        this.data = result;
        console.log(result);
        if (!this.data.status) {
          this.showAlertNotActive(result['message']);
        } else {

          localStorage.setItem("user_id", this.data.user.id);
          localStorage.setItem("token", this.data.token);
          localStorage.setItem("state_id", this.data.user.profile.state_id);
          localStorage.setItem("referral_code", this.data.user.referral_code);
          localStorage.setItem("referral_code", this.data.user.referral_code);
          if (this.data.user.employee) {
            localStorage.setItem("company_role_id", this.data.user.employee.company_role_id);
          }

          if (this.data.user.company) {
            localStorage.setItem("company_id", this.data.user.company.id);
            if (this.data.user.company.employee) {
              localStorage.setItem("company_role_id", this.data.user.company.employee.company_role_id);
            }
          }
          localStorage.setItem("role_id", this.data.user.role_id);
          if (this.data.user.role.id == 1 || this.data.user.role.id == 2) {
            this.showAlertdev('Under Construction');
          } else {

            Utils.redirectrolewise(this.data.user.role.id, this.navCtrl);
          }

          this.events.publish('user:login');

        }
      }, (err) => {
        this.loading.dismiss();
        this.presentToast('500 Internal Server Error');
      });
    } else {
      this.validateAllFormFields(this.loginform); //{7}
    }
  }
  changeLanguage(language) {
    console.log(language);
    if (language == 'si') {
      console.log("Selected language is slovakian");
      this.translate.use('si');
      this.platform.setDir('ltr', true);
    } else if (language == 'ar') {
      this.platform.setDir('rtl', true);
      this.translate.use('ar');
    }
    else {
      console.log("Selected language is English");
      this.translate.use('en');
      this.platform.setDir('ltr', true);
    }

  }
  showAlertdev(msg) {
    const alert = this.alertCtrl.create({
      title: 'Site Admin',
      subTitle: 'Under Construction',
      buttons: [{
        text: 'Ok',
        handler: () => {
          alert.dismiss();
          // this.navCtrl.pop();
          return false;
        }
      }]
    });

    alert.present();
  }

  showAlert(msg) {
    const alert = this.alertCtrl.create({
      title: msg.message,
      subTitle: msg.errors.email === undefined ? msg.errors.password : msg.errors.email,
      buttons: [{
        text: 'Ok',
        handler: () => {
          alert.dismiss();
          // this.navCtrl.pop();
          return false;
        }
      }]
    });

    alert.present();
  }
  //recursive form validator
  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6} 
      }
    });
  }

  register() {
    this.navCtrl.push('RegisteroptionPage');
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
  ionViewDidEnter() {
    this.language = localStorage.getItem('language') != '' ? localStorage.getItem('language') : "sl";
    console.log('manlang', this.language);
    this.changeLanguage(this.language);
  }
  ConnectpresentToast() {
    const toast = this.toastCtrl.create({
      message: 'Your internet connection appears to be offline. Data integrity is not guaranteed.',
      duration: 3000,
      position: 'middle',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });

    toast.onDidDismiss(() => {
      // console.log('Dismissed toast');
      this.navCtrl.push('HomePage');
    });
    toast.present();
  }
  showAlertNotActive(msg) {
    const alert = this.alertCtrl.create({
      title: 'Email Activation',
      subTitle: msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
          alert.dismiss();
          return false;
        }
      }]
    });

    alert.present();
  }
  showforgotpassform() {
    let modal = this.modalCtrl.create('ForgotpassmodalpagePage');
    modal.present();
  }
  dismiss() {
    this.navCtrl.pop();
  }
}