import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController, LoadingController, NavParams,AlertController,ViewController } from 'ionic-angular';
// import { FormBuilder, Validators} from '@angular/forms';
// import { CustomerProvider } from '../../../providers/customer/customer';
@IonicPage()
@Component({
  selector: 'page-openbusinessmodal',
  templateUrl: 'openbusinessmodal.html',
})
export class OpenbusinessmodalPage {
 loading:any;
 componentType='Priporočila';
  constructor(public navCtrl: NavController, public navParams: NavParams, private view:ViewController,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    
 
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
    console.log('ionViewDidLoad openbusiness');
    
  }
 dismiss() {
    this.view.dismiss();
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

  // private presentToast(text) {
  //   let toast = this.toastCtrl.create({
  //     message: text,
  //     duration: 3000,
  //     position: 'top'
  //   });
  //   toast.present();
  // }
 
}
