import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController, LoadingController, Loading, NavParams,AlertController,ViewController } from 'ionic-angular';
import { FormBuilder, Validators} from '@angular/forms';
import { CustomerProvider } from '../../../providers/customer/customer';
@IonicPage()
@Component({
  selector: 'page-invitefriendmodal',
  templateUrl: 'invitefriendmodal.html',
})
export class InvitefriendmodalPage {
  inviteemailfrm: any;
  loading: Loading;
invitesuccess:boolean=false;
  successmsg:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view:ViewController,private customerservice: CustomerProvider,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public toastCtrl: ToastController, private formBuilder: FormBuilder ) {
    this.inviteemailfrm = this.formBuilder.group({
      'invite_email': ['',[Validators.required, Validators.email]]
    });
 
   // this.showLoader('Loading...');
     
    //   this.vendorservice.getEmployeesfordepratment(localStorage.getItem('company_id'),localStorage.getItem('token')).then((result) => {
    //     if (result['status']) {
    //       // this.showAlert(result.message);
    //       this.employeedata = result['employees'];
          
    //       this.loading.dismiss();
    //     } 
    //   }, (err) => {
    //     this.loading.dismiss();
    //     this.presentToast(err);
    //   });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddppldeptmodalPage');
  }
 dismiss() {
    this.view.dismiss();
  }

  invite_emailfrm(){
    if (this.inviteemailfrm.dirty && this.inviteemailfrm.valid) {
      var invite_emaildata = {
        invite_email: this.inviteemailfrm.value.invite_email,
      };
      
      this.showLoader('Sumbitting ...');
        this.customerservice.invitefriend(invite_emaildata, localStorage.getItem('user_id')).then((result) => {
          this.loading.dismiss();
          if(!result['status']){
            this.presentToast(result['errors'].invite_email);
          }
          if(result['status']){
            this.invitesuccess = true;
            this.successmsg=result['message'];
          }
        }, (err) => {
          this.loading.dismiss();
          this.presentToast(err);
        });
    }
  }


  showLoader(msg) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }

  showAlert(msg) {
    const alert = this.alertCtrl.create({
      title: msg,
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

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
 
}
