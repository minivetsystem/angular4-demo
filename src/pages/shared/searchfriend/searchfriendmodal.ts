import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController, LoadingController, Loading, NavParams,AlertController,ViewController } from 'ionic-angular';
// import { FormBuilder, Validators} from '@angular/forms';
import { CustomerProvider } from '../../../providers/customer/customer';
@IonicPage()
@Component({
  selector: 'page-searchfriendmodal',
  templateUrl: 'searchfriendmodal.html',
})
export class SearchfriendmodalPage {
  // withdrawamountfrm: any;
  loading: Loading;
  // withdrawsuccess:boolean=false;
  successmsg:string;
  searchQuery: string = '';
  // items:Array<any>=[];
  friendlist:Array<any>=[];
  success:boolean=false;
  failure:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view:ViewController,private customerprovider: CustomerProvider,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
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

  initializeItems(val) {

    if (val != '') {
      this.showLoader("Searching...");
      this.customerprovider.getFriendList(localStorage.getItem('user_id'), val).then((result) => {
        // if (result['status']) {
        //   // this.showAlert(result.message);
        //   // this.employeedata = result['employees'];

        //   this.loading.dismiss();
        // } 

        this.friendlist.length=0;  
        if(result['users'].length !=0){
          // for (let item in result['users']) {
          //   var fullname = result['users'][item].first_name + ' ' + result['users'][item].last_name;
          //   this.friendlist.push(fullname);
          //   // console.log(result['users'][item].first_name);
          // }
          
          this.friendlist.push(result['users']);
        } else {
          this.friendlist.length=0;
        }
        this.friendlist.length == 0 ? (this.success=true,this.failure=true): (this.success=true,this.failure=false);
        // this.failure= this.friendlist.length > 0 ? false: true;
      
        // this.friendlist = result['users'];
        console.log('DDD_item', this.friendlist[0]);
        console.log(result['users']);
        this.loading.dismiss();
      }, (err) => {
        // this.loading.dismiss();
        this.presentToast(err);
      });
    } else {
      this.friendlist.length=0;
    }
    
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    console.log('typing..',ev.target.value);
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.initializeItems(val);
    } else {
      this.friendlist.length=0;
    }
  
      // set val to the value of the searchbar
    

    // if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
    //   this.friendlist = this.friendlist.filter((item) => {
    //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   })
    // }
  }
  clearclicked(){
    this.success=false;
    this.failure=false;
    this.friendlist.length=0;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddppldeptmodalPage');
    
  }
 dismiss() {
    this.view.dismiss();
  }

 

  // withdraw_amountfrm(){
  //   if (this.withdrawamountfrm.dirty && this.withdrawamountfrm.valid) {
  //     var amount = {
  //       request_amount: this.withdrawamountfrm.value.request_amount,
  //     };
  //     this.showLoader('Sumbitting ...');
  //     this.customerprovider.withdrawamt(localStorage.getItem('user_id'),amount).then((result) => {
  //       this.loading.dismiss();
        
  //       if(!result['status']){
  //         this.errorpresentToast(result['message']);
  //       }
  //       if(result['status']){
  //         this.withdrawsuccess = true;
  //         this.successmsg=result['message'];
  //       }
  //       // if (result.status) {
  //       //   this.showAlert(result.message']);
  //       // } 
  //     }, (err) => {
  //       this.loading.dismiss();
  //       this.presentToast(err);
  //     });
  //   }
  // }


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
  // private errorpresentToast(text) {
  //   let toast = this.toastCtrl.create({
  //     message: text,
  //     duration: 5000,
  //     position: 'top',
  //     showCloseButton: true,
  
  //   });
  //   toast.present();
  // }
 
sendrequest(recemail, recid) {
    /*
receiver:106
receiver_email:atanu@minivetsystem.com
sender:107 debtanu
*/
// console.log('request',recemail,recid);
var data = {
  receiver: recid,
  receiver_email:recemail,
  sender: parseInt(localStorage.getItem('user_id'))
};
this.showLoader('Sending request...');
    this.customerprovider.sendfriendinvitation(data, localStorage.getItem('user_id')).then((result) => {
      this.loading.dismiss();
      // if (!result['status']) {
      //   this.presentToast(result['errors'].invite_email);
      // }
   
     
        this.showAlert(result['message']);
  
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }
}
