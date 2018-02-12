import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController, LoadingController, Loading, NavParams,AlertController,ViewController } from 'ionic-angular';
import { VendorServiceProvider } from '../../../providers/vendor-service/vendor-service';
@IonicPage()
@Component({
  selector: 'page-addppldeptmodal',
  templateUrl: 'addppldeptmodal.html',
})
export class AddppldeptmodalPage {
  addppldeptForm: any;
  loading: Loading;
  employeedata:any;
  deptid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view:ViewController,private vendorservice: VendorServiceProvider,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public toastCtrl: ToastController ) {
    // this.addppldeptForm = this.formBuilder.group({
    //   // 'deptname': ['', Validators.required]
    // });
    // console.log(navParams.get('deptid')); 
    this.employeedata="";
     this.showLoader('Loading...');
     this.deptid = navParams.get('deptid'); 
     //http://konekt.local/api/v1/company/1/department/8/nonemployees?token=ZLKYJPMU4PEA3OZB
      this.vendorservice.getnonEmployeesfordepratment(localStorage.getItem('company_id'),navParams.get('deptid'),localStorage.getItem('token')).then((result) => {
        if (result['status']) {
          // this.showAlert(result.message);
          this.employeedata = result['employees'];
          
          this.loading.dismiss();
        } 
      }, (err) => {
        this.loading.dismiss();
        this.presentToast(err);
      });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddppldeptmodalPage');
    
  }
 dismiss() {
    this.view.dismiss();
  }

 

  add_ppldeptForm(){
    // if (this.addppldeptForm.dirty && this.addppldeptForm.valid) {
      // var newDeptData = {
      //   department_name: this.adddeptForm.value.deptname,
      // };


      // this.showLoader();
      // this.vendorservice.addNewDept(newDeptData, localStorage.getItem('company_id'),localStorage.getItem('token')).then((result) => {
      //   this.loading.dismiss();
      //   if (result.status) {
      //     this.showAlert(result.message']);
      //   } 
      // }, (err) => {
      //   this.loading.dismiss();
      //   this.presentToast(err);
      // });
    // }
  }
  addppltodept(empid){
    var userdata = {
      employee_id:empid
    }

    console.log('deptid',this.deptid);
       this.showLoader('Loading...');
      this.vendorservice.addemptodept(userdata, localStorage.getItem('company_id'),localStorage.getItem('token'), this.deptid).then((result) => {
        this.loading.dismiss();
        
          this.showAlert(result['message']);
      
      }, (err) => {
        this.loading.dismiss();
        this.presentToast(err);
      });
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
