import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { SelectSearchable } from '../../components/select/select';
import { CountryProvider } from '../../providers/country/country';
import { AuthService } from '../../providers/auth-service/auth-service';
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
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {
  // auto
  banklist: Array<string> = [];
  filteredbanklist: Array<string> = [];
  searchedtext: any;
  // end auto
  items: any;
  dummycountry: CountryNamesDummy[];
  dummycountryngmodal: CountryNamesDummy;
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
  iamprovider: boolean;
  loading: any;
  /* Form control  for registration form*/
  regform: FormGroup;
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
  is_vendor: FormControl;
  company_name: FormControl;
  company_email: FormControl;
  user_paypal: FormControl;
  userRegData = {
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
    is_vendor: '',
    company_name: '',
    company_email: '',
    user_paypal: '',
  };
  tempcountry: any;
  tempstates: any;
  showbanklistif: boolean = false;
  constructor(public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public navParams: NavParams, public countryprovider: CountryProvider, public alertCtrl: AlertController) {
    this.searchedtext = "";
    this.countryNames = this.getCountries();
    this.showLoader();
    this.authService.getbanklist().then((result) => {
      //this.banklist.length=0;  
      console.log('banks', result['banks']);
      for (let bankindex in result['banks']) {
        this.banklist.push(result['banks'][bankindex].name);
        console.log(result['banks'][bankindex].name);
      }

      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    let val = ev.target.value;
    console.log('typing..', ev.target.value);
    this.showbanklistif = false;



    if (val && val.trim() !== '') {
      this.showbanklistif = true;
      this.filteredbanklist = this.banklist.filter(function (item) {
        return item.toLowerCase().includes(val.toLowerCase());
      });
    }
    else {
    }

  }
  bankSelected(bankname, e) {
    this.showbanklistif = false;
    this.searchedtext = bankname;
    e.preventDefault();

  }

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

    setTimeout(() => {
      event.component.items = this.getCountries().filter(country => {
        return country.name.toLowerCase().indexOf(text) !== -1 ||
          country.name.toLowerCase().indexOf(text) !== -1;
      });

      event.component.isSearching = false;
    }, 2000);
  }

  globalStateResult(abc: any) {
    this.statesdata = abc;
    this.stateName = this.statesdata;
    return null;
  }
  /*function : getStates
  @ return State Names
  */
  getStates(cid): StateNames[] {
    this.countryprovider.allstates(cid).then((result) => {
      // = result;
      this.globalStateResult(result);
    }, (err) => {
      console.log("Observable Instance error :", err)
    });
    return this.statesdata;
  }
  countryChange(event: { component: SelectSearchable, value: any }) {
    this.stateid = event.value.id;
    this.stateName = this.getStates(this.stateid);
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
    this.countryprovider.allcities(sid).then((result) => {
      this.globalCityResult(result);
    }, (err) => {
      console.log("Observable Instance error :", err)
    });
    return this.citiesdata;
  }
  stateChange(event: { component: SelectSearchable, value: any }) {
    this.cityid = event.value.id;
    this.cityName = this.getCities(this.cityid);
  }

  ngOnInit() {
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
    this.is_vendor = new FormControl();
    this.company_name = new FormControl();
    this.company_email = new FormControl('', [Validators.required, Validators.email]);
    this.user_paypal = new FormControl();
    this.regform = new FormGroup({
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
      is_vendor: this.is_vendor,
      company_name: this.company_name,
      company_email: this.company_email,
      user_paypal: this.user_paypal,
    }, passwordMatchValidator);
    this.userRegData.gender = "m";
  }

  onSubmit = function (userregform) {
    if (this.regform.valid) {
      this.userRegData.is_vendor = this.iamprovider;
      this.showLoader();
      this.authService.register(this.userRegData).then((result) => {
        this.loading.dismiss();
        if (result.status) {
          this.showAlert(result.message);

        } else {
          this.presentToast(result.message);
        }

      }, (err) => {
        this.loading.dismiss();
        this.presentToast('500 Internal Server Error');
      });

    } else {
      this.validateAllFormFields(this.regform); //{7}
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

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'initializating...'
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

