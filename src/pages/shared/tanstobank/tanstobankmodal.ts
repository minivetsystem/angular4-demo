import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController, LoadingController, Loading, NavParams,AlertController,ViewController } from 'ionic-angular';
import { FormBuilder, Validators} from '@angular/forms';
import { CustomerProvider } from '../../../providers/customer/customer';
@IonicPage()
@Component({
  selector: 'page-tanstobankmodal',
  templateUrl: 'tanstobankmodal.html',
})
export class TanstobankmodalPage {
  withdrawamountfrm: any;
  loading: Loading;
  withdrawsuccess:boolean=false;
  successmsg:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view:ViewController,private customerprovider: CustomerProvider,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public toastCtrl: ToastController, private formBuilder: FormBuilder ) {
    this.withdrawamountfrm = this.formBuilder.group({
      'request_amount': ['',[ Validators.required,Validators.pattern(/^[0-9]*?\.?[0-9]{0,2}$/)]]
    });
   
 
    //  this.showLoader('Loading...');
     
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

 

  withdraw_amountfrm(){
    if (this.withdrawamountfrm.dirty && this.withdrawamountfrm.valid) {
      var amount = {
        request_amount: this.withdrawamountfrm.value.request_amount,
      };
      this.showLoader('Sumbitting ...');
      this.customerprovider.withdrawamt(localStorage.getItem('user_id'),amount).then((result) => {
        this.loading.dismiss();
        
        if(!result['status']){
          this.errorpresentToast(result['message']);
        }
        if(result['status']){
          this.withdrawsuccess = true;
          this.successmsg=result['message'];
        }
        // if (result.status) {
        //   this.showAlert(result.message']);
        // } 
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
  private errorpresentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 5000,
      position: 'top',
      showCloseButton: true,
  
    });
    toast.present();
  }
 
}
