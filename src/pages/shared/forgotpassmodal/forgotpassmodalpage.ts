import { Component } from '@angular/core';
import { IonicPage,NavController, ToastController, LoadingController, Loading, NavParams,AlertController,ViewController } from 'ionic-angular';
import { FormBuilder, Validators} from '@angular/forms';
import { VendorServiceProvider } from '../../../providers/vendor-service/vendor-service';
@IonicPage()
@Component({
  selector: 'page-forgotpassmodalpage',
  templateUrl: 'forgotpassmodalpage.html',
})
export class ForgotpassmodalpagePage {
  adddeptForm: any;
  loading: Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view:ViewController,private formBuilder: FormBuilder,private vendorservice: VendorServiceProvider,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public toastCtrl: ToastController ) {
    this.adddeptForm = this.formBuilder.group({
      'deptname': ['', [Validators.required,Validators.email]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeptmodalpagePage');
  }
 dismiss() {
    this.view.dismiss();
  }
  add_deptForm(){
    if (this.adddeptForm.dirty && this.adddeptForm.valid) {
      var newDeptData = {
        forgot_password_email: this.adddeptForm.value.deptname,
      };
      this.showLoader();
      this.vendorservice.forgotpass(newDeptData,localStorage.getItem('token')).then((result) => {
        this.loading.dismiss();
        if (result['status']) {
          this.showAlert(result['message']);
        } else {
          this.showErrorAlert(result['errors'].email,result['message']);
        }
      }, (err) => {
        this.loading.dismiss();
        this.presentToast(err);
      });
    }
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Submitting...'
    });

    this.loading.present();
  }

  showErrorAlert(error,msg) {
    const alert = this.alertCtrl.create({
      title: error,
      message:msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
      
          this.navCtrl.pop();
          return false;
        }
      }]
    });

    alert.present();
  }
  showAlert(msg) {
    const alert = this.alertCtrl.create({
      title: msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
          alert.dismiss();
          this.navCtrl.pop();
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
