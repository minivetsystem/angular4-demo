import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage,NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { SelectSearchable } from '../../../components/select/select';
import { CountryProvider } from '../../../providers/country/country';
// import { CustomValidators } from './custom-validators';
import { VendorServiceProvider } from '../../../providers/vendor-service/vendor-service';

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
function passwordMatchValidator(g: FormGroup) {

  return g.get('password').value === g.get('confirm_password').value
    ? null : { 'mismatch': true };

}
@IonicPage()
@Component({
  selector: 'page-addpeople',
  templateUrl: 'addpeople.html',
})

export class AddpeoplePage {
   // auto
   banklist: Array<string>=[];
   filteredbanklist: Array<string>=[];
   searchedtext:any;
   // end auto
items:any;
dummycountry:CountryNamesDummy[];
dummycountryngmodal:CountryNamesDummy;
  countryNames: CountryNames[];
  stateName: StateNames[];
  cityName: CityNames[];
  prestatenames: StateNames;
  precountry: CountryNames;
  precity: CityNames;
  data: any;
  stateid: number;
  statesdata: any;
  cityid: number;
  citiesdata: any;
  loading: any;
 
  /* Form control  for registration form*/
  addpeopleform: FormGroup;
  role_name: FormControl;
  first_name: FormControl;
  last_name: FormControl;
  email: FormControl;
  phone: FormControl;
  date_of_birth: FormControl;
  password: FormControl;
  confirm_password: FormControl;
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
  user_paypal : FormControl;
 rolelist:any;

  userRegData = {
    role_name:'',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
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
    user_paypal:''
  };
  tempcountry:any;
  tempstates:any;
  showbanklistif:boolean=false;
  constructor(public navCtrl: NavController, public vendorservice: VendorServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public navParams: NavParams, public countryprovider: CountryProvider, public alertCtrl: AlertController) {
     
    // TO DISPLAY ONLY ONE COUNTRY
  this.searchedtext="";
  // this.dummycountry=this.getStaticCountry();
  // this.dummycountryngmodal = this.dummycountry[0];
  //TO DISPLAY ALL COUNTRY
  this.countryNames = this.getCountries();
    this.showLoader("Loading...");
    this.vendorservice.getRoleList(localStorage.getItem('token')).then((result) => {
      // if(this.loading){
      //   this.loading.dismiss();
      // }
      
      this.rolelist= result['companyRoles'] ;
      // console.log(this.rolelist);
      // console.log(result['companyRoles']);
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
  rolechange(roleindex: any){
    console.log(roleindex);
  }

  bankSelected(bankname, e) {
    this.showbanklistif = false;
    this.searchedtext = bankname;
    e.preventDefault();

  }
  // end auto
  // DUMMY STATIC COUNTRY ( REMOVE THIS FUNCTION TO GET SEARCHABLE COUNTRIES)
  getStaticCountry(): CountryNamesDummy[] {
    return [
      { code: "SI", id: 196, latitude: "46.000000", longitude: "15.000000", name: "Slovenia" }
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
      // = result;
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
  getCities(sid): CityNames[] {
    // alert("getStateMethod"+countryid);
    this.countryprovider.allcities(sid).then((result) => {
      // = result;
      this.globalCityResult(result);
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
    this. role_name = new FormControl('', Validators.required);
    this.first_name = new FormControl('', Validators.required);
    this.last_name = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.phone = new FormControl('', Validators.required);
    this.date_of_birth = new FormControl();
    this.password = new FormControl('', Validators.required);
    this.confirm_password = new FormControl(null, Validators.required);
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
    this.user_paypal =  new FormControl();
    this.addpeopleform = new FormGroup({
      role_name : this.role_name,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone,
      date_of_birth: this.date_of_birth,
      password: this.password,
      confirm_password: this.confirm_password,
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
      user_paypal :  this.user_paypal,
    }, passwordMatchValidator);
    /* <p *ngIf="password.value && confirm_password.value && (password.value!=confirm_password.value)">*/
    this.userRegData.gender="m";

  }

  onSubmit = function (userregform) {
    // userregform.user_country = userregform.user_country.id;
    // userregform.user_state = userregform.user_state.id;
    // userregform.user_city = userregform.user_city.id;
    // console.log("form",this.regform._errors);
    // console.log("validornot",this.regform.valid );
    if (this.addpeopleform.valid) {
      // alert('valid form');
      // userregform.is_vendor = this.iamprovider;
      //  console.log(userregform);
      //  console.log(this.regform);
      this.showLoader('Submitting...');
      this.vendorservice.addpeople(this.userRegData,localStorage.getItem('company_id'),localStorage.getItem('token')).then((result) => {
        if(this.loading){
          this.loading.dismiss();
        }
        
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
}

