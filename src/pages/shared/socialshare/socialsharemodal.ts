import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController, LoadingController, Loading, NavParams,AlertController,ViewController } from 'ionic-angular';
// import { FormBuilder, Validators} from '@angular/forms';
// import { CustomerProvider } from '../../../providers/customer/customer';
import { SingletonService } from '../../../providers/configservice';
import { SocialSharing } from '@ionic-native/social-sharing';
@IonicPage()
@Component({
  selector: 'page-socialsharemodal',
  templateUrl: 'socialsharemodal.html',
})
export class SocialsharemodalmodalPage {
 firstparam:any;
 secondparam:any;
 bonustype:any;
 offerid:any;
 shareurl:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view:ViewController,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public toastCtrl: ToastController,private socialSharing: SocialSharing,public socialGet:SingletonService) {
    var data = navParams.get('data');
    this.firstparam = data.firstparam;
    this.secondparam=data.secondparam;
    this.bonustype = data.bonustype;
    this.offerid = data.offerid;
    this.shareurl = socialGet.baseurl + 'offers/'+this.offerid+'/details?referral_code='+localStorage.getItem('referral_code');
    // this.withdrawamountfrm = this.formBuilder.group({
    //   'request_amount': ['',[ Validators.required,Validators.pattern(/^[0-9]*?\.?[0-9]{0,2}$/)]]
    // });
   
    
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
    // this.initializeItems();  
      
  }
  sharewithfb(){
    console.log(this.shareurl);
    this.socialSharing.canShareVia('facebook',null,null,null,this.shareurl).then(() => {
      // Share via email
      this.socialSharing.shareViaFacebook(null,null,this.shareurl).then(()=>{

      }).catch(()=>{
        this.showAlert("Error: No Internet Connection","Check your mobile's data/Wifi connection");
      });
    }).catch(() => {
      this.showAlert("Error: Install Facebook App","Sharing via facebook is not possible without facebook App.");
      
    });
  }
  sharewithmail(){
    console.log(this.shareurl);
    this.socialSharing.canShareViaEmail().then(() => {
      // Share via email
      this.socialSharing.shareViaEmail(this.shareurl, 'Offer Recommendations', []).then(() => {
        // Success!
      }).catch(() => {
        this.showAlert("Error: No Internet Connection","Check your mobile's data/Wifi connection");
      });
    }).catch(() => {
      this.showAlert("Error: Install Emailing App","Sharing via email is not possible without email app");
      
    });
  }
  sharewithwhatsapp(){
    console.log(this.shareurl);
    this.socialSharing.canShareVia('whatsApp',null,null,null,this.shareurl).then(() => {
      // Share via email
      this.socialSharing.shareViaWhatsApp(null,null,this.shareurl).then(()=>{

      }).catch(()=>{
        this.showAlert("Error: No Internet Connection","Check your mobile's data/Wifi connection");
      });
    }).catch(() => {
      this.showAlert("Error: Install WhatsApp Messenger","Sharing via whatsapp is not possible without whatsapp App.");
      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddppldeptmodalPage');
    
  }
  dismiss(){
    // var obj = this.navParams.get('loderobj');
    // console.log('lu',obj.dismiss(),obj);
    this.view.dismiss();
  }
  showAlert(title,subtitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle:subtitle,
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
}
