//back
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage,NavController, NavParams, LoadingController, ToastController,Platform, AlertController, ViewController,ActionSheetController } from 'ionic-angular';
import { SelectSearchable } from '../../../components/select/select';
import { CountryProvider } from '../../../providers/country/country';
// import { CustomValidators } from './custom-validators';
import { File } from '@ionic-native/file';
import { VendorServiceProvider } from '../../../providers/vendor-service/vendor-service';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { SingletonService } from '../../../providers/configservice';
//http://konekt.local/api/v1/company/1/employee?token=PMCP4DWNGMLV18PQ
declare var cordova: any;
class CountryNames {
  public code: string;
  public id: number;
  public latitude: number;
  public longitude: number;
  public name: string;
}
class CountryNamesDummy {
  public code: string;
  public id: number;
  public latitude: string;
  public longitude: string;
  public name: string;
}
class StateNames {
  public id: number;
  public country_id: number;
  public state_name: string;
}
class CityNames {
  public id: number;
  public city: string;
  public state_id: number;
}

@IonicPage()
@Component({
  selector: 'profile-modal',
  templateUrl: 'profilemodal.html',
})

export class ProfileModalPage {
    // auto
    banklist: Array<string>=[];
    filteredbanklist: Array<string>=[];
    searchedtext:any;
    // end auto
    // profile image uploading vars
    lastImage: string = null;
    first_Image: string = null;
    is_uploaded_first_Image: boolean = false;
    cur_first_Image: string = null;
    previousprofileimg:any;
    newupload:boolean=false;
    // end profile image uploading vars
  data1:any;
items:any;
dummycountry:CountryNamesDummy[];
dummycountryngmodal:CountryNamesDummy;
  countryNames: CountryNames[];
  countryname1:CountryNames;  
  stateName: StateNames[];
  statename1:StateNames;
  cityName: CityNames[];
  cityname1:CityNames;
  prestatenames: StateNames;
  precountry: CountryNames;
  precity: CityNames;
  data: any;
  stateid: number;
  statesdata: any;
  cityid: number;
  citiesdata: any;
  loading: any;
  countryid:any;
 banks:any;
  /* Form control  for registration form*/
  addpeopleform: FormGroup;
 
  first_name: FormControl;
  last_name: FormControl;
  email: FormControl;
  phone: FormControl;
  paypal_details:FormControl;
  date_of_birth: FormControl;
  user_house_nubmer: FormControl;
  user_country: FormControl;
  user_city: FormControl;
  user_state: FormControl;
  user_street: FormControl;
  user_zip: FormControl;
  user_bank: FormControl;
  user_bank_accout: FormControl;
  user_tax_number: FormControl;
  gender: FormControl;


  userRegData = {
   
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    paypal_details:'',
    date_of_birth: '',
    password: '',
    confirm_password: '',
    user_house_nubmer: '',
    user_country: '',
    user_city: '',
    user_state: '',
    user_street: '',
    user_zip: '',
    user_bank: '',
    user_bank_accout: '',
    user_tax_number: '',
    gender: '',
  };
tempcountry:any;
tempstates:any;
showbanklistif:boolean=false;
  constructor(public endpoint:SingletonService,public platform: Platform,private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController,public navCtrl: NavController, public vendorservice: VendorServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public navParams: NavParams, public countryprovider: CountryProvider, public alertCtrl: AlertController, private view: ViewController) {
      // TO DISPLAY ONLY ONE COUNTRY
  this.searchedtext="";
  this.dummycountry=this.getStaticCountry();
  this.dummycountryngmodal = this.dummycountry[0];
  //TO DISPLAY ALL COUNTRY
  //this.countryNames = this.getCountries();

    this.showLoader("Loading...");
    // this.vendorservice.getBanks().then((result) =>{
    //   this.banks =result['banks'];
    // }, (err) => {
    //   this.loading.dismiss();
    //   this.presentToast(err);
    //  });

    // console.log('UserId', navParams.get("userdata").empid);
    // console.log('companyid',  navParams.get("userdata").company_id);
   
    this.vendorservice.getUserProfile(navParams.get("userdata").empid,localStorage.getItem('token')).then((result) => {
      console.log("profileuser",result['user']['user']['first_name']);
      
     this.userRegData.first_name = result['user']['user']['first_name'];
      this.userRegData.last_name = result['user']['user']['last_name'];
       this.userRegData.email = result['user']['user']['email'];
      this.userRegData.phone = result['user']['user']['profile']['phone'];
      this.userRegData.paypal_details = result['user']['user']['profile']['paypal_details'];
      this.userRegData.date_of_birth = result['user']['user']['profile']['birth_date'];
      this.userRegData.gender = result['user']['user']['profile']['gender'];
      this.userRegData.user_house_nubmer = result['user']['user']['profile']['house_nubmer'];
      this.userRegData.user_street = result['user']['user']['profile']['street'];
      this.userRegData.user_zip = result['user']['user']['profile']['zip_code'];
      // this.userRegData.user_bank = result['employee']['user']['profile']['user_bank'];
      this.searchedtext =result['user']['user']['profile']['bank']['name'];
      this.userRegData.user_bank = this.searchedtext;
      this.userRegData.user_bank_accout =result['user']['user']['profile']['bank_accout'];
      this.userRegData.user_tax_number = result['user']['user']['profile']['tax_number'];
    //  profile image
    this.previousprofileimg  = result['user']['images']['medium'];
    this.first_Image = result['user']['images']['medium'];
      this.is_uploaded_first_Image=true;
    // end profile image
      this.getStatebyid(result['user']['user']['profile']['country_id'], result['user']['user']['profile']['state_id']);
      this.getCities(result['user']['user']['profile']['state_id'],result['user']['user']['profile']['city'])
      this.countryNames = this.getCountries();
     this.countryid = result['user']['user']['profile']['country_id'];

     console.log('country id',result['user']['user']['country_id']);
        // this.loading.dismiss();
      }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  //  itemValueField
// this.countryNames = this.data[1];
this.vendorservice.getbanklist().then((result) => {
  //this.banklist.length=0;  
  console.log('banks',result['banks']);
  for(let bankindex in result['banks']){
    this.banklist.push(result['banks'][bankindex].name);
   console.log(result['banks'][bankindex].name);
  }
if(this.loading){
  this.loading.dismiss();
}

}, (err) => {
   this.loading.dismiss();
  this.presentToast(err);
});

  }
  // uploading configuration
  public presentActionSheet(imgorder) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY,imgorder);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA,imgorder);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  public takePicture(sourceType, imgorder) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), imgorder);

          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), imgorder);
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }
   // Create a new name for the image
   private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

 // Copy the image to a local folder
 private copyFileToLocalDir(namePath, currentName, newFileName, imgorder) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {

    this.first_Image = newFileName;
    this.cur_first_Image = currentName;
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}

// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    this.newupload=true;
    return cordova.file.dataDirectory + img;
  }
}

public uploadImage(imgorder) {
  // selected image upload on click
  var ccimg: string;
  switch (imgorder) {
    case 1: {
      ccimg = this.first_Image;
      this.is_uploaded_first_Image=true;
      break;
    }
    default: {
      console.log("Invalid choice");
      break;
    }
  }
  // Destination URL
  var companyuserroleid='3';
  var url = this.endpoint.apiUrl + "user/cropimage?token=" + localStorage.getItem('token');
  var uri = encodeURI(url);
  // File for Upload
  var targetPath = this.pathForImage(ccimg);
  var imagetype:string;
  if(localStorage.getItem('role_id') == companyuserroleid){
    imagetype='company';
  } else {
    imagetype='user';
  }
  // File name only
  var filename = ccimg;
  var options = {
    fileKey: "image",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    headers: { 'Authorization': 'Basic YWRtaW46MTIzNDU2' },
    params: { 'type': imagetype  }
  };

  const fileTransfer: TransferObject = this.transfer.create();

  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, uri, options).then(data => {
   
    this.loading.dismissAll()
    if(data['status'] == false){
      this.presentToast(data['message']);
    }else {
       // this.presentToast('Image succesful uploaded.'+msg);
      this.presentToast('Profile image successfully uploaded.');
      // this.showAlertError(msg);
      
    }
    
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.' + err);
  });
}
delete() {
  this.first_Image = null;
  this.cur_first_Image = null;
  this.is_uploaded_first_Image=false;
  this.presentActionSheet(1);
}
  //end uploading configuration
  getItems(ev: any) {
    // Reset items back to all of the items
    let val = ev.target.value;
    // this.initializeItems(val);
    // this.showLoader('Fetching banks...');
    console.log('typing..',ev.target.value);
  this.showbanklistif = false;
   
      if (val && val.trim() !== '') {
        this.showbanklistif = true;
        this.filteredbanklist = this.banklist.filter(function(item) {
          return item.toLowerCase().includes(val.toLowerCase());
        });
      }
   else {
      // this.loading.dismiss();
      // this.banklist.length=0;
    }
  
      // set val to the value of the searchbar
    

    // if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
    //   this.banklist = this.banklist.filter((item) => {
    //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   })
    // }
  }
  bankSelected(bankname,e){
    this.showbanklistif = false;
    this.searchedtext=bankname;
    e.preventDefault();
   
  }
// end auto
// DUMMY STATIC COUNTRY ( REMOVE THIS FUNCTION TO GET SEARCHABLE COUNTRIES)
getStaticCountry(): CountryNamesDummy[] {
return [
  {code: "SI",id: 196, latitude: "46.000000", longitude: "15.000000",name: "Slovenia"}
];
}
  onKeyUp() {
    // debugging radio button and date
    // console.log(this.date_of_birth);
    // console.log(this.gender);
  }
  // ionViewDidLoad() {  console.log('ionViewDidLoad RegisterPage');    }
  /*function : getCountries
  @ return Country Names
  */

  getCountries(): CountryNames[] {

    this.countryprovider.allcountries().then((result) => {
      this.data = result;
      this.tempcountry=result;
       //  country preselected
       var countrycount=0;
       var countryjson:any;
       for (let item in result){
        
           if(result[item].id==this.countryid){
            console.log('countryid',result[item].id);
             countryjson = result[countrycount]
             this.countryname1 =countryjson;
 
             console.log(this.tempcountry[countrycount]);
             
           } else {
             countrycount++;
           }
           
         }
    }, (err) => {
      console.log("Observable Instance error :", err)
    });
    return this.data;
  }
  searchCountry(event: { component: SelectSearchable, text: string }) {
    let text = (event.text || '').trim().toLowerCase();

    if (!text) {
      event.component.items = [];
      return;
    } else if (event.text.length < 3) {
      return;
    }

    event.component.isSearching = true;

    // AJAX.
    //use startsWith to check string from starting character @return true/false

    setTimeout(() => {
      event.component.items = this.getCountries().filter(country => {
        return country.name.toLowerCase().indexOf(text) !== -1 ||
          country.name.toLowerCase().indexOf(text) !== -1;
      });

      event.component.isSearching = false;
    }, 2000);
  }
  // custom method
  getStatebyid(cid,stateid?){

    this.countryprovider.getStatebyid(cid).then((result) => {
      // = result;
    this.tempstates= result;
    var statecount=0;
    for(let state in result){

      if(result[state].id == stateid){
        console.log(stateid); 
        this.statename1 = result[statecount];
        break;
      } else {
        statecount++;
      }
    }
   
    this.globalStateResult(result);
    // console.log("leg",this.tempstates );
      
    }, (err) => {
      console.log("Observable Instance error :", err)
    });
  // console.log("aa",this.tempstates);
  return;
  }
  // portTemplate(port: Port) {
  //   return `${port.name} (${port.code})`;
  // }
  globalStateResult(abc: any) {
    this.statesdata = abc;
    this.stateName = this.statesdata;
    return null;
  }

  /*function : getStates
  @ return State Names
  */
  getStates(cid): StateNames[] {
    // alert("getStateMethod"+countryid);
   
    this.countryprovider.allstates(cid).then((result) => {

      this.globalStateResult(result);
    }, (err) => {
      console.log("Observable Instance error :", err)
    });
    // console.log('inside',JSON.stringify(this.statesdata));

    return this.statesdata;
  }
  /*if Search is requested for states*/
  // searchState (event: { component: SelectSearchable, value: string }) {
  //   let value = (event.value || '').trim().toLowerCase();

  //   alert('from_search_state1'+value);
  //     if (!value) {
  //         event.component.items = [];
  //         return;
  //     } else if (event.value.length < 3) {
  //         return;
  //     }

  //     event.component.isSearching = true;

  //     // AJAX.
  //   //use startsWith to check string from starting character @return true/false
  //   setTimeout(() => {
  //     event.component.items = this.getStates(this.stateid).filter(state => {
  //         return state.state_name.toLowerCase().indexOf(value) !== -1 ||
  //         state.state_name.toLowerCase().indexOf(value) !== -1;
  //     });
  //     event.component.isSearching = false;
  // }, 2000);
  // }
  countryChange(event: { component: SelectSearchable, value: any }) {
    // console.log('value:', event.value.id);
    this.stateid = event.value.id;
    this.stateName = this.getStates(this.stateid);
    // console.log('mstate',this.stateName);

  }
  globalCityResult(abc: any) {
    this.citiesdata = abc;

    this.cityName = this.citiesdata;
    return null;
  }
  /*function : getStates
  @ return State Names
  */
  getCities(sid,cityid?): CityNames[] {
    // alert("getStateMethod"+countryid);

    this.countryprovider.allcities(sid).then((result) => {
      // = result;
      this.globalCityResult(result);
      var citycount=0;
   
      for(let city in result){
        if(result[city].id == cityid && result[city].state_id == sid){
          this.cityname1= result[citycount];
        } else {
          citycount++;
        }
      }
    }, (err) => {
      console.log("Observable Instance error :", err)
    });
    // console.log('inside',JSON.stringify(this.citiesdata));
    return this.citiesdata;
  }
  stateChange(event: { component: SelectSearchable, value: any }) {
    this.cityid = event.value.id;
    this.cityName = this.getCities(this.cityid);
    // console.log('stateChange',event.value);
  }
  cityChange(event: { component: SelectSearchable, value: any }) {
    // console.log('country',this.precountry);
    // console.log('State',this.prestatenames);
    //   console.log('value city',event.value.city);
  }
  addasprovider() {

    // console.log('improvider:' + this.iamprovider);
  }
  // reset() {
  //   this.anycontrol.reset();
  // }
  //allcities
  /*
    field helper
      "first_name": "smriti",
          "last_name": "ghosh",
          "email": "qqsq@qqq.cacdc",
          "date_of_birth": "2012-12-31",
          "password": "123456",
          "confirm_password": "123456",
          "user_house_nubmer": "house_nubmer",
          "user_country": 1,
          "user_city": 1,
          "user_state": 1,
          "user_street": "user_street",
          "user_zip": "zip",
          "user_bank": 1,
          "user_bank_accout": 12345678,
          "user_tax_number": "sdad",
          "gender": "f",
          "is_vendor": true,
          "company_name":"company name",
          "company_email": "email@company.com"
    */
  /*Api register code*/
  ngOnInit() {
    
    this.first_name = new FormControl('', Validators.required);
    this.last_name = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.phone = new FormControl('', Validators.required);
    this.paypal_details = new FormControl();
    
    this.date_of_birth = new FormControl();
 
    this.user_house_nubmer = new FormControl();
    this.user_country = new FormControl('', Validators.required);
    this.user_city = new FormControl('', Validators.required);
    this.user_state = new FormControl('', Validators.required);
    this.user_street = new FormControl('', Validators.required);
    this.user_zip = new FormControl('', Validators.required);
    this.user_bank = new FormControl();
    this.user_bank_accout = new FormControl();
    this.user_tax_number = new FormControl();
    this.gender = new FormControl();

    this.addpeopleform = new FormGroup({
    
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone,
      paypal_details:this.paypal_details,
      date_of_birth: this.date_of_birth,
      user_house_nubmer: this.user_house_nubmer,
      user_country: this.user_country,
      user_city: this.user_city,
      user_state: this.user_state,
      user_street: this.user_street,
      user_zip: this.user_zip,
      user_bank: this.user_bank,
      user_bank_accout: this.user_bank_accout,
      user_tax_number: this.user_tax_number,
      gender: this.gender,
    });
    /* <p *ngIf="password.value && confirm_password.value && (password.value!=confirm_password.value)">*/
    this.userRegData.gender="m";

  }

  onSubmit = function (userregform) {
    // console.log("sumit clicked",this.addpeopleform);
    if (this.addpeopleform.valid) {
  
      this.showLoader('Submitting...');
      this.vendorservice.updateprofile(this.searchedtext, userregform,localStorage.getItem('token')).then((result) => {
        this.loading.dismiss();
        if (result.status) {
          this.showAlert(result.message);

        } else {
          this.presentToast(result.message);
        }

      }, (err) => {
        this.loading.dismiss();
        this.presentToast(err);
      });

    } else {
      this.validateAllFormFields(this.addpeopleform); //{7}
    }
  }
  //recursive form validator
  validateAllFormFields(formGroup: FormGroup) {       //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      // console.log(control);
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6} 
      }
    });
  }
  showAlertError(msg) {
    const alert = this.alertCtrl.create({
      title: msg,
      buttons: [{
        text: 'Ok',
        handler: () => {
          alert.dismiss();
          return false;
        }
      }]
    });
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

  showLoader(msg) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });

    this.loading.present();
  }
  presentErrorToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 20000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 8000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  dismiss(){
    this.view.dismiss();
  }
}

