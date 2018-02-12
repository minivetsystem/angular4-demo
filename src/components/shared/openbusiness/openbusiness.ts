import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { CompanyProvider } from '../../../providers/company/company';
@Component({
  selector: 'openbusiness',
  templateUrl: 'openbusiness.html'
})
export class OpenbusinessComponent {

  information: any;
  loading: any;
  alreadyLoaded: boolean = false;
  // information1: any;
  companytab: boolean = false;
  friendtab: boolean = false;
  dependentfilter: Array<any>;
  forceselected: any;
  monthnames: Array<any> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // filter
  type: any = 1;
  filter_by: any = 4;
  filter_by_value: any = 'all';
  bymonth: any;
  byyear: any;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public companyprovider: CompanyProvider, public loadingCtrl: LoadingController, private addpeopletodept: ModalController) {
    this.information = "";
    this.information = [{ 'tabname': 'Companies' }, { 'tabname': 'Friends' }];  // result ="{tabname:'Poznanstva'}";

  }
  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
    if (i == 0) {
      this.information[1].open = false;
      this.companytab = true;
      this.friendtab = false;
      if (this.information[i].open) { this.showLoader(); }
      this.companyprovider.getConnections_type1(localStorage.getItem('user_id'), localStorage.getItem('token'), this.type, this.filter_by, this.filter_by_value).then((companies) => {

        var comp_data = companies['connections'];
        if (companies['status']) {
          this.information[i].company = comp_data['companies'];
          this.information[i].companydetails = comp_data['details'];
        } else {
          this.showAlert(companies['message'])
        }
        this.loading.dismiss();
      }, (err) => {
        console.log("Observable Instance error :", err)
      });
    } else {
      this.companytab = false;
      this.friendtab = true;
      this.information[0].open = false;
      if (this.information[i].open) { this.showLoader(); }
      this.companyprovider.getConnections_type2(localStorage.getItem('user_id'), localStorage.getItem('token')).then((friends) => {
        var friend_data = friends['connections'];
        if (friends['status']) {
          this.information[i].friends = friend_data['friends'];
          this.information[i].companydetails = friend_data['details'];
        } else {
          this.showAlert(friends['message'])
        }
        this.loading.dismiss();
      }, (err) => {
        console.log("Observable Instance error :", err)
      });

    }

  }

  // if there are further children toggle data
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }
  mainfilterby($e) {

    console.log('mainfilterby', $e);
    if ($e == 1) {
      this.dependentfilter = this.monthnames;
      this.filter_by = $e;
    }
    if ($e == 2 || $e == 3) {
      var d = new Date();
      var n = d.getFullYear();
      var cyear: string = n.toString();
      var prevear: string = (n - 1).toString();
      // this.dependentfilter=[];
      this.dependentfilter = [cyear, prevear];

      this.filter_by = $e;
    }
    if ($e == 4) {
      this.filter_by = $e;
    }
  }
  modifier($e) {
    if (this.filter_by == 2 || this.filter_by == 3) {

      this.filter_by_value = this.dependentfilter[$e - 1];
    } else {
      this.filter_by_value = $e;
    }
    console.log('type', this.type, 'filter_by', this.filter_by, 'filter_by_val', this.filter_by_value);
    this.showLoader();
    this.companyprovider.getConnections_type1(localStorage.getItem('user_id'), localStorage.getItem('token'), this.type, this.filter_by, this.filter_by_value).then((companies) => {
      var comp_data = companies['connections'];
      if (companies['status']) {
        this.information[0].company = comp_data['companies'];
        this.information[0].companydetails = comp_data['details'];
      } else {
        this.information[0].company = [];
        this.information[0].companydetails = [];
        this.showAlert(companies['message']);
      }

      this.loading.dismiss();
    }, (err) => {
      console.log("Observable Instance error :", err)
    });

  }
  ionViewDidLoad() { }
  ionViewWillLeave() { }
  ionViewWillEnter() {
    if (!this.alreadyLoaded) {
      this.showLoader();
      this.alreadyLoaded = true;
    } else {
      this.loading.dismiss();
    }

  }
  showAlert(msg) {
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

    alert.present();
  }
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    this.loading.present();
  }
  edit(empuserid) {
    // console.log(empuserid); 
    var empdata = { empid: empuserid, company_id: localStorage.getItem('company_id') };
    const editpeopledetails = this.addpeopletodept.create('EditPeopleModalPage', { userdata: empdata });
    editpeopledetails.present();
  }

  //  call  modal add people to department
  add_people_dept(departid) {

    const add_peopletodept = this.addpeopletodept.create('AddppldeptmodalPage', { deptid: departid });
    add_peopletodept.present();
  }

}
